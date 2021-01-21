import ChatsAPI from "../../api/chats-api";
import globalStateInstance from "../GlobalState/globalStateInstance";
import { SOCKET_URL } from "../../constants/index";
import { isPlainObject } from "../helpers";
import renderChatsList from "../../controllers/renderChatsListController";
import renderMessages from "../../controllers/renderMessagesController";
import renderConversationInfo from "../../controllers/renderConversationInfoController";
import addScrollEventListener from "../../controllers/scrollEventController";

const chatsAPI = new ChatsAPI();

function isPromiseFulfilled(response: IAllSettledResponse): boolean {
    return response.status === "fulfilled" && response.value !== undefined;
}

function getParsedResponse(response: IAllSettledResponse): any {
    const payload: XMLHttpRequest = response.value;
    return JSON.parse(payload.response);
}

function getUnreadMessagesAmount(payload: IAllSettledResponse): number {
    if (isPromiseFulfilled(payload)) {
        const response = getParsedResponse(payload);
        if (typeof response.unread_count === "number") {
            return response.unread_count;
        }
    }
    return 0;
}

function getTokenResponse(payload: IAllSettledResponse): string {
    if (isPromiseFulfilled(payload)) {
        const response = getParsedResponse(payload);
        if (typeof response.token === "string") {
            return response.token;
        }
    }
    return "";
}

function mergeCollectedResponses(responses: IAllSettledResponse[], chat: IExistingChat): IChat {
    const [newMessageResponse, tokenResponse, chatUsersResponse] = responses;
    const unread: number = getUnreadMessagesAmount(newMessageResponse);
    const token: string = getTokenResponse(tokenResponse);
    const users: IUser[] = isPromiseFulfilled(chatUsersResponse) ? getParsedResponse(chatUsersResponse) : [];
    const currentUser: IUser = globalStateInstance.getProp("currentUser");
    const socket: WebSocket = new WebSocket(`${SOCKET_URL}/${currentUser.id}/${chat.id}/${token}`);
    return {
        ...chat,
        unread,
        token,
        users,
        socket,
        messages: [],
        lastMessage: null,
        totalHistory: 0,
        wasInitialized: false
    };
}

export function collectChatPrerequisites(chat: IExistingChat): Promise<IChat> {
    return Promise.allSettled([
        chatsAPI.collectNewMessagesCount(chat.id),
        chatsAPI.getToken(chat.id),
        chatsAPI.getChatUsers(chat.id)
    ]).then((responses: IAllSettledResponse[]) => mergeCollectedResponses(responses, chat));
}

function collectChatsPrerequisites(chats: IExistingChat[]): Promise<IChat[]> {
    return Promise.all(chats.map((chat: IExistingChat) => collectChatPrerequisites(chat)));
}

export default class ChatsController {
    private static __instance: ChatsController;

    chatsList: IChat[];

    selectedChat: null | IChat;

    wasInitialized: boolean;

    constructor() {
        if (ChatsController.__instance) {
            return ChatsController.__instance;
        }

        this.chatsList = [];

        ChatsController.__instance = this;
    }

    getHistory(socket: WebSocket, page = 0): void {
        socket.send(
            JSON.stringify({
                content: `${page}`,
                type: "get old"
            })
        );
    }

    openSocket(chat: IChat): void {
        chat.socket.addEventListener("open", () => {
            if (!chat.wasInitialized) {
                this.getHistory(chat.socket);
                chat.wasInitialized = true;
            }
        });
    }

    reopenSocket(chat: IChat): void {
        const currentUser: IUser = globalStateInstance.getProp("currentUser");
        chat.socket = new WebSocket(`${SOCKET_URL}/${currentUser.id}/${chat.id}/${chat.token}`);
        this.initSocket(chat);
    }

    addSocketCloseEventListener(chat: IChat): void {
        chat.socket.addEventListener("close", (event: CloseEvent) => {
            renderConversationInfo(chat, false);

            if (event.code === 1006) {
                this.reopenSocket(chat);
            }
        });
    }

    handleBulkMessages(chat: IChat, newMessages: ISocketMessage[]): void {
        chat.messages = [...chat.messages, ...newMessages];
        chat.lastMessage = chat.messages.length > 0 ? chat.messages[0] : null;

        renderChatsList();
        const shouldBeScrolledToBottom = this.selectedChat && this.selectedChat.id === chat.id && chat.totalHistory < 20;
        renderMessages(shouldBeScrolledToBottom === true);

        chat.totalHistory += newMessages.length;
        if (chat.totalHistory > 20) {
            addScrollEventListener();
        }
    }

    fixMessageObject(message: ISocketNewMessage, chatId: number): ISocketMessage {
        return {
            id: message.id,
            user_id: message.userId,
            time: message.time,
            content: message.content,
            chat_id: chatId
        };
    }

    handleSingleMessage(chat: IChat, newMessage: ISocketNewMessage): void {
        const correctMessage = this.fixMessageObject(newMessage, chat.id);

        chat.messages = [correctMessage, ...chat.messages];
        chat.lastMessage = correctMessage;

        renderChatsList();

        if (this.selectedChat && this.selectedChat.id === chat.id) {
            renderMessages(true);
        }
    }

    addSocketMessageListener(chat: IChat): void {
        chat.socket.addEventListener("message", (event: MessageEvent<any>) => {
            const data: IUserConnected | ISocketNewMessage | ISocketMessage[] = JSON.parse(event.data);
            if (Array.isArray(data)) {
                this.handleBulkMessages(chat, data);
            } else if (isPlainObject(data) && data.type) {
                if (data.type === "message") {
                    this.handleSingleMessage(chat, data);
                } else if (data.type === "user connected") {
                    renderConversationInfo(chat, true);
                }
            } else {
                console.info("[WS][INFO] Unknown message", data);
            }
        });
    }

    addSocketErrorListener(chat: IChat): void {
        chat.socket.addEventListener("error", (event: ErrorEvent) => {
            console.error("[WS][ERROR]", event.message);
        });
    }

    initSocket(chat: IChat): void {
        this.openSocket(chat);
        this.addSocketCloseEventListener(chat);
        this.addSocketMessageListener(chat);
        this.addSocketErrorListener(chat);
    }

    init(): Promise<boolean> {
        return chatsAPI
            .listChats()
            .then((xhr: XMLHttpRequest): IExistingChat[] => JSON.parse(xhr.response))
            .then(collectChatsPrerequisites)
            .then((chats: IChat[]): true => {
                this.chatsList = chats;
                this.chatsList.forEach((chat: IChat) => this.initSocket(chat));
                this.wasInitialized = true;
                return true;
            })
            .catch((error: XMLHttpRequest | Error): false => {
                console.error("[ERROR] Could not collect existing chats", error);
                this.wasInitialized = false;
                return false;
            });
    }

    getChat(chatId: number): IChat | undefined {
        return this.chatsList.find((chat: IChat) => chat.id === chatId);
    }

    setSelectedChat(selectedChat: IChat): void {
        this.selectedChat = selectedChat;
    }

    addChat(newChat: IChat): void {
        const isChatPresent = this.getChat(newChat.id);
        if (!isChatPresent) {
            this.chatsList.push(newChat);
        }
    }

    removeChat(chatId: number): void {
        this.chatsList = this.chatsList.filter((chat: IChat) => chat.id !== chatId);
    }

    sendMessage(content: string): void {
        if (!this.selectedChat) {
            return;
        }
        this.selectedChat.socket.send(
            JSON.stringify({
                content,
                type: "message"
            })
        );
    }
}
