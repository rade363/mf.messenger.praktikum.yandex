import { useState } from "../assets/js/modules/state.js";
import { isEmpty } from "../assets/js/modules/helpers.js";
import { renderInterface, addEventListener, addClass, removeClass, setInnerText } from "../assets/js/modules/domHelpers.js";
import loginTemplate from "../assets/js/pages/login.js";
let state = {
    login: useState(""),
    password: useState("")
};
let view = {};
document.addEventListener("DOMContentLoaded", initInterface);
function initInterface() {
    renderInterface(document.getElementById("root"), loginTemplate, getTemplateData());
    view = initView();
    addEventListener(view.loginInput, "input", (event) => setStatePropValue(event, "login"));
    addEventListener(view.passwordInput, "input", (event) => setStatePropValue(event, "password"));
    addEventListener(view.loginForm, "submit", submitAuthForm);
}
function initView() {
    return {
        loginForm: document.querySelector(".login-form"),
        loginInput: document.querySelector(".login-form__username-input"),
        passwordInput: document.querySelector(".login-form__password-input"),
        loginError: document.querySelector(".login-form__username-error"),
        passwordError: document.querySelector(".login-form__password-error"),
        loginButton: document.querySelector(".login-form__login-button")
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
function submitAuthForm(event) {
    event.preventDefault();
    let areFieldsValid = true;
    let formObj = {};
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
    if (areFieldsValid) {
        console.log("[INFO] Auth fields valid, form will be submitted later in this course", formObj);
    }
    else {
        console.error("[ERROR] [FORM] Invalid credentials");
    }
}
function getTemplateData() {
    return {
        title: "messenger",
        form: {
            name: "login-form",
            inputFields: [
                {
                    label: "Login",
                    id: "username",
                    type: "text"
                },
                {
                    label: "Password",
                    id: "password",
                    type: "password"
                }
            ],
            submitButton: {
                className: "login-button button button_wide button_primary",
                text: "Sign in",
                type: "submit"
            },
            signUpLink: {
                className: "register-button button button_wide button_secondary",
                text: "Sign up",
                url: "/register/"
            }
        }
    };
}
export default {};
//# sourceMappingURL=index.js.map