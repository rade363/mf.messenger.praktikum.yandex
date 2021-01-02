import Block from "../../modules/Block.js";
import SearchInput from "../../components/SearchInput/index.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";
import ChatList from "../../components/ChatList/index.js";
import Button from "../../components/Button/index.js";
import Modal from "../../components/Modal/index.js";
import Form from "../../components/Form/index.js";
import Router from "../../modules/Router.js";
import GlobalState from "../../modules/GlobalState.js";
import handleUserSearch from "../../controllers/searchController.js";
import validateAuth from "../../controllers/authValidationController.js";
import createChat from "../../controllers/createNewChatController.js";
import {getExistingChats, handleExistingChats, renderChatsList} from "../../controllers/existingChatsListController.js";

const router = new Router("#root");
const globalStateInstance = new GlobalState();

export default class Chats extends Block {
    constructor() {
        const createGroupChatModal = new Modal({
            name: "new-group-chat-title",
            title: "New group chat title",
            child: new Form({
                name: "new-group-chat-title-form",
                inputFields: [
                    {
                        label: "Group chat title",
                        type: "text",
                        name: "title"
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
                                text: "Create",
                                attributes: {
                                    type: "submit",
                                    class: "new-group-chat-title-form__add-button button button_wide button_primary"
                                }
                            },
                            {
                                text: "Cancel",
                                attributes: {
                                    type: "button",
                                    class: "new-group-chat-title-form__cancel-button button button_wide button_secondary"
                                },
                                eventListeners: [
                                    ["click", () => createGroupChatModal.hide()]
                                ]
                            }
                        ]
                    }
                ],
                onSubmit: (formObject: INewGroupChatTitle): void => {
                    console.log("[INFO] Creating a new group chat...", formObject);
                    createGroupChatModal.hide();
                    createChat(`Group: ${formObject.title}`, globalStateInstance, router);
                }
            })
        });
        super("div", {
            newChatButton: new Button("button", {
                text: "New chat",
                attributes: {
                    class: "chat__top-link chat__new-chat-button",
                    href: ""
                },
                eventListeners: [
                    ["click", (event: Event) => {
                        event.preventDefault();
                        createGroupChatModal.show();
                    }]
                ]
            }),
            profileLink: new Button("a", {
                text: "Profile",
                attributes: {
                    class: "chat__top-link",
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
            modals: [
                { modal: createGroupChatModal }
            ]
        });
    }

    componentDidMount() {
        console.log('[CHATS] Mounted');
        validateAuth(globalStateInstance)
            .then((isAuthenticated) => {
                if (!isAuthenticated) {
                    throw new Error("Not authorized");
                }
                return getExistingChats(globalStateInstance);
            })
            .then((existingChats: IExistingChat[]) => handleExistingChats(existingChats))
            .then((existingChatsList: IChatListItem[]) => renderChatsList(existingChatsList, this))
            .catch((error: XMLHttpRequest | Error) => {
                console.log('[CHATS] ERROR', error)
                if (error instanceof Error) {
                    if (error.message === "Not authorized") {
                        router.go("/login/");
                    }
                }
            });
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}