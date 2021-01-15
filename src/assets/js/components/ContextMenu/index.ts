import Block from "../../modules/Block/Block";
import compile from "../../modules/templator/templator";
import template from "./ContextMenu";

export default class ContextMenu extends Block {
    constructor(props: IContextMenuProps) {
        super("div", {
            ...props,
            items: props.items.map((item: IContextMenuItem) => ({ item }))
        });
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}
