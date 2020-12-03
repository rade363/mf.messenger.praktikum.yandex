import {useState} from "../assets/js/modules/state.js";
import {removeClass} from "../assets/js/modules/domHelpers.js";

let state = {
    searchKey: useState("")
};
let view = {};

document.addEventListener("DOMContentLoaded", initInterface);

function initInterface() {
    renderInterface();
    view = initView();
    view.searchInput.addEventListener("input", (event) => setStatePropValue(event, "searchKey"));
    view.searchForm.addEventListener("submit", submitSearchFilter);
}

function renderInterface() {
    const template = Handlebars.compile(getTemplate());
    Handlebars.registerHelper('gt', function(a, b, opts) {
        return a > b ? opts.fn(this) : opts.inverse(this);
    });
    Handlebars.registerHelper('notEmpty', function(a, opts) {
        return a !== "" ? opts.fn(this) : opts.inverse(this);
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
    document.getElementById("root").innerHTML = template(data);
}

function initView() {
    return {
        searchInput: document.querySelector(".searchbar__input"),
        searchForm: document.querySelector(".chat__search")
    };
}

function setStatePropValue(event, propName) {
    const {value} = event.target;
    console.log(`[INFO] ${propName}`, value);

    const [, setStateCallback] = state[propName];
    setStateCallback(value);

    if (view[`${propName}Error`]) {
        view[`${propName}Error`].innerText = "";
        removeClass(view[`${propName}Input`], "form__input_error");
    }
}

function submitSearchFilter(event) {
    event.preventDefault();
    const [getSearchKey] = state.searchKey;
    const searchKey = getSearchKey();
    console.log("[INFO] Search form submitted, this will be handled later in this course", searchKey);
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
    <main class="chat__conversation chat__conversation_empty">
        <h1 class="chat__empty">Please select a chat to start messaging</h1>
    </main>
</div>`;
}