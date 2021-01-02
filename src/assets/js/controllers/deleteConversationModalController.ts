import Modal from "../components/Modal/index.js";
import ConfirmMessage from "../components/ConfirmMessage/index.js";
import Double from "../components/Double/index.js";
import Button from "../components/Button/index.js";
import handleDeleteChat from "./deleteChatController.js";
import Router from "../modules/Router.js";

export default function createDeleteConversationModal(globalStateInstance: IGlobalState, router: Router) {
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
                                    eventListeners: [
                                        ["click", () => handleDeleteChat(globalStateInstance, router, modal)]
                                    ]
                                })
                            },
                            {
                                child: new Button("button", {
                                    text: "Delete",
                                    attributes: {
                                        type: "button",
                                        class: "delete-conversation__approve button button_wide button_secondary"
                                    },
                                    eventListeners: [
                                        ["click", () => modal.hide()]
                                    ]
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