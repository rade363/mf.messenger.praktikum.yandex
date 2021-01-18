import Block from "../../modules/Block/Block";
import SearchInput from "../../components/SearchInput/index";
import template from "./template.handlebars";
import compile from "../../modules/templator/templator";
import ChatList from "../../components/ChatList/index";
import ConversationMain from "../../components/ConversationMain/index";
import Button from "../../components/Button/index";
import Router from "../../modules/Router/Router";
import handleUserSearch from "../../controllers/searchController";
import validateAuth from "../../controllers/authValidationController";
import { getExistingChats, handleExistingChats, renderChatsList } from "../../controllers/existingChatsListController";
import createNewGroupChatTitleModal from "../../controllers/newGroupChatTItleModalController";
import createAddUserModal from "../../controllers/addUserModalController";
import createDeleteUserModalController from "../../controllers/deleteUserFromGroupChatModalController";
import createDeleteConversationModal from "../../controllers/deleteConversationModalController";
import globalStateInstance from "../../modules/GlobalState/globalStateInstance";

const router = new Router("#root");

export default class Conversation extends Block {
    constructor() {
        const createGroupChatModal = createNewGroupChatTitleModal();
        const addUserModal = createAddUserModal(globalStateInstance);
        const deleteUserModal = createDeleteUserModalController(globalStateInstance);
        const deleteConversationModal: IBlock = createDeleteConversationModal(globalStateInstance, router);
        super("div", {
            attributes: {
                class: "wrapper"
            },
            newChatButton: new Button("button", {
                text: "New group",
                attributes: {
                    class: "chat__top-link chat__new-chat-button",
                    href: ""
                },
                eventListeners: [
                    [
                        "click",
                        (event: Event) => {
                            event.preventDefault();
                            createGroupChatModal.show();
                        }
                    ]
                ]
            }),
            profileLink: new Button("a", {
                text: "Profile",
                attributes: {
                    class: "chat__top-link",
                    href: "/profile/"
                },
                eventListeners: [
                    [
                        "click",
                        (event: Event) => {
                            event.preventDefault();
                            router.go("/profile/");
                        }
                    ]
                ]
            }),
            searchInput: new SearchInput({
                search: (login: string): void => handleUserSearch(login, this)
            }),
            chatList: new ChatList({
                attributes: {
                    class: "chat__list"
                },
                items: []
            }),
            conversationMain: new ConversationMain({
                userInfo: {
                    name: "",
                    isOnline: false
                },
                messagesList: [],
                addUserModal,
                deleteConversationModal,
                deleteUserModal
            }),
            modals: [{ modal: addUserModal }, { modal: deleteConversationModal }, { modal: createGroupChatModal }, { modal: deleteUserModal }]
        });
    }

    componentDidMount(): void {
        validateAuth(globalStateInstance)
            .then((isAuthenticated) => {
                if (!isAuthenticated) {
                    throw new Error("Not authorized");
                }
                return getExistingChats();
            })
            .then((existingChats: IExistingChat[]) => handleExistingChats(existingChats))
            .then((existingChatsList: IChatListItem[]) => {
                const selectedChat: IExistingChat = globalStateInstance.getProp("selectedChat");
                if (selectedChat) {
                    renderChatsList(existingChatsList, this, selectedChat);
                } else {
                    renderChatsList(existingChatsList, this);
                    throw new Error("No chat selected");
                }
            })
            .catch((error: XMLHttpRequest | Error) => {
                console.error("[ERROR] Could not display conversation", error);
                if (error instanceof Error) {
                    if (error.message === "Not authorized") {
                        router.go("/login/");
                    } else if (error.message === "No chat selected") {
                        router.go("/chats/");
                    }
                }
            });
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}
