import Block from "../../modules/Block/Block";
import BackButton from "../../components/BackButton/index";
import template from "./template";
import compile from "../../modules/templator/templator";
import Form from "../../components/Form/index";
import { createInputField, setErrorTextForInputField } from "../../modules/formHelpers";
import Router from "../../modules/Router/Router";
import UserAPI from "../../api/user-api";
import validateAuth from "../../controllers/authValidationController";
import globalStateInstance from "../../modules/GlobalState/globalStateInstance";

const router = new Router("#root");
const userAPI = new UserAPI();

function createProfilePasswordChangeFields(currentUser: IUser): TFormElement[] {
    const inputFields = [];

    inputFields.push(createInputField("oldPassword", "Old password", "password", currentUser));
    inputFields.push(createInputField("newPassword", "New password", "password", currentUser, "newPassword-repeat"));
    inputFields.push(createInputField("newPassword-repeat", "Repeat new password", "password", currentUser, "newPassword"));

    return inputFields;
}

export default class ProfileChangePassword extends Block {
    constructor() {
        const currentUser: IUser = globalStateInstance.getProp("currentUser");

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
                            router.back();
                        }
                    ]
                ]
            }),
            child: new Form({
                name: "password-form",
                inputFields: createProfilePasswordChangeFields(currentUser),
                actions: [
                    {
                        type: "double",
                        attributes: {
                            class: ""
                        },
                        children: [
                            {
                                text: "Save",
                                attributes: {
                                    type: "submit",
                                    class: "password-form__save-button button button_wide button_primary"
                                }
                            },
                            {
                                text: "Cancel",
                                attributes: {
                                    href: "/profile/",
                                    class: "profile-form__cancel-button button button_wide button_secondary"
                                },
                                eventListeners: [
                                    [
                                        "click",
                                        (event: Event) => {
                                            event.preventDefault();
                                            router.back();
                                        }
                                    ]
                                ]
                            }
                        ]
                    }
                ],
                onSubmit: (formObject: IUpdatePasswordProps): void => {
                    userAPI
                        .changePassword(formObject)
                        .then((xhr: XMLHttpRequest) => {
                            if (xhr.response === "OK") {
                                router.go("/profile/");
                                router.refresh("/profile-change-password/");
                            }
                        })
                        .catch((error: XMLHttpRequest) => {
                            console.error("[ERROR] Password was not changed", error);
                            if (error.response === "Password is incorrect") {
                                setErrorTextForInputField("oldPassword", error.response, this.props.child.props.inputFields);
                            }
                        });
                }
            })
        });
    }

    componentDidMount(): void {
        validateAuth(globalStateInstance)
            .then((isAuthenticated) => {
                if (!isAuthenticated) {
                    throw new Error("Not authorized");
                }
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
        return compile(template, {
            title: this.props.title,
            backButton: this.props.backButton,
            child: this.props.child
        });
    }
}
