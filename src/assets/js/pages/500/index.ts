import Block from "../../modules/Block.js";
import Button from "../../components/Button/index.js";
import template from "./template.js";
import {compile} from "../../modules/templator.js";

export default class ServerError extends Block {
    constructor() {
        super("main", {
            attributes: {
                class: "container"
            },

            code: 500,
            description: "Something went wrong",
            button: new Button("link", {
                attributes: {
                    class: "error__link-back button button_thin button_primary button_link",
                    href: "/chats/"
                },
                text: "Go back"
            })
        });
    }

    componentDidMount() {
        console.log("______________________________________________");
        // console.log('[INFO] Small demo of component lifecycle methods');

        setTimeout(() => {
            // console.log("Where is button? 1", this.props.button.element);
        }, 500);

        setTimeout(() => {
            console.log("Where is button? 2", this.props.button.element);
            this.setProps({
                code: "XXX",
                description: "Hello"
            });
            console.log("Where is button? 3", this.props.button.element);
            setTimeout(() => {
                console.log("Where is button? 4", this.props.button.element);
            }, 2000);
        }, 1000);

        setTimeout(() => {
            console.log("______________________________________________");
            console.log("Where is button? 5", this.props.button.element);
            this.props.button.setProps({
                text: "Another button"
            });
            console.log("Where is button? 6", this.props.button.element);
        }, 4000);

        setTimeout(() => {
            console.log("______________________________________________");
            console.log("Where is button? 7", this.props.button.element);
            this.props.button.setProps({
                text: "Go back"
            });
            console.log("Where is button? 8", this.props.button.element);
        }, 5000);

        setTimeout(() => {
            console.log("______________________________________________");
            console.log("Where is main? 9", this.element);
        }, 6000);

        setTimeout(() => {
            console.log("______________________________________________");
            console.log("Where is button? 10", this.props.button.element);

            this.setProps({
                code: 500,
                description: "Something went wrong"
            });

            console.log("Where is button? 11", this.props.button.element);
        }, 7000);
    }

    render() {
        // console.log('[MAIN] Render');
        return compile(template, {
            code: this.props.code,
            description: this.props.description,
            button: this.props.button
        });
    }
}