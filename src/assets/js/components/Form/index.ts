import Block from "../../modules/Block/Block";
import compile from "../../modules/templator/templator";
import template from "./Form.handlebars";
import { createInputElement, createActionElement, handleFormSubmit } from "../../controllers/formController";

export default class Form extends Block {
    constructor(props: IFormProps) {
        const state: IFormInputState = {};

        super("form", {
            name: props.name,
            attributes: {
                class: `form ${props.name}`,
                method: "POST"
            },
            inputFields: props.inputFields.map((inputElement: TFormElement) => createInputElement(inputElement, props.name, state)),
            actions: props.actions.map((action: TActionElement) => createActionElement(action, props.name)),
            onSubmit(event: Event): void {
                handleFormSubmit(event, props, state);
            }
        });
    }

    render(): Element | null {
        return compile(template, {
            name: this.props.name,
            inputFields: this.props.inputFields,
            actions: this.props.actions
        });
    }
}
