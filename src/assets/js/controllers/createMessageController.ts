import globalStateInstance from "../modules/GlobalState/globalStateInstance";
import { sendMessage } from "./socketController";

export default function createMessage(content: string): void {
    const socket: WebSocket = globalStateInstance.getProp("socketInstance");
    const isSocketOpen: boolean = globalStateInstance.getProp("isSocketOpen");
    if (isSocketOpen) {
        sendMessage(socket, content);
    }
}
