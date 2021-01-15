import ChatList from "../components/ChatList/index";
import { createAPIUrl } from "../modules/domHelpers";
import { NO_AVATAR_IMG } from "../constants/index";
import ChatsAPI from "../api/chats-api";

const chatsAPI = new ChatsAPI();

export function getExistingChats(globalStateInstance: IGlobalState): Promise<IExistingChat[]> | never {
    const existingChats = globalStateInstance.getProp("existingChats");
    if (existingChats) {
        return existingChats;
    }
    return chatsAPI
        .listChats()
        .then((xhr: XMLHttpRequest): IExistingChat[] => {
            const retrievedChats = JSON.parse(xhr.response);
            globalStateInstance.setProp("existingChats", retrievedChats);
            return retrievedChats;
        })
        .catch((error: XMLHttpRequest) => {
            console.error("[ERROR] Could not collect existing chats", JSON.parse(error.response));
            throw new Error("Could not collect existing chats");
        });
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
    };
}

export function handleExistingChats(existingChats: IExistingChat[]): IChatListItem[] {
    return existingChats.map(createExistingChatPreviewObject);
}

function markSelectedListItem(item: IChatListItem, selectedChat: IExistingChat): IChatListItem {
    return item.id === selectedChat.id ? { ...item, isSelected: true } : item;
}

export function renderChatsList(existingChatsList: IChatListItem[], context: IBlock, selectedChat?: IExistingChat): void {
    const oldProps = context.props.chatList.props;
    const items = selectedChat && selectedChat.id ? existingChatsList.map((item) => markSelectedListItem(item, selectedChat)) : existingChatsList;
    const chatList = new ChatList({ ...oldProps, items });

    context.setProps({ chatList });
}
