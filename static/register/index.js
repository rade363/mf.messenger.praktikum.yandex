(function () {
    let state = {
        email: "",
        login: "",
        firstName: "",
        lastName: "",
        password: "",
        passwordRepeat: "",
        phone: ""
    };
    let view = {};

    document.addEventListener("DOMContentLoaded", initInterface);

    function initInterface() {
        renderInterface();

        view = initView();

        view.emailInput.addEventListener("input", (event) => setNewAccountProp(event, "email"));
        view.loginInput.addEventListener("input", (event) => setNewAccountProp(event, "login"));
        view.firstNameInput.addEventListener("input", (event) => setNewAccountProp(event, "firstName"));
        view.lastNameInput.addEventListener("input", (event) => setNewAccountProp(event, "lastName"));
        view.passwordInput.addEventListener("input", (event) => {
            setNewAccountProp(event, "password");
            validateNewPasswords();
        });
        view.passwordRepeatInput.addEventListener("input", (event) => {
            setNewAccountProp(event, "passwordRepeat");
            validateNewPasswords();
        });
        view.phoneInput.addEventListener("input", (event) => setNewAccountProp(event, "phone"));

        view.registerForm.addEventListener("submit", submitProfileEditForm);
    }

    function renderInterface() {
        const template = Handlebars.compile(getTemplate());
        Handlebars.registerHelper('if_eq', function(a, b, opts) {
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
        document.getElementById("root").innerHTML = template(data);
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

    function setNewAccountProp(event, propName) {
        const {value} = event.target;
        console.log(`[INFO] ${propName}`, value);

        setStateProp(propName, value);

        view[`${propName}Error`].innerText = "";
        removeClass(view[`${propName}Input`], "form__input_error");
    }

    function validateNewPasswords() {
        if (isEmpty(state.password) || isEmpty(state.passwordRepeat)) {
            return false;
        }

        if (state.password !== state.passwordRepeat) {
            view.passwordError.innerText = "Passwords do not match";
            view.passwordRepeatError.innerText = "Passwords do not match";

            addClass(view.passwordInput, "form__input_error");
            addClass(view.passwordRepeatInput, "form__input_error");
            return false;
        }

        view.passwordError.innerText = "";
        view.passwordRepeatError.innerText = "";

        removeClass(view.passwordInput, "form__input_error");
        removeClass(view.passwordRepeatInput, "form__input_error");
    }

    function submitProfileEditForm(event) {
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

        if (state.password !== state.passwordRepeat) {
            areFieldsValid = false;
        }

        if (areFieldsValid) {
            console.log("[INFO] All fields valid, new account form will be submitted later in this course", state);
        } else {
            console.error("[ERROR] [FORM] Invalid/missing registration data");
        }
    }

    function getTemplate() {
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
})();