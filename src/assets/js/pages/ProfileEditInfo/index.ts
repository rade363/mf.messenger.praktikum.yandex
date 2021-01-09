import Block from "../../modules/Block/Block";
import BackButton from "../../components/BackButton/index";
import template from "./template";
import {compile} from "../../modules/templator/templator";
import Form from "../../components/Form/index";
import {getResponseErrorText} from "../../modules/helpers";
import {createInputField, setErrorTextForInputField} from "../../modules/formHelpers";
import {createAPIUrl} from "../../modules/domHelpers";
import Router from "../../modules/Router/Router";
import UserAPI from "../../api/user-api";
import AvatarAPI from "../../api/avatar-api";
import GlobalState from "../../modules/GlobalState";
import validateAuth from "../../controllers/authValidationController";
import {createExistingUser} from "../../controllers/profileController";

const router = new Router("#root");
const userAPI = new UserAPI();
const avatarAPI = new AvatarAPI();
const globalStateInstance = new GlobalState();

export default class ProfileEditInfo extends Block {
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
        validateAuth(globalStateInstance)
            .then((isAuthenticated) => {
                if (!isAuthenticated) {
                    throw new Error("Not authorized");
                }

                const currentUser = globalStateInstance.getProp("currentUser");
                const child = createProfileForm(currentUser);
                this.setProps({ child });
            })
            .catch((error: XMLHttpRequest | Error) => {
                console.error("[ERROR] Could not set profile edit info", error)
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

function createProfileForm(currentUser: IUser) {
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
        onSubmit: (formObject: IUpdateUserProps): void => {
            userAPI.editProfile(formObject)
                .then((xhr: XMLHttpRequest) => {
                    const userDetails = JSON.parse(xhr.response);
                    globalStateInstance.setProp("currentUser", userDetails);

                    updateProfilePageBlock(userDetails);

                    router.go("/profile/");
                })
                .catch((error: XMLHttpRequest) => {
                    console.error("[ERROR] User details have not been updated", JSON.parse(error.response));
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
    })
}

function createProfileFields(currentUser: IUser): TFormElement[] {
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

function createAvatarField(currentUser: IUser) {
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
                    src: createAPIUrl(userDetails.avatar)
                });
                updateProfilePageBlock(userDetails);
            }
        })
        .catch((error: XMLHttpRequest) => console.error("[ERROR] Avatar has not been updated", JSON.parse(error.response)));
}

function updateProfilePageBlock(userDetails: IUser): void {
    const profilePage = router.getRoute("/profile/");
    const profile = createExistingUser(userDetails);
    profilePage?._block?.setProps({profile});
}