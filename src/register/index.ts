import {useState} from "../assets/js/modules/state.js";
import {isEmpty} from "../assets/js/modules/helpers.js";
import {createFormObjectFromState, validateForm} from "../assets/js/modules/formValidator.js";
import {renderInterface, addClass, addEventListener, removeClass, setInnerText} from "../assets/js/modules/domHelpers.js";
import Register from "../assets/js/pages/Register/index.js";

const state: IState = {
    email: useState(""),
    login: useState(""),
    firstName: useState(""),
    lastName: useState(""),
    password: useState(""),
    passwordRepeat: useState(""),
    phone: useState("")
};

let view: IViewType = {};

document.addEventListener("DOMContentLoaded", initInterface);

function initInterface(): void {
    renderInterface(document.getElementById("root"), new Register());

    view = initView();

    addEventListener(view.emailInput, "input", (event) => setStatePropValue(event,  "email"));
    addEventListener(view.loginInput, "input", (event) => setStatePropValue(event, "login"));
    addEventListener(view.firstNameInput, "input", (event) => setStatePropValue(event, "firstName"));
    addEventListener(view.lastNameInput, "input", (event) => setStatePropValue(event, "lastName"));

    addEventListener(view.passwordInput, "input", (event) => setStatePropValue(event, "password"));
    addEventListener(view.passwordInput, "focus", validateNewPasswords);
    addEventListener(view.passwordInput, "blur", validateNewPasswords);

    addEventListener(view.passwordRepeatInput, "input", (event) => setStatePropValue(event, "passwordRepeat"));
    addEventListener(view.passwordRepeatInput, "focus", validateNewPasswords);
    addEventListener(view.passwordRepeatInput, "blur", validateNewPasswords);

    addEventListener(view.phoneInput, "input", (event) => setStatePropValue(event, "phone"))
    addEventListener(view.registerForm, "submit", submitRegisterForm);
}

function initView(): IViewType {
    return {
        registerForm: document.querySelector(".register-form"),

        emailInput: document.querySelector(".register-form__email-input"),
        loginInput: document.querySelector(".register-form__login-input"),
        firstNameInput: document.querySelector(".register-form__first-name-input"),
        lastNameInput: document.querySelector(".register-form__last-name-input"),
        passwordInput: document.querySelector(".register-form__password-input"),
        passwordRepeatInput: document.querySelector(".register-form__password-repeat-input"),
        phoneInput: document.querySelector(".register-form__phone-input"),

        emailError: document.querySelector(".register-form__email-error"),
        loginError: document.querySelector(".register-form__login-error"),
        firstNameError: document.querySelector(".register-form__first-name-error"),
        lastNameError: document.querySelector(".register-form__last-name-error"),
        passwordError: document.querySelector(".register-form__password-error"),
        passwordRepeatError: document.querySelector(".register-form__password-repeat-error"),
        phoneError: document.querySelector(".register-form__phone-error")
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
    const [getPassword] = state.password;
    const [getPasswordRepeat] = state.passwordRepeat;
    const password = getPassword();
    const passwordRepeat = getPasswordRepeat();

    if (isEmpty(password) || isEmpty(passwordRepeat)) {
        return false;
    }

    if (password !== passwordRepeat) {
        renderIncorrectPasswords();
        return false;
    }

    removeIncorrectPasswordsErrors();
    return true;
}
function renderIncorrectPasswords() {
    setInnerText(view.passwordError, "Passwords do not match")
    setInnerText(view.passwordRepeatError, "Passwords do not match")

    addClass(view.passwordInput, "form__input_error");
    addClass(view.passwordRepeatInput, "form__input_error");
}

function removeIncorrectPasswordsErrors() {
    setInnerText(view.passwordError, "")
    setInnerText(view.passwordRepeatError, "")

    removeClass(view.passwordInput, "form__input_error");
    removeClass(view.passwordRepeatInput, "form__input_error");
}

function submitRegisterForm(event: Event): void {
    event.preventDefault();
    let areFieldsValid = true;
    const formObj = createFormObjectFromState(state, []);

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

    if (formObj.password !== formObj.passwordRepeat) {
        areFieldsValid = false;
        renderIncorrectPasswords();
    } else {
        if (areFieldsValid) {
            removeIncorrectPasswordsErrors();
        }
    }

    if (areFieldsValid) {
        console.log("[INFO] All fields valid, new account form will be submitted later in this course", formObj);
    } else {
        console.error("[ERROR] [FORM] Invalid/missing registration data");
    }
}

export default {};