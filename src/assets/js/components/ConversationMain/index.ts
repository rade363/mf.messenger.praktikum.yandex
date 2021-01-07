import Block from "../../modules/Block/Block";
import {compile} from "../../modules/templator/templator";
import template from "./ConversationMain";
import Button from "../Button/index";
import ContextMenu from "../ContextMenu/index";
import {useState} from "../../modules/state";
import MessageForm from "../MessageForm/index";
import ContextButton from "../ContextButton/index";
import GlobalState from "../../modules/GlobalState";
import getChatUsers from "../../controllers/collectChatUsersController";
import DeleteUsersList from "../DeleteUsersList/index";

const globalStateInstance = new GlobalState();
const state = {
    isConversationActionsMenuOpen: useState(false)
};

export default class ConversationMain extends Block {
    constructor(props: IConversationMain) {
        const [getIsConversationActionsMenuOpen, setIsConversationActionsMenuOpen] = state.isConversationActionsMenuOpen;
        const selectedChat: IExistingChat = globalStateInstance.getProp("selectedChat");
        const contextMenuOptions: IContextMenuProps = {
            attributes: {
                class: "conversation__context"
            },
            items: []
        };
        if (selectedChat && selectedChat.title.indexOf("Group: ") === 0) {
            contextMenuOptions.items.push(
                new ContextButton({
                    text: "Add user",
                    icon: "../assets/img/add.svg",
                    name: "context__add",
                    eventListeners: [
                        ["click", (event: Event) => {
                            event.preventDefault();
                            conversationActionsMenu.hide();
                            setIsConversationActionsMenuOpen(false);

                            props.addUserModal.show();
                        }]
                    ]
                })
            );
            contextMenuOptions.items.push(
                new ContextButton({
                    text: "Delete user",
                    icon: "../assets/img/delete.svg",
                    name: "user__delete",
                    eventListeners: [
                        ["click", (event: Event) => {
                            event.preventDefault();
                            conversationActionsMenu.hide();
                            setIsConversationActionsMenuOpen(false);

                            const chatUsers = globalStateInstance.getProp("chatUsers");
                            const oldDeleteUserListProps = props.deleteUserModal.props.child.props;
                            const child = new DeleteUsersList({
                                ...oldDeleteUserListProps,
                                users: chatUsers
                            })
                            props.deleteUserModal.setProps({child});
                            props.deleteUserModal.show();
                        }]
                    ]
                }),
            );
        }
        contextMenuOptions.items.push(
            new ContextButton({
                text: "Delete conversation",
                icon: "../assets/img/delete.svg",
                name: "conversation__delete",
                eventListeners: [
                    ["click", (event: Event) => {
                        event.preventDefault();
                        conversationActionsMenu.hide();
                        setIsConversationActionsMenuOpen(false);

                        props.deleteConversationModal.show();
                    }]
                ]
            })
        );
        const conversationActionsMenu = new ContextMenu(contextMenuOptions);

        super("div", {
            ...props,
            attributes: {
                class: "chat__conversation"
            },
            conversationActionsButton: new Button("button", {
                attributes: {
                    class: "conversation__actions-button actions-button",
                    type: "button"
                },
                eventListeners: [
                    ["click", (event: Event) => {
                        event.preventDefault();
                        const isMenuOpen = getIsConversationActionsMenuOpen();
                        if (isMenuOpen) {
                            conversationActionsMenu.hide();
                            setIsConversationActionsMenuOpen(false);
                        } else {
                            conversationActionsMenu.show();
                            setIsConversationActionsMenuOpen(true);
                        }
                    }]
                ]
            }),
            conversationActionsMenu,
            messageForm: new MessageForm()
        });
    }

    componentDidMount() {
        const selectedChat = globalStateInstance.getProp("selectedChat");
        if (selectedChat) {
            getChatUsers(globalStateInstance)
                .then(() => console.log("[INFO] Chat users collected"))
        }
    }

    render() {
        return compile(template, this.props);
    }
}