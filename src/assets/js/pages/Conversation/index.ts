import Block from "../../modules/Block/Block";
import SearchInput from "../../components/SearchInput/index";
import template from "./template";
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
                user: {
                    name: "",
                    status: ""
                },
                messagesList: [
                    {
                        outgoing: false,
                        text: "Hello bro!",
                        imageUrl: "",
                        time: "10:44",
                        status: "read"
                    },
                    {
                        outgoing: true,
                        text: "Hey, what’s up? Have you heard the latest news?",
                        imageUrl: "",
                        time: "11:01",
                        status: "read"
                    },
                    {
                        outgoing: false,
                        text: "Amazing! What are the news?",
                        imageUrl: "",
                        time: "11:03",
                        status: "read"
                    },
                    {
                        outgoing: true,
                        text:
                            "“Vans, the original action sports brand and advocate for creative expression, is proud to announce three-time Grammy award-winning artist, musician  and producer Anderson .Paak as the brand’s first Global Music Ambassador. Vans and AP share a mutual passion to promote creative expression through their active support of art and music. AP is longtime fan of the brand and always aspires to uplift the community around him, making him a natural addition to the Vans family. The Vans x Anderson .Paak collection will be available worldwide on November 13 and will retail for €45 - €115 / £37 - £95.”",
                        imageUrl: "",
                        time: "11:07",
                        status: "read"
                    },
                    {
                        outgoing: false,
                        text: "Pfff, “news”. I’ve already got them!",
                        imageUrl: "",
                        time: "11:56",
                        status: "read"
                    },
                    {
                        outgoing: false,
                        text: "",
                        imageUrl: "vans.jpg",
                        time: "11:57",
                        status: "read"
                    },
                    {
                        outgoing: true,
                        text: "Damn, Daniel!",
                        imageUrl: "",
                        time: "11:59",
                        status: "read"
                    },
                    {
                        outgoing: true,
                        text: "Some",
                        imageUrl: "",
                        time: "11:59",
                        status: "sent"
                    },
                    {
                        outgoing: true,
                        text: "more",
                        imageUrl: "",
                        time: "11:59",
                        status: "sent"
                    },
                    {
                        outgoing: true,
                        text: "messages",
                        imageUrl: "",
                        time: "11:59",
                        status: "sent"
                    },
                    {
                        outgoing: true,
                        text: "to",
                        imageUrl: "",
                        time: "11:59",
                        status: "sent"
                    },
                    {
                        outgoing: true,
                        text: "test",
                        imageUrl: "",
                        time: "11:59",
                        status: "sent"
                    },
                    {
                        outgoing: true,
                        text: "scroll",
                        imageUrl: "",
                        time: "11:59",
                        status: "sent"
                    }
                ],
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
                return getExistingChats(globalStateInstance);
            })
            .then((existingChats: IExistingChat[]) => handleExistingChats(existingChats))
            .then((existingChatsList: IChatListItem[]) => {
                const selectedChat = globalStateInstance.getProp("selectedChat");
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
