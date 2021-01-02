export function setConversationTitle(selectedChat: IExistingChat, context: IBlock): void {
    const oldUserProps = context.props.conversationMain.props.user;
    const user = {
        ...oldUserProps,
        name: selectedChat.title,
        status: "last seen recently"
    };
    context.props.conversationMain.setProps({user});
}

