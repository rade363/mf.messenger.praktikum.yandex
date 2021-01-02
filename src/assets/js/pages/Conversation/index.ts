import Block from "../../modules/Block.js";
import SearchInput from "../../components/SearchInput/index.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";
import ChatList from "../../components/ChatList/index.js";
import ConversationMain from "../../components/ConversationMain/index.js";
import Modal from "../../components/Modal/index.js";
import Form from "../../components/Form/index.js";
import ConfirmMessage from "../../components/ConfirmMessage/index.js";
import Double from "../../components/Double/index.js";
import Button from "../../components/Button/index.js";
import Router from "../../modules/Router.js";
import GlobalState from "../../modules/GlobalState.js";
import handleUserSearch from "../../controllers/searchController.js";
import validateAuth from "../../controllers/authValidationController.js";
import {getExistingChats, handleExistingChats, renderChatsList} from "../../controllers/existingChatsListController.js";
import handleDeleteChat from "../../controllers/deleteChatController.js";

const router = new Router("#root");
const globalStateInstance = new GlobalState();

export default class Conversation extends Block {
    constructor() {
        const addUserModal = new Modal({
            name: "add-user",
            title: "Add user",
            child: new Form({
                name: "add-user-form",
                inputFields: [
                    {
                        label: "Username",
                        type: "text",
                        name: "username"
                    }
                ],
                actions: [
                    {
                        type: "double",
                        attributes: {
                            class: ""
                        },
                        children: [
                            {
                                text: "Add",
                                attributes: {
                                    type: "submit",
                                    class: "add-user-form__add-button button button_wide button_primary"
                                }
                            },
                            {
                                text: "Cancel",
                                attributes: {
                                    type: "button",
                                    class: "add-user-form__cancel-button button button_wide button_secondary"
                                },
                                eventListeners: [
                                    ["click", () => addUserModal.hide()]
                                ]
                            }
                        ]
                    }
                ],
                onSubmit: (formObject: IFormObject): void => {
                    console.log("[INFO] Username valid, add user event executed, form will be submitted later in this course", formObject)
                }
            })
        });
        const deleteConversationModal: IBlock = new Modal({
            name: "delete-conversation",
            title: "Delete conversation",
            child: new ConfirmMessage({
                message: `<div class="modal__message">Are you sure? <br/>This action cannot be undone.</div>`,
                actions: [
                    {
                        action: new Double({
                            type: "double",
                            attributes: {
                                class: ""
                            },
                            children: [
                                {
                                    child: new Button("button", {
                                        text: "Delete",
                                        attributes: {
                                            type: "button",
                                            class: "delete-conversation__approve button button_wide button_danger"
                                        },
                                        eventListeners: [
                                            ["click", () => handleDeleteChat(globalStateInstance, router, deleteConversationModal)]
                                        ]
                                    })
                                },
                                {
                                    child: new Button("button", {
                                        text: "Delete",
                                        attributes: {
                                            type: "button",
                                            class: "delete-conversation__approve button button_wide button_secondary"
                                        },
                                        eventListeners: [
                                            ["click", () => deleteConversationModal.hide()]
                                        ]
                                    })
                                }
                            ]
                        })
                    }
                ]
            })
        });
        super("div", {
            profileLink: new Button("a", {
                text: "Profile",
                attributes: {
                    class: "chat__profile-link",
                    href: "/profile/"
                },
                eventListeners: [
                    ["click", (event: Event) => {
                        event.preventDefault();
                        router.go("/profile/");
                    }]
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
                        text: "“Vans, the original action sports brand and advocate for creative expression, is proud to announce three-time Grammy award-winning artist, musician  and producer Anderson .Paak as the brand’s first Global Music Ambassador. Vans and AP share a mutual passion to promote creative expression through their active support of art and music. AP is longtime fan of the brand and always aspires to uplift the community around him, making him a natural addition to the Vans family. The Vans x Anderson .Paak collection will be available worldwide on November 13 and will retail for €45 - €115 / £37 - £95.”",
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
                deleteConversationModal
            }),
            modals: [
                { modal: addUserModal },
                { modal: deleteConversationModal }
            ]
        })
    }

    componentDidMount() {
        console.log('[CONVERSATION] Mounted');
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
                console.log('[CONVERSATION] ERROR', error)
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