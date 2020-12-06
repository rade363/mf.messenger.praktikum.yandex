import Block from "../../modules/Block.js";
import Button from "../../components/Button/index.js";
import Input from "../../components/Input/index.js";
import template from "./template.js";
import { compile } from "../../modules/templator.js";
export default class Login extends Block {
    constructor() {
        super("div", {
            title: "messenger",
            form: {
                name: "login-form",
                loginInput: new Input({
                    className: "login-form__username",
                    label: "Login",
                    name: "username",
                    type: "text"
                }),
                passwordInput: new Input({
                    className: "login-form__password",
                    label: "Password",
                    name: "password",
                    type: "password"
                }),
                submitButton: new Button({
                    className: "login-form__login-button button button_wide button_primary",
                    text: "Sign in",
                    type: "submit"
                }),
                signUpLink: new Button({
                    className: "login-button button button_wide button_secondary",
                    text: "Sign up",
                    url: "/register/"
                })
            }
        });
    }
    render() {
        return compile(template, {
            title: this.props.title,
            form: {
                name: this.props.form.name,
                loginInput: this.props.form.loginInput.render(),
                passwordInput: this.props.form.passwordInput.render(),
                submitButton: this.props.form.submitButton.render(),
                signUpLink: this.props.form.signUpLink.render()
            }
        });
    }
}
//# sourceMappingURL=index.js.map