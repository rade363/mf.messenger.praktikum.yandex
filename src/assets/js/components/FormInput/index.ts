import Block from "../../modules/Block.js";
import {compile} from "../../modules/templator.js";
import template from "./FormInput.js";

export default class FormInput extends Block {
    constructor(props: TObjectType) {
        super("div", {
            attributes: {
                class: "form__item"
            },
            name: props.name,
            label: props.label,
            className: props.className,
            errorMessage: props.errorMessage,
            input: props.input
        });
    }

    render() {
        // console.log('[FORM-INPUT] Render');
        return compile(template, this.props);
    }
}

export function setFormInput(event: Event, block: TObjectType, callback:(value: string) => unknown): void {
    const element = event.target as HTMLInputElement;
    const {value} = element;

    const input = block.props.input;
    const attributes = input.props.attributes;
    const oldClass = attributes.class;
    const newClass = oldClass.indexOf("form__input_error") > -1
        ? oldClass.replace("form__input_error", "")
        : oldClass;
    input.setProps({
        attributes: {
            ...attributes,
            class: newClass,
            value
        }
    });

    const error = block.props.errorMessage;
    error.setProps({
        text: ""
    });

    callback(value);
}