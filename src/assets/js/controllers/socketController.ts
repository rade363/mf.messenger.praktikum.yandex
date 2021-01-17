import globalStateInstance from "../modules/GlobalState/globalStateInstance";
import { SOCKET_URL } from "../constants/index";
import { getTime, isPlainObject } from "../modules/helpers";
import { scrollToBottomOfElement } from "../modules/domHelpers";
import setConversationInfo from "./conversationInfoController";

export function openSocket(token: string, conversationPage: IBlock): void {
    const currentUser: IUser = globalStateInstance.getProp("currentUser");
    const selectedChat: IExistingChat = globalStateInstance.getProp("selectedChat");
    const socket: WebSocket = new WebSocket(`${SOCKET_URL}/${currentUser.id}/${selectedChat.id}/${token}`);
    // TODO: reopen socket

    globalStateInstance.setProp("socketInstance", socket);
    globalStateInstance.setProp("messagesHistory", []);

    socket.addEventListener("open", () => {
        console.info("[WS][INFO] Connected");
        globalStateInstance.setProp("isSocketOpen", true);

        socket.send(
            JSON.stringify({
                content: "0",
                type: "get old"
            })
        );
    });

    socket.addEventListener("close", (event: CloseEvent) => {
        globalStateInstance.setProp("isSocketOpen", false);
        if (event.wasClean) {
            console.info("[WS][INFO] Connection closed");
        } else {
            console.info("[WS][INFO] Disconnected");
        }

        setConversationInfo(selectedChat, conversationPage, false);

        if (event.code === 1006) {
            openSocket(token, conversationPage);
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
                setConversationInfo(selectedChat, conversationPage, true);
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

function prepareMessage(message: ISocketMessage, currentUser: IUser): IMessage {
    return {
        outgoing: message.user_id === currentUser.id,
        text: message.content,
        imageUrl: "",
        time: getTime(message.time),
        status: "read"
    };
}

function renderMessages(messages: ISocketMessage[], conversationPage: IBlock, currentUser: IUser) {
    globalStateInstance.setProp("messagesHistory", messages);

    conversationPage.props.conversationMain.props.messagesList.setProps({
        messagesList: messages.map((message: ISocketMessage) => prepareMessage(message, currentUser)).reverse()
    });

    const messagesListElement = conversationPage.props.conversationMain.props.messagesList.getContent();
    if (messagesListElement) {
        scrollToBottomOfElement(messagesListElement);
    }
}

export function sendMessage(socket: WebSocket, content: string): void {
    socket.send(
        JSON.stringify({
            content,
            type: "message"
        })
    );
}
