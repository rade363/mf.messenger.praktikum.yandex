import Block from "../../modules/Block.js";
import {compile} from "../../modules/templator.js";
import template from "./ContextMenu.js";

export default class ContextMenu extends Block {
    constructor(props: IContextMenu) {
        super("div", {
            ...props,
            items: props.items.map((item: IContextMenuItem) => ({item}))
        });
    }

    render() {
        return compile(template, this.props);
    }
}