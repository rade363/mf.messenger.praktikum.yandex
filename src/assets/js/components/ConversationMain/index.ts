import Block from "../../modules/Block/Block";
import compile from "../../modules/templator/templator";
import template from "./ConversationMain.handlebars";
import MessageForm from "../MessageForm/index";
import ConversationUserInfo from "../ConversationUserInfo/index";
import MessagesList from "../MessagesList/index";
import getChatUsers from "../../controllers/collectChatUsersController";
import globalStateInstance from "../../modules/GlobalState/globalStateInstance";
import ConversationActionsButton from "../ConversationActionsButton/index";

export default class ConversationMain extends Block {
    constructor(props: IConversationMain) {
        super("div", {
            ...props,
            attributes: {
                class: "chat__conversation"
            },
            conversationUserInfo: new ConversationUserInfo(props.userInfo),
            conversationActionsButton: new ConversationActionsButton({
                addUserModal: props.addUserModal,
                deleteConversationModal: props.deleteConversationModal,
                deleteUserModal: props.deleteUserModal
            }),
            messagesList: new MessagesList({ messagesList: props.messagesList }),
            messageForm: new MessageForm()
        });
    }

    componentDidMount(): void {
        const selectedChat = globalStateInstance.getProp("selectedChat");
        if (selectedChat) {
            getChatUsers(globalStateInstance);
        }
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}
