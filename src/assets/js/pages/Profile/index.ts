import Block from "../../modules/Block.js";
import BackButton from "../../components/BackButton/index.js";
import Button from "../../components/Button/index.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";

export default class Profile extends Block {
    constructor() {
        super("div", {
            attributes: {
                class: "profile"
            },
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
            editProfileLink: new Button("a", {
                attributes: {
                    class: "profile__edit-info-button button button_thin button_secondary double__child",
                    href: "/profile-edit-info/"
                },
                text: "Edit profile"
            }),
            changePasswordLink: new Button("a", {
                attributes: {
                    class: "profile__change-password-button button button_thin button_secondary double__child",
                    href: "/profile-change-password/"
                },
                text: "Change password",
            }),
            logOutButton: new Button("button", {
                attributes: {
                    class: "profile__log-out-button button button_wide button_logout",
                    type: "button"
                },
                text: "Log out",
                eventListeners: [
                    ["click", (event: Event): void => {
                        event.preventDefault();
                        console.log("[INFO] Logging out will be implemented later in the course");
                    }]
                ]
            })
        })
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}