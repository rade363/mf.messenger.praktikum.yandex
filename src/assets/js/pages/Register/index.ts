import Block from "../../modules/Block.js";
import BackButton from "../../components/BackButton/index.js";
import Button from "../../components/Button/index.js";
import Input from "../../components/Input/index.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";

export default class Register extends Block {
    constructor() {
        super("div", {
            title: "messenger",
            backButton: new BackButton({
                url: "/login/"
            }),
            form: {
                name: "register-form",
                emailInput: new Input({
                    className: "register-form__email",
                    label: "Email",
                    name: "email",
                    type: "email"
                }),
                firstNameInput: new Input({
                    className: "register-form__first-name",
                    label: "First name",
                    name: "first-name",
                    type: "text"
                }),
                lastNameInput: new Input({
                    className: "register-form__last-name",
                    label: "Last name",
                    name: "last-name",
                    type: "text"
                }),
                loginInput: new Input({
                    className: "register-form__login",
                    label: "Login",
                    name: "login",
                    type: "text"
                }),
                phoneInput: new Input({
                    className: "register-form__phone",
                    label: "Phone",
                    name: "phone",
                    type: "tel"
                }),
                passwordInput: new Input({
                    className: "register-form__password",
                    label: "Password",
                    name: "password",
                    type: "password"
                }),
                repeatPasswordInput: new Input({
                    className: "register-form__password-repeat",
                    label: "Repeat password",
                    name: "password-repeat",
                    type: "password"
                }),
                submitButton: new Button({
                    className: "register-form__submit-button button button_wide button_primary",
                    text: "Sign up",
                    type: "submit"
                })
            }
        })
    }

    render(): Element | null {
        return compile(template, {
            title: this.props.title,
            backButton: this.props.backButton.render(),
            form: {
                name: this.props.form.name,
                emailInput: this.props.form.emailInput.render(),
                firstNameInput: this.props.form.firstNameInput.render(),
                lastNameInput: this.props.form.lastNameInput.render(),
                loginInput: this.props.form.loginInput.render(),
                phoneInput: this.props.form.phoneInput.render(),
                passwordInput: this.props.form.passwordInput.render(),
                repeatPasswordInput: this.props.form.repeatPasswordInput.render(),
                submitButton: this.props.form.submitButton.render()
            }
        });
    }
}