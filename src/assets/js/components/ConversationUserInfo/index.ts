import Block from "../../modules/Block/Block";
import compile from "../../modules/templator/templator";
import template from "./ConversationUserInfo.handlebars";

export default class ConversationUserInfo extends Block {
    constructor(props: IConversationUserInfo) {
        super("div", {
            ...props,
            attributes: {
                class: `conversation__user-info`
            }
        });
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}
