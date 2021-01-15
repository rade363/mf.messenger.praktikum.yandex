import Block from "../../modules/Block/Block";
import compile from "../../modules/templator/templator";
import template from "./ContextButton.handlebars";

export default class ContextButton extends Block {
    constructor(props: IContextButton) {
        super("button", {
            ...props,
            attributes: {
                class: `${props.name} context-button`,
                type: "button"
            }
        });
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}
