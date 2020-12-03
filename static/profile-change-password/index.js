(function () {
    let state = {
        oldPassword: "",
        newPassword: "",
        repeatNewPassword: ""
    };
    let view = {};

    document.addEventListener("DOMContentLoaded", initInterface);

    function initInterface() {
        renderInterface();

        view = initView();

        view.oldPasswordInput.addEventListener("input", (event) => setPasswordProp(event, "oldPassword"));
        view.newPasswordInput.addEventListener("input", (event) => {
            setPasswordProp(event, "newPassword");
            validateNewPasswords();
        });
        view.repeatNewPasswordInput.addEventListener("input", (event) => {
            setPasswordProp(event, "repeatNewPassword");
            validateNewPasswords();
        });

        view.passwordForm.addEventListener("submit", submitPasswordChange);
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

    function setPasswordProp(event, propName) {
        const {value} = event.target;
        console.log(`[INFO] ${propName}`, value);

        setStateProp(propName, value);

        view[`${propName}Error`].innerText = "";
        removeClass(view[`${propName}Input`], "form__input_error");
    }

    function validateNewPasswords() {
        if (isEmpty(state.newPassword) || isEmpty(state.repeatNewPassword)) {
            return false;
        }

        if (state.newPassword !== state.repeatNewPassword) {
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

        Object.entries(state).forEach(keyValuePair => {
            const [propName, propValue] = keyValuePair;
            if (isEmpty(propValue)) {
                areFieldsValid = false;
                addClass(view[`${propName}Input`], "form__input_error");
                view[`${propName}Error`].innerText = "Cannot be empty";
            }
        });

        if (state.newPassword !== state.repeatNewPassword) {
            areFieldsValid = false;
        }

        if (areFieldsValid) {
            console.log("[INFO] Password change form submitted (to be fixed later in course)", state);
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
})();