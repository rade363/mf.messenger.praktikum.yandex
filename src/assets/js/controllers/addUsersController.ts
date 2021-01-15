import ChatsAPI from "../api/chats-api";

const chatsAPI = new ChatsAPI();

export default function addUsersToChat(users: number[], chatId: number): Promise<boolean> {
    return chatsAPI
        .addUsers({ users, chatId })
        .then(() => true)
        .catch((error: XMLHttpRequest) => {
            console.error("[ERROR] Could not add users to the new chat", error.response);
            return false;
        });
}
