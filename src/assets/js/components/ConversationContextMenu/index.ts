import ContextMenu from "../ContextMenu/index";
import ContextButton from "../ContextButton/index";
import DeleteUsersList from "../DeleteUsersList/index";
import { isChatGroup } from "../../modules/helpers";
import ChatsController from "../../modules/ChatsController/ChatsController";

export default class ConversationContextMenu extends ContextMenu {
    constructor(props: IConversationActionsMenu) {
        const controller = new ChatsController();
        const { selectedChat } = controller;
        const options: IContextMenuProps = {
            attributes: {
                class: "conversation__context"
            },
            items: []
        };
        if (selectedChat && isChatGroup(selectedChat.title)) {
            options.items.push(
                new ContextButton({
                    text: "Add user",
                    icon: "../assets/img/add.svg",
                    name: "context__add",
                    eventListeners: [
                        [
                            "click",
                            (event: Event) => {
                                event.preventDefault();
                                this.hide();
                                props.setIsConversationActionsMenuOpen(false);
                                props.addUserModal.show();
                            }
                        ]
                    ]
                })
            );
            options.items.push(
                new ContextButton({
                    text: "Delete user",
                    icon: "../assets/img/delete.svg",
                    name: "user__delete",
                    eventListeners: [
                        [
                            "click",
                            (event: Event) => {
                                event.preventDefault();
                                this.hide();
                                props.setIsConversationActionsMenuOpen(false);

                                const chatsController = new ChatsController();
                                const chat = chatsController.selectedChat;
                                if (chat) {
                                    const chatUsers = chat.users;
                                    const oldDeleteUserListProps = props.deleteUserModal.props.child.props;
                                    const child = new DeleteUsersList({
                                        ...oldDeleteUserListProps,
                                        users: chatUsers
                                    });
                                    props.deleteUserModal.setProps({ child });
                                    props.deleteUserModal.show();
                                }
                            }
                        ]
                    ]
                })
            );
        }
        options.items.push(
            new ContextButton({
                text: "Delete conversation",
                icon: "../assets/img/delete.svg",
                name: "conversation__delete",
                eventListeners: [
                    [
                        "click",
                        (event: Event) => {
                            event.preventDefault();
                            this.hide();
                            props.setIsConversationActionsMenuOpen(false);
                            props.deleteConversationModal.show();
                        }
                    ]
                ]
            })
        );

        super(options);
    }
}
