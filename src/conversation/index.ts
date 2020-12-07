import {useState} from "../assets/js/modules/state.js";
import {isEmpty, isXssPresent} from "../assets/js/modules/helpers.js";
import {renderInterface, addEventListener, addClass, removeClass, setInnerText, toggleClass} from "../assets/js/modules/domHelpers.js";
import Conversation from "../assets/js/pages/Conversation/index.js";
import {validateForm} from "../assets/js/modules/formValidator.js";

let state: IState = {
    searchKey: useState(""),
    newMessage: useState(""),
    newUserToAddName: useState(""),
    attachments: useState(null),
    isAttachmentContextMenuOpen: useState(false),
    isConversationActionsMenuOpen: useState(false),
    isAddUserModalOpen: useState(false),
    isDeleteConversationModalOpen: useState(false)
};
let view: IViewType = {};

document.addEventListener("DOMContentLoaded", initInterface);

function initInterface(): void {
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

function initView(): IViewType {
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

function setStatePropValue(event: Event, propName: string): void {
    const element = event.target as HTMLInputElement;
    const {value} = element;
    console.log(`[INFO] ${propName}`, value);

    const [, setStateCallback] = state[propName];
    setStateCallback(value);

    setInnerText(view[`${propName}Error`], "");
    removeClass(view[`${propName}Input`], "form__input_error");
}

function submitSearchFilter(event: Event): null | void {
    event.preventDefault();
    const [getSearchKey] = state.searchKey;
    const searchKey = getSearchKey();
    if (typeof searchKey === "string" && isXssPresent(searchKey)) {
        alert("Invalid symbols");
        return null;
    }
    console.log("[INFO] Search form submitted, this will be handled later in this course", searchKey);
}

function setNewMessage(event: Event): void {
    setStatePropValue(event, "newMessage");
    const [getNewMessage] = state.newMessage;
    const newMessage = getNewMessage();
    toggleClass(isEmpty(newMessage), view.submitMessageButton, "message-form__submit-button_active");
}

function handleSubmitMessageForm(event: Event): void | null {
    event.preventDefault();
    const [getNewMessage] = state.newMessage;
    const message = getNewMessage();
    const messageForm = { message };
    let isFormValid = true;

    validateForm(messageForm, (key: string, value: unknown, errorMessage: string) => {
        isFormValid = false;
        window.alert(errorMessage);
        console.error(`[ERROR] Invalid form property ${key} value`, {
            key,
            value,
            message: errorMessage
        })
    });

    if (!isFormValid) {
        return null;
    }
    const [getAttachments] = state.attachments;
    const attachments = getAttachments();
    const formObject = {
        ...messageForm,
        attachments
    };

    console.log(`[INFO] Message will be submitted later in course`, formObject);
}

function handleConversationsButtonClick(event: Event): void {
    const [getIsConversationActionsMenuOpen, setIsConversationActionsMenuOpen] = state.isConversationActionsMenuOpen;
    const isOpen = getIsConversationActionsMenuOpen();
    const element = event.target as HTMLElement;
    if (typeof isOpen === "boolean") {
        setIsConversationActionsMenuOpen((isOpen: Boolean) => !isOpen);

        toggleClass(isOpen, view.conversationActionsMenu, "conversation__context_active");
        toggleClass(isOpen, element, "actions-button_active");
    }
}

function handleAttachmentsButtonClick(event: Event): void {
    const [getIsAttachmentContextMenuOpen, setIsAttachmentContextMenuOpen] = state.isAttachmentContextMenuOpen;
    const isOpen = getIsAttachmentContextMenuOpen();
    const element = event.target as HTMLElement;

    if (typeof isOpen === "boolean") {
        setIsAttachmentContextMenuOpen((isOpen:Boolean) => !isOpen);

        toggleClass(isOpen, view.attachmentContextMenu, "attachment-menu_active");
        toggleClass(isOpen, element, "message-form__attachment-button_active");
    }
}

function handleAttachment(event: Event): void {
    setStatePropValue(event, "attachments");
    const [, setIsAttachmentContextMenuOpen] = state.isAttachmentContextMenuOpen;
    setIsAttachmentContextMenuOpen(false);
    removeClass(view.attachmentContextMenu, "attachment-menu_active");
    removeClass(view.attachmentButton, "message-form__attachment-button_active");
}

function handleAddUserButtonClick(): void {
    const [getIsAddUserModalOpen, setIsAddUserModalOpen] = state.isAddUserModalOpen;
    const isAddUserModalOpen = getIsAddUserModalOpen();
    if (typeof isAddUserModalOpen === "boolean") {
        toggleClass(isAddUserModalOpen, view.addUserOverlay, "overlay_active");
        setIsAddUserModalOpen(true);
    }
}

function handleDeleteConversationContextButtonClick(): void {
    const [getIsDeleteConversationModalOpen, setIsDeleteConversationModalOpen] = state.isDeleteConversationModalOpen;
    const isDeleteConversationModalOpen = getIsDeleteConversationModalOpen();
    if (typeof isDeleteConversationModalOpen === "boolean") {
        toggleClass(isDeleteConversationModalOpen, view.deleteConversationOverlay, "overlay_active");
        setIsDeleteConversationModalOpen(true);
    }
}

function handleAddUserInput(event: Event): void {
    setStatePropValue(event, "newUserToAddName");
    setInnerText(view.usernameInputError, "");
    removeClass(view.usernameInput, "form__input_error");
}

function handleAddUserSubmit(event: Event): void | null {
    event.preventDefault();
    console.log("[INFO] Form add user submit event");

    const [getNewUserToAddName] = state.newUserToAddName;
    const newUserToAddName = getNewUserToAddName();
    const formObj: IFormObject = { newUserToAddName };
    let isFormValid = true;

    validateForm(formObj, (key: string, value: unknown, errorMessage: string) => {
        isFormValid = false;
        addClass(view.usernameInput, "form__input_error");
        setInnerText(view.usernameInputError, errorMessage);
        console.error(`[ERROR] Invalid form property ${key} value`, {
            key,
            value,
            message: errorMessage
        });
    });

    if (isFormValid) {
        console.log(`[INFO] User ${newUserToAddName} will be added later in course`);
    } else {
        console.error("[ERROR] Form was not submitted");
    }
}

function handleCancelAddUserClick(event: Event): void {
    event.preventDefault();
    const [getIsAddUserModalOpen, setIsAddUserModalOpen] = state.isAddUserModalOpen;
    const isAddUserModalOpen = getIsAddUserModalOpen();
    if (typeof isAddUserModalOpen === "boolean") {
        toggleClass(isAddUserModalOpen, view.addUserOverlay, "overlay_active");
        setIsAddUserModalOpen(false);
    }
}

function handleDeleteConversationButtonClick(event: Event): void {
    event.preventDefault();
    console.log("[INFO] Conversation removal feature will be added later in course");
}

function handleCancelDeleteConversationButtonClick(event: Event): void {
    event.preventDefault();
    const [getIsDeleteConversationModalOpen, setIsDeleteConversationModalOpen] = state.isDeleteConversationModalOpen;
    const isDeleteConversationModalOpen = getIsDeleteConversationModalOpen();
    if (typeof isDeleteConversationModalOpen === "boolean") {
        toggleClass(isDeleteConversationModalOpen, view.deleteConversationOverlay, "overlay_active");
        setIsDeleteConversationModalOpen(false);
    }
}

export default {};