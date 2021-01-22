import UserAPI from "../api/user-api";
import { createAPIUrl } from "../modules/domHelpers";
import { createUsername } from "../modules/utils";
import { NO_AVATAR_IMG } from "../constants/index";
import ChatList from "../components/ChatList/index";

const userAPI = new UserAPI();

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

export default function handleUserSearch(login: string, context: IBlock): void {
    userAPI
        .searchUserByLogin({ login })
        .then((xhr: XMLHttpRequest) => {
            const response: IUser[] = JSON.parse(xhr.response);
            const searchResults = response.map(createFoundUserPreviewObject);
            const oldProps = context.props.chatList.props;
            const chatList = new ChatList({ ...oldProps, items: searchResults });
            context.setProps({ chatList });
        })
        .catch((error: XMLHttpRequest) => console.error("[ERROR] Could not find users", JSON.parse(error.response)));
}
