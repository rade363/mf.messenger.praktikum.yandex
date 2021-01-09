import Block from "../../modules/Block/Block";
import {compile} from "../../modules/templator/templator";
import template from "./ChatListItem";
import Router from "../../modules/Router/Router";
import createChat from "../../controllers/createNewChatController";
import {handleExistingChats, renderChatsList} from "../../controllers/existingChatsListController";
import {setConversationMain} from "../../controllers/conversationMainController";
import globalStateInstance from "../../modules/GlobalState/globalStateInstance";

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
                        return createChat(title, globalStateInstance, router, [id]);
                    }

                    globalStateInstance.setProp("selectedChat", selectedChat);
                    if (!router._currentRoute || router._currentRoute._pathname !== "/conversation/") {
                        router.go("/conversation/");
                    }

                    if (router._currentRoute && router._currentRoute._block) {
                        const pageBlock = router._currentRoute._block;
                        const existingChatsList = handleExistingChats(existingChats);
                        setConversationMain(selectedChat, pageBlock);
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