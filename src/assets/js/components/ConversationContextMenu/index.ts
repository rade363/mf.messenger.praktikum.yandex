import ContextMenu from "../ContextMenu/index";
import ContextButton from "../ContextButton/index";
import DeleteUsersList from "../DeleteUsersList/index";
import globalStateInstance from "../../modules/GlobalState/globalStateInstance";

export default class ConversationContextMenu extends ContextMenu {
    constructor(props: IConversationActionsMenu) {
        const selectedChat: IExistingChat = globalStateInstance.getProp("selectedChat");
        const options: IContextMenuProps = {
            attributes: {
                class: "conversation__context"
            },
            items: []
        };
        if (selectedChat && selectedChat.title.indexOf("Group: ") === 0) {
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

                                const chatUsers = globalStateInstance.getProp("chatUsers");
                                const oldDeleteUserListProps = props.deleteUserModal.props.child.props;
                                const child = new DeleteUsersList({
                                    ...oldDeleteUserListProps,
                                    users: chatUsers
                                });
                                props.deleteUserModal.setProps({ child });
                                props.deleteUserModal.show();
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
