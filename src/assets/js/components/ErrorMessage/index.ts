import Block from "../../modules/Block.js";
import {compile} from "../../modules/templator.js";
import template from "./ErrorMessage.js";

export default class ErrorMessage extends Block {
    constructor(props: IErrorMessage) {
        super("span", props);
    }

    render() {
        return compile(template, this.props);
    }
}