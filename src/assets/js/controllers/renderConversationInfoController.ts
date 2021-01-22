import { filterCurrentUserFromTitle } from "../modules/utils";
import globalStateInstance from "../modules/GlobalState/globalStateInstance";
import Router from "../modules/Router/Router";

export default function renderConversationInfo(selectedChat: IChat, isOnline: boolean): void {
    const router = new Router("#root");
    const currentPage = router._currentRoute;
    if (!currentPage || currentPage._pathname !== "/conversation/") {
        return;
    }
    const pageBlock = currentPage._block;
    if (!pageBlock) {
        return;
    }

    const currentUser = globalStateInstance.getProp("currentUser");
    const title = filterCurrentUserFromTitle(selectedChat.title, currentUser);
    pageBlock.props.conversationMain.props.conversationUserInfo.setProps({
        name: title,
        isOnline
    });
}
