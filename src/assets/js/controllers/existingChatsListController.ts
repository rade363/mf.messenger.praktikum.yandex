import ChatList from "../components/ChatList/index";
import {createAPIUrl} from "../modules/domHelpers";
import {NO_AVATAR_IMG} from "../constants/index";
import ChatsAPI from "../api/chats-api";
const chatsAPI = new ChatsAPI();

export function getExistingChats(globalStateInstance: IGlobalState) {
    const existingChats = globalStateInstance.getProp("existingChats");
    if (existingChats) {
        return existingChats;
    }
    return chatsAPI.listChats()
        .then((xhr: XMLHttpRequest) => {
            const existingChats = JSON.parse(xhr.response);
            globalStateInstance.setProp("existingChats", existingChats);
            return existingChats;
        })
        .catch((error: XMLHttpRequest) => {
            console.log("[ERROR] Could not collect existing chats", error);
            throw new Error("Could not collect existing chats");
        })
}

export function handleExistingChats(existingChats: IExistingChat[]): IChatListItem[] {
    return existingChats.map(createExistingChatPreviewObject);
}

export function renderChatsList(existingChatsList: IChatListItem[], context: IBlock, selectedChat?: IExistingChat): void {
    const oldProps = context.props.chatList.props;
    const items = selectedChat && selectedChat.id
        ? existingChatsList.map(item => markSelectedListItem(item, selectedChat))
        : existingChatsList;
    const chatList = new ChatList({ ...oldProps, items });

    context.setProps({chatList});
}

function markSelectedListItem(item: IChatListItem, selectedChat: IExistingChat): IChatListItem {
    if (item.id === selectedChat.id) {
        item.isSelected = true;
    }
    return item;
}

function createExistingChatPreviewObject(chat: IExistingChat): IChatListItem {
    return {
        avatar: chat.avatar ? createAPIUrl(chat.avatar) : NO_AVATAR_IMG,
        title: chat.title,
        lastMessage: "",
        lastMessageBy: "",
        time: "",
        unread: 0,
        isSelected: false,
        id: chat.id
    }
}