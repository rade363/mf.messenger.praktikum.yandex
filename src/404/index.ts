import {renderInterface} from "../assets/js/modules/domHelpers.js";
import NotFound from "../assets/js/pages/404/index.js";

document.addEventListener("DOMContentLoaded", () => {
    renderInterface(document.getElementById("root"), new NotFound());
});

export default {};