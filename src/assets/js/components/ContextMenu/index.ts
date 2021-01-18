import Block from "../../modules/Block/Block";
import compile from "../../modules/templator/templator";
import template from "./ContextMenu.handlebars";

export default class ContextMenu extends Block {
    constructor(props: IContextMenuProps) {
        super("div", {
            ...props,
            items: props.items.map((item: IBlock) => ({ item }))
        });
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}
