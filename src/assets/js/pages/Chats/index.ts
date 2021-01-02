import Block from "../../modules/Block.js";
import SearchInput from "../../components/SearchInput/index.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";
import ChatList from "../../components/ChatList/index.js";
import Button from "../../components/Button/index.js";
import Router from "../../modules/Router.js";
import GlobalState from "../../modules/GlobalState.js";
import handleUserSearch from "../../controllers/searchController.js";
import validateAuth from "../../controllers/authValidationController.js";
import {getExistingChats, handleExistingChats, renderChatsList} from "../../controllers/existingChatsListController.js";

const router = new Router("#root");
const globalStateInstance = new GlobalState();

export default class Chats extends Block {
    constructor() {
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
            })
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
        return compile(template, {
            profileLink: this.props.profileLink,
            searchInput: this.props.searchInput,
            chatList: this.props.chatList
        });
    }
}