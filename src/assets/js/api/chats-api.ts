import HTTPRequest from "../modules/HTTPRequest/HTTPRequest";

const chatsAPIInstance = new HTTPRequest({
    url: "https://ya-praktikum.tech/api/v2/chats",
    headers: {
        "Content-Type": "application/json"
    }
});

export default class ChatsAPI {
    listChats = (): Promise<XMLHttpRequest> => {
        return chatsAPIInstance.get("", {});
    };

    createChat = (data: INewChatProps): Promise<XMLHttpRequest> => {
        return chatsAPIInstance.post("", { data });
    };

    deleteChat = (data: IDeleteChatProps): Promise<XMLHttpRequest> => {
        return chatsAPIInstance.delete("", { data });
    };

    listChatUsers = (chatId: number): Promise<XMLHttpRequest> => {
        return chatsAPIInstance.get(`/${chatId}/users`, {});
    };

    addUsers = (data: IChatActionUsersProps): Promise<XMLHttpRequest> => {
        return chatsAPIInstance.put("/users", { data });
    };

    deleteUsers = (data: IChatActionUsersProps): Promise<XMLHttpRequest> => {
        return chatsAPIInstance.delete("/users", { data });
    };
}
