import Double from "../components/Double/index";
import useState from "../modules/state";
import ImageInput from "../components/ImageInput/index";
import { isEmpty } from "../modules/utils";
import { NO_IMAGE_IMG } from "../constants/index";
import { createAPIUrl, setImageUpload } from "../modules/domHelpers";
import Input from "../components/Input/index";
import ErrorMessage from "../components/ErrorMessage/index";
import { setFormInput, validateField } from "../modules/formHelpers";
import FormInput from "../components/FormInput/index";
import Button from "../components/Button/index";

function createImageInput(inputFieldProps: IAvatarInput, state: IFormInputState): IBlock {
    const { name } = inputFieldProps;
    state[name] = {
        value: useState("")
    };

    const [, setValue] = state[name].value;
    const callback = inputFieldProps.callback ? inputFieldProps.callback : setValue;

    const imageInput: IBlock = new ImageInput({
        attributes: {
            class: `${inputFieldProps.attributes.class} ${inputFieldProps.name} ${
                isEmpty(inputFieldProps.src) ? `${inputFieldProps.name}_empty` : ""
            }`
        },
        name: inputFieldProps.name,
        src: isEmpty(inputFieldProps.src) ? NO_IMAGE_IMG : createAPIUrl(inputFieldProps.src),
        label: inputFieldProps.label,
        input: new Input({
            attributes: {
                class: `${inputFieldProps.name}__input`,
                type: "file",
                name: inputFieldProps.name
            },
            eventListeners: [["input", (event: Event) => setImageUpload(event, callback, imageInput)]]
        })
    });
    return imageInput;
}

function createAttributes(className: string, type: string, name: string, value: unknown): TObjectType {
    const attributes = {
        class: `form__input ${className}-input`,
        type,
        id: name,
        value
    };
    if (type === "tel") {
        return Object.assign(attributes, {
            pattern: "\\+?[0-9]+",
            placeholder: "+79991112233",
            title: "+79991112233"
        });
    }
    return attributes;
}

function createInputField(inputFieldProps: IInputFieldProps, formName: string, state: IFormInputState): IBlock | never {
    const { label, type, name, mustEqual } = inputFieldProps;

    state[name] = {
        value: useState(inputFieldProps.value ? inputFieldProps.value : ""),
        error: useState(""),
        inputField: null,
        errorMessage: null,
        mustEqual
    };

    const createdStateProp = state[name];
    if ("error" in createdStateProp) {
        const className = `${formName}__${name}`;
        const [getError, setError] = createdStateProp.error;
        const [getValue, setValue] = createdStateProp.value;
        const errorMessage = new ErrorMessage({
            attributes: {
                class: `form__error ${className}-error`
            },
            text: getError()
        });
        const input = new Input({
            attributes: createAttributes(className, type, name, getValue()),
            eventListeners: [
                [
                    "input",
                    (event: Event) => {
                        setFormInput(event, name, state, (value) => {
                            setValue(value);
                            setError("");
                        });
                    }
                ],
                ["blur", () => validateField(name, state)]
            ]
        });

        createdStateProp.inputField = input;
        createdStateProp.errorMessage = errorMessage;

        return new FormInput({
            label,
            name,
            errorMessage,
            input
        });
    }
    throw new Error("Could not create input field");
}

function createButtonElement(action: IFormButtonProps, formName: string) {
    const { text, attributes } = action;
    const tag = attributes.href ? "a" : "button";
    const className = `${formName}__${attributes.class}`;
    const eventListeners = action.eventListeners !== undefined ? action.eventListeners : [];

    return new Button(tag, {
        text,
        attributes: {
            ...attributes,
            class: className
        },
        eventListeners
    });
}

export function createInputElement(inputFieldProps: TFormElement, formName: string, state: IFormInputState): IInputElement | never {
    if (inputFieldProps.type === "file" && "src" in inputFieldProps) {
        return {
            inputField: createImageInput(inputFieldProps, state)
        };
    }
    if (inputFieldProps.type === "double" && "children" in inputFieldProps) {
        return {
            inputField: new Double({
                ...inputFieldProps,
                children: inputFieldProps.children.map((inputChild: IInputFieldProps) => ({
                    child: createInputField(inputChild, formName, state)
                }))
            })
        };
    }
    if ("label" in inputFieldProps && "name" in inputFieldProps) {
        return {
            inputField: createInputField(inputFieldProps, formName, state)
        };
    }
    throw new Error("Could not create input element");
}

export function createActionElement(action: TActionElement, formName: string): IActionElement | never {
    if (typeof action === "string") {
        return { action };
    }

    if ("type" in action && action.type === "double") {
        return {
            action: new Double({
                ...action,
                children: action.children.map((actionChild: IFormButtonProps) => ({
                    child: createButtonElement(actionChild, formName)
                }))
            })
        };
    }

    if ("text" in action) {
        return {
            action: createButtonElement(action, formName)
        };
    }
    throw new Error("Could not create action element");
}

export function handleFormSubmit(event: Event, props: IFormProps, state: IFormInputState): void {
    event.preventDefault();
    event.stopPropagation();

    let areFieldsValid = true;
    const formObject: IFormObject = {};

    Object.keys(state).forEach((fieldName): void => {
        const [isFieldValid, fieldValue] = validateField(fieldName, state);
        if (isFieldValid) {
            if (fieldName.indexOf("-repeat") < 0) {
                formObject[fieldName] = fieldValue;
            }
            return;
        }
        areFieldsValid = false;
        console.error(`[ERROR] Invalid form field ${fieldName} value:`, fieldValue);
    });

    if (areFieldsValid) {
        props.onSubmit(formObject);
    } else {
        console.error("[ERROR] [FORM] Invalid form data");
    }
}
