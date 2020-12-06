import Block from "../../modules/Block.js";
import BackButton from "../../components/BackButton/index.js";
import Button from "../../components/Button/index.js";
import template from "./template.js";
import { compile } from "../../modules/templator.js";
export default class Profile extends Block {
    constructor() {
        super("div", {
            title: "Profile",
            backButton: new BackButton({
                url: "/chats/"
            }),
            profile: {
                avatar: {
                    isEmpty: true,
                    url: "userpic-empty.svg"
                },
                fullname: "Ivan Ivanov",
                infoBlock: [
                    {
                        type: "email",
                        title: "Email",
                        value: "ivan.ivanov@yandex.ru"
                    },
                    {
                        type: "username",
                        title: "Username",
                        value: "ivan.ivanov"
                    },
                    {
                        type: "first-name",
                        title: "First name",
                        value: "Ivan"
                    },
                    {
                        type: "last-name",
                        title: "Last name",
                        value: "Ivanov"
                    },
                    {
                        type: "display-name",
                        title: "Display name",
                        value: "Ivan Ivanov"
                    },
                    {
                        type: "phone",
                        title: "Phone",
                        value: "+7(911)123-45-67"
                    },
                ]
            },
            editProfileLink: new Button({
                className: "profile__edit-info-button button button_thin button_secondary double__child",
                text: "Edit profile",
                url: "/profile-edit-info/"
            }),
            changePasswordLink: new Button({
                className: "profile__change-password-button button button_thin button_secondary double__child",
                text: "Change password",
                url: "/profile-change-password/"
            }),
            logOutButton: new Button({
                className: "profile__log-out-button button button_wide button_logout",
                type: "button",
                text: "Log out"
            })
        });
    }
    render() {
        return compile(template, {
            title: this.props.title,
            backButton: this.props.backButton.render(),
            profile: this.props.profile,
            editProfileLink: this.props.editProfileLink.render(),
            changePasswordLink: this.props.changePasswordLink.render(),
            logOutButton: this.props.logOutButton.render()
        });
    }
}
//# sourceMappingURL=index.js.map