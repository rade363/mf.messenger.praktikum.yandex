(function () {
    let state = {
        oldPassword: "",
        newPassword: "",
        repeatNewPassword: ""
    };
    let view = {};

    document.addEventListener("DOMContentLoaded", initInterface);

    function initInterface() {
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

        view.saveButton.addEventListener("click", submitPasswordChange);
    }

    function initView() {
        return {
            oldPasswordInput: document.querySelector(".password-form__old-input"),
            newPasswordInput: document.querySelector(".password-form__new-input"),
            repeatNewPasswordInput: document.querySelector(".password-form__repeat-input"),

            oldPasswordError: document.querySelector(".password-form__old-error"),
            newPasswordError: document.querySelector(".password-form__new-error"),
            repeatNewPasswordError: document.querySelector(".password-form__repeat-error"),

            saveButton: document.querySelector(".password-form__save-button"),
            cancelButton: document.querySelector(".password-form__cancel-button")
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
        }
    }
})();