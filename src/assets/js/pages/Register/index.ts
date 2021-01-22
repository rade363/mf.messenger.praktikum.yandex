import Block from "../../modules/Block/Block";
import template from "./template.handlebars";
import compile from "../../modules/templator/templator";
import BackButton from "../../components/BackButton/index";
import Form from "../../components/Form/index";
import { getResponseErrorText } from "../../modules/utils";
import { setErrorTextForInputField } from "../../modules/formHelpers";
import Router from "../../modules/Router/Router";
import AuthAPI from "../../api/auth-api";
import globalStateInstance from "../../modules/GlobalState/globalStateInstance";

const authAPI = new AuthAPI();
const router = new Router("#root");

export default class Register extends Block {
    constructor() {
        super("div", {
            attributes: {
                class: "wrapper wrapper_background_empty"
            },
            title: "messenger",
            backButton: new BackButton({
                url: "/login/",
                eventListeners: [
                    [
                        "click",
                        (event: Event) => {
                            event.preventDefault();
                            router.back();
                        }
                    ]
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
                onSubmit: (formObject: ISignUpProps): void => {
                    authAPI
                        .signUp(formObject)
                        .then((createdUser: ISignUpResponse) => {
                            if (createdUser.id) {
                                return authAPI.getCurrentUser();
                            }
                            throw new Error("Could not create user");
                        })
                        .then((userDetails: IUser) => {
                            globalStateInstance.setProp("currentUser", userDetails);
                            router.go("/chats/");
                        })
                        .catch((error: XMLHttpRequest | Error) => {
                            console.error("[ERROR] Could not create a new user", error);
                            if (error instanceof Error || error.status === 500) {
                                router.go("/500/");
                                return;
                            }

                            const errorMessage = getResponseErrorText(error);
                            if (errorMessage === "Login already exists") {
                                setErrorTextForInputField("login", errorMessage, this.props.child.props.inputFields);
                            } else if (errorMessage === "phone is not valid") {
                                setErrorTextForInputField("phone", errorMessage, this.props.child.props.inputFields);
                            } else if (errorMessage === "Email already exists") {
                                setErrorTextForInputField("email", errorMessage, this.props.child.props.inputFields);
                            }
                        });
                }
            })
        });
    }

    componentDidMount(): void {
        authAPI
            .getCurrentUser()
            .then((currentUser: IUser) => {
                globalStateInstance.setProp("currentUser", currentUser);
                router.go("/chats/");
            })
            .catch(() => console.info("[INFO] Not authorized"));
    }

    render(): Element | null {
        return compile(template, {
            title: this.props.title,
            backButton: this.props.backButton,
            child: this.props.child
        });
    }
}
