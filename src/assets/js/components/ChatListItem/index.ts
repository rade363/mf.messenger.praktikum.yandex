import Block from "../../modules/Block/Block";
import compile from "../../modules/templator/templator";
import template from "./ChatListItem.handlebars";
import { handleChatClick } from "../../controllers/createNewChatController";

export default class ChatListItem extends Block {
    constructor(props: IChatListItem) {
        super("li", {
            ...props,
            className: `chat-list__item ${props.isSelected ? "chat-list__item_active" : ""}`,
            eventListeners: [["click", () => handleChatClick(props)]]
        });
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}
