import Block from "../../modules/Block/Block";
import compile from "../../modules/templator/templator";
import template from "./MessagesList.handlebars";

export default class MessagesList extends Block {
    constructor(props: IMessagesList) {
        super("main", {
            ...props,
            attributes: {
                class: `conversation__list messages`
            }
        });
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}
