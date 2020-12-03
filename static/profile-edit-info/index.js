(function () {
    let state = {
        avatar: null,
        email: "",
        login: "",
        firstName: "",
        lastName: "",
        displayName: "",
        phone: ""
    };
    let view = {};

    document.addEventListener("DOMContentLoaded", initInterface);

    function initInterface() {
        renderInterface();

        view = initView();

        view.avatarInput.addEventListener("input", setAvatar);
        view.emailInput.addEventListener("input", (event) => setProfileProp(event, "email"));
        view.loginInput.addEventListener("input", (event) => setProfileProp(event, "login"));
        view.firstNameInput.addEventListener("input", (event) => setProfileProp(event, "firstName"));
        view.lastNameInput.addEventListener("input", (event) => setProfileProp(event, "lastName"));
        view.displayNameInput.addEventListener("input", (event) => setProfileProp(event, "displayName"));
        view.phoneInput.addEventListener("input", (event) => setProfileProp(event, "phone"));

        view.profileForm.addEventListener("submit", submitProfileEditForm);
    }

    function renderInterface() {
        const template = Handlebars.compile(getTemplate());
        Handlebars.registerHelper('if_eq', function(a, b, opts) {
            return a === b ? opts.fn(this) : opts.inverse(this);
        });
        const data = {
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
        document.getElementById("root").innerHTML = template(data);
    }

    function initView() {
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

    function isEmpty(value) {
        return value === undefined || value === null || value === "";
    }

    function setStateProp(propName, value) {
        state = {
            ...state,
            [propName]: value
        };
    }

    function addClass(element, className) {
        if (!element.classList.contains(className)) {
            element.classList.add(className);
        }
    }

    function removeClass(element, className) {
        if (element.classList.contains(className)) {
            element.classList.remove(className);
        }
    }

    function setAvatar(event) {
        const {files} = event.target;
        const newAvatar = files[0];
        console.log("[INFO] Avatar file", newAvatar);

        setStateProp("avatar", newAvatar);
    }

    function setProfileProp(event, propName) {
        const {value} = event.target;
        console.log(`[INFO] ${propName}`, value);

        setStateProp(propName, value);

        view[`${propName}Error`].innerText = "";
        removeClass(view[`${propName}Input`], "form__input_error");
    }

    function submitProfileEditForm(event) {
        event.preventDefault();
        let areFieldsValid = true;

        Object.entries(state).forEach(keyValuePair => {
            const [propName, propValue] = keyValuePair;
            if (propName === "avatar") {
                return null;
            }
            if (isEmpty(propValue)) {
                areFieldsValid = false;
                addClass(view[`${propName}Input`], "form__input_error");
                view[`${propName}Error`].innerText = "Cannot be empty";
            }
        });

        if (areFieldsValid) {
            console.log("[INFO] All fields valid, form will be submitted later in this course", state);
        } else {
            console.error("[ERROR] [FORM] Invalid form data");
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
})();