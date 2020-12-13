import {renderInterface} from "../assets/js/modules/domHelpers.js";
import ProfileChangePassword from "../assets/js/pages/ProfileChangePassword/index.js";

document.addEventListener("DOMContentLoaded", initInterface);

function initInterface(): void {
    renderInterface(document.getElementById("root"), new ProfileChangePassword());
}

export default {};