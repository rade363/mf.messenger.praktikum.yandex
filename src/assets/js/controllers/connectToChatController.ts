import globalStateInstance from "../modules/GlobalState/globalStateInstance";
import ChatsAPI from "../api/chats-api";
import { SOCKET_URL } from "../constants/index";
import { isPlainObject, getTime } from "../modules/helpers";
import ConversationMain from "../components/ConversationMain/index";

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

function openSocket(token: string, conversationPage: IBlock) {
    const currentUser: IUser = globalStateInstance.getProp("currentUser");
    const selectedChat: IExistingChat = globalStateInstance.getProp("selectedChat");
    const socket: WebSocket = new WebSocket(`${SOCKET_URL}/${currentUser.id}/${selectedChat.id}/${token}`);

    globalStateInstance.setProp("socketInstance", socket);
    globalStateInstance.setProp("messagesHistory", []);

    socket.addEventListener("open", () => {
        console.info("[WS][INFO] Connected");

        socket.send(
            JSON.stringify({
                content: "0",
                type: "get old"
            })
        );
    });

    socket.addEventListener("close", (event: CloseEvent) => {
        // TODO: set status to Seen recently
        if (event.wasClean) {
            console.info("[WS][INFO] Connection closed");
        } else {
            console.info("[WS][INFO] Disconnected");
        }

        console.info(`Code ${event.code} | Reason ${event.reason}`);
    });

    socket.addEventListener("message", (event: MessageEvent<any>) => {
        const data: IUserConnected | ISocketNewMessage | ISocketMessage[] = JSON.parse(event.data);
        const previousMessages = globalStateInstance.getProp("messagesHistory");
        if (Array.isArray(data)) {
            const allMessages = [...previousMessages, ...data];
            renderMessages(allMessages, conversationPage, currentUser);
        } else if (isPlainObject(data) && data.type) {
            if (data.type === "message") {
                const correctMessage = fixMessageObject(data, selectedChat);
                const allMessages = [correctMessage, ...previousMessages];
                renderMessages(allMessages, conversationPage, currentUser);
            } else if (data.type === "user connected") {
                console.info("[INFO] User connected");
                // TODO: set user status to Online;
            }
        } else {
            console.info("[WS][INFO] Unknown message", data);
        }
    });

    socket.addEventListener("error", (event: ErrorEvent) => {
        console.error("[WS][ERROR]", event.message);
    });
}

function fixMessageObject(message: ISocketNewMessage, currentChat: IExistingChat): ISocketMessage {
    return {
        id: message.id,
        user_id: message.userId,
        time: message.time,
        content: message.content,
        chat_id: currentChat.id
    };
}

function renderMessages(messages: ISocketMessage[], conversationPage: IBlock, currentUser: IUser) {
    globalStateInstance.setProp("messagesHistory", messages);

    const oldProps = conversationPage.props.conversationMain.props;
    conversationPage.setProps({
        conversationMain: new ConversationMain({
            ...oldProps,
            messagesList: messages.map((message: ISocketMessage) => prepareMessage(message, currentUser)).reverse()
        })
    });
}

function prepareMessage(message: ISocketMessage, currentUser: IUser): IMessage {
    return {
        outgoing: message.user_id === currentUser.id,
        text: message.content,
        imageUrl: "",
        time: getTime(message.time),
        status: "read"
    };
}
