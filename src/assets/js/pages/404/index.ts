import Block from "../../modules/Block.js";
import Button from "../../components/Button/index.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";

export default class NotFound extends Block {
    constructor() {
        super("div", {
            code: 404,
            description: "Not found",
            button: new Button({
                className: "error__link-back button button_thin button_primary",
                text: "Go back",
                url: "/chats/"
            })
        });
    }

    render() {
        return compile(template, {
            code: this.props.code,
            description: this.props.description,
            button: this.props.button.render()
        });
    }
}