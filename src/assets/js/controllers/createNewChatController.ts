import ChatsAPI from "../api/chats-api";
import addUsersToChat from "./addUsersController";
import ChatsController, { collectChatPrerequisites } from "../modules/ChatsController/ChatsController";
import renderChat from "./renderChatController";

const chatsAPI = new ChatsAPI();
const controller = new ChatsController();

export default function createChat(title: string, userIds?: number[]): void {
    chatsAPI
        .createChat({ title })
        .then(
            (newChatResponse: ICreatedChatResponse): Promise<ICreatedChatResponse> => {
                if (userIds) {
                    return addUsersToChat(userIds, newChatResponse.id).then(() => newChatResponse);
                }
                return Promise.resolve(newChatResponse);
            }
        )
        .then(
            (newChatResponse: ICreatedChatResponse): Promise<IChat> => {
                const createdChat: IExistingChat = {
                    ...newChatResponse,
                    title,
                    avatar: ""
                };
                return collectChatPrerequisites(createdChat);
            }
        )
        .then((chat: IChat): void => {
            controller.addChat(chat);
            controller.selectedChat = controller.chatsList[controller.chatsList.length - 1];
            controller.initSocket(controller.selectedChat);
            renderChat(controller.selectedChat);
        })
        .catch((error: XMLHttpRequest) => console.error("[ERROR] Could not create new chat", error));
}
