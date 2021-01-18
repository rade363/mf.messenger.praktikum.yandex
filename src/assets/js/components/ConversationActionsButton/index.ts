import Block from "../../modules/Block/Block";
import template from "./ConversationActionsButton.handlebars";
import compile from "../../modules/templator/templator";
import Button from "../Button/index";
import ConversationContextMenu from "../ConversationContextMenu/index";
import useState from "../../modules/state";

const state = {
    isConversationActionsMenuOpen: useState(false)
};

export default class ConversationActionsButton extends Block {
    setIsConversationActionsMenuOpen: (isOpen: boolean) => unknown;

    constructor(props: IConversationActions) {
        const [getIsConversationActionsMenuOpen, setIsConversationActionsMenuOpen] = state.isConversationActionsMenuOpen;
        const button = new Button("button", {
            attributes: {
                class: "conversation__actions-button actions-button",
                type: "button"
            },
            eventListeners: [
                [
                    "click",
                    (event: Event) => {
                        event.preventDefault();
                        const isMenuOpen = getIsConversationActionsMenuOpen();
                        if (isMenuOpen) {
                            this.props.conversationContextMenu.hide();
                            setIsConversationActionsMenuOpen(false);
                        } else {
                            this.props.conversationContextMenu.show();
                            setIsConversationActionsMenuOpen(true);
                        }
                    }
                ]
            ]
        });
        super("div", {
            button,
            conversationContextMenu: new ConversationContextMenu({
                ...props,
                setIsConversationActionsMenuOpen
            })
        });
        this.setIsConversationActionsMenuOpen = setIsConversationActionsMenuOpen;
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}
