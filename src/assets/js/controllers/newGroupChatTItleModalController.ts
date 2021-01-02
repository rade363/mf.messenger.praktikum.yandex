import Modal from "../components/Modal/index.js";
import Form from "../components/Form/index.js";
import createChat from "./createNewChatController.js";
import Router from "../modules/Router.js";

export default function createNewGroupChatTitleModal(globalStateInstance: IGlobalState, router: Router) {
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
                            eventListeners: [
                                ["click", () => modal.hide()]
                            ]
                        }
                    ]
                }
            ],
            onSubmit: (formObject: INewGroupChatTitle): void => {
                console.log("[INFO] Creating a new group chat...", formObject);
                modal.hide();
                createChat(`Group: ${formObject.title}`, globalStateInstance, router);
            }
        })
    });
    return modal;
}