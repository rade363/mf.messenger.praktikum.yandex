import { useState } from "../assets/js/modules/state.js";
import { isEmpty, isXssPresent } from "../assets/js/modules/helpers.js";
import { renderInterface, addEventListener, addClass, removeClass, setInnerText, toggleClass } from "../assets/js/modules/domHelpers.js";
import Conversation from "../assets/js/pages/Conversation/index.js";
let state = {
    searchKey: useState(""),
    newMessage: useState(""),
    newUserToAddName: useState(""),
    attachments: useState(null),
    isAttachmentContextMenuOpen: useState(false),
    isConversationActionsMenuOpen: useState(false),
    isAddUserModalOpen: useState(false),
    isDeleteConversationModalOpen: useState(false)
};
let view = {};
document.addEventListener("DOMContentLoaded", initInterface);
function initInterface() {
    renderInterface(document.getElementById("root"), new Conversation());
    view = initView();
    addEventListener(view.searchInput, "input", (event) => setStatePropValue(event, "searchKey"));
    addEventListener(view.searchForm, "submit", submitSearchFilter);
    addEventListener(view.messageInput, "input", setNewMessage);
    addEventListener(view.messageForm, "submit", handleSubmitMessageForm);
    addEventListener(view.conversationActionsButton, "click", handleConversationsButtonClick);
    addEventListener(view.attachmentButton, "click", handleAttachmentsButtonClick);
    addEventListener(view.attachmentPhotoInput, "input", handleAttachment);
    addEventListener(view.attachmentFileInput, "input", handleAttachment);
    addEventListener(view.attachmentLocationInput, "input", handleAttachment);
    addEventListener(view.addUserButton, "click", handleAddUserButtonClick);
    addEventListener(view.usernameInput, "input", handleAddUserInput);
    addEventListener(view.addUserForm, "submit", handleAddUserSubmit);
    addEventListener(view.cancelAddUserFormButton, "click", handleCancelAddUserClick);
    addEventListener(view.deleteConversationButton, "click", handleDeleteConversationContextButtonClick);
    addEventListener(view.approveDeleteButton, "click", handleDeleteConversationButtonClick);
    addEventListener(view.cancelDeleteButton, "click", handleCancelDeleteConversationButtonClick);
}
function initView() {
    return {
        searchInput: document.querySelector(".searchbar__input"),
        searchForm: document.querySelector(".chat__search"),
        messageForm: document.querySelector(".conversation__message-form"),
        messageInput: document.querySelector(".message-form__message"),
        submitMessageButton: document.querySelector(".message-form__submit-button"),
        conversationActionsMenu: document.querySelector(".conversation__context"),
        conversationActionsButton: document.querySelector(".conversation__actions-button"),
        addUserButton: document.querySelector(".context__add"),
        addUserOverlay: document.querySelector(".add-user"),
        addUserForm: document.querySelector(".add-user-form"),
        usernameInput: document.querySelector(".add-user-form__username-input"),
        usernameInputError: document.querySelector(".add-user-form__username-error"),
        submitAddUserFormButton: document.querySelector(".add-user-form__add-button"),
        cancelAddUserFormButton: document.querySelector(".add-user-form__cancel-button"),
        deleteConversationButton: document.querySelector(".context__delete"),
        deleteConversationOverlay: document.querySelector(".delete-conversation"),
        approveDeleteButton: document.querySelector(".delete-conversation__approve"),
        cancelDeleteButton: document.querySelector(".delete-conversation__cancel"),
        attachmentButton: document.querySelector(".message-form__attachment-button"),
        attachmentContextMenu: document.querySelector(".attachment-menu"),
        attachmentPhotoInput: document.querySelector(".message-form__photo-input"),
        attachmentFileInput: document.querySelector(".message-form__file-input"),
        attachmentLocationInput: document.querySelector(".message-form__location-input")
    };
}
function setStatePropValue(event, propName) {
    const element = event.target;
    const { value } = element;
    console.log(`[INFO] ${propName}`, value);
    const [, setStateCallback] = state[propName];
    setStateCallback(value);
    setInnerText(view[`${propName}Error`], "");
    removeClass(view[`${propName}Input`], "form__input_error");
}
function submitSearchFilter(event) {
    event.preventDefault();
    const [getSearchKey] = state.searchKey;
    const searchKey = getSearchKey();
    if (typeof searchKey === "string" && isXssPresent(searchKey)) {
        alert("Invalid symbols");
        return null;
    }
    console.log("[INFO] Search form submitted, this will be handled later in this course", searchKey);
}
function setNewMessage(event) {
    setStatePropValue(event, "newMessage");
    const [getNewMessage] = state.newMessage;
    const newMessage = getNewMessage();
    toggleClass(isEmpty(newMessage), view.submitMessageButton, "message-form__submit-button_active");
}
function handleSubmitMessageForm(event) {
    event.preventDefault();
    const [getNewMessage] = state.newMessage;
    const message = getNewMessage();
    if (isEmpty(message)) {
        console.log("[INFO] No message to submit");
        return null;
    }
    if (typeof message === "string" && isXssPresent(message)) {
        window.alert("Invalid symbols");
        return null;
    }
    const [getAttachments] = state.attachments;
    const attachments = getAttachments();
    const messageObject = {
        message,
        attachments
    };
    console.log(`[INFO] Message will be submitted later in course`, messageObject);
}
function handleConversationsButtonClick(event) {
    const [getIsConversationActionsMenuOpen, setIsConversationActionsMenuOpen] = state.isConversationActionsMenuOpen;
    const isOpen = getIsConversationActionsMenuOpen();
    const element = event.target;
    if (typeof isOpen === "boolean") {
        setIsConversationActionsMenuOpen((isOpen) => !isOpen);
        toggleClass(isOpen, view.conversationActionsMenu, "conversation__context_active");
        toggleClass(isOpen, element, "actions-button_active");
    }
}
function handleAttachmentsButtonClick(event) {
    const [getIsAttachmentContextMenuOpen, setIsAttachmentContextMenuOpen] = state.isAttachmentContextMenuOpen;
    const isOpen = getIsAttachmentContextMenuOpen();
    const element = event.target;
    if (typeof isOpen === "boolean") {
        setIsAttachmentContextMenuOpen((isOpen) => !isOpen);
        toggleClass(isOpen, view.attachmentContextMenu, "attachment-menu_active");
        toggleClass(isOpen, element, "message-form__attachment-button_active");
    }
}
function handleAttachment(event) {
    setStatePropValue(event, "attachments");
    const [, setIsAttachmentContextMenuOpen] = state.isAttachmentContextMenuOpen;
    setIsAttachmentContextMenuOpen(false);
    removeClass(view.attachmentContextMenu, "attachment-menu_active");
    removeClass(view.attachmentButton, "message-form__attachment-button_active");
}
function handleAddUserButtonClick() {
    const [getIsAddUserModalOpen, setIsAddUserModalOpen] = state.isAddUserModalOpen;
    const isAddUserModalOpen = getIsAddUserModalOpen();
    if (typeof isAddUserModalOpen === "boolean") {
        toggleClass(isAddUserModalOpen, view.addUserOverlay, "overlay_active");
        setIsAddUserModalOpen(true);
    }
}
function handleDeleteConversationContextButtonClick() {
    const [getIsDeleteConversationModalOpen, setIsDeleteConversationModalOpen] = state.isDeleteConversationModalOpen;
    const isDeleteConversationModalOpen = getIsDeleteConversationModalOpen();
    if (typeof isDeleteConversationModalOpen === "boolean") {
        toggleClass(isDeleteConversationModalOpen, view.deleteConversationOverlay, "overlay_active");
        setIsDeleteConversationModalOpen(true);
    }
}
function handleAddUserInput(event) {
    setStatePropValue(event, "newUserToAddName");
    setInnerText(view.usernameInputError, "");
    removeClass(view.usernameInput, "form__input_error");
}
function handleAddUserSubmit(event) {
    event.preventDefault();
    console.log("[INFO] Form add user submit event");
    const [getNewUserToAddName] = state.newUserToAddName;
    const newUserToAddName = getNewUserToAddName();
    if (isEmpty(newUserToAddName)) {
        console.log("[INFO] No user to add");
        setInnerText(view.usernameInputError, "Username cannot be empty");
        addClass(view.usernameInput, "form__input_error");
        return null;
    }
    else if (typeof newUserToAddName === "string" && isXssPresent(newUserToAddName)) {
        setInnerText(view.usernameInputError, "Invalid symbols");
        addClass(view.usernameInput, "form__input_error");
        return null;
    }
    console.log(`[INFO] User ${newUserToAddName} will be added later in course`);
}
function handleCancelAddUserClick(event) {
    event.preventDefault();
    const [getIsAddUserModalOpen, setIsAddUserModalOpen] = state.isAddUserModalOpen;
    const isAddUserModalOpen = getIsAddUserModalOpen();
    if (typeof isAddUserModalOpen === "boolean") {
        toggleClass(isAddUserModalOpen, view.addUserOverlay, "overlay_active");
        setIsAddUserModalOpen(false);
    }
}
function handleDeleteConversationButtonClick(event) {
    event.preventDefault();
    console.log("[INFO] Conversation removal feature will be added later in course");
}
function handleCancelDeleteConversationButtonClick(event) {
    event.preventDefault();
    const [getIsDeleteConversationModalOpen, setIsDeleteConversationModalOpen] = state.isDeleteConversationModalOpen;
    const isDeleteConversationModalOpen = getIsDeleteConversationModalOpen();
    if (typeof isDeleteConversationModalOpen === "boolean") {
        toggleClass(isDeleteConversationModalOpen, view.deleteConversationOverlay, "overlay_active");
        setIsDeleteConversationModalOpen(false);
    }
}
export default {};
//# sourceMappingURL=index.js.map