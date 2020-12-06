import Block from "../../modules/Block.js";
import BackButton from "../../components/BackButton/index.js";
import Button from "../../components/Button/index.js";
import Input from "../../components/Input/index.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";

export default class ProfileEditInfo extends Block {
    constructor() {
        super("div", {
            title: "Profile",
            backButton: new BackButton({
                url: "/chats/"
            }),
            form: {
                name: "profile-form",
                avatarInput: {
                    isEmpty: true,
                    url: "userpic-empty.svg",
                    name: "avatar",
                },
                emailInput: new Input({
                    className: "profile-form__email",
                    label: "Email",
                    name: "email",
                    type: "email"
                }),
                loginInput: new Input({
                    className: "profile-form__login",
                    label: "Login",
                    name: "login",
                    type: "text"
                }),
                firstNameInput: new Input({
                    className: "profile-form__first-name",
                    label: "First name",
                    name: "first-name",
                    type: "text"
                }),
                lastNameInput: new Input({
                    className: "profile-form__last-name",
                    label: "Last name",
                    name: "last-name",
                    type: "text"
                }),
                displayNameInput: new Input({
                    className: "profile-form__display-name",
                    label: "Display name",
                    name: "display-name",
                    type: "text"
                }),
                phoneInput: new Input({
                    className: "profile-form__phone",
                    label: "Phone",
                    name: "phone",
                    type: "tel"
                }),
                submitButton: new Button({
                    className: "profile-form__save-button button button_thin button_primary double__child",
                    text: "Save",
                    type: "submit"
                }),
                cancelLink: new Button({
                    className: "profile-form__cancel-button button button_thin button_secondary double__child",
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
                avatarInput: this.props.form.avatarInput,
                emailInput: this.props.form.emailInput.render(),
                loginInput: this.props.form.loginInput.render(),
                firstNameInput: this.props.form.firstNameInput.render(),
                lastNameInput: this.props.form.lastNameInput.render(),
                displayNameInput: this.props.form.displayNameInput.render(),
                phoneInput: this.props.form.phoneInput.render(),
                submitButton: this.props.form.submitButton.render(),
                cancelLink: this.props.form.cancelLink.render()
            }
        });
    }
}