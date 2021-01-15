import Block from "../../modules/Block/Block";
import compile from "../../modules/templator/templator";
import template from "./Modal.handlebars";

export default class Modal extends Block {
    constructor(props: IModal) {
        super("div", {
            ...props,
            attributes: {
                class: `overlay ${props.name}`
            }
        });
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}
