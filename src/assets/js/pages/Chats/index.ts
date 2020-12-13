import Block from "../../modules/Block.js";
import SearchInput from "../../components/SearchInput/index.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";
import ChatList from "../../components/ChatList/index.js";

export default class Chats extends Block {
    constructor() {
        super("div", {
            attributes: {
                class: "chat"
            },
            profileLink: {
                url: "/profile/",
                text: "Profile"
            },
            searchInput: new SearchInput(),
            chatList: new ChatList({
                attributes: {
                    class: "chat__list"
                },
                items: [
                    {
                        avatar: "../assets/img/userpic-no-avatar.svg",
                        username: "John",
                        lastMessage: "Image",
                        lastMessageBy: "",
                        time: "20:37",
                        unread: 2,
                        isSelected: false
                    },
                    {
                        avatar: "../assets/img/userpic-no-avatar.svg",
                        username: "Alex",
                        lastMessage: ":)",
                        lastMessageBy: "",
                        time: "17:51",
                        unread: 0,
                        isSelected: false
                    },
                    {
                        avatar: "../assets/img/userpic-no-avatar.svg",
                        username: "Viktor",
                        lastMessage: "Давно не виделись! Как п...",
                        lastMessageBy: "You",
                        time: "17:40",
                        unread: 0,
                        isSelected: false
                    },
                    {
                        avatar: "../assets/img/userpic-no-avatar.svg",
                        username: "Developers",
                        lastMessage: "What is this?",
                        lastMessageBy: "Vlad",
                        time: "16:05",
                        unread: 9,
                        isSelected: false
                    },
                    {
                        avatar: "../assets/img/userpic-no-avatar.svg",
                        username: "Pavel",
                        lastMessage: "I will create my own Telegr...",
                        lastMessageBy: "You",
                        time: "12:25",
                        unread: 0,
                        isSelected: false
                    },
                    {
                        avatar: "../assets/img/userpic-no-avatar.svg",
                        username: "Daniel",
                        lastMessage: "Damn, Daniel!",
                        lastMessageBy: "You",
                        time: "MON",
                        unread: 0,
                        isSelected: false,
                        url: "/conversation/"
                    },
                    {
                        avatar: "../assets/img/userpic-no-avatar.svg",
                        username: "Narayan",
                        lastMessage: "Thank you my friend!",
                        lastMessageBy: "",
                        time: "SAT",
                        unread: 0,
                        isSelected: false
                    },
                    {
                        avatar: "../assets/img/userpic-no-avatar.svg",
                        username: "Konstantin",
                        lastMessage: "We need to discuss something i...",
                        lastMessageBy: "",
                        time: "15/11/20",
                        unread: 0,
                        isSelected: false
                    },
                    {
                        avatar: "../assets/img/userpic-no-avatar.svg",
                        username: "Artemy",
                        lastMessage: "Image",
                        lastMessageBy: "",
                        time: "13/11/20",
                        unread: 0,
                        isSelected: false
                    },
                    {
                        avatar: "../assets/img/userpic-no-avatar.svg",
                        username: "Artemy",
                        lastMessage: "Image",
                        lastMessageBy: "",
                        time: "13/11/20",
                        unread: 0,
                        isSelected: false
                    },
                    {
                        avatar: "../assets/img/userpic-no-avatar.svg",
                        username: "Artemy",
                        lastMessage: "Image",
                        lastMessageBy: "",
                        time: "13/11/20",
                        unread: 0,
                        isSelected: false
                    },
                    {
                        avatar: "../assets/img/userpic-no-avatar.svg",
                        username: "Artemy",
                        lastMessage: "Image",
                        lastMessageBy: "",
                        time: "13/11/20",
                        unread: 0,
                        isSelected: false
                    },
                    {
                        avatar: "../assets/img/userpic-no-avatar.svg",
                        username: "Artemy",
                        lastMessage: "Image",
                        lastMessageBy: "",
                        time: "13/11/20",
                        unread: 0,
                        isSelected: false
                    },
                    {
                        avatar: "../assets/img/userpic-no-avatar.svg",
                        username: "Artemy",
                        lastMessage: "Image",
                        lastMessageBy: "",
                        time: "13/11/20",
                        unread: 0,
                        isSelected: false
                    }
                ]
            })
        });
    }

    render(): Element | null {
        return compile(template, {
            profileLink: this.props.profileLink,
            searchInput: this.props.searchInput,
            chatList: this.props.chatList
        });
    }
}