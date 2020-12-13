import Block from "../../modules/Block.js";
import {compile} from "../../modules/templator.js";
import template from "./ChatListItem.js";

export default class ChatListItem extends Block {
    constructor(props: IChatListItem) {
        super("li", {
            ...props,
            className: `chat-list__item ${props.isSelected ? "chat-list__item_active" : ""}`,
            eventListeners: [
                ["click", () => {
                    const url = props.url;
                    window.open(url, "_self");
                }]
            ]
        });
    }

    render() {
        return compile(template, this.props);
    }
}