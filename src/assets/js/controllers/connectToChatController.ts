import globalStateInstance from "../modules/GlobalState/globalStateInstance";
import ChatsAPI from "../api/chats-api";
import { openSocket } from "./socketController";

const chatsAPI = new ChatsAPI();

export default function connectToChat(conversationPage: IBlock): Promise<boolean> {
    const selectedChat: IExistingChat = globalStateInstance.getProp("selectedChat");
    return chatsAPI
        .connectToChat(selectedChat.id)
        .then((xhr: XMLHttpRequest) => {
            const response = JSON.parse(xhr.response);
            openSocket(response.token, conversationPage);
            return true;
        })
        .catch((error: XMLHttpRequest) => {
            console.error("[ERROR] Could not retrieve chat token", error);
            return false;
        });
}
