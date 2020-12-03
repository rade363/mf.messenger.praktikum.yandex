import {useState} from "../assets/js/modules/state.js";
import {isEmpty} from "../assets/js/modules/helpers.js";
import {addClass, removeClass} from "../assets/js/modules/domHelpers.js";

let state = {
    oldPassword: useState(""),
    newPassword: useState(""),
    repeatNewPassword: useState("")
};
let view = {};

document.addEventListener("DOMContentLoaded", initInterface);

function initInterface() {
    renderInterface();

    view = initView();

    view.oldPasswordInput.addEventListener("input", (event) => setStatePropValue(event, "oldPassword"));
    view.newPasswordInput.addEventListener("input", (event) => {
        setStatePropValue(event, "newPassword");
        validateNewPasswords();
    });
    view.repeatNewPasswordInput.addEventListener("input", (event) => {
        setStatePropValue(event, "repeatNewPassword");
        validateNewPasswords();
    });

    view.passwordForm.addEventListener("submit", submitPasswordChange);
}

function renderInterface() {
    const template = Handlebars.compile(getTemplate());
    Handlebars.registerHelper('if_eq', function (a, b, opts) {
        return a === b ? opts.fn(this) : opts.inverse(this);
    });
    const data = {
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
    document.getElementById("root").innerHTML = template(data);
}

function initView() {
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

function setStatePropValue(event, propName) {
    const {value} = event.target;
    console.log(`[INFO] ${propName}`, value);

    const [, setStateCallback] = state[propName];
    setStateCallback(value);

    if (view[`${propName}Error`]) {
        view[`${propName}Error`].innerText = "";
        removeClass(view[`${propName}Input`], "form__input_error");
    }
}

function validateNewPasswords() {
    const [getNewPassword] = state.newPassword;
    const [getRepeatNewPassword] = state.repeatNewPassword;
    const newPassword = getNewPassword();
    const repeatNewPassword = getRepeatNewPassword();

    if (isEmpty(newPassword) || isEmpty(repeatNewPassword)) {
        return false;
    }

    if (newPassword !== repeatNewPassword) {
        view.newPasswordError.innerText = "Passwords do not match";
        view.repeatNewPasswordError.innerText = "Passwords do not match";

        addClass(view.newPasswordInput, "form__input_error");
        addClass(view.repeatNewPasswordInput, "form__input_error");
        return false;
    }

    view.newPasswordError.innerText = "";
    view.repeatNewPasswordError.innerText = "";

    removeClass(view.newPasswordInput, "form__input_error");
    removeClass(view.repeatNewPasswordInput, "form__input_error");
}

function submitPasswordChange(event) {
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
            view[`${propName}Error`].innerText = "Cannot be empty";
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

function getTemplate() {
    return `<div class="profile">
    <header class="top-header profile__header">
        <div class="top-header__left">
            <a class="top-header__back back-button" href="{{backButton.url}}">
                <span class="back-button__arrow">‹</span>
                <span class="back-button__text">Back</span>
            </a>
        </div>
        <div class="top-header__center">
            <h1 class="top-header__title profile__title">{{title}}</h1>
        </div>
        <div class="top-header__right"></div>
    </header>
    <main class="container profile__password-edit">
        <form class="form password-form" method="POST">
            {{#each form.inputFields}}
            <div class="form__item">
                <label class="form__label" for="{{name}}">{{label}}</label>
                <input class="form__input {{../form.name}}__{{name}}-input" type="{{type}}" id="{{name}}" />
                <span class="form__error {{../form.name}}__{{name}}-error"></span>
            </div>
            {{/each}}
            <div class="form__item {{form.name}}__actions double">
                <button class="{{form.name}}__{{form.submitButton.className}}" type="{{form.submitButton.type}}">{{form.submitButton.text}}</button>
                <a class="{{form.name}}__{{form.cancelLink.className}}" href="{{form.cancelLink.url}}">{{form.cancelLink.text}}</a>
            </div>
        </form>
    </main>
</div>`;
}