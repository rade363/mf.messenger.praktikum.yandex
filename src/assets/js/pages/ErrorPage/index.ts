import Block from "../../modules/Block/Block";
import template from "./template";
import {compile} from "../../modules/templator/templator";

export default class ErrorPage extends Block {
    constructor(props: IErrorPage) {
        super("div", props);
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}