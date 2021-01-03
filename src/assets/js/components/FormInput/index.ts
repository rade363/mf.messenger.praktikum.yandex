import Block from "../../modules/Block";
import {compile} from "../../modules/templator";
import template from "./FormInput";

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