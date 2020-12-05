import {addEventListener} from "../assets/js/modules/domHelpers.js";
import profileTemplate from "../assets/js/pages/profile.js";

let view: IViewType = {};
document.addEventListener("DOMContentLoaded", initInterface);

function initInterface(): void {
    renderInterface();

    view = initView();

    addEventListener(view.logoutButton, "click", logOut);
}

function renderInterface(): void {
    const template = Handlebars.compile(profileTemplate);
    const data: ITemplateData = {
        title: "Profile",
        backButton: {
            url: "/chats/"
        },
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
        editProfileLink: {
            className: "profile__edit-info-button button button_thin button_secondary double__child",
            text: "Edit profile",
            url: "/profile-edit-info/"
        },
        changePasswordLink: {
            className: "profile__change-password-button button button_thin button_secondary double__child",
            text: "Change password",
            url: "/profile-change-password/"
        },
        logOutButton: {
            className: "profile__log-out-button button button_wide button_logout",
            type: "button",
            text: "Log out"
        }
    };
    const root = document.getElementById("root");
    if (root) {
        root.innerHTML = template(data);
    }
}

function initView(): IViewType {
    return {
        logoutButton: document.querySelector(".profile__log-out-button")
    };
}

function logOut(event: Event) {
    event.preventDefault();
    console.log("[INFO] Logging out will be implemented later in the course");
}