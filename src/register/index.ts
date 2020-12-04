import {useState} from "../assets/js/modules/state.js";
import {isEmpty} from "../assets/js/modules/helpers.js";
import {addClass, removeClass, setInnerText} from "../assets/js/modules/domHelpers.js";

const state: State = {
    email: useState(""),
    login: useState(""),
    firstName: useState(""),
    lastName: useState(""),
    password: useState(""),
    passwordRepeat: useState(""),
    phone: useState("")
};

let view: ViewType = {};

document.addEventListener("DOMContentLoaded", initInterface);

function initInterface(): void {
    renderInterface();

    view = initView();

    if (view.emailInput) {
        view.emailInput.addEventListener("input", (event) => setStatePropValue(event,  "email"));
    }

    if (view.loginInput) {
        view.loginInput.addEventListener("input", (event) => setStatePropValue(event, "login"));
    }

    if (view.firstNameInput) {
        view.firstNameInput.addEventListener("input", (event) => setStatePropValue(event, "firstName"));
    }

    if (view.lastNameInput) {
        view.lastNameInput.addEventListener("input", (event) => setStatePropValue(event, "lastName"));
    }

    if (view.passwordInput) {
        view.passwordInput.addEventListener("input", (event) => {
            setStatePropValue(event, "password");
            validateNewPasswords();
        });
    }

    if (view.passwordRepeatInput) {
        view.passwordRepeatInput.addEventListener("input", (event) => {
            setStatePropValue(event, "passwordRepeat");
            validateNewPasswords();
        });
    }

    if (view.phoneInput) {
        view.phoneInput.addEventListener("input", (event) => setStatePropValue(event, "phone"));
    }

    if (view.registerForm) {
        view.registerForm.addEventListener("submit", submitProfileEditForm);
    }
}

function renderInterface(): void {
    const template = Handlebars.compile(getTemplate());
    Handlebars.registerHelper('if_eq', function(a, b, opts) {
        return a === b ? opts.fn(this) : opts.inverse(this);
    });
    const data: TemplateData = {
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

function initView(): ViewType {
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
        setInnerText(view.passwordError, "Passwords do not match")
        setInnerText(view.passwordRepeatError, "Passwords do not match")

        addClass(view.passwordInput, "form__input_error");
        addClass(view.passwordRepeatInput, "form__input_error");
        return false;
    }

    setInnerText(view.passwordError, "")
    setInnerText(view.passwordRepeatError, "")

    removeClass(view.passwordInput, "form__input_error");
    removeClass(view.passwordRepeatInput, "form__input_error");
    return true;
}

function submitProfileEditForm(event: Event): void {
    event.preventDefault();
    let areFieldsValid = true;
    const formObj: FormObject = {};

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
    } else {
        console.error("[ERROR] [FORM] Invalid/missing registration data");
    }
}

function getTemplate(): string {
    return `<main class="container register">
    <header class="top-header register__header">
        <div class="top-header__left">
            <a class="top-header__back back-button" href="{{backButton.url}}">
                <span class="back-button__arrow">‹</span>
                <span class="back-button__text">Back</span>
            </a>
        </div>
        <div class="top-header__center">
            <h1 class="top-header__title register__title">{{title}}</h1>
        </div>
        <div class="top-header__right"></div>
    </header>
    <form class="form {{form.name}}" method="POST">
        {{#each form.inputFields}}
            {{#if_eq type 'double'}}
            <div class="form__item double">
                {{#each items }}
                <div class="double__child form__item">
                    <label class="form__label" for="{{name}}">{{label}}</label>
                    <input class="form__input {{../../form.name}}__{{name}}-input" type="{{type}}" id="{{name}}" />
                    <span class="form__error {{../../form.name}}__{{name}}-error"></span>
                </div>
                {{/each}}
            </div>
            {{else}}
            <div class="form__item">
                <label class="form__label" for="{{name}}">{{label}}</label>
                <input class="form__input {{../form.name}}__{{name}}-input" type="{{type}}" id="{{name}}" />
                <span class="form__error {{../form.name}}__{{name}}-error"></span>
            </div>
            {{/if_eq}}
        {{/each}}
        <div class="form__item {{form.name}}__actions">
            <button class="{{form.name}}__{{form.submitButton.className}}" type="{{form.submitButton.type}}">{{form.submitButton.text}}</button>
        </div>
    </form>
</main>`;
}

export default {};