import Block from "../../modules/Block.js";
import BackButton from "../../components/BackButton/index.js";
import Button from "../../components/Button/index.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";
import {getResponseErrorText} from "../../modules/helpers.js";

import Router from "../../modules/Router.js";
const router = new Router("#root");

import AuthAPI from "../../api/auth-api.js";
const authAPI = new AuthAPI();

import GlobalState from "../../modules/GlobalState.js";
const globalStateInstance = new GlobalState();

export default class Profile extends Block {
    constructor() {
        const currentUser: ICurrentUser = globalStateInstance.getProp("currentUser");
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
            profile: profile,
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
                    ["click", (event: Event): void => {
                        event.preventDefault();
                        console.log("[INFO] Log out");
                        authAPI.logOut()
                            .then((xhr: XMLHttpRequest) => {
                                console.log('Response', xhr);
                                if (xhr.response === "OK") {
                                    router.go("/login/");
                                }
                            })
                            .catch((error) => console.log('Error', error));
                    }]
                ]
            })
        })
    }

    componentDidMount() {
        console.log('[PROFILE] [Mounted] check state', globalStateInstance.check());
        const existingUser = globalStateInstance.getProp("currentUser");
        if (existingUser) {
            console.log('[PROFILE] [MOUNT] No need to collect user! Already collected', existingUser);
            return;
        }

        authAPI.getCurrentUser()
            .then((xhr: XMLHttpRequest) => {
                console.log('[PROFILE] [MOUNT] User', xhr.response);
                const currentUser = JSON.parse(xhr.response);
                const profile = createExistingUser(currentUser);
                globalStateInstance.setProp("currentUser", currentUser);
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

function createExistingUser(currentUser: ICurrentUser | null): ICurrentUserDetails {
    const avatar = currentUser && currentUser.avatar
        ? { isEmpty: false, url: currentUser.avatar }
        : { isEmpty: true, url: "userpic-empty.svg"};
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

function createUserProperty(type: string, title: string, currentUser: ICurrentUser | null): IUserProperty {
    if (currentUser && type in currentUser && typeof currentUser[type] === "string") {
        const value = currentUser[type];
        if (typeof value === "string") {
            return { type, title, value };
        }
    }
    return { type, title, value: "" };
}