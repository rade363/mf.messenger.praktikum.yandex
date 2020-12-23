import Block from "../../modules/Block.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";
import BackButton from "../../components/BackButton/index.js";
import Form from "../../components/Form/index.js";
import Router from "../../modules/Router.js";

export default class Register extends Block {
    constructor() {
        const router = new Router("#root");
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
                                name: "first-name"
                            },
                            {
                                label: "Last name",
                                type: "text",
                                name: "last-name"
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
                onSubmit: (formObject: IFormObject) => {
                    console.log("[INFO] Auth fields valid, sign up event executed, form will be submitted later in this course", formObject)
                }
            })
        })
    }

    render(): Element | null {
        return compile(template, {
            title: this.props.title,
            backButton: this.props.backButton,
            child: this.props.child
        });
    }
}