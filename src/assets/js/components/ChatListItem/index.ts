import Block from "../../modules/Block.js";
import {compile} from "../../modules/templator.js";
import template from "./ChatListItem.js";
import GlobalState from "../../modules/GlobalState.js";
import Router from "../../modules/Router.js";
import {createChat} from "../../controllers/chatListItemController.js";
import {handleExistingChats, renderChatsList} from "../../controllers/existingChatsListController.js";
import {setConversationTitle} from "../../controllers/conversationInfoController.js";

const globalStateInstance = new GlobalState();
const router = new Router("#root");

export default class ChatListItem extends Block {
    constructor(props: IChatListItem) {
        super("li", {
            ...props,
            className: `chat-list__item ${props.isSelected ? "chat-list__item_active" : ""}`,
            eventListeners: [
                ["click", () => {
                    const {title, id} = props;
                    const existingChats: IExistingChat[] = globalStateInstance.getProp("existingChats");
                    const selectedChat = existingChats.find(chat => chat.title === title);

                    if (!selectedChat) {
                        return createChat(title, id, globalStateInstance, router);
                    }

                    globalStateInstance.setProp("selectedChat", selectedChat);
                    if (!router._currentRoute || router._currentRoute._pathname !== "/conversation/") {
                        router.go("/conversation/");
                    }

                    if (router._currentRoute && router._currentRoute._block) {
                        const pageBlock = router._currentRoute._block;
                        const existingChatsList = handleExistingChats(existingChats);
                        setConversationTitle(selectedChat, pageBlock);
                        return renderChatsList(existingChatsList, pageBlock, selectedChat);
                    }
                }]
            ]
        });
    }

    render() {
        return compile(template, this.props);
    }
}