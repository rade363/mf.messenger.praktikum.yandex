import Block from "../../modules/Block.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";

export default class ErrorPage extends Block {
    constructor(props: IErrorPage) {
        super("main", props);
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}