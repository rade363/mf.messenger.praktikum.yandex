import Block from "../../modules/Block.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";
import {useState} from "../../modules/state.js";
import {validateForm, createFormObjectFromState} from "../../modules/formValidator.js";
import Form from "../../components/Form/index.js";
import FormInput, {setFormInput} from "../../components/FormInput/index.js";
import Button from "../../components/Button/index.js";
import Input from "../../components/Input/index.js";
import ErrorMessage from "../../components/ErrorMessage/index.js";

const state: IState = {
    login: useState(""),
    password: useState(""),
    loginError: useState(""),
    passwordError: useState("")
};

export default class Login extends Block {
    constructor() {
        const [getLogin, setLogin] = state.login;
        const [getPassword, setPassword] = state.password;
        const [getLoginError, setLoginError] = state.loginError;
        const [getPasswordError, setPasswordError] = state.passwordError;

        const view: TObjectType = {
            loginInput: new FormInput({
                label: "Login",
                type: "text",
                name: "login",
                className: "login-form__username",
                errorMessage: new ErrorMessage({
                    attributes: {
                        class: "form__error login-form__username-error"
                    },
                    text: getLoginError()
                }),
                input: new Input({
                    attributes: {
                        class: `form__input login-form__username-input`,
                        type: "text",
                        id: "login",
                        value: getLogin()
                    },
                    eventListeners: [
                        ["input", (event: Event) => {
                            setFormInput(event, view.loginInput, (value) => {
                                setLogin(value);
                                setLoginError("");
                            });
                        }]
                    ]
                })
            }),
            passwordInput: new FormInput({
                label: "Password",
                type: "password",
                name: "password",
                className: "login-form__password",
                errorMessage: new ErrorMessage({
                    attributes: {
                        class: "form__error login-form__username-error"
                    },
                    text: getPasswordError()
                }),
                input: new Input({
                    attributes: {
                        class: `form__input login-form__password-input`,
                        type: "password",
                        id: "login",
                        value: getPassword()
                    },
                    eventListeners: [
                        ["input", (event: Event) => {
                            setFormInput(event, view.passwordInput, (value) => {
                                setPassword(value);
                                setPasswordError("");
                            });
                        }]
                    ]
                })
            }),
            submitButton: new Button("button", {
                attributes: {
                    class: "login-form__login-button button button_wide button_primary",
                    type: "submit"
                },
                text: "Sign in"
            }),
            cancelButton: new Button("link", {
                attributes: {
                    class: "login-form__register-button button button_wide button_secondary",
                    href: "/register/"
                },
                text: "Sign up"
            })
        };
        const form = new Form({
            attributes: {
                class: "form login-form",
                method: "POST"
            },
            eventListeners: [
                ["submit", submitAuthForm]
            ],

            name: "login-form",

            inputFields: [
                {
                    inputField: view.loginInput
                },
                {
                    inputField: view.passwordInput
                }
            ],

            actions: [
                {
                    action: view.submitButton
                },
                {
                    action: `<span class="login-form__alternative">or</span>`
                },
                {
                    action: view.cancelButton
                }
            ]
        })

        super("main", {
            attributes: {
                class: "container login"
            },
            title: "messenger",
            child: form
        });

        function submitAuthForm(event: Event): void {
            event.preventDefault();
            let areFieldsValid = true;
            const formObj = createFormObjectFromState(state, ["loginError", "passwordError"]);
            // console.log("formObj", formObj);

            validateForm(formObj, (key: string, value: unknown, errorMessage: string) => {
                areFieldsValid = false;

                const errorField = state[`${key}Error`];
                const [, setError] = errorField;
                setError(errorMessage);

                const component = view[`${key}Input`];
                if (component) {
                    const attributes = component.props.input.props.attributes;
                    const newClass = `${attributes.class} form__input_error`;
                    component.props.input.setProps({
                        attributes: {
                            ...attributes,
                            class: newClass
                        }
                    });

                    const error = component.props.errorMessage;
                    error.setProps({
                        text: errorMessage
                    });
                }

                console.error(`[ERROR] Invalid form property ${key} value`, {
                    key,
                    value,
                    message: errorMessage
                })
            });

            if (areFieldsValid) {
                console.log("[INFO] Auth fields valid, form will be submitted later in this course", formObj);
            } else {
                console.error("[ERROR] [FORM] Invalid credentials");
            }
        }
    }

    render(): Element | null {
        return compile(template, {
            title: this.props.title,
            child: this.props.child
        });
    }
}