export default function setConversationInfo(selectedChat: IExistingChat, pageBlock: IBlock, isOnline: boolean): void {
    pageBlock.props.conversationMain.props.conversationUserInfo.setProps({
        name: selectedChat.title,
        isOnline
    });
}
