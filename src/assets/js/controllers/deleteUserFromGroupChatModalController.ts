import Modal from "../components/Modal/index";
import DeleteUsersList from "../components/DeleteUsersList/index";
import Button from "../components/Button/index";

export default function createDeleteUserModalController(): IBlock {
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
                eventListeners: [["click", () => modal.hide()]]
            })
        })
    });
    return modal;
}
