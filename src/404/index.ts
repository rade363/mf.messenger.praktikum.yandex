import {renderInterface} from "../assets/js/modules/domHelpers.js";
import ErrorPage from "../assets/js/pages/ErrorPage/index.js";
import Button from "../assets/js/components/Button/index.js";

document.addEventListener("DOMContentLoaded", () => {
    renderInterface(document.getElementById("root"), new ErrorPage({
        attributes: {
            class: "container"
        },
        code: 404,
        description: "Not found",
        button: new Button("a", {
            attributes: {
                class: "error__link-back button button_thin button_primary",
                href: "/chats/"
            },
            text: "Go back"
        })
    }));
});

export default {};