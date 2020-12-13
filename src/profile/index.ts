import {renderInterface} from "../assets/js/modules/domHelpers.js";
import Profile from "../assets/js/pages/Profile/index.js";

document.addEventListener("DOMContentLoaded", initInterface);

function initInterface(): void {
    renderInterface(document.getElementById("root"), new Profile);
}

export default {};