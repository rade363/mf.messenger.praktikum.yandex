import {renderInterface} from "../assets/js/modules/domHelpers.js";
import ProfileEditInfo from "../assets/js/pages/ProfileEditInfo/index.js";

document.addEventListener("DOMContentLoaded", initInterface);

function initInterface(): void {
    renderInterface(document.getElementById("root"), new ProfileEditInfo());
}

export default {};