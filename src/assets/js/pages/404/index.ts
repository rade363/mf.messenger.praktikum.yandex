import ErrorPage from "../ErrorPage/index";
import Button from "../../components/Button/index";
import Router from "../../modules/Router/Router";

export default class NotFound extends ErrorPage {
    constructor() {
        const router = new Router("#root");
        super({
            attributes: {
                class: "wrapper wrapper_background_empty"
            },
            code: 404,
            description: "Not found",
            button: new Button("a", {
                attributes: {
                    class: "error__link-back button button_thin button_primary",
                    href: "/chats/"
                },
                text: "Go back",
                eventListeners: [
                    [
                        "click",
                        (event: Event) => {
                            event.preventDefault();
                            router.go("/chats/");
                        }
                    ]
                ]
            })
        });
    }
}
