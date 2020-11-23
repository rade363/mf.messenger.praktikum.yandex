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
})();