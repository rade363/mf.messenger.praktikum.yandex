import Block from "../../modules/Block/Block";
import {compile} from "../../modules/templator/templator";
import {useState} from "../../modules/state";
import template from "./Form";
import FormInput from "../FormInput/index";
import ErrorMessage from "../ErrorMessage/index";
import Input from "../Input/index";
import Button from "../Button/index";
import Double from "../Double/index";
import ImageInput from "../ImageInput/index";
import {validateField, setFormInput} from "../../modules/formHelpers";
import {isEmpty} from "../../modules/helpers";
import {createAPIUrl, setImageUpload} from "../../modules/domHelpers";
import {NO_IMAGE_IMG} from "../../constants/index";

export default class Form extends Block {
    constructor(props: IFormProps) {
        const state: IFormInputState = {};

        super("form", {
            name: props.name,
            attributes: {
                class: `form ${props.name}`,
                method: "POST"
            },
            inputFields: props.inputFields.map(inputElement => createInputElement(inputElement, props.name)),
            actions: props.actions.map((action: TActionElement) => createActionElement(action, props.name)),
            onSubmit: function(event: Event): void {
                handleFormSubmit(event, props);
            }
        });

        function createInputElement(inputFieldProps: TFormElement, formName: string) {
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
                }
            }
            if ("label" in inputFieldProps && "name" in inputFieldProps) {
                return {
                    inputField: createInputField(inputFieldProps, formName, state)
                }
            }
            return inputFieldProps;
        }

        function createImageInput(inputFieldProps: IAvatarInput, state: IFormInputState) {
            const {name} = inputFieldProps;
            state[name] = {
                value: useState("")
            };

            const [, setValue] = state[name].value;
            const callback = inputFieldProps.callback ? inputFieldProps.callback: setValue;

            const imageInput: IBlock = new ImageInput({
                attributes: {
                    class: `${inputFieldProps.attributes.class} ${inputFieldProps.name} ${isEmpty(inputFieldProps.src) ? `${inputFieldProps.name}_empty` : ""}`
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
                    eventListeners: [
                        ["input", (event: Event) => setImageUpload(event, callback, imageInput)]
                    ]
                })
            });
            return imageInput;
        }

        function createInputField(inputFieldProps: IInputFieldProps, formName: string, state: IFormInputState) {
            const {label, type, name, mustEqual} = inputFieldProps;

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
                        ["input", (event: Event) => {
                            setFormInput(event, name, state, (value) => {
                                setValue(value);
                                setError("");
                            });
                        }],
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
                })
            }
        }

        function createActionElement(action: TActionElement, formName: string) {
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
                }
            }

            if ("text" in action) {
                return {
                    action: createButtonElement(action, formName)
                }
            }
        }

        function createButtonElement(action: IFormButtonProps, formName: string) {
            const {text, attributes} = action;
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

        function handleFormSubmit(event: Event, props: IFormProps): void {
            event.preventDefault();
            event.stopPropagation();

            let areFieldsValid = true;
            let formObject: IFormObject = {};

            Object.keys(state).forEach((fieldName) => {
                const [isFieldValid, fieldValue] = validateField(fieldName, state);
                if (isFieldValid) {
                    if (fieldName.indexOf("-repeat") < 0) {
                        formObject[fieldName] = fieldValue;
                    }
                    return null;
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

        function createAttributes(className: string, type: string, name: string, value: unknown): TObjectType {
            const attributes = {
                class: `form__input ${className}-input`,
                type,
                id: name,
                value
            };
            if (type === "tel") {
                return Object.assign(attributes, { pattern: "[0-9]+"});
            }
            return attributes;
        }
    }

    render() {
        return compile(template, {
            name: this.props.name,
            inputFields: this.props.inputFields,
            actions: this.props.actions
        });
    }
}