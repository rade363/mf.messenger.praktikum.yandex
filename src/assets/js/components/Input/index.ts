import Block from "../../modules/Block/Block";
import {compile} from "../../modules/templator/templator";
import template from "./Input";

export default class Input extends Block {
    constructor(props: IInput) {
        super("input", props);
    }

    render() {
        return compile(template, this.props);
    }
}