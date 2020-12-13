import Block from "../../modules/Block.js";
import {compile} from "../../modules/templator.js";
import template from "./FormInput.js";

export default class FormInput extends Block {
    constructor(props: IFormInput) {
        super("div", {
            attributes: {
                class: "form__item"
            },
            name: props.name,
            label: props.label,
            errorMessage: props.errorMessage,
            input: props.input
        });
    }

    render() {
        return compile(template, this.props);
    }
}