import {useState} from "../assets/js/modules/state.js";
import {isEmpty} from "../assets/js/modules/helpers.js";
import {addClass, removeClass, setInnerText} from "../assets/js/modules/domHelpers.js";

let state: State = {
    login: useState(""),
    password: useState("")
};
let view: ViewType = {};

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
    const template = Handlebars.compile(getTemplate());
    const data: TemplateData = {
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

function initView(): ViewType {
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
    let formObj: FormObject = {};

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

function getTemplate(): string {
    return `<main class="container login">
        <header class="top-header login__header">
            <div class="top-header__left"></div>
            <div class="top-header__center">
                <h1 class="top-header__title login__title">{{title}}</h1>
            </div>
            <div class="top-header__right"></div>
        </header>
        <form class="form {{form.name}}" method="POST">
            {{#each form.inputFields}}
            <div class="form__item">
                <label class="form__label" for="{{id}}">{{label}}</label>
                <input class="form__input {{../form.name}}__{{id}}-input" type="{{type}}" id="{{id}}" />
                <span class="form__error {{../form.name}}__{{id}}-error"></span>
            </div>
            {{/each}}
            <div class="form__item {{form.name}}__actions">
                <button class="{{form.name}}__{{form.submitButton.className}}" type="{{form.submitButton.type}}">{{form.submitButton.text}}</button>
                <span class="{{form.name}}__alternative">or</span>
                <a class="{{form.name}}__{{form.signUpLink.className}}" href="{{form.signUpLink.url}}">{{form.signUpLink.text}}</a>
            </div>
        </form>
    </main>`;
}

export default {};