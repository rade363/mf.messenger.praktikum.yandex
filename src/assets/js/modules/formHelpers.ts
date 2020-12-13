import {isEmpty, isXssPresent} from "./helpers.js";

export function validateField(fieldName: string, state: IFormInputState): [isValid: boolean, value: unknown] {
    const stateProp = state[fieldName];
    const [getFieldValue] = stateProp.value;
    const value = getFieldValue();
    if ("inputField" in stateProp && "errorMessage" in stateProp) {
        const {inputField, errorMessage} = stateProp;
        if (inputField && errorMessage) {
            if (isEmpty(value)) {
                setError(inputField, errorMessage, "Cannot be empty", "form__input_error");
                return [false, value];
            }
            if (typeof value === "string" && isXssPresent(value)) {
                setError(inputField, errorMessage, "Invalid symbols", "form__input_error");
                return [false, value];
            }
            if (stateProp.mustEqual !== undefined) {
                const secondStateProp = state[stateProp.mustEqual];
                const [getSecondFieldValue] = secondStateProp.value;
                const secondFieldValue = getSecondFieldValue();
                if (value !== secondFieldValue) {
                    if ("inputField" in secondStateProp && "errorMessage" in secondStateProp) {
                        const {inputField: secondInputField, errorMessage: secondErrorMessage} = secondStateProp;
                        if (secondInputField && secondErrorMessage) {
                            setError(inputField, errorMessage, "Values don't match", "form__input_error");
                            setError(secondInputField, secondErrorMessage, "Values don't match", "form__input_error");
                            return [false, value];
                        }
                    }
                }
            }
        }
    }
    return [true, value];
}

function setError(inputField: TObjectType, errorMessage: TObjectType, text: string, className: string): void {
    addClass(inputField, className);
    setErrorMessage(errorMessage, text);
}

function addClass(inputField: TObjectType, className: string): void {
    const {attributes} = inputField.props;
    if (attributes.class.indexOf(className) < 0) {
        inputField.setProps({
            attributes: {
                ...attributes,
                class: `${attributes.class} ${className}`
            }
        });
    }
}

function setErrorMessage(errorMessage: TObjectType, text: string): void {
    errorMessage.setProps({
        text
    });
}

function removeClass(inputField: TObjectType, className: string): string {
    const {attributes} = inputField.props;
    const oldClass = attributes.class;
    return oldClass.indexOf(className) > -1 ? oldClass.replace(className, "") : oldClass;
}

export function setFormInput(event: Event, fieldName: string, state: IFormInputState, callback: (value: string) => unknown): void {
    const element = event.target as HTMLInputElement;
    const {value} = element;

    const stateProp = state[fieldName];
    if ("inputField" in stateProp && "errorMessage" in stateProp) {
        const {inputField, errorMessage} = stateProp;
        if (inputField && errorMessage) {
            const {attributes} = inputField.props;
            const newClass = removeClass(inputField, "form__input_error");
            inputField.setProps({
                attributes: {
                    ...attributes,
                    class: newClass,
                    value
                }
            })
            setErrorMessage(errorMessage, "");

            if (stateProp.mustEqual !== undefined) {
                const secondStateProp = state[stateProp.mustEqual];
                const [getSecondFieldValue] = secondStateProp.value;
                const secondFieldValue = getSecondFieldValue();
                if (value === secondFieldValue) {
                    if ("inputField" in secondStateProp && "errorMessage" in secondStateProp) {
                        const {inputField: secondInputField, errorMessage: secondErrorMessage} = secondStateProp;
                        if (secondInputField && secondErrorMessage) {
                            const newSecondClass = removeClass(secondInputField, "form__input_error");
                            const secondFieldAttributes = secondInputField.props.attributes;
                            secondInputField.setProps({
                                attributes: {
                                    ...secondFieldAttributes,
                                    class: newSecondClass
                                }
                            });
                            setErrorMessage(secondErrorMessage, "");
                        }
                    }
                }
            }
        }
    }

    callback(value);
}