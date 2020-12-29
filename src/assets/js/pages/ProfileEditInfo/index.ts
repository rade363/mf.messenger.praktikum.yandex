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

import AvatarAPI from "../../api/avatar-api.js";
const avatarAPI = new AvatarAPI();

import GlobalState from "../../modules/GlobalState.js";
const globalStateInstance = new GlobalState();

export default class ProfileEditInfo extends Block {
    constructor() {
        const currentUser: ICurrentUser = globalStateInstance.getProp("currentUser");
        const child = createProfileForm(currentUser);

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
            child
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
                const child = createProfileForm(currentUser);
                this.setProps({ child });
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

function createProfileForm(currentUser: ICurrentUser) {
    return new Form({
        name: "profile-form",
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
                            class: "profile-form__save-button button button_wide button_primary"
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
        onSubmit: (formObject: IUpdateUserProps) => {
            userAPI.editProfile(formObject)
                .then((xhr: XMLHttpRequest) => {
                    console.log('[INFO] User', xhr.response);
                    const userDetails = JSON.parse(xhr.response);
                    globalStateInstance.setProp("currentUser", userDetails);

                    console.log('[OnSubmit] check state', globalStateInstance.check());
                    router.go("/profile/");
                })
                .catch((error: XMLHttpRequest) => {
                    console.log('Error', error);
                    const errorMessage = getResponseErrorText(error);
                    if (errorMessage === "Login already exists") {
                        setErrorText("login", errorMessage, this);
                    } else if (errorMessage === "phone is not valid") {
                        setErrorText("phone", errorMessage, this);
                    } else if (errorMessage === "Email already exists") {
                        setErrorText("email", errorMessage, this);
                    }
                });
        }
    })
}

function createProfileFields(currentUser: ICurrentUser): TFormElement[] {
    const inputFields = [];

    const avatarSource = currentUser && currentUser.avatar && currentUser.avatar !== "" ? currentUser.avatar : "";
    const avatarField = {
        type: "file",
        attributes: {
            class: "profile__picture"
        },
        name: "profile-pic",
        src: avatarSource,
        label: "Edit",
        callback: (avatar: File, imageInput: IBlock) => {
            const formData = new FormData();
            formData.append("avatar", avatar);

            avatarAPI.changeAvatar(formData)
                .then((xhr: XMLHttpRequest) => {
                    if (xhr.status === 200) {
                        const userDetails = JSON.parse(xhr.response);
                        globalStateInstance.setProp("currentUser", userDetails);

                        const prevProps = imageInput.props;
                        imageInput.setProps({
                            ...prevProps,
                            src: `https://ya-praktikum.tech${userDetails.avatar}`
                        })
                    }
                })
                .catch((error: XMLHttpRequest) => {
                    console.log('[AVATAR] ERROR', error);
                });
        }
    };
    inputFields.push(avatarField);

    inputFields.push(createInputField("email", "Email", "email", currentUser));
    inputFields.push(createInputField("login", "Login", "text", currentUser));
    inputFields.push({
        type: "double",
        attributes: {
            class: "form__item"
        },
        children: [
            createInputField("first_name", "First name", "text", currentUser),
            createInputField("second_name", "Last name", "text", currentUser),
        ]
    });
    inputFields.push(createInputField("display_name", "Display name", "text", currentUser));
    inputFields.push(createInputField("phone", "Phone", "tel", currentUser));

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