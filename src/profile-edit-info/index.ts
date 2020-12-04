import {useState} from "../assets/js/modules/state.js";
import {isEmpty} from "../assets/js/modules/helpers.js";
import {addClass, removeClass, setInnerText} from "../assets/js/modules/domHelpers.js";

let state: State = {
    avatar: useState(null),
    email: useState(""),
    login: useState(""),
    firstName: useState(""),
    lastName: useState(""),
    displayName: useState(""),
    phone: useState("")
};
let view: ViewType = {};

document.addEventListener("DOMContentLoaded", initInterface);

function initInterface(): void {
    renderInterface();

    view = initView();

    if (view.avatarInput) {
        view.avatarInput.addEventListener("input", setAvatarUpload);
    }
    if (view.emailInput) {
        view.emailInput.addEventListener("input", (event) => setStatePropValue(event, "email"));
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
    if (view.displayNameInput) {
        view.displayNameInput.addEventListener("input", (event) => setStatePropValue(event, "displayName"));
    }
    if (view.phoneInput) {
        view.phoneInput.addEventListener("input", (event) => setStatePropValue(event, "phone"));
    }

    if (view.profileForm) {
        view.profileForm.addEventListener("submit", submitProfileEditForm);
    }
}

function renderInterface(): void {
    const template = Handlebars.compile(getTemplate());
    Handlebars.registerHelper('if_eq', function(a, b, opts) {
        return a === b ? opts.fn(this) : opts.inverse(this);
    });
    const data: TemplateData = {
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
    const root = document.getElementById("root");
    if (root) {
        root.innerHTML = template(data);
    }
}

function initView(): ViewType {
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
    if (files && Array.isArray(files) && files.length > 0) {
        const newAvatar = files[0];
        console.log("[INFO] Avatar file", newAvatar);

        const [, setAvatar] = state.avatar;
        setAvatar(newAvatar);
    }
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
    } else {
        console.error("[ERROR] [FORM] Invalid form data");
    }
}

function getTemplate(): string {
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
    <main class="container profile__edit">
        <form class="form {{form.name}}" method="POST">
            <div class="profile__picture profile-pic {{#if form.avatarInput.isEmpty}}profile__picture_empty{{/if}}">
                <img class="profile-pic__image" src="../assets/img/{{form.avatarInput.url}}" alt="{{form.avatarInput.name}}" />
                <div class="profile-pic__edit">
                    <span class="profile-pic__label">Edit</span>
                    <input class="profile-pic__input {{form.name}}__{{form.avatarInput.name}}-input" type="file" name="{{form.avatarInput.name}}" />
                </div>
            </div>
            {{#each form.inputFields}}
                {{#if_eq type 'double'}}
                <div class="form__item double">
                    {{#each items }}
                    <div class="form__item double__child ">
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
            <div class="form__item {{form.name}}__actions double">
                <button class="{{form.name}}__{{form.submitButton.className}}" type="{{form.submitButton.type}}">{{form.submitButton.text}}</button>
                <a class="{{form.name}}__{{form.cancelLink.className}}" href="{{form.cancelLink.url}}">{{form.cancelLink.text}}</a>
            </div>
        </form>
    </main>
</div>`;
}