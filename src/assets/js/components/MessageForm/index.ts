import Block from "../../modules/Block.js";
import {compile} from "../../modules/templator.js";
import template from "./MessageForm.js";
import Button from "../Button/index.js";
import Input from "../Input/index.js";
import ContextMenu from "../ContextMenu/index.js";
import AttachmentContextButton from "../AttachmentContextButton/index.js";

import {useState} from "../../modules/state.js";
import {isXssPresent} from "../../modules/helpers.js";
import {setImageUpload} from "../../modules/domHelpers.js";

const state = {
    isAttachmentMenuOpen: useState(false),
    newMessage: useState(""),
    attachment: useState({})
};

export default class MessageForm extends Block {
    constructor() {
        const [getIsAttachmentMenuOpen, setIsAttachmentMenuOpen] = state.isAttachmentMenuOpen;
        const [getNewMessage, setNewMessage] = state.newMessage;
        const [getAttachment, setAttachment] = state.attachment;
        const attachmentContextMenu = new ContextMenu({
            attributes: {
                class: "attachment-menu"
            },
            items: [
                new AttachmentContextButton({
                    text: "Photo or Video",
                    icon: "../assets/img/attachment-photo.svg",
                    name: "photo",
                    eventListeners: [
                        ["input", (event: Event) => {
                            setImageUpload(event, setAttachment, this);
                            attachmentContextMenu.hide();
                        }]
                    ]
                }),
                new AttachmentContextButton({
                    text: "File",
                    icon: "../assets/img/attachment-file.svg",
                    name: "file",
                    eventListeners: [
                        ["input", (event: Event) => {
                            setImageUpload(event, setAttachment, this);
                            attachmentContextMenu.hide();
                        }]
                    ]
                }),
                new AttachmentContextButton({
                    text: "Location",
                    icon: "../assets/img/attachment-location.svg",
                    name: "location",
                    eventListeners: [
                        ["input", (event: Event) => {
                            setImageUpload(event, setAttachment, this);
                            attachmentContextMenu.hide();
                        }]
                    ]
                })
            ]
        });
        const submitButton = new Button("button", {
            attributes: {
                class: "message-form__submit-button",
                type: "submit"
            }
        });
        super("form", {
            attributes: {
                class: "",
                method: "POST"
            },
            attachmentButton: new Button("div", {
                attributes: {
                    class: "message-form__attachment-button"
                },
                eventListeners: [
                    ["click", (event: Event) => {
                        event.preventDefault();
                        const isMenuOpen = getIsAttachmentMenuOpen();
                        if (isMenuOpen) {
                            attachmentContextMenu.hide();
                            setIsAttachmentMenuOpen(false);
                        } else {
                            attachmentContextMenu.show();
                            setIsAttachmentMenuOpen(true);
                        }
                    }]
                ]
            }),
            input: new Input({
                attributes: {
                    class: "message-form__message",
                    type: "text",
                    placeholder: "Write a message...",
                    name: "message",
                    pattern: "\\S+"
                },
                eventListeners: [
                    ["input", (event: Event): void => {
                        const element = event.target as HTMLInputElement;
                        const {value} = element;
                        setNewMessage(value);

                        const newClass = value === "" ? "message-form__submit-button" : "message-form__submit-button message-form__submit-button_active";
                        const submitButtonAttributes = submitButton.props.attributes;
                        submitButton.setProps({
                            attributes: {
                                ...submitButtonAttributes,
                                class: newClass
                            }
                        });
                    }]
                ]
            }),
            submitButton,
            attachmentContextMenu,
            onSubmit: function (event: Event): void {
                event.preventDefault();
                event.stopPropagation();

                const newMessage = getNewMessage();
                const attachment = getAttachment();

                if (isXssPresent(newMessage)) {
                    alert("Invalid symbols");
                } else {
                    const formObject = {
                        newMessage,
                        attachment
                    };
                    console.log("[INFO] New message submitted, this will be handled later in this course", formObject);
                }
            }
        });
    }

    render() {
        return compile(template, this.props);
    }
}