(function () {
    let state = {
        login: "",
        password: ""
    };
    let view = {};

    document.addEventListener("DOMContentLoaded", initInterface);

    function initInterface() {
        view = initView();

        view.loginInput.addEventListener("input", (event) => setAuthProp(event, "login"));
        view.passwordInput.addEventListener("input", (event) => setAuthProp(event, "password"));

        view.loginButton.addEventListener("click", submitAuthForm);
        view.registerButton.addEventListener("click", showRegisterForm);
    }

    function initView() {
        return {
            loginInput: document.querySelector(".login-form__username-input"),
            passwordInput: document.querySelector(".login-form__password-input"),

            loginError: document.querySelector(".login-form__username-error"),
            passwordError: document.querySelector(".login-form__password-error"),

            loginButton: document.querySelector(".login-form__login-button"),
            registerButton: document.querySelector(".login-form__register-button")
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
        }
    }

    function showRegisterForm(event) {
        event.preventDefault();
        console.log("[INFO] Register form will be opened later in this course");
    }
})();