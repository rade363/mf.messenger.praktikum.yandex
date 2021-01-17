import globalStateInstance from "../modules/GlobalState/globalStateInstance";
import { handleExistingChats, renderChatsList } from "./existingChatsListController";
import setConversationInfo from "./conversationInfoController";
import createChat from "./createNewChatController";
import connectToChat from "./connectToChatController";
import { createUsername } from "../modules/helpers";
import Router from "../modules/Router/Router";

const router = new Router("#root");

export default function handleChatClick(props: IChatListItem): void | undefined {
    const { title, id } = props;
    const existingChats: IExistingChat[] = globalStateInstance.getProp("existingChats");
    const selectedChat = existingChats.find((chat) => chat.title === title);

    if (!selectedChat) {
        // TODO: fix the chat name bug
        const currentUser = globalStateInstance.getProp("currentUser");
        const currentUsername = createUsername(currentUser);
        const newChatTitle = `Chat between ${currentUsername} and ${title}`;
        return createChat(newChatTitle, [id]);
    }

    globalStateInstance.setProp("selectedChat", selectedChat);
    if (!router._currentRoute || router._currentRoute._pathname !== "/conversation/") {
        router.go("/conversation/");
    }

    if (router._currentRoute && router._currentRoute._block) {
        const pageBlock = router._currentRoute._block;
        const existingChatsList = handleExistingChats(existingChats);
        setConversationInfo(selectedChat, pageBlock, false);
        connectToChat(pageBlock).catch((error) => console.error("[ERROR] Could not connect to chat", error));
        return renderChatsList(existingChatsList, pageBlock, selectedChat);
    }
    return undefined;
}
