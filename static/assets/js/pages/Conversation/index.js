import Block from "../../modules/Block.js";
import SearchInput from "../../components/SearchInput/index.js";
import template from "./template.js";
import { compile } from "../../modules/templator.js";
export default class Conversation extends Block {
    constructor() {
        super("div", {
            profileLink: {
                url: "/profile/",
                text: "Profile"
            },
            searchInput: new SearchInput(),
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
        });
    }
    render() {
        return compile(template, {
            profileLink: this.props.profileLink,
            searchInput: this.props.searchInput.render(),
            chatListItems: this.props.chatListItems,
            conversation: this.props.conversation,
            addUserOverlay: this.props.addUserOverlay
        });
    }
}
//# sourceMappingURL=index.js.map