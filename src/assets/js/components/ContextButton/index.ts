import Block from "../../modules/Block.js";
import {compile} from "../../modules/templator.js";
import template from "./ContextButton.js";

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

    render() {
        return compile(template, this.props);
    }
}