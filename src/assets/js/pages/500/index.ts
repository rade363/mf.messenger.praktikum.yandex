import ErrorPage from "../ErrorPage/index.js";
import Button from "../../components/Button/index.js";
import Router from "../../modules/Router.js";

export default class ServerError extends ErrorPage {
    constructor() {
        const router = new Router("#root");
        super({
            attributes: {
                class: "container"
            },
            code: 500,
            description: "Something went wrong",
            button: new Button("a", {
                attributes: {
                    class: "error__link-back button button_thin button_primary button_link",
                    href: "/chats/"
                },
                text: "Go back",
                eventListeners: [
                    ["click", (event: Event) => {
                        event.preventDefault();
                        router.back();
                    }]
                ]
            })
        });
    }
}