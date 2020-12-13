import Block from "../../modules/Block.js";
import {compile} from "../../modules/templator.js";
import template from "./Modal.js";

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