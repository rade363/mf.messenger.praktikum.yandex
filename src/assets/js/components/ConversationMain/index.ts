import Block from "../../modules/Block.js";
import {compile} from "../../modules/templator.js";
import template from "./ConversationMain.js";
import Button from "../Button/index.js";
import ContextMenu from "../ContextMenu/index.js";
import {useState} from "../../modules/state.js";
import MessageForm from "../MessageForm/index.js";
import ContextButton from "../ContextButton/index.js";

const state = {
    isConversationActionsMenuOpen: useState(false)
};

export default class ConversationMain extends Block {
    constructor(props: IConversationMain) {
        const [getIsConversationActionsMenuOpen, setIsConversationActionsMenuOpen] = state.isConversationActionsMenuOpen;
        const conversationActionsMenu = new ContextMenu({
            attributes: {
                class: "conversation__context"
            },
            items: [
                new ContextButton({
                    text: "Add user",
                    icon: "../assets/img/add.svg",
                    name: "context__add",
                    eventListeners: [
                        ["click", (event: Event) => {
                            event.preventDefault();
                            conversationActionsMenu.hide();
                            setIsConversationActionsMenuOpen(false);

                            props.addUserModal.show();
                        }]
                    ]
                }),
                new ContextButton({
                    text: "Delete conversation",
                    icon: "../assets/img/delete.svg",
                    name: "context__delete",
                    eventListeners: [
                        ["click", (event: Event) => {
                            event.preventDefault();
                            conversationActionsMenu.hide();
                            setIsConversationActionsMenuOpen(false);

                            props.deleteConversationModal.show();
                        }]
                    ]
                })
            ]
        });

        super("div", {
            ...props,
            attributes: {
                class: "chat__conversation"
            },
            conversationActionsButton: new Button("button", {
                attributes: {
                    class: "conversation__actions-button actions-button",
                    type: "button"
                },
                eventListeners: [
                    ["click", (event: Event) => {
                        event.preventDefault();
                        const isMenuOpen = getIsConversationActionsMenuOpen();
                        if (isMenuOpen) {
                            conversationActionsMenu.hide();
                            setIsConversationActionsMenuOpen(false);
                        } else {
                            conversationActionsMenu.show();
                            setIsConversationActionsMenuOpen(true);
                        }
                    }]
                ]
            }),
            conversationActionsMenu,
            messageForm: new MessageForm()
        });
    }

    render() {
        return compile(template, this.props);
    }
}