import Modal from "../components/Modal/index.js";
import Form from "../components/Form/index.js";
import UserAPI from "../api/user-api.js";
import addUsersToChat from "./addUsersController.js";
import getChatUsers from "./collectChatUsersController.js";
const userAPI = new UserAPI();

export default function createAddUserModal(globalStateInstance: IGlobalState): IBlock {
    const modal = new Modal({
        name: "add-user",
        title: "Add user",
        child: new Form({
            name: "add-user-form",
            inputFields: [
                {
                    label: "Login",
                    type: "text",
                    name: "login"
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
            onSubmit: (formObject: ISearchRequestProps): void => {
                console.log("[INFO] Username valid, add user event executed, form will be submitted later in this course", formObject);
                userAPI.searchUserByLogin(formObject)
                    .then((xhr: XMLHttpRequest) => {
                        console.log("[SUCCESS] Users search results", xhr.response);
                        const searchResults = JSON.parse(xhr.response);
                        const relevantUser = searchResults.find((foundUser: IUser) => foundUser.login === formObject.login);
                        if (!relevantUser) {
                            throw new Error(`User ${formObject.login} was not found`);
                        }
                        const selectedChat: IExistingChat = globalStateInstance.getProp("selectedChat");
                        const chatUsers: IUser[] = globalStateInstance.getProp("chatUsers");

                        const isRelevantUserPresent = chatUsers.find((existingUser: IUser) => existingUser.id === relevantUser.id);
                        if (isRelevantUserPresent) {
                            throw new Error(`User ${formObject.login} is already present in this chat`);
                        }
                        return addUsersToChat([relevantUser.id], selectedChat.id);
                    })
                    .then((wasUserAdded: boolean) => {
                        if (!wasUserAdded) {
                            throw new Error(`User ${formObject.login} was not added`);
                        }
                        return getChatUsers(globalStateInstance);
                    })
                    .then(() => modal.hide())
                    .catch((error: XMLHttpRequest | Error) => {
                        console.log("[ERROR] Could not add users to the new chat", error);
                        const text = error instanceof Error ? error.message : JSON.parse(error.response);
                        modal.props.child.props.inputFields[0].inputField.props.errorMessage.setProps({text});
                    });
            }
        })
    });
    return modal;
}