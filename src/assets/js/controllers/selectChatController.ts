import globalStateInstance from "../modules/GlobalState/globalStateInstance";
import { handleExistingChats, renderChatsList } from "./existingChatsListController";
import setConversationInfo from "./conversationInfoController";
import createChat from "./createNewChatController";
import connectToChat from "./connectToChatController";
import Router from "../modules/Router/Router";
import { createUsername } from "../modules/helpers";
import getChatUsers from "./collectChatUsersController";
import ConversationContextMenu from "../components/ConversationContextMenu/index";

const router = new Router("#root");

export default function handleChatClick(props: IChatListItem): void | undefined {
    const { title, id } = props;
    const existingChats: IExistingChat[] = globalStateInstance.getProp("existingChats");
    const selectedChat = existingChats.find((chat) => chat.id === id);
    const currentUser = globalStateInstance.getProp("currentUser");

    if (!selectedChat) {
        const currentUsername = createUsername(currentUser);
        const newChatTitle = `${currentUsername} ${title}`;
        return createChat(newChatTitle, [id]);
    }

    globalStateInstance.setProp("selectedChat", selectedChat);
    if (!router._currentRoute || router._currentRoute._pathname !== "/conversation/") {
        router.go("/conversation/");
    }

    if (router._currentRoute && router._currentRoute._block) {
        const pageBlock = router._currentRoute._block;
        const existingChatsList = handleExistingChats(existingChats);
        setConversationInfo(selectedChat, pageBlock, currentUser, false);

        const chatUsers = globalStateInstance.getProp("chatUsers");
        const contextMenu = pageBlock.props.conversationMain.props.conversationActionsButton.props.conversationContextMenu;
        const isGroupChat = selectedChat.title.indexOf("Group: ") === 0;
        if (!chatUsers && contextMenu.props.items.length < 2 && isGroupChat) {
            getChatUsers(globalStateInstance).then(() => rerenderContextMenu(pageBlock));
        } else {
            rerenderContextMenu(pageBlock);
        }

        connectToChat(pageBlock).catch((error) => console.error("[ERROR] Could not connect to chat", error));
        return renderChatsList(existingChatsList, pageBlock, selectedChat);
    }
    return undefined;
}

function rerenderContextMenu(pageBlock: IBlock): void {
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
