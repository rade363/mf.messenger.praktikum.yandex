import Block from "../../modules/Block/Block";
import SearchInput from "../../components/SearchInput/index";
import template from "./template.handlebars";
import compile from "../../modules/templator/templator";
import ChatList from "../../components/ChatList/index";
import Button from "../../components/Button/index";
import Router from "../../modules/Router/Router";
import handleUserSearch from "../../controllers/searchController";
import validateAuth from "../../controllers/authValidationController";
import renderChatsList from "../../controllers/renderChatsListController";
import createNewGroupChatTitleModal from "../../controllers/newGroupChatTItleModalController";
import globalStateInstance from "../../modules/GlobalState/globalStateInstance";
import ChatsController from "../../modules/ChatsController/ChatsController";

const router = new Router("#root");
const chatsControllerInstance = new ChatsController();

export default class Chats extends Block {
    constructor() {
        const createGroupChatModal = createNewGroupChatTitleModal();
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
            modals: [{ modal: createGroupChatModal }]
        });
    }

    componentDidMount(): void {
        validateAuth(globalStateInstance)
            .then((isAuthenticated) => {
                if (!isAuthenticated) {
                    throw new Error("Not authorized");
                }
                if (chatsControllerInstance.wasInitialized) {
                    return true;
                }
                return chatsControllerInstance.init();
            })
            .then((wasInitialized: boolean) => {
                if (!wasInitialized) {
                    throw new Error("Could not initialize chats controller");
                }
                renderChatsList();
            })
            .catch((error: XMLHttpRequest | Error) => {
                console.error("[ERROR] Could not collect chats", error);
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
