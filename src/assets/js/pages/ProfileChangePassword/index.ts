import Block from "../../modules/Block.js";
import BackButton from "../../components/BackButton/index.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";
import Form from "../../components/Form/index.js";
import Router from "../../modules/Router.js";

export default class ProfileChangePassword extends Block {
    constructor() {
        const router = new Router("#root");
        super("div", {
            attributes: {
                class: "profile"
            },
            title: "Profile",
            backButton: new BackButton({
                url: "/chats/",
                eventListeners: [
                    ["click", (event: Event) => {
                        event.preventDefault();
                        router.back();
                    }]
                ]
            }),
            child: new Form({
                name: "password-form",
                inputFields: [
                    {
                        label: "Old password",
                        name: "old-password",
                        type: "password"
                    },
                    {
                        label: "New password",
                        name: "new-password",
                        type: "password",
                        mustEqual: "password-repeat"
                    },
                    {
                        label: "Repeat new password",
                        name: "password-repeat",
                        type: "password",
                        mustEqual: "new-password"
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
                                    class: "password-form__save-button button button_wide button_primary"
                                }
                            },
                            {
                                text: "Cancel",
                                attributes: {
                                    href: "/profile/",
                                    class: "profile-form__cancel-button button button_wide button_secondary"
                                },
                                eventListeners: [
                                    ["click", (event: Event) => {
                                        event.preventDefault();
                                        router.back();
                                    }]
                                ]
                            }
                        ]
                    }
                ],
                onSubmit: (formObject: IFormObject) => {
                    console.log("[INFO] Profile change password event executed, form will be submitted later in this course", formObject)
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