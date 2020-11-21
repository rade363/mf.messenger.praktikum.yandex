(function () {
    let state = {
        newMessage: "",
        newUserToAddName: "",
        isAttachmentContextMenuOpen: false,
        isConversationActionsMenuOpen: false,
        isAddUserModalOpen: false,
        isDeleteConversationModalOpen: false
    };
    let view = {};

    document.addEventListener("DOMContentLoaded", initInterface);

    function initInterface() {
        view = initView();

        view.messageInput.addEventListener("input", setNewMessage);
        view.submitMessageButton.addEventListener("click", handleSubmitMessage);

        view.conversationActionsButton.addEventListener("click", handleConversationsButtonClick);
        view.attachmentButton.addEventListener("click", handleAttachmentsButtonClick);

        view.addUserButton.addEventListener("click", handleAddUserButtonClick);
        view.usernameInput.addEventListener("input", handleUsernameInput);
        view.submitAddUserFormButton.addEventListener("click", handleAddUserSubmit);
        view.cancelAddUserFormButton.addEventListener("click", handleCancelAddUserClick);

        view.deleteConversationButton.addEventListener("click", handleDeleteConversationContextButtonClick);
        view.approveDeleteButton.addEventListener("click", handleDeleteConversationButtonClick);
        view.cancelDeleteButton.addEventListener("click", handleCancelDeleteConversationButtonClick);
    }

    function initView() {
        return {
            messageInput: document.querySelector(".input-area__message"),
            submitMessageButton: document.querySelector(".input-area__submit"),

            conversationActionsMenu: document.querySelector(".conversation__context"),
            conversationActionsButton: document.querySelector(".conversation__actions"),

            addUserButton: document.querySelector(".context__add"),
            addUserOverlay: document.querySelector(".add-user"),
            usernameInput: document.querySelector(".add-user-form__username-input"),
            usernameInputError: document.querySelector(".add-user-form__username-error"),
            submitAddUserFormButton: document.querySelector(".add-user-form__add-button"),
            cancelAddUserFormButton: document.querySelector(".add-user-form__cancel-button"),

            deleteConversationButton: document.querySelector(".context__delete"),
            deleteConversationOverlay: document.querySelector(".delete-conversation"),
            approveDeleteButton: document.querySelector(".delete-conversation__approve"),
            cancelDeleteButton: document.querySelector(".delete-conversation__cancel"),

            attachmentButton: document.querySelector(".input-area__attachment"),
            attachmentContextMenu: document.querySelector(".attachments__context"),
        };
    }

    function setNewMessage(event) {
        const {value} = event.target;
        console.log("[INFO] Message", value);

        setStateProp("newMessage", value);

        return isEmpty(value)
            ? removeClass(view.submitMessageButton, "submit-message_active")
            : addClass(view.submitMessageButton, "submit-message_active");
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

    function handleSubmitMessage() {
        if (isEmpty(state.newMessage)) {
            console.log("[INFO] No message to submit");
            return null;
        }
        console.log(`[INFO] Message ${state.newMessage} will be submitted later in course`);
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

        const dotsImage = state.isConversationActionsMenuOpen ? "three-dots-active.svg" : "three-dots.svg";
        this.innerHTML = `<img class="actions-button__dots" src="../assets/img/${dotsImage}" alt="Chat actions">`;
    }

    function handleAttachmentsButtonClick() {
        const isOpen = !state.isAttachmentContextMenuOpen;
        setStateProp("isAttachmentContextMenuOpen", isOpen);

        if (isOpen) {
            addClass(view.attachmentContextMenu, "attachments__context_active");
            addClass(this, "attachment_active");
        } else {
            removeClass(view.attachmentContextMenu, "attachments__context_active");
            removeClass(this, "attachment_active");
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