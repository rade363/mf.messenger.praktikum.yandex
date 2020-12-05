import {renderInterface} from "../assets/js/modules/domHelpers.js";
import notFoundTemplate from "../assets/js/pages/notFound.js";

document.addEventListener("DOMContentLoaded", () => {
    renderInterface(document.getElementById("root"), notFoundTemplate, getTemplateData());
});
function getTemplateData(): ITemplateData {
    return {
        code: 404,
        description: "Not found",
        button: {
            class: "error__link-back button button_thin button_primary",
            url: "/chats/",
            text: "Go back"
        }
    };
}

export default {};