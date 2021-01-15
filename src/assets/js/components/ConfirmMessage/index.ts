import Block from "../../modules/Block/Block";
import compile from "../../modules/templator/templator";
import template from "./ConfirmMessage.handlebars";

export default class ConfirmMessage extends Block {
    constructor(props: IConfirmMessage) {
        super("div", props);
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}
