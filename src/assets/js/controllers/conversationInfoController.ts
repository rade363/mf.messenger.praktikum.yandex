import { filterCurrentUserFromTitle } from "../modules/helpers";

export default function setConversationInfo(selectedChat: IExistingChat, pageBlock: IBlock, user: IUser, isOnline: boolean): void {
    const title = filterCurrentUserFromTitle(selectedChat.title, user);
    pageBlock.props.conversationMain.props.conversationUserInfo.setProps({
        name: title,
        isOnline
    });
}
