import Block from "../../modules/Block.js";
import BackButton from "../../components/BackButton/index.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";
import Form from "../../components/Form/index.js";
import {getResponseErrorText} from "../../modules/helpers.js";
import {createInputField, setErrorTextForInputField} from "../../modules/formHelpers.js";

import Router from "../../modules/Router.js";
import AuthAPI from "../../api/auth-api.js";
import UserAPI from "../../api/user-api.js";
import AvatarAPI from "../../api/avatar-api.js";
import GlobalState from "../../modules/GlobalState.js";

const router = new Router("#root");
const authAPI = new AuthAPI();
const userAPI = new UserAPI();
const avatarAPI = new AvatarAPI();
const globalStateInstance = new GlobalState();

export default class ProfileEditInfo extends Block {
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
            child: createProfileForm(currentUser)
        });
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
        onSubmit: handleEditProfileSubmit
    })
}

function handleEditProfileSubmit(formObject: IUpdateUserProps): void {
    userAPI.editProfile(formObject)
        .then((xhr: XMLHttpRequest) => {
            const userDetails = JSON.parse(xhr.response);
            globalStateInstance.setProp("currentUser", userDetails);
            router.go("/profile/");
        })
        .catch((error: XMLHttpRequest) => {
            console.log('Error', error);
            const errorMessage = getResponseErrorText(error);
            if (errorMessage === "Login already exists") {
                setErrorTextForInputField("login", errorMessage, this.props.child.props.inputFields);
            } else if (errorMessage === "phone is not valid") {
                setErrorTextForInputField("phone", errorMessage, this.props.child.props.inputFields);
            } else if (errorMessage === "Email already exists") {
                setErrorTextForInputField("email", errorMessage, this.props.child.props.inputFields);
            }
        });
}

function createProfileFields(currentUser: ICurrentUser): TFormElement[] {
    const inputFields = [];

    inputFields.push(createAvatarField(currentUser));
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

function createAvatarField(currentUser: ICurrentUser) {
    const avatarSource = currentUser && currentUser.avatar && currentUser.avatar !== "" ? currentUser.avatar : "";
    return {
        type: "file",
        attributes: {
            class: "profile__picture"
        },
        name: "profile-pic",
        src: avatarSource,
        label: "Edit",
        callback: handleAvatarSubmit
    };
}

function handleAvatarSubmit(avatar: File, imageInput: IBlock) {
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