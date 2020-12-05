import {useState} from "../assets/js/modules/state.js";
import {isEmpty} from "../assets/js/modules/helpers.js";
import {addClass, removeClass, setInnerText} from "../assets/js/modules/domHelpers.js";
import loginTemplate from "../assets/js/pages/login.js";

let state: IState = {
    login: useState(""),
    password: useState("")
};
let view: IViewType = {};

document.addEventListener("DOMContentLoaded", initInterface);

function initInterface(): void {
    renderInterface();

    view = initView();

    if (view.loginInput) {
        view.loginInput.addEventListener("input", (event) => setStatePropValue(event, "login"));
    }
    if (view.passwordInput) {
        view.passwordInput.addEventListener("input", (event) => setStatePropValue(event, "password"));
    }
    if (view.loginForm) {
        view.loginForm.addEventListener("submit", submitAuthForm);
    }
}

function renderInterface(): void {
    const template = Handlebars.compile(loginTemplate);
    const data: ITemplateData = {
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
    const root = document.getElementById("root");
    if (root) {
        root.innerHTML = template(data);
    }
}

function initView(): IViewType {
    return {
        loginForm: document.querySelector(".login-form"),

        loginInput: document.querySelector(".login-form__username-input"),
        passwordInput: document.querySelector(".login-form__password-input"),

        loginError: document.querySelector(".login-form__username-error"),
        passwordError: document.querySelector(".login-form__password-error"),

        loginButton: document.querySelector(".login-form__login-button")
    }
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

function submitAuthForm(event: Event): void {
    event.preventDefault();
    let areFieldsValid = true;
    let formObj: IFormObject = {};

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
    } else {
        console.error("[ERROR] [FORM] Invalid credentials");
    }
}

export default {};