import Router from "../modules/Router/Router";
import ChatsController from "../modules/ChatsController/ChatsController";
import globalStateInstance from "../modules/GlobalState/globalStateInstance";
import { scrollToBottomOfElement } from "../modules/domHelpers";
import { createUsername, getTime, isChatGroup } from "../modules/helpers";

function specifyUser(authorId: number, currentUser: IUser, chatUsers: IUser[]): string {
    if (authorId === currentUser.id) {
        return "";
    }

    if (chatUsers.length < 2) {
        return "";
    }

    const author = chatUsers.find((user: IUser) => user.id === authorId);
    return author ? createUsername(author) : "UNKNOWN";
}

function prepareMessage(message: ISocketMessage, chat: IChat): IMessage {
    const currentUser: IUser = globalStateInstance.getProp("currentUser");
    return {
        outgoing: message.user_id === currentUser.id,
        text: message.content,
        imageUrl: "",
        time: getTime(message.time),
        status: "read",
        isGroup: isChatGroup(chat.title),
        username: isChatGroup(chat.title) ? specifyUser(message.user_id, currentUser, chat.users) : ""
    };
}

export default function renderMessages(shouldBeScrolledToBottom: boolean): void {
    const router = new Router("#root");

    const currentPage = router._currentRoute;
    if (!currentPage) {
        return;
    }

    const pageBlock = currentPage._block;
    if (!pageBlock) {
        return;
    }

    const controller = new ChatsController();
    const { selectedChat } = controller;
    if (!selectedChat) {
        return;
    }

    const messagesList = selectedChat.messages.map((message: ISocketMessage) => prepareMessage(message, selectedChat)).reverse();
    pageBlock.props.conversationMain.props.messagesList.setProps({ messagesList });

    const messagesListElement = pageBlock.props.conversationMain.props.messagesList.getContent();
    if (messagesListElement && shouldBeScrolledToBottom) {
        scrollToBottomOfElement(messagesListElement);
    }
}
