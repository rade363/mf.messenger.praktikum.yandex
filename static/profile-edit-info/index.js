(function () {
    let state = {
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
        view = initView();

        view.emailInput.addEventListener("input", (event) => setProfileProp(event, "email"));
        view.loginInput.addEventListener("input", (event) => setProfileProp(event, "login"));
        view.firstNameInput.addEventListener("input", (event) => setProfileProp(event, "firstName"));
        view.lastNameInput.addEventListener("input", (event) => setProfileProp(event, "lastName"));
        view.displayNameInput.addEventListener("input", (event) => setProfileProp(event, "displayName"));
        view.phoneInput.addEventListener("input", (event) => setProfileProp(event, "phone"));

        view.saveButton.addEventListener("click", submitProfileEditForm);
    }

    function initView() {
        return {
            emailInput: document.querySelector(".profile-form__email-input"),
            loginInput: document.querySelector(".profile-form__login-input"),
            firstNameInput: document.querySelector(".profile-form__first-name-input"),
            lastNameInput: document.querySelector(".profile-form__last-name-input"),
            displayNameInput: document.querySelector(".profile-display-name-input"),
            phoneInput: document.querySelector(".profile-form__phone-input"),

            emailError: document.querySelector(".profile-form__email-error"),
            loginError: document.querySelector(".profile-form__login-error"),
            firstNameError: document.querySelector(".profile-form__first-name-error"),
            lastNameError: document.querySelector(".profile-form__last-name-error"),
            displayNameError: document.querySelector(".profile-display-name-error"),
            phoneError: document.querySelector(".profile-form__phone-error"),

            saveButton: document.querySelector(".profile-form__save-button"),
            cancelButton: document.querySelector(".profile-form__cancel-button")
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
            if (isEmpty(propValue)) {
                areFieldsValid = false;
                addClass(view[`${propName}Input`], "form__input_error");
                view[`${propName}Error`].innerText = "Cannot be empty";
            }
        });

        if (areFieldsValid) {
            console.log("[INFO] All fields valid, form will be submitted later in this course", state);
        }
    }
})();