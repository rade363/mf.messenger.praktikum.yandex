import {renderInterface} from "../assets/js/modules/domHelpers.js";
import Login from "../assets/js/pages/Login/index.js";

document.addEventListener("DOMContentLoaded", initInterface);

function initInterface(): void {
    renderInterface(document.getElementById("root"), new Login());
}

export default {};