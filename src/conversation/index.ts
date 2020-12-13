import {renderInterface} from "../assets/js/modules/domHelpers.js";
import Conversation from "../assets/js/pages/Conversation/index.js";

document.addEventListener("DOMContentLoaded", initInterface);

function initInterface(): void {
    renderInterface(document.getElementById("root"), new Conversation());
}

export default {};