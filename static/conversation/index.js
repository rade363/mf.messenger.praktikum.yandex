import { useState } from "../assets/js/modules/state.js";
import { isEmpty } from "../assets/js/modules/helpers.js";
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
function isXssPresent(message) {
    const regexp = /<[^\w<>]*(?:[^<>"'\s]*:)?[^\w<>]*(?:\W*s\W*c\W*r\W*i\W*p\W*t|\W*f\W*o\W*r\W*m|\W*s\W*t\W*y\W*l\W*e|\W*s\W*v\W*g|\W*m\W*a\W*r\W*q\W*u\W*e\W*e|(?:\W*l\W*i\W*n\W*k|\W*o\W*b\W*j\W*e\W*c\W*t|\W*e\W*m\W*b\W*e\W*d|\W*a\W*p\W*p\W*l\W*e\W*t|\W*p\W*a\W*r\W*a\W*m|\W*i?\W*f\W*r\W*a\W*m\W*e|\W*b\W*a\W*s\W*e|\W*b\W*o\W*d\W*y|\W*m\W*e\W*t\W*a|\W*i\W*m\W*a?\W*g\W*e?|\W*v\W*i\W*d\W*e\W*o|\W*a\W*u\W*d\W*i\W*o|\W*b\W*i\W*n\W*d\W*i\W*n\W*g\W*s|\W*s\W*e\W*t|\W*i\W*s\W*i\W*n\W*d\W*e\W*x|\W*a\W*n\W*i\W*m\W*a\W*t\W*e)[^>\w])|(?:<\w[\s\S]*[\s\0\/]|['"])(?:formaction|style|background|src|lowsrc|ping|on(?:d(?:e(?:vice(?:(?:orienta|mo)tion|proximity|found|light)|livery(?:success|error)|activate)|r(?:ag(?:e(?:n(?:ter|d)|xit)|(?:gestur|leav)e|start|drop|over)?|op)|i(?:s(?:c(?:hargingtimechange|onnect(?:ing|ed))|abled)|aling)|ata(?:setc(?:omplete|hanged)|(?:availabl|chang)e|error)|urationchange|ownloading|blclick)|Moz(?:M(?:agnifyGesture(?:Update|Start)?|ouse(?:PixelScroll|Hittest))|S(?:wipeGesture(?:Update|Start|End)?|crolledAreaChanged)|(?:(?:Press)?TapGestur|BeforeResiz)e|EdgeUI(?:C(?:omplet|ancel)|Start)ed|RotateGesture(?:Update|Start)?|A(?:udioAvailable|fterPaint))|c(?:o(?:m(?:p(?:osition(?:update|start|end)|lete)|mand(?:update)?)|n(?:t(?:rolselect|extmenu)|nect(?:ing|ed))|py)|a(?:(?:llschang|ch)ed|nplay(?:through)?|rdstatechange)|h(?:(?:arging(?:time)?ch)?ange|ecking)|(?:fstate|ell)change|u(?:echange|t)|l(?:ick|ose))|m(?:o(?:z(?:pointerlock(?:change|error)|(?:orientation|time)change|fullscreen(?:change|error)|network(?:down|up)load)|use(?:(?:lea|mo)ve|o(?:ver|ut)|enter|wheel|down|up)|ve(?:start|end)?)|essage|ark)|s(?:t(?:a(?:t(?:uschanged|echange)|lled|rt)|k(?:sessione|comma)nd|op)|e(?:ek(?:complete|ing|ed)|(?:lec(?:tstar)?)?t|n(?:ding|t))|u(?:ccess|spend|bmit)|peech(?:start|end)|ound(?:start|end)|croll|how)|b(?:e(?:for(?:e(?:(?:scriptexecu|activa)te|u(?:nload|pdate)|p(?:aste|rint)|c(?:opy|ut)|editfocus)|deactivate)|gin(?:Event)?)|oun(?:dary|ce)|l(?:ocked|ur)|roadcast|usy)|a(?:n(?:imation(?:iteration|start|end)|tennastatechange)|fter(?:(?:scriptexecu|upda)te|print)|udio(?:process|start|end)|d(?:apteradded|dtrack)|ctivate|lerting|bort)|DOM(?:Node(?:Inserted(?:IntoDocument)?|Removed(?:FromDocument)?)|(?:CharacterData|Subtree)Modified|A(?:ttrModified|ctivate)|Focus(?:Out|In)|MouseScroll)|r(?:e(?:s(?:u(?:m(?:ing|e)|lt)|ize|et)|adystatechange|pea(?:tEven)?t|movetrack|trieving|ceived)|ow(?:s(?:inserted|delete)|e(?:nter|xit))|atechange)|p(?:op(?:up(?:hid(?:den|ing)|show(?:ing|n))|state)|a(?:ge(?:hide|show)|(?:st|us)e|int)|ro(?:pertychange|gress)|lay(?:ing)?)|t(?:ouch(?:(?:lea|mo)ve|en(?:ter|d)|cancel|start)|ime(?:update|out)|ransitionend|ext)|u(?:s(?:erproximity|sdreceived)|p(?:gradeneeded|dateready)|n(?:derflow|load))|f(?:o(?:rm(?:change|input)|cus(?:out|in)?)|i(?:lterchange|nish)|ailed)|l(?:o(?:ad(?:e(?:d(?:meta)?data|nd)|start)?|secapture)|evelchange|y)|g(?:amepad(?:(?:dis)?connected|button(?:down|up)|axismove)|et)|e(?:n(?:d(?:Event|ed)?|abled|ter)|rror(?:update)?|mptied|xit)|i(?:cc(?:cardlockerror|infochange)|n(?:coming|valid|put))|o(?:(?:(?:ff|n)lin|bsolet)e|verflow(?:changed)?|pen)|SVG(?:(?:Unl|L)oad|Resize|Scroll|Abort|Error|Zoom)|h(?:e(?:adphoneschange|l[dp])|ashchange|olding)|v(?:o(?:lum|ic)e|ersion)change|w(?:a(?:it|rn)ing|heel)|key(?:press|down|up)|(?:AppComman|Loa)d|no(?:update|match)|Request|zoom))[\s\0]*=/gi;
    return message.search(regexp) > -1;
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
export default {};
//# sourceMappingURL=index.js.map