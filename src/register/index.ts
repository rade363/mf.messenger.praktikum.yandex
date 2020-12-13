import {renderInterface} from "../assets/js/modules/domHelpers.js";
import Register from "../assets/js/pages/Register/index.js";

document.addEventListener("DOMContentLoaded", initInterface);

function initInterface(): void {
    renderInterface(document.getElementById("root"), new Register());
}

export default {};