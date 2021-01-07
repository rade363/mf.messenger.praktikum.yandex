import Block from "../../modules/Block/Block";
import {compile} from "../../modules/templator/templator";
import template from "./DeleteUsersList";
import Button from "../Button/index";
import ChatsAPI from "../../api/chats-api";
import GlobalState from "../../modules/GlobalState";

const chatsAPI = new ChatsAPI();
const globalStateInstance = new GlobalState();

export default class DeleteUsersList extends Block {
    constructor(props: IDeleteUsersListProps) {
        super("div", {
            ...props,
            users: props.users.map((user: IUser) => ({
                login: user.login,
                deleteButton: new Button("button", {
                    text: "Delete",
                    attributes: {
                        class: "button button_danger button_wide"
                    },
                    eventListeners: [
                        ["click", () => {
                            const selectedChat: IExistingChat = globalStateInstance.getProp("selectedChat");
                            const userRemovalData = {
                                users: [user.id],
                                chatId: selectedChat.id
                            };
                            chatsAPI.deleteUsers(userRemovalData)
                                .then((xhr: XMLHttpRequest) => {
                                    console.log(`[SUCCESS] User ${user.login} has been successfully removed from chat ${selectedChat.title}`, xhr.response);
                                    const oldProps = this.props;
                                    const newUsers = oldProps.users.filter((renderedUser: IDeleteUserProps) => renderedUser.login !== user.login);
                                    this.setProps({users: newUsers});
                                })
                                .catch((error: XMLHttpRequest) => {
                                    console.log(`[ERROR] Could not delete user ${user.login} from chat ${selectedChat.title}`, error);
                                })
                        }]
                    ]
                })
            }))
        });
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}