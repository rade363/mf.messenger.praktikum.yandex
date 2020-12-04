import {useState} from "../assets/js/modules/state.js";
import {isEmpty} from "../assets/js/modules/helpers.js";
import {addClass, removeClass, setInnerText, toggleClass} from "../assets/js/modules/domHelpers.js";

let state: State = {
    searchKey: useState(""),
    newMessage: useState(""),
    newUserToAddName: useState(""),
    attachments: useState(null),
    isAttachmentContextMenuOpen: useState(false),
    isConversationActionsMenuOpen: useState(false),
    isAddUserModalOpen: useState(false),
    isDeleteConversationModalOpen: useState(false)
};
let view: ViewType = {};

document.addEventListener("DOMContentLoaded", initInterface);

function initInterface(): void {
    renderInterface();

    view = initView();

    if (view.searchInput) {
        view.searchInput.addEventListener("input", (event) => setStatePropValue(event, "searchKey"));
    }
    if (view.searchForm) {
        view.searchForm.addEventListener("submit", submitSearchFilter);
    }

    if (view.messageInput) {
        view.messageInput.addEventListener("input", setNewMessage);
    }
    if (view.messageForm) {
        view.messageForm.addEventListener("submit", handleSubmitMessageForm);
    }

    if (view.conversationActionsButton) {
        view.conversationActionsButton.addEventListener("click", handleConversationsButtonClick);
    }
    if (view.attachmentButton) {
        view.attachmentButton.addEventListener("click", handleAttachmentsButtonClick);
    }
    if (view.attachmentPhotoInput) {
        view.attachmentPhotoInput.addEventListener("input", handleAttachment);
    }
    if (view.attachmentFileInput) {
        view.attachmentFileInput.addEventListener("input", handleAttachment);
    }
    if (view.attachmentLocationInput) {
        view.attachmentLocationInput.addEventListener("input", handleAttachment);
    }

    if (view.addUserButton) {
        view.addUserButton.addEventListener("click", handleAddUserButtonClick);
    }
    if (view.usernameInput) {
        view.usernameInput.addEventListener("input", (event: Event) => {
            setStatePropValue(event, "newUserToAddName");
            setInnerText(view.usernameInputError, "");
            removeClass(view.usernameInput, "form__input_error");
        });
    }

    if (view.addUserForm) {
        view.addUserForm.addEventListener("submit", handleAddUserSubmit);
    }
    if (view.cancelAddUserFormButton) {
        view.cancelAddUserFormButton.addEventListener("click", handleCancelAddUserClick);
    }

    if (view.deleteConversationButton) {
        view.deleteConversationButton.addEventListener("click", handleDeleteConversationContextButtonClick);
    }
    if (view.approveDeleteButton) {
        view.approveDeleteButton.addEventListener("click", handleDeleteConversationButtonClick);
    }
    if (view.cancelDeleteButton) {
        view.cancelDeleteButton.addEventListener("click", handleCancelDeleteConversationButtonClick);
    }
}

