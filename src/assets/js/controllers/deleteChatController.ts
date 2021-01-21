import ChatsAPI from "../api/chats-api";
import renderChatsList from "./renderChatsListController";
import Router from "../modules/Router/Router";
import ChatsController from "../modules/ChatsController/ChatsController";

const chatsAPI = new ChatsAPI();
const router = new Router("#root");

export default function handleDeleteChat(deleteConversationModal: IBlock): void {
    const controller = new ChatsController();
    const { selectedChat } = controller;
    if (!selectedChat) {
        return;
    }

    chatsAPI
        .deleteChat({ chatId: selectedChat.id })
        .then(() => {
            deleteConversationModal.hide();

            controller.removeChat(selectedChat.id);
            controller.selectedChat = null;

            router.go("/chats/");

            renderChatsList();
        })
        .catch((error: XMLHttpRequest) => console.error("[ERROR] Could not delete chat", JSON.parse(error.response)));
}
