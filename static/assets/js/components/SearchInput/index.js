import Block from "../../modules/Block.js";
import { compile } from "../../modules/templator.js";
import template from "./SearchInput.js";
export default class SearchInput extends Block {
    constructor() {
        super("div", {});
    }
    render() {
        return compile(template, this.props);
    }
}
//# sourceMappingURL=index.js.map