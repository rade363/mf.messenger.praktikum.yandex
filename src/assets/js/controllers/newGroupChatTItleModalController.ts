import Modal from "../components/Modal/index";
import Form from "../components/Form/index";
import { createChat } from "./createNewChatController";

export default function createNewGroupChatTitleModal(): IBlock {
    const modal = new Modal({
        name: "new-group-chat-title",
        title: "New group chat title",
        child: new Form({
            name: "new-group-chat-title-form",
            inputFields: [
                {
                    label: "Group chat title",
                    type: "text",
                    name: "title"
                }
            ],
            actions: [
                {
                    type: "double",
                    attributes: {
                        class: ""
                    },
                    children: [
                        {
                            text: "Create",
                            attributes: {
                                type: "submit",
                                class: "new-group-chat-title-form__add-button button button_wide button_primary"
                            }
                        },
                        {
                            text: "Cancel",
                            attributes: {
                                type: "button",
                                class: "new-group-chat-title-form__cancel-button button button_wide button_secondary"
                            },
                            eventListeners: [["click", () => modal.hide()]]
                        }
                    ]
                }
            ],
            onSubmit: (formObject: INewGroupChatTitle): void => {
                modal.hide();
                createChat(`Group: ${formObject.title}`);
            }
        })
    });
    return modal;
}
