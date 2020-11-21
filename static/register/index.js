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

        view.submitButton.addEventListener("click", submitProfileEditForm);
        view.backButton.addEventListener("click", openLoginScreen)
    }

    function initView() {
        return {
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
            phoneError: document.querySelector(".register-form__phone-error"),

            submitButton: document.querySelector(".register-form__submit-button"),
            backButton: document.querySelector(".nav-auth__back")
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
        }
    }

    function openLoginScreen(event) {
        event.preventDefault();
        console.log("[INFO] Back to login feature will be added later in this course");
    }
})();