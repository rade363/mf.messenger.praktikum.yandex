import Block from "../../modules/Block/Block";
import {compile} from "../../modules/templator/templator";
import template from "./AttachmentContextButton";
import Input from "../Input/index";

export default class AttachmentContextButton extends Block {
    constructor(props: IAttachmentContextButtonProps) {
        super("div", {
            ...props,
            attributes: {
                class: `${props.name} context-button`,
                type: "button"
            },
            input: new Input({
                attributes: {
                    class: `message-form__${props.name}-input attachment-menu__input`,
                    type: "file",
                    name: props.name,
                    id: props.name
                },
                eventListeners: props.eventListeners
            })
        });
    }

    render() {
        return compile(template, this.props);
    }
}