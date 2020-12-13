import {renderInterface} from "../assets/js/modules/domHelpers.js";
import Chats from "../assets/js/pages/Chats/index.js";

document.addEventListener("DOMContentLoaded", initInterface);

function initInterface() {
    renderInterface(document.getElementById("root"), new Chats());
}

export default {};