import { useState } from "../assets/js/modules/state.js";
import { isEmpty } from "../assets/js/modules/helpers.js";
import { initEventListener, addClass, removeClass, setInnerText, toggleClass } from "../assets/js/modules/domHelpers.js";
import conversationTemplate from "../assets/js/pages/conversation.js";
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
    renderInterface();
    view = initView();
    initEventListener(view.searchInput, "input", (event) => setStatePropValue(event, "searchKey"));
    initEventListener(view.searchForm, "submit", submitSearchFilter);
    initEventListener(view.messageInput, "input", setNewMessage);
    initEventListener(view.messageForm, "submit", handleSubmitMessageForm);
    initEventListener(view.conversationActionsButton, "click", handleConversationsButtonClick);
    initEventListener(view.attachmentButton, "click", handleAttachmentsButtonClick);
    initEventListener(view.attachmentPhotoInput, "input", handleAttachment);
    initEventListener(view.attachmentFileInput, "input", handleAttachment);
    initEventListener(view.attachmentLocationInput, "input", handleAttachment);
    initEventListener(view.addUserButton, "click", handleAddUserButtonClick);
    initEventListener(view.usernameInput, "input", handleAddUserInput);
    initEventListener(view.addUserForm, "submit", handleAddUserSubmit);
    initEventListener(view.cancelAddUserFormButton, "click", handleCancelAddUserClick);
    initEventListener(view.deleteConversationButton, "click", handleDeleteConversationContextButtonClick);
    initEventListener(view.approveDeleteButton, "click", handleDeleteConversationButtonClick);
    initEventListener(view.cancelDeleteButton, "click", handleCancelDeleteConversationButtonClick);
}
function renderInterface() {
    const template = Handlebars.compile(conversationTemplate);
    Handlebars.registerHelper('gt', function (a, b, opts) {
        return a > b ? opts.fn(this) : opts.inverse(this);
    });
    Handlebars.registerHelper('notEmpty', function (a, opts) {
        return a !== "" ? opts.fn(this) : opts.inverse(this);
    });
    Handlebars.registerHelper('isTrue', function (a, opts) {
        return a === true ? opts.fn(this) : opts.inverse(this);
    });
    const data = {
        profileLink: {
            url: "/profile/",
            text: "Profile"
        },
        chatListItems: [
            {
                avatar: "userpic-no-avatar.svg",
                username: "John",
                lastMessage: "Image",
                lastMessageBy: "",
                time: "20:37",
                unread: 2,
                isSelected: false
            },
            {
                avatar: "userpic-no-avatar.svg",
                username: "Alex",
                lastMessage: ":)",
                lastMessageBy: "",
                time: "17:51",
                unread: 0,
                isSelected: false
            },
            {
                avatar: "userpic-no-avatar.svg",
                username: "Viktor",
                lastMessage: "Давно не виделись! Как п...",
                lastMessageBy: "You",
                time: "17:40",
                unread: 0,
                isSelected: false
            },
            {
                avatar: "userpic-no-avatar.svg",
                username: "Developers",
                lastMessage: "What is this?",
                lastMessageBy: "Vlad",
                time: "16:05",
                unread: 9,
                isSelected: false
            },
            {
                avatar: "userpic-no-avatar.svg",
                username: "Pavel",
                lastMessage: "I will create my own Telegr...",
                lastMessageBy: "You",
                time: "12:25",
                unread: 0,
                isSelected: false
            },
            {
                avatar: "userpic-no-avatar.svg",
                username: "Daniel",
                lastMessage: "Damn, Daniel!",
                lastMessageBy: "You",
                time: "MON",
                unread: 0,
                isSelected: true
            },
            {
                avatar: "userpic-no-avatar.svg",
                username: "Narayan",
                lastMessage: "Thank you my friend!",
                lastMessageBy: "",
                time: "SAT",
                unread: 0,
                isSelected: false
            },
            {
                avatar: "userpic-no-avatar.svg",
                username: "Konstantin",
                lastMessage: "We need to discuss something i...",
                lastMessageBy: "",
                time: "15/11/20",
                unread: 0,
                isSelected: false
            },
            {
                avatar: "userpic-no-avatar.svg",
                username: "Artemy",
                lastMessage: "Image",
                lastMessageBy: "",
                time: "13/11/20",
                unread: 0,
                isSelected: false
            },
            {
                avatar: "userpic-no-avatar.svg",
                username: "Artemy",
                lastMessage: "Image",
                lastMessageBy: "",
                time: "13/11/20",
                unread: 0,
                isSelected: false
            },
            {
                avatar: "userpic-no-avatar.svg",
                username: "Artemy",
                lastMessage: "Image",
                lastMessageBy: "",
                time: "13/11/20",
                unread: 0,
                isSelected: false
            },
            {
                avatar: "userpic-no-avatar.svg",
                username: "Artemy",
                lastMessage: "Image",
                lastMessageBy: "",
                time: "13/11/20",
                unread: 0,
                isSelected: false
            },
            {
                avatar: "userpic-no-avatar.svg",
                username: "Artemy",
                lastMessage: "Image",
                lastMessageBy: "",
                time: "13/11/20",
                unread: 0,
                isSelected: false
            },
            {
                avatar: "userpic-no-avatar.svg",
                username: "Artemy",
                lastMessage: "Image",
                lastMessageBy: "",
                time: "13/11/20",
                unread: 0,
                isSelected: false
            }
        ],
        conversationSelected: true,
        conversation: {
            user: {
                name: "Daniel",
                status: "last seen 1 hour ago"
            },
            messagesList: [
                {
                    outgoing: false,
                    text: "Hello bro!",
                    imageUrl: "",
                    time: "10:44",
                    status: "read"
                },
                {
                    outgoing: true,
                    text: "Hey, what’s up? Have you heard the latest news?",
                    imageUrl: "",
                    time: "11:01",
                    status: "read"
                },
                {
                    outgoing: false,
                    text: "Amazing! What are the news?",
                    imageUrl: "",
                    time: "11:03",
                    status: "read"
                },
                {
                    outgoing: true,
                    text: "“Vans, the original action sports brand and advocate for creative expression, is proud to announce three-time Grammy award-winning artist, musician  and producer Anderson .Paak as the brand’s first Global Music Ambassador. Vans and AP share a mutual passion to promote creative expression through their active support of art and music. AP is longtime fan of the brand and always aspires to uplift the community around him, making him a natural addition to the Vans family. The Vans x Anderson .Paak collection will be available worldwide on November 13 and will retail for €45 - €115 / £37 - £95.”",
                    imageUrl: "",
                    time: "11:07",
                    status: "read"
                },
                {
                    outgoing: false,
                    text: "Pfff, “news”. I’ve already got them!",
                    imageUrl: "",
                    time: "11:56",
                    status: "read"
                },
                {
                    outgoing: false,
                    text: "",
                    imageUrl: "vans.jpg",
                    time: "11:57",
                    status: "read"
                },
                {
                    outgoing: true,
                    text: "Damn, Daniel!",
                    imageUrl: "",
                    time: "11:59",
                    status: "read"
                },
                {
                    outgoing: true,
                    text: "Some",
                    imageUrl: "",
                    time: "11:59",
                    status: "sent"
                },
                {
                    outgoing: true,
                    text: "more",
                    imageUrl: "",
                    time: "11:59",
                    status: "sent"
                },
                {
                    outgoing: true,
                    text: "messages",
                    imageUrl: "",
                    time: "11:59",
                    status: "sent"
                },
                {
                    outgoing: true,
                    text: "to",
                    imageUrl: "",
                    time: "11:59",
                    status: "sent"
                },
                {
                    outgoing: true,
                    text: "test",
                    imageUrl: "",
                    time: "11:59",
                    status: "sent"
                },
                {
                    outgoing: true,
                    text: "scroll",
                    imageUrl: "",
                    time: "11:59",
                    status: "sent"
                }
            ],
            actionsPopupButtons: [
                {
                    text: "Add user",
                    icon: "add.svg",
                    class: "context__add"
                },
                {
                    text: "Delete conversation",
                    icon: "delete.svg",
                    class: "context__delete"
                }
            ],
            attachmentOptions: [
                {
                    name: "photo",
                    icon: "attachment-photo.svg",
                    text: "Photo or Video"
                },
                {
                    name: "file",
                    icon: "attachment-file.svg",
                    text: "File"
                },
                {
                    name: "location",
                    icon: "attachment-location.svg",
                    text: "Location"
                }
            ]
        },
        addUserOverlay: {
            title: "Add user"
        }
    };
    const root = document.getElementById("root");
    if (root) {
        root.innerHTML = template(data);
    }
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
//# sourceMappingURL=index.js.map