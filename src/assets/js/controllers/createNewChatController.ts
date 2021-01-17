import ChatsAPI from "../api/chats-api";
import Router from "../modules/Router/Router";
import { handleExistingChats, renderChatsList } from "./existingChatsListController";
import setConversationInfo from "./conversationInfoController";
import addUsersToChat from "./addUsersController";
import globalStateInstance from "../modules/GlobalState/globalStateInstance";
import connectToChat from "./connectToChatController";

const chatsAPI = new ChatsAPI();
const router = new Router("#root");

export default function createChat(title: string, userIds?: number[]): void {
    chatsAPI
        .createChat({ title })
        .then(() => chatsAPI.listChats())
        .then(
            (xhr: XMLHttpRequest): Promise<boolean> => {
                const refreshedExistingChats: IExistingChat[] = JSON.parse(xhr.response);
                globalStateInstance.setProp("existingChats", refreshedExistingChats);
                const createdChat = refreshedExistingChats.find((chat) => chat.title === title);
                if (!createdChat) {
                    throw new Error("[ERROR] Chat was not created");
                }
                globalStateInstance.setProp("selectedChat", createdChat);

                if (userIds) {
                    return addUsersToChat(userIds, createdChat.id);
                }
                return Promise.resolve(false);
            }
        )
        .then((): void => {
            router.go("/conversation/");
            if (router._currentRoute && router._currentRoute._block) {
                const pageBlock = router._currentRoute._block;
                const existingChats = globalStateInstance.getProp("existingChats");
                const selectedChat = globalStateInstance.getProp("selectedChat");
                const existingChatsList = handleExistingChats(existingChats);
                setConversationInfo(selectedChat, pageBlock, false);
                connectToChat(pageBlock).catch((error) => console.error("[ERROR] Could not connect to chat", error));
                renderChatsList(existingChatsList, pageBlock, selectedChat);
            }
        })
        .catch((error: XMLHttpRequest) => console.error("[ERROR] Could not create new chat", error));
}
