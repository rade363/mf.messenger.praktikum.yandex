import { renderInterface } from "../assets/js/modules/domHelpers.js";
import ServerError from "../assets/js/pages/500/index.js";
document.addEventListener("DOMContentLoaded", () => {
    renderInterface(document.getElementById("root"), new ServerError());
});
export default {};
//# sourceMappingURL=index.js.map