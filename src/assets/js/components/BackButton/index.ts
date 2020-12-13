import Block from "../../modules/Block.js";
import {compile} from "../../modules/templator.js";
import template from "./BackButton.js";

export default class BackButton extends Block {
    constructor(props: IBackButtonProps) {
        super("a", {
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