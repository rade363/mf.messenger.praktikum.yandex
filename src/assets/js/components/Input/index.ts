import Block from "../../modules/Block";
import {compile} from "../../modules/templator";
import template from "./Input";

export default class Input extends Block {
    constructor(props: IInput) {
        super("input", props);
    }

    render() {
        return compile(template, this.props);
    }
}