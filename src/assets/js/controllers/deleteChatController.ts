import ChatsAPI from "../api/chats-api.js";
import {handleExistingChats, renderChatsList} from "./existingChatsListController.js";
import Router from "../modules/Router";
const chatsAPI = new ChatsAPI();

export default function handleDeleteChat(globalStateInstance: IGlobalState, router: Router, deleteConversationModal: IBlock): void {
    const deletedChat = globalStateInstance.getProp("selectedChat");
    console.log('[INFO] Deleting conversation...', deletedChat);
    removeDeletedChatFromState(globalStateInstance, deletedChat);

    deleteChat(deletedChat)
        .then(() => {
            deleteConversationModal.hide();
            router.go("/chats/");
            const existingChats = globalStateInstance.getProp("existingChats");

            if (router._currentRoute && router._currentRoute._block) {
                const pageBlock = router._currentRoute._block;
                const existingChatsList = handleExistingChats(existingChats);
                renderChatsList(existingChatsList, pageBlock, deletedChat);
            }
        })
        .catch((error: XMLHttpRequest) => console.log('[ERROR] Could not delete chat', error));
}

function deleteChat(deletedChat: IExistingChat): Promise<XMLHttpRequest> {
    const chatId = deletedChat.id;
    return chatsAPI.deleteChat({chatId});
}

function removeDeletedChatFromState(globalStateInstance: IGlobalState, deletedChat: IExistingChat): void {
    const existingChats = globalStateInstance.getProp("existingChats");
    const updatedExistingChatsList = existingChats.filter((chat: IExistingChat) => chat.id !== deletedChat.id);
    globalStateInstance.setProp("existingChats", updatedExistingChatsList);
}