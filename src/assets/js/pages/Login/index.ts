import Block from "../../modules/Block.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";
import Form from "../../components/Form/index.js";
import Router from "../../modules/Router.js";

export default class Login extends Block {
    constructor() {
        const router = new Router("#root");
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
                            type: "button",
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
                onSubmit: (formObject: IFormObject) => {
                    console.log("[INFO] Auth fields valid, log in event executed, form will be submitted later in this course", formObject)
                }
            })
        });
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}