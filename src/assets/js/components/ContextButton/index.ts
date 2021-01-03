import Block from "../../modules/Block";
import {compile} from "../../modules/templator";
import template from "./ContextButton";

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