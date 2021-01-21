import ChatsAPI from "../api/chats-api";
import ChatsController from "../modules/ChatsController/ChatsController";

const chatsAPI = new ChatsAPI();

export default function handleDeleteUserClick(deletedUser: IUser): void {
    const controller = new ChatsController();
    const { selectedChat } = controller;
    if (!selectedChat) {
        return;
    }

    const userRemovalData = {
        users: [deletedUser.id],
        chatId: selectedChat.id
    };
    chatsAPI
        .deleteUsers(userRemovalData)
        .then(() => {
            const oldProps = this.props;
            const newUsers = oldProps.users.filter((renderedUser: IDeleteUserProps) => renderedUser.login !== deletedUser.login);
            this.setProps({ users: newUsers });

            selectedChat.users = selectedChat.users.filter((user: IUser) => user.id !== deletedUser.id);
        })
        .catch((error: XMLHttpRequest) => console.error(`[ERROR] Could not delete user ${deletedUser.login} from chat ${selectedChat.title}`, error));
}
