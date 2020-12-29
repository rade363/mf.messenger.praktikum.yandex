import Block from "../../modules/Block.js";
import BackButton from "../../components/BackButton/index.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";
import Form from "../../components/Form/index.js";
import {getResponseErrorText} from "../../modules/helpers.js";

import Router from "../../modules/Router.js";
const router = new Router("#root");

import AuthAPI from "../../api/auth-api.js";
const authAPI = new AuthAPI();

import UserAPI from "../../api/user-api.js";
const userAPI = new UserAPI();

import GlobalState from "../../modules/GlobalState.js";
const globalStateInstance = new GlobalState();

export default class ProfileChangePassword extends Block {
    constructor() {
        const currentUser: ICurrentUser = globalStateInstance.getProp("currentUser");

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
                        router.back();
                    }]
                ]
            }),
            child: new Form({
                name: "password-form",
                inputFields: createProfileFields(currentUser),
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
                                    ["click", (event: Event) => {
                                        event.preventDefault();
                                        router.back();
                                    }]
                                ]
                            }
                        ]
                    }
                ],
                onSubmit: (formObject: IUpdatePasswordProps) => {
                    console.log('[INFO] Password change object', formObject);
                    userAPI.changePassword(formObject)
                        .then((xhr: XMLHttpRequest) => {
                            console.log('[INFO] Password changed', xhr.response);
                            if (xhr.response === "OK") {
                                router.go("/profile/");
                            }
                        })
                        .catch((error: XMLHttpRequest) => {
                            console.log('Error', error);
                            if (error.response === "Password is incorrect") {
                                setErrorText("oldPassword", error.response, this);
                            }
                        });
                }
            })
        });
    }

    componentDidMount() {
        console.log("[PROFILE] [Mounted] check state", globalStateInstance.check());
        const existingUser = globalStateInstance.getProp("currentUser");
        if (existingUser) {
            console.log('[PROFILE] [MOUNT] No need to collect user! Already collected', existingUser);
            return;
        }

        authAPI.getCurrentUser()
            .then((xhr: XMLHttpRequest) => {
                console.log('[PROFILE] [MOUNT] User', xhr.response);
                const currentUser = JSON.parse(xhr.response);
                globalStateInstance.setProp("currentUser", currentUser);
            })
            .catch((error: XMLHttpRequest) => {
                const errorObj = getResponseErrorText(error);
                console.error('[PROFILE] [MOUNT] [ERROR]', errorObj);
                router.go("/login/");
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

function createProfileFields(currentUser: ICurrentUser): TFormElement[] {
    const inputFields = [];

    inputFields.push(createInputField("oldPassword", "Old password", "password", currentUser));
    inputFields.push(createInputField("newPassword", "New password", "password", currentUser, "newPassword-repeat"));
    inputFields.push(createInputField("newPassword-repeat", "Repeat new password", "password", currentUser, "newPassword"));

    return inputFields;
}

function createInputField(name: string, label: string, type: string, currentUser: ICurrentUser, mustEqual?: string): IInputFieldProps {
    const initialField = { name, label, type };
    const inputField = mustEqual ? { ...initialField, mustEqual } : initialField;

    if (currentUser && name in currentUser && typeof currentUser[name] === "string") {
        const value = currentUser[name];
        if (typeof value === "string") {
            return {...inputField, value};
        }
    }

    return inputField;
}

function setErrorText(fieldName: string, errorText: string, formBlock: IBlock): void {
    formBlock.props.child.props.inputFields.forEach((formInput: any) => {
        const inputField = formInput.inputField;
        if (inputField.props.name === fieldName) {
            const prevProps = formInput.inputField.props.errorMessage.props;
            formInput.inputField.props.errorMessage.setProps({
                ...prevProps,
                text: errorText
            });
        }
    });
}