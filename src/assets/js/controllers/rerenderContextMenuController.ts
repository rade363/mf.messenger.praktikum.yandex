import ConversationContextMenu from "../components/ConversationContextMenu/index";

export default function rerenderContextMenu(pageBlock: IBlock): void {
    const addUserModal = pageBlock.props.modals[0].modal;
    const deleteConversationModal = pageBlock.props.modals[1].modal;
    const deleteUserModal = pageBlock.props.modals[3].modal;
    const { conversationActionsButton } = pageBlock.props.conversationMain.props;
    conversationActionsButton.setProps({
        conversationContextMenu: new ConversationContextMenu({
            addUserModal,
            deleteConversationModal,
            deleteUserModal,
            setIsConversationActionsMenuOpen: conversationActionsButton.setIsConversationActionsMenuOpen
        })
    });
}
