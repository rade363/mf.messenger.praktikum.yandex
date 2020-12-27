import Block from "../../modules/Block.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";
import BackButton from "../../components/BackButton/index.js";
import Form from "../../components/Form/index.js";
import {getResponseErrorText} from "../../modules/helpers.js";

import Router from "../../modules/Router.js";
const router = new Router("#root");

import AuthAPI from "../../api/auth-api.js";
const authAPI = new AuthAPI();

import GlobalState from "../../modules/GlobalState.js";
const globalStateInstance = new GlobalState();

export default class Register extends Block {
    constructor() {
        super("main", {
            attributes: {
                class: "container register"
            },
            title: "messenger",
            backButton: new BackButton({
                url: "/login/",
                eventListeners: [
                    ["click", (event: Event) => {
                        event.preventDefault();
                        router.back();
                    }]
                ]
            }),
            child: new Form({
                name: "register-form",
                inputFields: [
                    {
                        label: "Email",
                        type: "email",
                        name: "email"
                    },
                    {
                        type: "double",
                        attributes: {
                            class: "form__item"
                        },
                        children: [
                            {
                                label: "First name",
                                type: "text",
                                name: "first_name"
                            },
                            {
                                label: "Last name",
                                type: "text",
                                name: "second_name"
                            }
                        ]
                    },
                    {
                        label: "Login",
                        type: "text",
                        name: "login"
                    },
                    {
                        label: "Phone",
                        type: "tel",
                        name: "phone"
                    },
                    {
                        label: "Password",
                        type: "password",
                        name: "password",
                        mustEqual: "password-repeat"
                    },
                    {
                        label: "Repeat password",
                        type: "password",
                        name: "password-repeat",
                        mustEqual: "password"
                    }
                ],
                actions: [
                    {
                        text: "Sign up",
                        attributes: {
                            type: "submit",
                            class: "register-form__submit-button button button_wide button_primary"
                        }
                    }
                ],
                onSubmit: (formObject: ISignUpProps) => {
                    console.log("[INFO] Sign up", formObject);
                    authAPI.signUp(formObject)
                        .then((xhr: XMLHttpRequest) => {
                            console.log('Response', xhr);
                            const response = JSON.parse(xhr.response);
                            if (response.id && typeof response.id === "number") {
                                return authAPI.getCurrentUser();
                            }
                            return JSON.parse(xhr.response);
                        })
                        .then((xhr: XMLHttpRequest) => {
                            console.log('[INFO] User', xhr.response);
                            const userDetails = JSON.parse(xhr.response);
                            globalStateInstance.setProp("currentUser", userDetails);

                            console.log('[OnSubmit] check state', globalStateInstance.check());
                            router.go("/chats/");
                        })
                        .catch((error) => {
                            console.log('Error', error);
                            const errorMessage = getResponseErrorText(error);
                            if (errorMessage === "Login already exists") {
                                setErrorText("login", errorMessage, this);
                            } else if (errorMessage === "phone is not valid") {
                                setErrorText("phone", errorMessage, this);
                            } else if (errorMessage === "Email already exists") {
                                setErrorText("email", errorMessage, this);
                            }
                        });
                }
            })
        })
    }

    componentDidMount() {
        console.log('[REGISTER] [Mounted] check state', globalStateInstance.check());
        const existingUser = globalStateInstance.getProp("currentUser");
        if (existingUser) {
            console.log('[REGISTER] [MOUNT] No need to collect user! Already collected', existingUser);
            return;
        }

        authAPI.getCurrentUser()
            .then((xhr: XMLHttpRequest) => {
                const currentUser = JSON.parse(xhr.response);
                globalStateInstance.setProp("currentUser", currentUser);
                router.go("/chats/");
            })
            .catch((error: XMLHttpRequest) => {
                const errorObj = getResponseErrorText(error);
                console.error('[MOUNT] [LOGIN] [ERROR]', errorObj);
            });
    }

    render(): Element | null {
        return compile(template, {
            title: this.props.title,
            backButton: this.props.backButton,
            child: this.props.child
        });
    }
}

function setErrorText(fieldName: string, errorText: string, formBlock: IBlock): void {
    formBlock.props.child.props.inputFields.forEach((formInput: any) => {
        const inputField = formInput.inputField;
        if (inputField.props.name === fieldName) {
            const prevProps = formInput.inputField.props.errorMessage.props;
            formInput.inputField.props.errorMessage.setProps({
                ...prevProps,
                text: errorText
            });
        }
    });
}