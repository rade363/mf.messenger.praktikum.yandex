import ChatsController from "../modules/ChatsController/ChatsController";
import Router from "../modules/Router/Router";

export default function addScrollEventListener(): void {
    const router = new Router("#root");
    const currentPage = router._currentRoute;
    if (!currentPage) {
        return;
    }

    if (currentPage._pathname !== "/conversation/") {
        return;
    }

    const pageBlock = currentPage._block;
    if (!pageBlock) {
        return;
    }

    const controller = new ChatsController();
    const chat = controller.selectedChat;
    if (!chat) {
        return;
    }

    const messagesListElement = pageBlock.props.conversationMain.props.messagesList.getContent();
    messagesListElement.addEventListener("scroll", () => {
        if (messagesListElement.scrollTop === 0) {
            controller.getHistory(chat.socket, chat.totalHistory);
        }
    });
}
