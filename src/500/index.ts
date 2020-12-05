import {renderInterface} from "../assets/js/modules/domHelpers.js";
import serverErrorTemplate from "../assets/js/pages/serverError.js";

document.addEventListener("DOMContentLoaded", () => {
    renderInterface(document.getElementById("root"), serverErrorTemplate, getTemplateData());
});
function getTemplateData(): ITemplateData {
    return {
        code: 500,
        description: "Something went wrong",
        button: {
            class: "error__link-back button button_thin button_primary",
            url: "/chats/",
            text: "Go back"
        }
    };
}

export default {};