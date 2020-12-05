import { useState } from "../assets/js/modules/state.js";
import { isEmpty } from "../assets/js/modules/helpers.js";
import { renderInterface, addEventListener, addClass, removeClass, setInnerText } from "../assets/js/modules/domHelpers.js";
import profileEditInfoTemplate from "../assets/js/pages/profileEditInfo.js";
let state = {
    avatar: useState(null),
    email: useState(""),
    login: useState(""),
    firstName: useState(""),
    lastName: useState(""),
    displayName: useState(""),
    phone: useState("")
};
let view = {};
document.addEventListener("DOMContentLoaded", initInterface);
function initInterface() {
    renderInterface(document.getElementById("root"), profileEditInfoTemplate, getTemplateData());
    view = initView();
    addEventListener(view.avatarInput, "input", setAvatarUpload);
    addEventListener(view.emailInput, "input", (event) => setStatePropValue(event, "email"));
    addEventListener(view.loginInput, "input", (event) => setStatePropValue(event, "login"));
    addEventListener(view.firstNameInput, "input", (event) => setStatePropValue(event, "firstName"));
    addEventListener(view.lastNameInput, "input", (event) => setStatePropValue(event, "lastName"));
    addEventListener(view.displayNameInput, "input", (event) => setStatePropValue(event, "displayName"));
    addEventListener(view.phoneInput, "input", (event) => setStatePropValue(event, "phone"));
    addEventListener(view.profileForm, "submit", submitProfileEditForm);
}
function initView() {
    return {
        profileForm: document.querySelector(".profile-form"),
        avatarInput: document.querySelector(".profile-form__avatar-input"),
        emailInput: document.querySelector(".profile-form__email-input"),
        loginInput: document.querySelector(".profile-form__login-input"),
        firstNameInput: document.querySelector(".profile-form__first-name-input"),
        lastNameInput: document.querySelector(".profile-form__last-name-input"),
        displayNameInput: document.querySelector(".profile-form__display-name-input"),
        phoneInput: document.querySelector(".profile-form__phone-input"),
        avatarError: document.querySelector(".profile-form__avatar-error"),
        emailError: document.querySelector(".profile-form__email-error"),
        loginError: document.querySelector(".profile-form__login-error"),
        firstNameError: document.querySelector(".profile-form__first-name-error"),
        lastNameError: document.querySelector(".profile-form__last-name-error"),
        displayNameError: document.querySelector(".profile-form__display-name-error"),
        phoneError: document.querySelector(".profile-form__phone-error")
    };
}
function setStatePropValue(event, propName) {
    const element = event.target;
    const { value } = element;
    console.log(`[INFO] ${propName}`, value);
    const [, setStateCallback] = state[propName];
    setStateCallback(value);
    setInnerText(view[`${propName}Error`], "");
    removeClass(view[`${propName}Input`], "form__input_error");
}
function setAvatarUpload(event) {
    const element = event.target;
    const files = element.files;
    if (files && Array.isArray(files) && files.length > 0) {
        const newAvatar = files[0];
        console.log("[INFO] Avatar file", newAvatar);
        const [, setAvatar] = state.avatar;
        setAvatar(newAvatar);
    }
}
function submitProfileEditForm(event) {
    event.preventDefault();
    let areFieldsValid = true;
    const formObj = {};
    Object.entries(state).forEach(keyValuePair => {
        const [propName, propStateMethods] = keyValuePair;
        const [getPropValue] = propStateMethods;
        const propValue = getPropValue();
        formObj[propName] = propValue;
        if (propName === "avatar") {
            return null;
        }
        if (isEmpty(propValue)) {
            areFieldsValid = false;
            addClass(view[`${propName}Input`], "form__input_error");
            setInnerText(view[`${propName}Error`], "Cannot be empty");
        }
    });
    if (areFieldsValid) {
        console.log("[INFO] All fields valid, form will be submitted later in this course", formObj);
    }
    else {
        console.error("[ERROR] [FORM] Invalid form data");
    }
}
function getTemplateData() {
    return {
        title: "Profile",
        backButton: {
            url: "/chats/"
        },
        form: {
            name: "profile-form",
            avatarInput: {
                isEmpty: true,
                url: "userpic-empty.svg",
                name: "avatar",
            },
            inputFields: [
                {
                    label: "Email",
                    name: "email",
                    type: "email"
                },
                {
                    label: "Login",
                    name: "login",
                    type: "text"
                },
                {
                    label: "Name",
                    name: "name",
                    type: "double",
                    items: [
                        {
                            label: "First name",
                            name: "first-name",
                            type: "text"
                        },
                        {
                            label: "Last name",
                            name: "last-name",
                            type: "text"
                        },
                    ]
                },
                {
                    label: "Display name",
                    name: "display-name",
                    type: "text"
                },
                {
                    label: "Phone",
                    name: "phone",
                    type: "tel"
                }
            ],
            submitButton: {
                className: "save-button button button_thin button_primary double__child",
                text: "Save",
                type: "submit"
            },
            cancelLink: {
                className: "cancel-button button button_thin button_secondary double__child",
                text: "Cancel",
                url: "/profile/"
            }
        }
    };
}
export default {};
//# sourceMappingURL=index.js.map