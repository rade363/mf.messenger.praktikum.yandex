import ChatList from "../components/ChatList/index";
import { createAPIUrl } from "../modules/domHelpers";
import { filterCurrentUserFromTitle, createUsername, getTime } from "../modules/helpers";
import { NO_AVATAR_IMG } from "../constants/index";
import globalStateInstance from "../modules/GlobalState/globalStateInstance";
import ChatsController from "../modules/ChatsController/ChatsController";
import Router from "../modules/Router/Router";

function getLastMessageAuthor(chat: IChat): string {
    if (chat.lastMessage) {
        const lastMessageUserId = chat.lastMessage.user_id;
        const relevantUser = chat.users.find((user: IUser) => user.id === lastMessageUserId);
        if (relevantUser) {
            return createUsername(relevantUser);
        }
    }
    return "";
}

export default function renderChatsList(): void {
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
    const currentUser: IUser = globalStateInstance.getProp("currentUser");
    const oldChatListProps = pageBlock.props.chatList.props;

    const items = controller.chatsList.map(
        (chat: IChat): IChatListItem => {
            const isSelected = controller.selectedChat && controller.selectedChat.id && chat.id === controller.selectedChat.id;
            const lastMessage = chat.lastMessage ? chat.lastMessage.content : "";
            return {
                avatar: chat.avatar ? createAPIUrl(chat.avatar) : NO_AVATAR_IMG,
                title: filterCurrentUserFromTitle(chat.title, currentUser),
                lastMessage: lastMessage.length > 20 ? `${lastMessage.slice(0, 17)}...` : lastMessage,
                lastMessageBy: getLastMessageAuthor(chat),
                time: chat.lastMessage ? getTime(chat.lastMessage.time) : "",
                unread: chat.unread,
                isSelected: isSelected === true,
                id: chat.id
            };
        }
    );

    const chatList = new ChatList({ ...oldChatListProps, items });

    pageBlock.setProps({ chatList });
}
