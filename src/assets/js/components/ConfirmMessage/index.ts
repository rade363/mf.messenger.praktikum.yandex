import Block from "../../modules/Block";
import {compile} from "../../modules/templator";
import template from "./ConfirmMessage";

export default class ConfirmMessage extends Block {
    constructor(props: IConfirmMessage) {
        super("div", props);
    }

    render() {
        return compile(template, this.props);
    }
}