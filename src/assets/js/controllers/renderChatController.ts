import renderConversationInfo from "./renderConversationInfoController";
import rerenderContextMenu from "./rerenderContextMenuController";
import renderChatsList from "./renderChatsListController";
import renderMessages from "./renderMessagesController";
import addScrollEventListener from "./scrollEventController";
import Router from "../modules/Router/Router";

const router = new Router("#root");

export default function renderChat(selectedChat: IChat): void {
    if (!router._currentRoute || router._currentRoute._pathname !== "/conversation/") {
        router.go("/conversation/");
    }

    if (router._currentRoute && router._currentRoute._block) {
        const pageBlock = router._currentRoute._block;

        selectedChat.unread = 0;

        renderConversationInfo(selectedChat, false);
        rerenderContextMenu(pageBlock);
        renderChatsList();
        renderMessages(true);

        if (selectedChat.totalHistory > 19) {
            addScrollEventListener();
        }
    }
}
