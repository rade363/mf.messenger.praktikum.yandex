import globalStateInstance from "../modules/GlobalState/globalStateInstance";
import createChat from "./createNewChatController";
import ChatsController from "../modules/ChatsController/ChatsController";
import { createUsername } from "../modules/utils";
import renderChat from "./renderChatController";

const chatsController = new ChatsController();

export default function handleChatClick(props: IChatListItem): void | null {
    const currentUser = globalStateInstance.getProp("currentUser");
    let selectedChat = chatsController.getChat(props.id);

    if (!selectedChat) {
        selectedChat = chatsController.chatsList.find((chat: IChat) => chat.title.indexOf(props.title) > -1);
        if (!selectedChat) {
            const currentUsername = createUsername(currentUser);
            const newChatTitle = `${currentUsername} ${props.title}`;
            return createChat(newChatTitle, [props.id]);
        }
    }

    chatsController.setSelectedChat(selectedChat);
    renderChat(selectedChat);
    return null;
}
