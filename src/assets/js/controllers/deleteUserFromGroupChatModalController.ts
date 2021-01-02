import Modal from "../components/Modal/index.js";
import Form from "../components/Form/index.js";

export default function createDeleteUserModalController() {
    const modal = new Modal({
        name: "delete-user",
        title: "Delete user",
        child: new Form({
            name: "delete-user-form",
            inputFields: [
                {
                    label: "Username",
                    type: "text",
                    name: "username"
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
                            text: "Delete",
                            attributes: {
                                type: "submit",
                                class: "delete-user-form__add-button button button_wide button_danger"
                            }
                        },
                        {
                            text: "Cancel",
                            attributes: {
                                type: "button",
                                class: "delete-user-form__cancel-button button button_wide button_secondary"
                            },
                            eventListeners: [
                                ["click", () => modal.hide()]
                            ]
                        }
                    ]
                }
            ],
            onSubmit: (formObject: IFormObject): void => {
                console.log("[INFO] Username valid, add user event executed, form will be submitted later in this course", formObject)
            }
        })
    });
    return modal;
}