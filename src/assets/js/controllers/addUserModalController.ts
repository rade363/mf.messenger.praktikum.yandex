import Modal from "../components/Modal/index.js";
import Form from "../components/Form/index.js";

//globalState: IGlobalState
export default function createAddUserModal() {
    const modal = new Modal({
        name: "add-user",
        title: "Add user",
        child: new Form({
            name: "add-user-form",
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
                            text: "Add",
                            attributes: {
                                type: "submit",
                                class: "add-user-form__add-button button button_wide button_primary"
                            }
                        },
                        {
                            text: "Cancel",
                            attributes: {
                                type: "button",
                                class: "add-user-form__cancel-button button button_wide button_secondary"
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