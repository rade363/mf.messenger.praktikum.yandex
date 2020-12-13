import Block from "../../modules/Block.js";
import {compile} from "../../modules/templator.js";
import template from "./Button.js";

export default class Button extends Block {
    constructor(tag: string, props: IButtonProps) {
        super(tag, props);
    }

    render() {
        return compile(template, this.props);
    }
}