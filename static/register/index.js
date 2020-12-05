import { useState } from "../assets/js/modules/state.js";
import { isEmpty } from "../assets/js/modules/helpers.js";
import { addClass, initEventListener, removeClass, setInnerText } from "../assets/js/modules/domHelpers.js";
import registerTemplate from "../assets/js/pages/register.js";
const state = {
    email: useState(""),
    login: useState(""),
    firstName: useState(""),
    lastName: useState(""),
    password: useState(""),
    passwordRepeat: useState(""),
    phone: useState("")
};
let view = {};
document.addEventListener("DOMContentLoaded", initInterface);
function initInterface() {
    renderInterface();
    view = initView();
    initEventListener(view.emailInput, "input", (event) => setStatePropValue(event, "email"));
    initEventListener(view.loginInput, "input", (event) => setStatePropValue(event, "login"));
    initEventListener(view.firstNameInput, "input", (event) => setStatePropValue(event, "firstName"));
    initEventListener(view.lastNameInput, "input", (event) => setStatePropValue(event, "lastName"));
    initEventListener(view.passwordInput, "input", (event) => {
        setStatePropValue(event, "password");
        validateNewPasswords();
    });
    initEventListener(view.passwordRepeatInput, "input", (event) => {
        setStatePropValue(event, "passwordRepeat");
        validateNewPasswords();
    });
    initEventListener(view.phoneInput, "input", (event) => setStatePropValue(event, "phone"));
    initEventListener(view.registerForm, "submit", submitProfileEditForm);
}
function renderInterface() {
    const template = Handlebars.compile(registerTemplate);
    Handlebars.registerHelper('if_eq', function (a, b, opts) {
        return a === b ? opts.fn(this) : opts.inverse(this);
    });
    const data = {
        title: "messenger",
        backButton: {
            url: "/login/"
        },
        form: {
            name: "register-form",
            inputFields: [
                {
                    label: "Email",
                    name: "email",
                    type: "email"
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
                    label: "Login",
                    name: "login",
                    type: "text"
                },
                {
                    label: "Phone",
                    name: "phone",
                    type: "tel"
                },
                {
                    label: "Password",
                    name: "password",
                    type: "password"
                },
                {
                    label: "Repeat password",
                    name: "password-repeat",
                    type: "password"
                }
            ],
            submitButton: {
                className: "submit-button button button_wide button_primary",
                text: "Sign up",
                type: "submit"
            }
        }
    };
    const root = document.getElementById("root");
    if (root) {
        root.innerHTML = template(data);
    }
}
function initView() {
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
function setStatePropValue(event, propName) {
    const element = event.target;
    const { value } = element;
    console.log(`[INFO] ${propName}`, value);
    const [, setStateCallback] = state[propName];
    setStateCallback(value);
    setInnerText(view[`${propName}Error`], "");
    removeClass(view[`${propName}Input`], "form__input_error");
}
function validateNewPasswords() {
    const [getPassword] = state.password;
    const [getPasswordRepeat] = state.passwordRepeat;
    const password = getPassword();
    const passwordRepeat = getPasswordRepeat();
    if (isEmpty(password) || isEmpty(passwordRepeat)) {
        return false;
    }
    if (password !== passwordRepeat) {
        setInnerText(view.passwordError, "Passwords do not match");
        setInnerText(view.passwordRepeatError, "Passwords do not match");
        addClass(view.passwordInput, "form__input_error");
        addClass(view.passwordRepeatInput, "form__input_error");
        return false;
    }
    setInnerText(view.passwordError, "");
    setInnerText(view.passwordRepeatError, "");
    removeClass(view.passwordInput, "form__input_error");
    removeClass(view.passwordRepeatInput, "form__input_error");
    return true;
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
        if (isEmpty(propValue)) {
            areFieldsValid = false;
            addClass(view[`${propName}Input`], "form__input_error");
            setInnerText(view[`${propName}Error`], "Cannot be empty");
        }
    });
    if (formObj.password !== formObj.passwordRepeat) {
        areFieldsValid = false;
    }
    if (areFieldsValid) {
        console.log("[INFO] All fields valid, new account form will be submitted later in this course", formObj);
    }
    else {
        console.error("[ERROR] [FORM] Invalid/missing registration data");
    }
}
export default {};
//# sourceMappingURL=index.js.map