import globalStateInstance from "../modules/GlobalState/globalStateInstance";

export default function createMessage(content: string): void {
    const socket: WebSocket = globalStateInstance.getProp("socketInstance");
    socket.send(
        JSON.stringify({
            content,
            type: "message"
        })
    );
}
