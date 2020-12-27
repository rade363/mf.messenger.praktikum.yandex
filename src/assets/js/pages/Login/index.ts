import Block from "../../modules/Block.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";
import Form from "../../components/Form/index.js";
import {getResponseErrorText} from "../../modules/helpers.js";

import Router from "../../modules/Router.js";
const router = new Router("#root");

import AuthAPI from "../../api/auth-api.js";
const authAPI = new AuthAPI();

import GlobalState from "../../modules/GlobalState.js";
const globalStateInstance = new GlobalState();

export default class Login extends Block {
    constructor() {
        super("main", {
            attributes: {
                class: "container login"
            },
            title: "messenger",
            child: new Form({
                name: "login-form",
                inputFields: [
                    {
                        label: "Login",
                        type: "text",
                        name: "login"
                    },
                    {
                        label: "Password",
                        type: "password",
                        name: "password"
                    }
                ],
                actions: [
                    {
                        text: "Sign in",
                        attributes: {
                            type: "submit",
                            class: "login-button button button_wide button_primary"
                        }
                    },
                    `<span class="login-form__alternative">or</span>`,
                    {
                        text: "Sign up",
                        attributes: {
                            href: "/register/",
                            class: "register-button button button_wide button_secondary"
                        },
                        eventListeners: [
                            ["click", (event: Event) => {
                                event.preventDefault();
                                router.go("/register/")
                            }]
                        ]
                    }
                ],
                onSubmit: (formObject: ISignIpProps) => {
                    console.log("[INFO] Sign in", formObject);
                    
                    authAPI.signIn(formObject)
                        .then((xhr: XMLHttpRequest) => {
                            if (xhr.response === "OK") {
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
                        .catch((error: XMLHttpRequest) => {
                            const errorMessage = getResponseErrorText(error);
                            this.props.child.props.inputFields.forEach((formInput: any) => {
                                const prevProps = formInput.inputField.props.errorMessage.props;
                                formInput.inputField.props.errorMessage.setProps({
                                    ...prevProps,
                                    text: errorMessage
                                });
                            });
                        });
                }
            })
        });
    }

    componentDidMount() {
        console.log("[LOGIN] Mounted");
        
        console.log('[LOGIN] [Mounted] check state', globalStateInstance.check());

        authAPI.getCurrentUser()
            .then((xhr: XMLHttpRequest) => {
                console.log('[MOUNT] [INFO] User', xhr.response);

                const userDetails = JSON.parse(xhr.response);
                globalStateInstance.setProp("currentUser", userDetails);

                console.log('[OnSubmit] check state', globalStateInstance.check());

                router.go("/chats/");
            })
            .catch((error: XMLHttpRequest) => {
                const errorObj = getResponseErrorText(error);
                console.error('[MOUNT] [LOGIN] [ERROR]', errorObj);
            });
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}