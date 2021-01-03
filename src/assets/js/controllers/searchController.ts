import UserAPI from "../api/user-api";
import {createAPIUrl} from "../modules/domHelpers";
import {NO_AVATAR_IMG} from "../constants/index";
import ChatList from "../components/ChatList/index";

const userAPI = new UserAPI();

export default function handleUserSearch(login: string, context: IBlock): void {
    userAPI.searchUserByLogin({login})
        .then((xhr: XMLHttpRequest) => {
            const response: IUser[] = JSON.parse(xhr.response);
            const searchResults = response.map(createFoundUserPreviewObject);
            const oldProps = context.props.chatList.props;
            const chatList = new ChatList({...oldProps, items: searchResults});
            context.setProps({ chatList });
        })
        .catch((error: XMLHttpRequest) => console.log('[CHATS] [SEARCH] ERROR', error));
}

function createFoundUserPreviewObject(user: IUser): IChatListItem {
    return {
        avatar: user.avatar ? createAPIUrl(user.avatar) : NO_AVATAR_IMG,
        title: createUsername(user),
        lastMessage: "",
        lastMessageBy: "",
        time: "",
        unread: 0,
        isSelected: false,
        id: user.id
    };
}

function createUsername(user: IUser): string {
    if (user.display_name) {
        return user.display_name;
    }
    if (!user.first_name && !user.second_name) {
        return user.login;
    }
    const firstName = user.first_name ? user.first_name : "";
    const lastName = user.second_name ? user.second_name : "";
    return `${firstName}${firstName !== "" ? ` ${lastName}` : lastName}`;
}