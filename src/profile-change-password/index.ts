import {useState} from "../assets/js/modules/state.js";
import {isEmpty} from "../assets/js/modules/helpers.js";
import {addClass, removeClass, setInnerText} from "../assets/js/modules/domHelpers.js";
import profileChangePasswordTemplate from "../assets/js/pages/profileChangePassword.js";

let state: IState = {
    oldPassword: useState(""),
    newPassword: useState(""),
    repeatNewPassword: useState("")
};
let view: IViewType = {};

document.addEventListener("DOMContentLoaded", initInterface);

function initInterface(): void {
    renderInterface();

    view = initView();

    if (view.oldPasswordInput) {
        view.oldPasswordInput.addEventListener("input", (event) => setStatePropValue(event, "oldPassword"));
    }
    if (view.newPasswordInput) {
        view.newPasswordInput.addEventListener("input", (event) => {
            setStatePropValue(event, "newPassword");
            validateNewPasswords();
        });
    }
    if (view.repeatNewPasswordInput) {
        view.repeatNewPasswordInput.addEventListener("input", (event) => {
            setStatePropValue(event, "repeatNewPassword");
            validateNewPasswords();
        });
    }
    if (view.passwordForm) {
        view.passwordForm.addEventListener("submit", submitPasswordChange);
    }
}

function renderInterface(): void {
    const template = Handlebars.compile(profileChangePasswordTemplate);
    Handlebars.registerHelper('if_eq', function (a, b, opts) {
        return a === b ? opts.fn(this) : opts.inverse(this);
    });
    const data: ITemplateData = {
        title: "Profile",
        backButton: {
            url: "/chats/"
        },
        form: {
            name: "password-form",
            inputFields: [
                {
                    label: "Old password",
                    name: "old-password",
                    type: "password"
                },
                {
                    label: "New password",
                    name: "new-password",
                    type: "password"
                },
                {
                    label: "Repeat new password",
                    name: "password-repeat",
                    type: "password"
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
    const root = document.getElementById("root");
    if (root) {
        root.innerHTML = template(data);
    }
}

function initView(): IViewType {
    return {
        passwordForm: document.querySelector(".password-form"),

        oldPasswordInput: document.querySelector(".password-form__old-password-input"),
        newPasswordInput: document.querySelector(".password-form__new-password-input"),
        repeatNewPasswordInput: document.querySelector(".password-form__password-repeat-input"),

        oldPasswordError: document.querySelector(".password-form__old-password-error"),
        newPasswordError: document.querySelector(".password-form__new-password-error"),
        repeatNewPasswordError: document.querySelector(".password-form__password-repeat-error")
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

function validateNewPasswords(): Boolean {
    const [getNewPassword] = state.newPassword;
    const [getRepeatNewPassword] = state.repeatNewPassword;
    const newPassword = getNewPassword();
    const repeatNewPassword = getRepeatNewPassword();

    if (isEmpty(newPassword) || isEmpty(repeatNewPassword)) {
        return false;
    }

    if (newPassword !== repeatNewPassword) {
        setInnerText(view.newPasswordError, "Passwords do not match")
        setInnerText(view.repeatNewPasswordError, "Passwords do not match")

        addClass(view.newPasswordInput, "form__input_error");
        addClass(view.repeatNewPasswordInput, "form__input_error");
        return false;
    }

    setInnerText(view.newPasswordError, "")
    setInnerText(view.repeatNewPasswordError, "")

    removeClass(view.newPasswordInput, "form__input_error");
    removeClass(view.repeatNewPasswordInput, "form__input_error");
    return true;
}

function submitPasswordChange(event: Event): void {
    event.preventDefault();
    let areFieldsValid = true;
    const formObj: IFormObject = {};

    Object.entries(state).forEach(keyValuePair => {
        const [propName, propStateMethods] = keyValuePair;
        const [getPropValue] = propStateMethods;
        const propValue = getPropValue();

        formObj[propName] = propValue;

        if (isEmpty(propValue)) {
            areFieldsValid = false;
            addClass(view[`${propName}Input`], "form__input_error");
            setInnerText(view[`${propName}Error`], "Cannot be empty");
        }
    });

    if (formObj.newPassword !== formObj.repeatNewPassword) {
        areFieldsValid = false;
    }

    if (areFieldsValid) {
        console.log("[INFO] Password change form submitted (to be fixed later in course)", formObj);
    } else {
        console.error("[ERROR] [FORM] Invalid passwords");
    }
}

export default {};