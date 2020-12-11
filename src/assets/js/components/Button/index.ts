import Block from "../../modules/Block.js";
import {compile} from "../../modules/templator.js";
import template from "./Button.js";

export default class Button extends Block {
    constructor(type: string, props: TObjectType) {
        const tag = type === "link" ? "a" : "button"
        super(tag, props);
    }

    render() {
        // console.log('[BUTTON] Render');
        return compile(template, this.props);
    }
}