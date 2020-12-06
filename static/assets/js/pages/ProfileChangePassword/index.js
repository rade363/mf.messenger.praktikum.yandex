import Block from "../../modules/Block.js";
import BackButton from "../../components/BackButton/index.js";
import Button from "../../components/Button/index.js";
import Input from "../../components/Input/index.js";
import template from "./template.js";
import { compile } from "../../modules/templator.js";
export default class ProfileChangePassword extends Block {
    constructor() {
        super("div", {
            title: "Profile",
            backButton: new BackButton({
                url: "/chats/"
            }),
            form: {
                name: "password-form",
                oldPasswordInput: new Input({
                    className: "password-form__old-password",
                    label: "Old password",
                    name: "old-password",
                    type: "password"
                }),
                newPasswordInput: new Input({
                    className: "password-form__new-password",
                    label: "New password",
                    name: "new-password",
                    type: "password"
                }),
                repeatNewPasswordInput: new Input({
                    className: "password-form__password-repeat",
                    label: "Repeat new password",
                    name: "password-repeat",
                    type: "password"
                }),
                submitButton: new Button({
                    className: "password-form__save-button button button_thin button_primary double__child",
                    text: "Save",
                    type: "submit"
                }),
                cancelLink: new Button({
                    className: "password-form__cancel-button button button_thin button_secondary double__child",
                    text: "Cancel",
                    url: "/profile/"
                })
            }
        });
    }
    render() {
        return compile(template, {
            title: this.props.title,
            backButton: this.props.backButton.render(),
            form: {
                name: this.props.form.name,
                oldPasswordInput: this.props.form.oldPasswordInput.render(),
                newPasswordInput: this.props.form.newPasswordInput.render(),
                repeatNewPasswordInput: this.props.form.repeatNewPasswordInput.render(),
                submitButton: this.props.form.submitButton.render(),
                cancelLink: this.props.form.cancelLink.render()
            }
        });
    }
}
//# sourceMappingURL=index.js.map