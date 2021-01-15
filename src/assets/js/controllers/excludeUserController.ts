import ChatsAPI from "../api/chats-api";
import globalStateInstance from "../modules/GlobalState/globalStateInstance";

const chatsAPI = new ChatsAPI();

export default function handleUserClick(user: IUser): void {
    const selectedChat: IExistingChat = globalStateInstance.getProp("selectedChat");
    const userRemovalData = {
        users: [user.id],
        chatId: selectedChat.id
    };
    chatsAPI
        .deleteUsers(userRemovalData)
        .then(() => {
            const oldProps = this.props;
            const newUsers = oldProps.users.filter((renderedUser: IDeleteUserProps) => renderedUser.login !== user.login);
            this.setProps({ users: newUsers });
        })
        .catch((error: XMLHttpRequest) =>
            console.error(`[ERROR] Could not delete user ${user.login} from chat ${selectedChat.title}`, JSON.parse(error.response))
        );
}
