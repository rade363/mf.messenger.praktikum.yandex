import ChatsAPI from "../api/chats-api";
import Router from "../modules/Router/Router";
import { handleExistingChats, renderChatsList } from "./existingChatsListController";
import setConversationMain from "./conversationMainController";
import addUsersToChat from "./addUsersController";
import globalStateInstance from "../modules/GlobalState/globalStateInstance";

const chatsAPI = new ChatsAPI();
const router = new Router("#root");

export function createChat(title: string, userIds?: number[]): void {
    chatsAPI
        .createChat({ title })
        .then(() => chatsAPI.listChats())
        .then((xhr: XMLHttpRequest): never | Promise<boolean> => {
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
            throw new Error("[ERROR] Users ids are not available");
        })
        .then((): void => {
            router.go("/conversation/");
            if (router._currentRoute && router._currentRoute._block) {
                const pageBlock = router._currentRoute._block;
                const existingChats = globalStateInstance.getProp("existingChats");
                const selectedChat = globalStateInstance.getProp("selectedChat");
                const existingChatsList = handleExistingChats(existingChats);
                setConversationMain(selectedChat, pageBlock);
                renderChatsList(existingChatsList, pageBlock, selectedChat);
            }
        })
        .catch((error: XMLHttpRequest) => console.error("[ERROR] Could not create new chat", JSON.parse(error.response)));
}

export function handleChatClick(props: IChatListItem): void | undefined {
    const { title, id } = props;
    const existingChats: IExistingChat[] = globalStateInstance.getProp("existingChats");
    const selectedChat = existingChats.find((chat) => chat.title === title);

    if (!selectedChat) {
        return createChat(title, [id]);
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
    return undefined;
}
