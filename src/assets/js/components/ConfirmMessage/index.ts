import Block from "../../modules/Block.js";
import {compile} from "../../modules/templator.js";
import template from "./ConfirmMessage.js";

export default class ConfirmMessage extends Block {
    constructor(props: IConfirmMessage) {
        super("div", props);
    }

    render() {
        return compile(template, this.props);
    }
}