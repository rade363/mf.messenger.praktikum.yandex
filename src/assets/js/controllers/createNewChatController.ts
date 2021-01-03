import ChatsAPI from "../api/chats-api";
import Router from "../modules/Router";
import {handleExistingChats, renderChatsList} from "./existingChatsListController";
import {setConversationMain} from "./conversationMainController";
import addUsersToChat from "./addUsersController";

const chatsAPI = new ChatsAPI();

export default function createChat(title: string, globalStateInstance: IGlobalState, router: Router, userIds?: number[]): void {
    chatsAPI.createChat({title})
        .then((xhr: XMLHttpRequest) => {
            console.log('[SUCCESS] Chat created', xhr.response);
            return chatsAPI.listChats();
        })
        .then((xhr: XMLHttpRequest) => {
            const refreshedExistingChats: IExistingChat[] = JSON.parse(xhr.response);
            globalStateInstance.setProp("existingChats", refreshedExistingChats);
            const createdChat = refreshedExistingChats.find(chat => chat.title === title);
            if (!createdChat) {
                throw new Error("[ERROR] Chat was not created");
            }
            globalStateInstance.setProp("selectedChat", createdChat);

            if (userIds) {
                return addUsersToChat(userIds, createdChat.id);
            }
        })
        .then(() => {
            router.go("/conversation/");
            if (router._currentRoute && router._currentRoute._block) {
                const pageBlock = router._currentRoute._block;
                const existingChats = globalStateInstance.getProp("existingChats");
                const selectedChat = globalStateInstance.getProp("selectedChat");
                const existingChatsList = handleExistingChats(existingChats);
                setConversationMain(selectedChat, pageBlock);
                return renderChatsList(existingChatsList, pageBlock, selectedChat);
            }
        })
        .catch((error: XMLHttpRequest) => {
            console.log('[ERROR] Could not create new chat', error);
        });
}