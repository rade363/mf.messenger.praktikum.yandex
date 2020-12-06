import Block from "../../modules/Block.js";
import { compile } from "../../modules/templator.js";
import template from "./Button.js";
export default class Button extends Block {
    constructor(props) {
        console.log('[BUTTON]', props);
        super("div", props);
    }
    render() {
        return compile(template, this.props);
    }
}
//# sourceMappingURL=index.js.map