(function () {
    let state = {
        login: "",
        password: ""
    };
    let view = {};

    document.addEventListener("DOMContentLoaded", initInterface);

    function initInterface() {
        renderInterface();

        view = initView();

        view.loginInput.addEventListener("input", (event) => setAuthProp(event, "login"));
        view.passwordInput.addEventListener("input", (event) => setAuthProp(event, "password"));

        view.loginForm.addEventListener("submit", submitAuthForm);
    }

    function renderInterface() {
        const template = Handlebars.compile(getTemplate());
        const data = {
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
        document.getElementById("root").innerHTML = template(data);
    }

    function initView() {
        return {
            loginForm: document.querySelector(".login-form"),

            loginInput: document.querySelector(".login-form__username-input"),
            passwordInput: document.querySelector(".login-form__password-input"),

            loginError: document.querySelector(".login-form__username-error"),
            passwordError: document.querySelector(".login-form__password-error"),

            loginButton: document.querySelector(".login-form__login-button")
        }
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

    function setAuthProp(event, propName) {
        const {value} = event.target;
        console.log(`[INFO] ${propName}`, value);

        setStateProp(propName, value);

        view[`${propName}Error`].innerText = "";
        removeClass(view[`${propName}Input`], "form__input_error");
    }

    function submitAuthForm(event) {
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

        if (areFieldsValid) {
            console.log("[INFO] Auth fields valid, form will be submitted later in this course", state);
        } else {
            console.error("[ERROR] [FORM] Invalid credentials");
        }
    }

    function getTemplate() {
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
})();