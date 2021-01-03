import Block from "../../modules/Block";
import template from "./template";
import {compile} from "../../modules/templator";

export default class ErrorPage extends Block {
    constructor(props: IErrorPage) {
        super("main", props);
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}