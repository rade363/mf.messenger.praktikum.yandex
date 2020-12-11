import Block from "../../modules/Block.js";
import {compile} from "../../modules/templator.js";
import template from "./Form.js";

export default class Form extends Block {
    constructor(props: any) {
        super("form", props);
    }

    render() {
        // console.log('[FORM] Render');
        return compile(template, this.props);
    }
}