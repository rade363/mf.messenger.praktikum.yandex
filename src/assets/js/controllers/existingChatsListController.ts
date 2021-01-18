import ChatList from "../components/ChatList/index";
import { createAPIUrl } from "../modules/domHelpers";
import { filterCurrentUserFromTitle } from "../modules/helpers";
import { NO_AVATAR_IMG } from "../constants/index";
import ChatsAPI from "../api/chats-api";
import globalStateInstance from "../modules/GlobalState/globalStateInstance";

const chatsAPI = new ChatsAPI();

export function getExistingChats(): Promise<IExistingChat[]> | never {
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

export function renderChatsList(existingChatsList: IChatListItem[], context: IBlock, selectedChat?: IExistingChat): void {
    const oldProps = context.props.chatList.props;
    const currentUser: IUser = globalStateInstance.getProp("currentUser");

    const items = existingChatsList.map(
        (item: IChatListItem): IChatListItem => {
            const isSelected = selectedChat && selectedChat.id && item.id === selectedChat.id;
            const title = filterCurrentUserFromTitle(item.title, currentUser);
            return {
                ...item,
                isSelected: isSelected === true,
                title
            };
        }
    );

    const chatList = new ChatList({ ...oldProps, items });

    context.setProps({ chatList });
}
