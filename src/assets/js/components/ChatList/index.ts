import Block from "../../modules/Block.js";
import {compile} from "../../modules/templator.js";
import template from "./ChatList.js";
import ChatListItem from "../ChatListItem/index.js";

export default class ChatList extends Block {
    constructor(props: IChatList) {
        super("div", {
            ...props,
            items: props.items.map((item: IChatListItem) => ({
                item: new ChatListItem(item)
            }))
        });
    }

    render() {
        return compile(template, this.props);
    }
}