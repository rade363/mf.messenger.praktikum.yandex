(function () {
    let state = {
        searchKey: "",
        newMessage: "",
        newUserToAddName: "",
        attachments: null,
        isAttachmentContextMenuOpen: false,
        isConversationActionsMenuOpen: false,
        isAddUserModalOpen: false,
        isDeleteConversationModalOpen: false
    };
    let view = {};

    document.addEventListener("DOMContentLoaded", initInterface);

    function initInterface() {
        renderInterface();

        view = initView();

        view.searchInput.addEventListener("input", handleSearchInput);
        view.searchForm.addEventListener("submit", submitSearchFilter);

        view.messageInput.addEventListener("input", setNewMessage);
        view.messageForm.addEventListener("submit", handleSubmitMessageForm);

        view.conversationActionsButton.addEventListener("click", handleConversationsButtonClick);
        view.attachmentButton.addEventListener("click", handleAttachmentsButtonClick);
        view.attachmentPhotoInput.addEventListener("input", (event) => handleAttachmentInput(event, "photo"));
        view.attachmentFileInput.addEventListener("input", (event) => handleAttachmentInput(event, "file"));
        view.attachmentLocationInput.addEventListener("input", (event) => handleAttachmentInput(event, "location"));

        view.addUserButton.addEventListener("click", handleAddUserButtonClick);
        view.usernameInput.addEventListener("input", handleUsernameInput);
        view.addUserForm.addEventListener("submit", handleAddUserSubmit);
        view.cancelAddUserFormButton.addEventListener("click", handleCancelAddUserClick);

        view.deleteConversationButton.addEventListener("click", handleDeleteConversationContextButtonClick);
        view.approveDeleteButton.addEventListener("click", handleDeleteConversationButtonClick);
        view.cancelDeleteButton.addEventListener("click", handleCancelDeleteConversationButtonClick);
    }

    function renderInterface() {
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
                actions: [
                    {
                        text: "Add user",
                        icon: "add.svg"
                    },
                    {
                        text: "Delete conversation",
                        icon: "delete.svg"
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
        document.getElementById("root").innerHTML = template(data);
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

    function handleSearchInput(event) {
        const {value} = event.target;
        console.log("[INFO] Search input", value);

        setStateProp("searchKey", value);
    }

    function submitSearchFilter(event) {
        event.preventDefault();
        console.log("[INFO] Search form submitted, this will be handled later in this course", state.searchKey);
    }

    function setNewMessage(event) {
        const {value} = event.target;
        console.log("[INFO] Message", value);

        setStateProp("newMessage", value);

        return isEmpty(value)
            ? removeClass(view.submitMessageButton, "message-form__submit-button_active")
            : addClass(view.submitMessageButton, "message-form__submit-button_active");
    }

    function addClass(element, className) {
        if (!element.classList.contains(className)) {
            element.classList.add(className);
        }
    }

    function removeClass(element, className) {
        if (element.classList.contains(className)) {
            element.classList.remove(className);
        }
    }

    function setStateProp(propName, value) {
        state = {
            ...state,
            [propName]: value
        };
    }

    function isEmpty(value) {
        return value === undefined || value === null || value === "";
    }

    function handleSubmitMessageForm(event) {
        event.preventDefault();
        if (isEmpty(state.newMessage)) {
            console.log("[INFO] No message to submit");
            return null;
        }
        const messageObject = {
            message: state.newMessage,
            attachments: state.attachments
        };
        console.log(`[INFO] Message will be submitted later in course`, messageObject);
    }

    function handleConversationsButtonClick() {
        const isOpen = !state.isConversationActionsMenuOpen;
        setStateProp("isConversationActionsMenuOpen", isOpen);

        if (isOpen) {
            addClass(view.conversationActionsMenu, "conversation__context_active");
            addClass(this, "actions-button_active");
        } else {
            removeClass(view.conversationActionsMenu, "conversation__context_active");
            removeClass(this, "actions-button_active");
        }
    }

    function handleAttachmentsButtonClick() {
        const isOpen = !state.isAttachmentContextMenuOpen;
        setStateProp("isAttachmentContextMenuOpen", isOpen);

        if (isOpen) {
            addClass(view.attachmentContextMenu, "attachment-menu_active");
            addClass(this, "message-form__attachment-button_active");
        } else {
            removeClass(view.attachmentContextMenu, "attachment-menu_active");
            removeClass(this, "message-form__attachment-button_active");
        }
    }

    function handleAttachmentInput(event, attachmentType) {
        const {files} = event.target;
        console.log(`[INFO] Attachment ${attachmentType} uploaded: `, files);

        setStateProp("attachments", files)
        setStateProp("isAttachmentContextMenuOpen", false);

        removeClass(view.attachmentContextMenu, "attachment-menu_active");
        removeClass(view.attachmentButton, "message-form__attachment-button_active");

        if (attachmentType === "location") {
            console.log("[INFO] Not sure that location should be a file though... But we will probably figure this out later in this course?");
        }
    }

    function handleAddUserButtonClick() {
        toggleModal(state.isAddUserModalOpen, view.addUserOverlay, "overlay_active");
        setStateProp("isAddUserModalOpen", true);
    }

    function toggleModal(isOpen, element, className) {
        return isOpen
            ? removeClass(element, className)
            : addClass(element, className);
    }

    function handleDeleteConversationContextButtonClick() {
        toggleModal(state.isDeleteConversationModalOpen, view.deleteConversationOverlay, "overlay_active");
        setStateProp("isDeleteConversationModalOpen", true);
    }

    function handleUsernameInput(event) {
        const {value} = event.target;
        console.log("[INFO] Username", value);
        setStateProp("newUserToAddName", value);

        view.usernameInputError.innerText = "";
        removeClass(view.usernameInput, "form__input_error");
    }

    function handleAddUserSubmit(event) {
        event.preventDefault();
        console.log("[INFO] Form add user submit event");
        if (isEmpty(state.newUserToAddName)) {
            console.log("[INFO] No user to add");
            view.usernameInputError.innerText = "Username cannot be empty";
            addClass(view.usernameInput, "form__input_error");
            return null;
        }
        console.log(`[INFO] User ${state.newUserToAddName} will be added later in course`);
    }

    function handleCancelAddUserClick(event) {
        event.preventDefault();
        toggleModal(state.isAddUserModalOpen, view.addUserOverlay, "overlay_active");
        setStateProp("isAddUserModalOpen", false);
    }

    function handleDeleteConversationButtonClick(event) {
        event.preventDefault();
        console.log("[INFO] Conversation removal feature will be added later in course");
    }

    function handleCancelDeleteConversationButtonClick(event) {
        event.preventDefault();
        toggleModal(state.isDeleteConversationModalOpen, view.deleteConversationOverlay, "overlay_active");
        setStateProp("isDeleteConversationModalOpen", false);
    }

    function getTemplate() {
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
                    {{#each conversation.actions}}
                    <button class="context__add context-button" type="button">
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
})();