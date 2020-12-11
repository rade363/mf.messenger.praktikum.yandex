import Block from "../../modules/Block.js";
import {compile} from "../../modules/templator.js";
import template from "./ErrorMessage.js";

export default class ErrorMessage extends Block {
    constructor(props: TObjectType) {
        super("span", props);
    }

    render() {
        // console.log('[ERROR-MESSAGE] Render');
        return compile(template, this.props);
    }
}