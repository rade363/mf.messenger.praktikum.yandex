import Block from "../../modules/Block.js";
import BackButton from "../../components/BackButton/index.js";
import Button from "../../components/Button/index.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";
import {getResponseErrorText} from "../../modules/helpers.js";
import {createAPIUrl} from "../../modules/domHelpers.js";
import {NO_AVATAR_IMG} from "../../constants/index.js";

import Router from "../../modules/Router.js";
import AuthAPI from "../../api/auth-api.js";
import GlobalState from "../../modules/GlobalState.js";

const router = new Router("#root");
const authAPI = new AuthAPI();
const globalStateInstance = new GlobalState();

export default class Profile extends Block {
    constructor() {
        const currentUser: IUser = globalStateInstance.getProp("currentUser");
        const profile = createExistingUser(currentUser);

        super("div", {
            attributes: {
                class: "profile"
            },
            title: "Profile",
            backButton: new BackButton({
                url: "/chats/",
                eventListeners: [
                    ["click", (event: Event) => {
                        event.preventDefault();
                        router.go("/chats/");
                    }]
                ]
            }),
            profile,
            editProfileLink: new Button("a", {
                attributes: {
                    class: "profile__edit-info-button button button_thin button_secondary double__child",
                    href: "/profile-edit-info/"
                },
                text: "Edit profile",
                eventListeners: [
                    ["click", (event: Event) => {
                        event.preventDefault();
                        router.go("/profile-edit-info/");
                    }]
                ]
            }),
            changePasswordLink: new Button("a", {
                attributes: {
                    class: "profile__change-password-button button button_thin button_secondary double__child",
                    href: "/profile-change-password/"
                },
                text: "Change password",
                eventListeners: [
                    ["click", (event: Event) => {
                        event.preventDefault();
                        router.go("/profile-change-password/");
                    }]
                ]
            }),
            logOutButton: new Button("button", {
                attributes: {
                    class: "profile__log-out-button button button_wide button_logout",
                    type: "button"
                },
                text: "Log out",
                eventListeners: [
                    ["click", handleLogOutClick]
                ]
            })
        });

        function handleLogOutClick(event: Event): void {
            event.preventDefault();
            authAPI.logOut()
                .then((xhr: XMLHttpRequest) => {
                    if (xhr.response === "OK") {
                        router.go("/login/");
                    }
                })
                .catch((error: XMLHttpRequest) => {
                    console.error("[LOG OUT] Could not log out. Details:", error.response)
                    if (error.status === 500) {
                        router.go("/500");
                    }
                });
        }
    }

    componentDidMount() {
        const existingUser = globalStateInstance.getProp("currentUser");
        if (existingUser) {
            return;
        }

        authAPI.getCurrentUser()
            .then((xhr: XMLHttpRequest) => {
                const currentUser = JSON.parse(xhr.response);
                globalStateInstance.setProp("currentUser", currentUser);

                const profile = createExistingUser(currentUser);
                this.setProps({ profile });
            })
            .catch((error: XMLHttpRequest) => {
                const errorObj = getResponseErrorText(error);
                console.error('[PROFILE] [MOUNT] [ERROR]', errorObj);
                router.go("/login/");
            });
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}

function createExistingUser(currentUser: IUser | null): ICurrentUserDetails {
    const avatar = currentUser && currentUser.avatar
        ? { isEmpty: false, url: createAPIUrl(currentUser.avatar) }
        : { isEmpty: true, url: NO_AVATAR_IMG};
    const fullname = currentUser && currentUser.first_name && currentUser.second_name
        ? `${currentUser.first_name} ${currentUser.second_name}`
        : "";
    const infoBlock = [];

    infoBlock.push(createUserProperty("email", "Email", currentUser));
    infoBlock.push(createUserProperty("login", "Login", currentUser));
    infoBlock.push(createUserProperty("first_name", "First name", currentUser));
    infoBlock.push(createUserProperty("second_name", "Last name", currentUser));
    infoBlock.push(createUserProperty("display_name", "Display name", currentUser));
    infoBlock.push(createUserProperty("phone", "Phone", currentUser));

    return {
        avatar,
        fullname,
        infoBlock
    };
}

function createUserProperty(type: string, title: string, currentUser: IUser | null): IUserProperty {
    if (currentUser && type in currentUser && typeof currentUser[type] === "string") {
        const value = currentUser[type];
        if (typeof value === "string") {
            return { type, title, value };
        }
    }
    return { type, title, value: "" };
}