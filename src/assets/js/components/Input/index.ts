import Block from "../../modules/Block.js";
import {compile} from "../../modules/templator.js";
import template from "./Input.js";

export default class Input extends Block {
    constructor(props: TObjectType) {
        super("div", props);
    }
    render() {
        return compile(template, this.props);
    }
}