function renderInterface(): void {
    const template = Handlebars.compile(getTemplate());
    Handlebars.registerHelper('gt', function(a, b, opts) {
        return a > b ? opts.fn(this) : opts.inverse(this);
    });
    Handlebars.registerHelper('notEmpty', function(a, opts) {
        return a !== "" ? opts.fn(this) : opts.inverse(this);
    });
    Handlebars.registerHelper('isTrue', function(a, opts) {
        return a === true ? opts.fn(this) : opts.inverse(this);
    });
    const data: TemplateData = {
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

function initView(): ViewType {
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

function submitSearchFilter(event: Event): void {
    event.preventDefault();
    const [getSearchKey] = state.searchKey;
    const searchKey = getSearchKey();
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

function handleAddUserSubmit(event: Event): void | null {
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

function getTemplate(): string {
    return `<div class="chat">
    <aside class="chat__sidebar">
        <nav class="chat__nav">
            <div class="chat__topbar">
                <a class="chat__profile-link" href="{{profileLink.url}}">{{profileLink.text}}</a>
            </div>
            <form class="chat__search searchbar" method="POST">
                <input class="searchbar__input" type="text" placeholder="Search" name="search" pattern="\\S+"/>
            </form>
        </nav>
        <ul class="chat__list chat-list">
            {{#each chatListItems}}
                <li class="chat-list__item {{#if isSelected}}chat-list__item_active{{/if}}">
                    <div class="chat-list__userpic userpic">
                        <img class="userpic__image" src="../assets/img/{{avatar}}" alt="{{username}}" />
                    </div>
                    <div class="chat-list__content">
                        <h2 class="chat-list__username">{{username}}</h2>
                        <div class="chat-list__preview preview">
                            {{#notEmpty lastMessageBy}}
                            <span class="preview__highlight">{{lastMessageBy}}:</span>
                            {{/notEmpty}}
                            {{lastMessage}}
                        </div>
                    </div>
                    <div class="chat-list__meta">
                        <time class="chat-list__datetime">{{time}}</time>
                        <div class="chat-list__indicator">
                            {{#gt unread 0}}
                            <mark class="chat-list__unread">{{unread}}</mark>
                            {{/gt}}
                        </div>
                    </div>
                </li>
            {{/each}}
        </ul>
    </aside>
    <div class="chat__conversation conversation">
        <header class="conversation__header">
            <div class="conversation__user-info user-info">
                <h1 class="user-info__name">{{conversation.user.name}}</h1>
                <span class="user-info__activity">{{conversation.user.status}}</span>
            </div>
            <button class="conversation__actions-button actions-button" type="button"></button>
            <div class="conversation__context context-menu">
                {{#each conversation.actionsPopupButtons}}
                <button class="{{class}} context-button" type="button">
                    <img class="context-button__icon" src="../assets/img/{{icon}}" alt="{{text}}" />
                    <span class="context-button__text">{{text}}</span>
                </button>
                {{/each}}
            </div>
        </header>
        <main class="conversation__list">
            {{#each conversation.messagesList}}
            <div class="message message_{{#if outgoing}}outgoing{{else}}incoming{{/if}}">
                <div class="message__bubble">
                    {{#notEmpty imageUrl}}
                    <img class="message_media" src="../assets/img/{{imageUrl}}" alt="image" />
                    {{else}}
                    <p class="message__text">{{text}}</p>
                    {{/notEmpty}}
                    <div class="message__meta">
                        {{#if outgoing}}
                        <div class="message__status message__status_{{status}}"></div>
                        {{/if}}
                        <time class="message__time">{{time}}</time>
                    </div>
                </div>
            </div>
            {{/each}}
        </main>
        <form class="conversation__message-form message-form" method="POST">
            <button class="message-form__attachment-button" type="button"></button>
            <input class="message-form__message" type="text" placeholder="Write a message&mldr;" name="message"/>
            <button class="message-form__submit-button" type="submit"></button>
            <div class="context-menu attachment-menu">
                {{#each conversation.attachmentOptions}}
                <div class="context-button attachment-menu__item">
                    <input class="message-form__{{name}}-input attachment-menu__input" type="file" name="{{name}}" id="{{name}}"/>
                    <img class="context-button__icon" src="../assets/img/{{icon}}" alt="{{text}}" />
                    <label class="context-button__text" for="{{name}}">{{text}}</label>
                </div>
                {{/each}}
            </div>
        </form>
    </div>
</div>
<div class="overlay add-user">
<div class="container modal">
    <div class="modal__title">Add user</div>
    <form class="form add-user-form" method="POST">
        <div class="form__item">
            <label class="form__label" for="username">Username</label>
            <input class="form__input add-user-form__username-input" type="text" id="username" />
            <span class="form__error add-user-form__username-error"></span>
        </div>
        <div class="form__item add-user-form__actions double">
            <button class="add-user-form__add-button button button_thin button_primary double__child" type="submit">Add</button>
            <button class="add-user-form__cancel-button button button_thin button_secondary double__child" type="button">Cancel</button>
        </div>
    </form>
</div>
</div>
<div class="overlay delete-conversation">
<div class="container modal delete-conversation__modal">
    <div class="modal__title">Delete conversation</div>
    <div class="modal__message">Are you sure? <br/>This action cannot be undone.</div>
    <div class="modal__buttons delete-conversation__actions double">
        <button class="delete-conversation__approve button button_thin button_danger double__child" type="button">Delete</button>
        <button class="delete-conversation__cancel button button_thin button_secondary double__child" type="button">Cancel</button>
    </div>
</div>
</div>`;
}