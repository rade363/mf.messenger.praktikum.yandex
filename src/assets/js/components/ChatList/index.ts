import Block from "../../modules/Block/Block";
import compile from "../../modules/templator/templator";
import template from "./ChatList";
import ChatListItem from "../ChatListItem/index";

export default class ChatList extends Block {
    constructor(props: IChatList) {
        super("div", {
            ...props,
            items: props.items.map((item: IChatListItem) => ({
                item: new ChatListItem(item)
            }))
        });
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}
