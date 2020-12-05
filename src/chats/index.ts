import {useState} from "../assets/js/modules/state.js";
import {addEventListener, removeClass, setInnerText} from "../assets/js/modules/domHelpers.js";
import chatsTemplate from "../assets/js/pages/chats.js";

let state: IState = {
    searchKey: useState("")
};
let view: IViewType = {};

document.addEventListener("DOMContentLoaded", initInterface);

function initInterface() {
    renderInterface();
    view = initView();
    addEventListener(view.searchInput, "input", (event) => setStatePropValue(event, "searchKey"));
    addEventListener(view.searchForm, "submit", submitSearchFilter);
}

function renderInterface(): void {
    const template = Handlebars.compile(chatsTemplate);
    Handlebars.registerHelper('gt', function(a, b, opts) {
        return a > b ? opts.fn(this) : opts.inverse(this);
    });
    Handlebars.registerHelper('notEmpty', function(a, opts) {
        return a !== "" ? opts.fn(this) : opts.inverse(this);
    });
    const data: ITemplateData = {
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
                isSelected: false
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
        conversationSelected: false
    };
    const root = document.getElementById("root");
    if (root) {
        root.innerHTML = template(data);
    }
}

function initView(): IViewType {
    return {
        searchInput: document.querySelector(".searchbar__input"),
        searchForm: document.querySelector(".chat__search")
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

function submitSearchFilter(event: Event) {
    event.preventDefault();
    const [getSearchKey] = state.searchKey;
    const searchKey = getSearchKey();
    console.log("[INFO] Search form submitted, this will be handled later in this course", searchKey);
}