import Block from "../../modules/Block";
import {compile} from "../../modules/templator";
import template from "./BackButton";

interface IBackButtonProps {
    url: string;
    eventListeners?: TEventListenerTemplate[] | unknown[];
}

export default class BackButton extends Block {
    constructor(props: IBackButtonProps) {
        super("a", {
            ...props,
            attributes: {
                class: "top-header__back back-button",
                href: props.url
            }
        });
    }

    render() {
        return compile(template, this.props);
    }
}