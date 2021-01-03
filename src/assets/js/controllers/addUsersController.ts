import ChatsAPI from "../api/chats-api";

const chatsAPI = new ChatsAPI();

export default function addUsersToChat(users: number[], chatId: number): Promise<boolean> {
    return chatsAPI.addUsers({users, chatId})
        .then((xhr: XMLHttpRequest) => {
            console.log("[SUCCESS] User added to the new chat", xhr.response);
            return true;
        })
        .catch((error: XMLHttpRequest) => {
            console.log("[ERROR] Could not add users to the new chat", error.response);
            return false;
        });
}