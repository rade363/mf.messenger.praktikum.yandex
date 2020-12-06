import Block from "../../modules/Block.js";
import { compile } from "../../modules/templator.js";
import template from "./BackButton.js";
export default class BackButton extends Block {
    constructor(props) {
        super("div", props);
    }
    render() {
        return compile(template, this.props);
    }
}
//# sourceMappingURL=index.js.map