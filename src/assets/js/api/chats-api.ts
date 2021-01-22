import HTTPRequest from "../modules/HTTPRequest/HTTPRequest";

const chatsAPIInstance = new HTTPRequest({
    url: "https://ya-praktikum.tech/api/v2/chats",
    headers: {
        "Content-Type": "application/json"
    }
});

export default class ChatsAPI {
    listChats = (): Promise<IExistingChat[]> => {
        return chatsAPIInstance.get("", {});
    };

    createChat = (data: INewChatProps): Promise<ICreatedChatResponse> => {
        return chatsAPIInstance.post("", { data });
    };

    deleteChat = (data: IDeleteChatProps): Promise<IDeleteChatResponse> => {
        return chatsAPIInstance.delete("", { data });
    };

    getChatUsers = (chatId: number): Promise<IUser[]> => {
        return chatsAPIInstance.get(`/${chatId}/users`, {});
    };

    addUsers = (data: IChatActionUsersProps): Promise<TOkResponse> => {
        return chatsAPIInstance.put("/users", { data });
    };

    deleteUsers = (data: IChatActionUsersProps): Promise<TOkResponse> => {
        return chatsAPIInstance.delete("/users", { data });
    };

    getToken = (chatId: number): Promise<ITokenResponse> => {
        return chatsAPIInstance.post(`/token/${chatId}`);
    };

    collectNewMessagesCount = (chatId: number): Promise<IUnreadMessagesResponse> => {
        return chatsAPIInstance.get(`/new/${chatId}`);
    };
}
