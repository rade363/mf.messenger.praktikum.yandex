import Block from "../../modules/Block/Block";
import SearchInput from "../../components/SearchInput/index";
import template from "./template";
import {compile} from "../../modules/templator/templator";
import ChatList from "../../components/ChatList/index";
import Button from "../../components/Button/index";
import Router from "../../modules/Router/Router";
import GlobalState from "../../modules/GlobalState";
import handleUserSearch from "../../controllers/searchController";
import validateAuth from "../../controllers/authValidationController";
import {getExistingChats, handleExistingChats, renderChatsList} from "../../controllers/existingChatsListController";
import createNewGroupChatTitleModal from "../../controllers/newGroupChatTItleModalController";

const router = new Router("#root");
const globalStateInstance = new GlobalState();

export default class Chats extends Block {
    constructor() {
        const createGroupChatModal = createNewGroupChatTitleModal(globalStateInstance, router);
        super("div", {
            attributes: {
                class: "wrapper wrapper_background_empty"
            },
            newChatButton: new Button("button", {
                text: "New group",
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