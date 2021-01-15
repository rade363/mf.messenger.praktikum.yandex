import Block from "../../modules/Block/Block";
import compile from "../../modules/templator/templator";
import template from "./Input.handlebars";

export default class Input extends Block {
    constructor(props: IInput) {
        super("input", props);
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}
