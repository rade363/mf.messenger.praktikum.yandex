import Modal from "../components/Modal/index";
import ConfirmMessage from "../components/ConfirmMessage/index";
import Double from "../components/Double/index";
import Button from "../components/Button/index";
import handleDeleteChat from "./deleteChatController";

export default function createDeleteConversationModal(): IBlock {
    const modal: IBlock = new Modal({
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
                                    eventListeners: [["click", () => handleDeleteChat(modal)]]
                                })
                            },
                            {
                                child: new Button("button", {
                                    text: "Cancel",
                                    attributes: {
                                        type: "button",
                                        class: "delete-conversation__approve button button_wide button_secondary"
                                    },
                                    eventListeners: [["click", () => modal.hide()]]
                                })
                            }
                        ]
                    })
                }
            ]
        })
    });
    return modal;
}
