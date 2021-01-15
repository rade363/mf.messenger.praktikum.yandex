import ChatsAPI from "../api/chats-api";

const chatsAPI = new ChatsAPI();

export default function getChatUsers(globalStateInstance: IGlobalState): Promise<boolean> | never {
    const selectedChat = globalStateInstance.getProp("selectedChat");
    return chatsAPI
        .listChatUsers(selectedChat.id)
        .then((xhr: XMLHttpRequest) => {
            const chatUsers: IUser[] = JSON.parse(xhr.response);
            globalStateInstance.setProp("chatUsers", chatUsers);
            return true;
        })
        .catch((error: XMLHttpRequest | Error) => {
            console.error("[ERROR] Could not get chat users ", error);
            const text = error instanceof Error ? error.message : error.response;
            throw new Error(text);
        });
}
