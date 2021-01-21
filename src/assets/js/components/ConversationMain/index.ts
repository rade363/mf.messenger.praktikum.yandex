import Block from "../../modules/Block/Block";
import compile from "../../modules/templator/templator";
import template from "./ConversationMain.handlebars";
import MessageForm from "../MessageForm/index";
import ConversationUserInfo from "../ConversationUserInfo/index";
import MessagesList from "../MessagesList/index";
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

    render(): Element | null {
        return compile(template, this.props);
    }
}
