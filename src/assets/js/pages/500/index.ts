import Block from "../../modules/Block.js";
import Button from "../../components/Button/index.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";

export default class ServerError extends Block {
    constructor() {
        super("div", {
            code: 500,
            description: "Something went wrong",
            button: new Button({
                className: "error__link-back button button_thin button_primary",
                text: "Go back",
                url: "/chats/"
            })
        });
    }

    componentDidMount() {
        console.log('[INFO] Small demo of component lifecycle methods');
        setTimeout(() => {
            this.setProps({
                code: "XXX"
            });
        }, 1000);
        setTimeout(() => {
            this.setProps({
                description: "Hey"
            });
        }, 2000);
        setTimeout(() => {
            this.setProps({
                code: 500,
                description: "Something went wrong"
            });
        }, 3000);
    }

    render() {
        return compile(template, {
            code: this.props.code,
            description: this.props.description,
            button: this.props.button.render()
        });
    }
}