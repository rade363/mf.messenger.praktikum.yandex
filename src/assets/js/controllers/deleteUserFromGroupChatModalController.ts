import Modal from "../components/Modal/index.js";
import DeleteUsersList from "../components/DeleteUsersList/index.js";
import Button from "../components/Button/index.js";
import getChatUsers from "./collectChatUsersController.js";

export default function createDeleteUserModalController(globalStateInstance: IGlobalState): IBlock {
    const modal: IBlock = new Modal({
        name: "delete-user",
        title: "Delete users from group chat",
        child: new DeleteUsersList({
            users: [],
            closeButton: new Button("a", {
                text: "Close",
                attributes: {
                    class: "delete-user-form__cancel-button button button_wide button_secondary"
                },
                eventListeners: [
                    ["click", () => {
                        getChatUsers(globalStateInstance)
                            .then(() => modal.hide());
                    }]
                ]
            })
        })
    });
    return modal;
}