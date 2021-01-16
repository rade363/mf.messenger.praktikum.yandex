import globalStateInstance from "../modules/GlobalState/globalStateInstance";
import { handleExistingChats, renderChatsList } from "./existingChatsListController";
import setConversationMain from "./conversationMainController";
import createChat from "./createNewChatController";
import connectToChat from "./connectToChatController";
import Router from "../modules/Router/Router";

const router = new Router("#root");

export default function handleChatClick(props: IChatListItem): void | undefined {
    const { title, id } = props;
    const existingChats: IExistingChat[] = globalStateInstance.getProp("existingChats");
    const selectedChat = existingChats.find((chat) => chat.title === title);

    if (!selectedChat) {
        // TODO: fix the chat name bug
        return createChat(title, [id]);
    }

    globalStateInstance.setProp("selectedChat", selectedChat);
    if (!router._currentRoute || router._currentRoute._pathname !== "/conversation/") {
        router.go("/conversation/");
        if (router._currentRoute && router._currentRoute._block) {
            connectToChat(router._currentRoute._block).catch((error) => console.error("[ERROR] Could not connect to chat", error));
        }
    }

    if (router._currentRoute && router._currentRoute._block) {
        const pageBlock = router._currentRoute._block;
        const existingChatsList = handleExistingChats(existingChats);
        setConversationMain(selectedChat, pageBlock);
        return renderChatsList(existingChatsList, pageBlock, selectedChat);
    }
    return undefined;
}
