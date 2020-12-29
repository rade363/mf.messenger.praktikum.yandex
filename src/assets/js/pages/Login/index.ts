import Block from "../../modules/Block.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";
import Form from "../../components/Form/index.js";
import {getResponseErrorText} from "../../modules/helpers.js";

import Router from "../../modules/Router.js";
import AuthAPI from "../../api/auth-api.js";
import GlobalState from "../../modules/GlobalState.js";

const router = new Router("#root");
const authAPI = new AuthAPI();
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
                            throw new Error("Could not log in");
                        })
                        .then((xhr: XMLHttpRequest) => {
                            const userDetails = JSON.parse(xhr.response);
                            globalStateInstance.setProp("currentUser", userDetails);
                            router.go("/chats/");
                        })
                        .catch((error: XMLHttpRequest | Error) => {
                            console.log('[LOGIN] Error', error);
                            if (error instanceof Error || error.status === 500) {
                                router.go("/500/");
                                return;
                            }

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
        authAPI.getCurrentUser()
            .then((xhr: XMLHttpRequest) => {
                const userDetails = JSON.parse(xhr.response);
                globalStateInstance.setProp("currentUser", userDetails);
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