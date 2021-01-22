import Block from "../../modules/Block/Block";
import BackButton from "../../components/BackButton/index";
import Button from "../../components/Button/index";
import template from "./template.handlebars";
import compile from "../../modules/templator/templator";
import Router from "../../modules/Router/Router";
import AuthAPI from "../../api/auth-api";
import validateAuth from "../../controllers/authValidationController";
import createExistingUser from "../../controllers/profileController";
import globalStateInstance from "../../modules/GlobalState/globalStateInstance";
import initInterface from "../../controllers/initInterfaceController";
import ChatsController from "../../modules/ChatsController/ChatsController";

const router = new Router("#root");

function handleLogOutClick(event: Event): void {
    event.preventDefault();

    const authAPI = new AuthAPI();
    const controller = new ChatsController();

    authAPI
        .logOut()
        .then((response: TOkResponse) => {
            if (response === "OK") {
                globalStateInstance.reset();

                controller.reset();

                router._currentRoute?.leave();
                router.reset();
                initInterface();

                router.go("/login/");
            }
        })
        .catch((error: XMLHttpRequest) => {
            console.error("[ERROR] Could not log out", JSON.parse(error.response));
            if (error.status === 500) {
                router.go("/500");
            }
        });
}

export default class Profile extends Block {
    constructor() {
        const currentUser: IUser = globalStateInstance.getProp("currentUser");
        const profile = createExistingUser(currentUser);

        super("div", {
            attributes: {
                class: "wrapper wrapper_background_profile"
            },
            title: "Profile",
            backButton: new BackButton({
                url: "/chats/",
                eventListeners: [
                    [
                        "click",
                        (event: Event) => {
                            event.preventDefault();
                            router.go("/chats/");
                        }
                    ]
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
                    [
                        "click",
                        (event: Event) => {
                            event.preventDefault();
                            router.go("/profile-edit-info/");
                        }
                    ]
                ]
            }),
            changePasswordLink: new Button("a", {
                attributes: {
                    class: "profile__change-password-button button button_thin button_secondary double__child",
                    href: "/profile-change-password/"
                },
                text: "Change password",
                eventListeners: [
                    [
                        "click",
                        (event: Event) => {
                            event.preventDefault();
                            router.go("/profile-change-password/");
                        }
                    ]
                ]
            }),
            logOutButton: new Button("button", {
                attributes: {
                    class: "profile__log-out-button button button_wide button_logout",
                    type: "button"
                },
                text: "Log out",
                eventListeners: [["click", handleLogOutClick]]
            })
        });
    }

    componentDidMount(): void {
        validateAuth(globalStateInstance)
            .then((isAuthenticated) => {
                if (!isAuthenticated) {
                    throw new Error("Not authorized");
                }
                const currentUser = globalStateInstance.getProp("currentUser");
                const profile = createExistingUser(currentUser);
                this.setProps({ profile });
            })
            .catch((error: XMLHttpRequest | Error) => {
                console.error("[ERROR] Could not set profile edit info", error);
                if (error instanceof Error) {
                    if (error.message === "Not authorized") {
                        router.go("/login/");
                    }
                }
            });
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}
