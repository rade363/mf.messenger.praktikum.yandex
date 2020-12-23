import Block from "../../modules/Block.js";
import SearchInput from "../../components/SearchInput/index.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";
import ChatList from "../../components/ChatList/index.js";
import ConversationMain from "../../components/ConversationMain/index.js";
import Modal from "../../components/Modal/index.js";
import Form from "../../components/Form/index.js";
import ConfirmMessage from "../../components/ConfirmMessage/index.js";
import Double from "../../components/Double/index.js";
import Button from "../../components/Button/index.js";
import Router from "../../modules/Router.js";

export default class Conversation extends Block {
    constructor() {
        const router = new Router("#root");
        const addUserModal = new Modal({
            name: "add-user",
            title: "Add user",
            child: new Form({
                name: "add-user-form",
                inputFields: [
                    {
                        label: "Username",
                        type: "text",
                        name: "username"
                    }
                ],
                actions: [
                    {
                        type: "double",
                        attributes: {
                            class: ""
                        },
                        children: [
                            {
                                text: "Add",
                                attributes: {
                                    type: "submit",
                                    class: "add-user-form__add-button button button_wide button_primary"
                                }
                            },
                            {
                                text: "Cancel",
                                attributes: {
                                    type: "button",
                                    class: "add-user-form__cancel-button button button_wide button_secondary"
                                },
                                eventListeners: [
                                    ["click", () => addUserModal.hide()]
                                ]
                            }
                        ]
                    }
                ],
                onSubmit: (formObject: IFormObject): void => {
                    console.log("[INFO] Username valid, add user event executed, form will be submitted later in this course", formObject)
                }
            })
        });
        const deleteConversationModal: TObjectType = new Modal({
            name: "delete-conversation",
            title: "Delete conversation",
            child: new ConfirmMessage({
                message: `<div class="modal__message">Are you sure? <br/>This action cannot be undone.</div>`,
                actions: [
                    {
                        action: new Double({
                            type: "double",
                            attributes: {
                                class: ""
                            },
                            children: [
                                {
                                    child: new Button("button", {
                                        text: "Delete",
                                        attributes: {
                                            type: "button",
                                            class: "delete-conversation__approve button button_wide button_danger"
                                        },
                                        eventListeners: [
                                            ["click", () => {
                                                console.log('Conversation deleted (will be implemented later in the course');
                                                deleteConversationModal.hide()
                                            }]
                                        ]
                                    })
                                },
                                {
                                    child: new Button("button", {
                                        text: "Delete",
                                        attributes: {
                                            type: "button",
                                            class: "delete-conversation__approve button button_wide button_secondary"
                                        },
                                        eventListeners: [
                                            ["click", () => deleteConversationModal.hide()]
                                        ]
                                    })
                                }
                            ]
                        })
                    }
                ]
            })
        });
        super("div", {
            profileLink: new Button("a", {
                text: "Profile",
                attributes: {
                    class: "chat__profile-link",
                    href: "/profile/"
                },
                eventListeners: [
                    ["click", (event: Event) => {
                        event.preventDefault();
                        router.go("/profile/");
                    }]
                ]
            }),
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
                        isSelected: true,
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
            }),
            conversationMain: new ConversationMain({
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
                addUserModal,
                deleteConversationModal
            }),
            modals: [
                {
                    modal: addUserModal
                },
                {
                    modal: deleteConversationModal
                }
            ]
        })
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}