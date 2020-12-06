import {renderInterface, addEventListener} from "../assets/js/modules/domHelpers.js";
import Profile from "../assets/js/pages/Profile/index.js";

let view: IViewType = {};
document.addEventListener("DOMContentLoaded", initInterface);

function initInterface(): void {
    renderInterface(document.getElementById("root"), new Profile);

    view = initView();

    addEventListener(view.logoutButton, "click", logOut);
}

function initView(): IViewType {
    return {
        logoutButton: document.querySelector(".profile__log-out-button")
    };
}

function logOut(event: Event) {
    event.preventDefault();
    console.log("[INFO] Logging out will be implemented later in the course");
}

export default {};