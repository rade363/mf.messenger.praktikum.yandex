import { isEmpty, isXssPresent, isEmailValid } from "./helpers";

function addClass(inputField: TObjectType, className: string): void {
    const { attributes } = inputField.props;
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

function setError(inputField: TObjectType, errorMessage: TObjectType, text: string, className: string): void {
    addClass(inputField, className);
    setErrorMessage(errorMessage, text);
}

export function validateField(fieldName: string, state: IFormInputState): [isValid: boolean, value: unknown] {
    const stateProp = state[fieldName];
    const [getFieldValue] = stateProp.value;
    const value = getFieldValue();

    if (!("inputField" in stateProp) || !("errorMessage" in stateProp) || !stateProp.inputField || !stateProp.errorMessage) {
        return [true, value];
    }

    if (isEmpty(value)) {
        setError(stateProp.inputField, stateProp.errorMessage, "Cannot be empty", "form__input_error");
        return [false, value];
    }
    if (typeof value === "string" && isXssPresent(value)) {
        setError(stateProp.inputField, stateProp.errorMessage, "Invalid symbols", "form__input_error");
        return [false, value];
    }
    if (fieldName.toLowerCase().indexOf("email") > -1 && typeof value === "string" && !isEmailValid(value)) {
        setError(stateProp.inputField, stateProp.errorMessage, "Invalid email", "form__input_error");
        return [false, value];
    }
    if (stateProp.mustEqual) {
        const secondStateProp = state[stateProp.mustEqual];
        const [getSecondFieldValue] = secondStateProp.value;
        const secondFieldValue = getSecondFieldValue();

        if (
            value !== secondFieldValue &&
            "inputField" in secondStateProp &&
            "errorMessage" in secondStateProp &&
            secondStateProp.inputField &&
            secondStateProp.errorMessage
        ) {
            setError(stateProp.inputField, stateProp.errorMessage, "Values don't match", "form__input_error");
            setError(secondStateProp.inputField, secondStateProp.errorMessage, "Values don't match", "form__input_error");

            return [false, value];
        }
    }

    return [true, value];
}

function removeClass(inputField: TObjectType, className: string): string {
    const { attributes } = inputField.props;
    const oldClass = attributes.class;
    return oldClass.indexOf(className) > -1 ? oldClass.replace(className, "") : oldClass;
}

export function setFormInput(event: Event, fieldName: string, state: IFormInputState, callback: (value: string) => unknown): void {
    const element = event.target as HTMLInputElement;
    const { value } = element;
    const stateProp = state[fieldName];

    if (!("inputField" in stateProp) || !("errorMessage" in stateProp) || !stateProp.inputField || !stateProp.errorMessage) {
        return;
    }

    const { attributes } = stateProp.inputField.props;
    const newClass = removeClass(stateProp.inputField, "form__input_error");
    stateProp.inputField.setProps({
        attributes: {
            ...attributes,
            class: newClass,
            value
        }
    });
    setErrorMessage(stateProp.errorMessage, "");

    if (stateProp.mustEqual) {
        const secondStateProp = state[stateProp.mustEqual];
        const [getSecondFieldValue] = secondStateProp.value;
        const secondFieldValue = getSecondFieldValue();
        if (
            value === secondFieldValue &&
            "inputField" in secondStateProp &&
            "errorMessage" in secondStateProp &&
            secondStateProp.inputField &&
            secondStateProp.errorMessage
        ) {
            const newSecondClass = removeClass(secondStateProp.inputField, "form__input_error");
            const secondFieldAttributes = secondStateProp.inputField.props.attributes;
            secondStateProp.inputField.setProps({
                attributes: {
                    ...secondFieldAttributes,
                    class: newSecondClass
                }
            });
            setErrorMessage(secondStateProp.errorMessage, "");
        }
    }

    callback(value);
}

export function createInputField(name: string, label: string, type: string, currentUser: IUser, mustEqual?: string): IInputFieldProps {
    const initialField = { name, label, type };
    const inputField = mustEqual ? { ...initialField, mustEqual } : initialField;

    if (currentUser && name in currentUser && typeof currentUser[name] === "string") {
        const value = currentUser[name];
        if (typeof value === "string") {
            return { ...inputField, value };
        }
    }

    return inputField;
}

export function setErrorTextForInputField(fieldName: string, errorText: string, inputFields: IBlock[]): void {
    inputFields.forEach((formInput: any) => {
        const { inputField } = formInput;
        if (inputField.props.name === fieldName) {
            const prevProps = formInput.inputField.props.errorMessage.props;
            formInput.inputField.props.errorMessage.setProps({
                ...prevProps,
                text: errorText
            });
        }
    });
}
