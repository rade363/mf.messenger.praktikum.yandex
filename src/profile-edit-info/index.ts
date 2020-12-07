import {useState} from "../assets/js/modules/state.js";
import {renderInterface, addEventListener, addClass, removeClass, setInnerText} from "../assets/js/modules/domHelpers.js";
import ProfileEditInfo from "../assets/js/pages/ProfileEditInfo/index.js";
import {createFormObjectFromState, validateForm} from "../assets/js/modules/formValidator.js";

let state: IState = {
    avatar: useState(null),
    email: useState(""),
    login: useState(""),
    firstName: useState(""),
    lastName: useState(""),
    displayName: useState(""),
    phone: useState("")
};
let view: IViewType = {};

document.addEventListener("DOMContentLoaded", initInterface);

function initInterface(): void {
    renderInterface(document.getElementById("root"), new ProfileEditInfo());

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

function initView(): IViewType {
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

function setStatePropValue(event: Event, propName: string): void {
    const element = event.target as HTMLInputElement;
    const {value} = element;
    console.log(`[INFO] ${propName}`, value);

    const [, setStateCallback] = state[propName];
    setStateCallback(value);

    setInnerText(view[`${propName}Error`], "");
    removeClass(view[`${propName}Input`], "form__input_error");
}

function setAvatarUpload(event: Event): void {
    const element = event.target as HTMLInputElement;
    const files = element.files;
    if (files !== null && files.length !== undefined) {
        const newAvatar = files[0];
        console.log("[INFO] Avatar file", newAvatar);

        const [, setAvatar] = state.avatar;
        setAvatar(newAvatar);
    }
}

function submitProfileEditForm(event: Event): void {
    event.preventDefault();
    let areFieldsValid = true;
    const formObj = createFormObjectFromState(state, ["avatar"]);

    validateForm(formObj, (key: string, value: unknown, errorMessage: string) => {
        areFieldsValid = false;
        addClass(view[`${key}Input`], "form__input_error");
        setInnerText(view[`${key}Error`], errorMessage);
        console.error(`[ERROR] Invalid form property ${key} value`, {
            key,
            value,
            message: errorMessage
        })
    });

    if (areFieldsValid) {
        console.log("[INFO] All fields valid, form will be submitted later in this course", formObj);
    } else {
        console.error("[ERROR] [FORM] Invalid form data");
    }
}

export default {};