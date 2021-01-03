import Block from "../../modules/Block";
import {compile} from "../../modules/templator";
import template from "./Button";

export default class Button extends Block {
    constructor(tag: string, props: IButtonProps) {
        super(tag, props);
    }

    render() {
        return compile(template, this.props);
    }
}