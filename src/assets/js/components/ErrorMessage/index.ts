import Block from "../../modules/Block";
import {compile} from "../../modules/templator";
import template from "./ErrorMessage";

export default class ErrorMessage extends Block {
    constructor(props: IErrorMessage) {
        super("span", props);
    }

    render() {
        return compile(template, this.props);
    }
}