import Block from "../../modules/Block.js";
import BackButton from "../../components/BackButton/index.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";
import Form from "../../components/Form/index.js";

export default class ProfileEditInfo extends Block {
    constructor() {
        super("div", {
            attributes: {
                class: "profile"
            },
            title: "Profile",
            backButton: new BackButton({
                url: "/chats/"
            }),
            child: new Form({
                name: "profile-form",
                inputFields: [
                    {
                        type: "file",
                        attributes: {
                            class: "profile__picture"
                        },
                        name: "profile-pic",
                        src: "",
                        label: "Edit"
                    },
                    {
                        label: "Email",
                        type: "email",
                        name: "email"
                    },
                    {
                        label: "Login",
                        type: "text",
                        name: "login"
                    },
                    {
                        type: "double",
                        attributes: {
                            class: "form__item"
                        },
                        children: [
                            {
                                label: "First name",
                                type: "text",
                                name: "first-name"
                            },
                            {
                                label: "Last name",
                                type: "text",
                                name: "last-name"
                            }
                        ]
                    },
                    {
                        label: "Display name",
                        type: "text",
                        name: "display-name"
                    },
                    {
                        label: "Phone",
                        type: "tel",
                        name: "phone"
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
                                text: "Save",
                                attributes: {
                                    type: "submit",
                                    class: "profile-form__save-button button button_wide button_primary"
                                }
                            },
                            {
                                text: "Cancel",
                                attributes: {
                                    href: "/profile/",
                                    class: "profile-form__cancel-button button button_wide button_secondary"
                                }
                            }
                        ]
                    }
                ],
                onSubmit: (formObject: IFormObject) => {
                    console.log("[INFO] Profile edit info event executed, form will be submitted later in this course", formObject)
                }
            })
        });
    }

    render(): Element | null {
        return compile(template, {
            title: this.props.title,
            backButton: this.props.backButton,
            child: this.props.child
        });
    }
}