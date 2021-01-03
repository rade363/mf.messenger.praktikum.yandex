import Block from "../../modules/Block";
import {compile} from "../../modules/templator";
import template from "./Modal";

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