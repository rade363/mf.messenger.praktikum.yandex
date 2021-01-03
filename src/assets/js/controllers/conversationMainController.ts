import ConversationMain from "../components/ConversationMain/index";

export function setConversationMain(selectedChat: IExistingChat, context: IBlock): void {
    const oldProps = context.props.conversationMain.props;
    context.setProps({
        conversationMain: new ConversationMain({
            ...oldProps,
            user: {
                name: selectedChat.title,
                status: "last seen recently"
            }
        })
    });
}

