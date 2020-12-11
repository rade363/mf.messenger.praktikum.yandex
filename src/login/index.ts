import {renderInterface} from "../assets/js/modules/domHelpers.js";
import Login from "../assets/js/pages/Login/index.js";

document.addEventListener("DOMContentLoaded", initInterface);

function initInterface(): void {
    renderInterface(document.getElementById("root"), new Login());
}

// function validateElements(block: TObjectType): void {
//     if (typeof block === "string" || typeof block === "number") {
//         console.log('[STRING]', block);
//     } else if (Array.isArray(block)) {
//         block.forEach(element => {
//             if (typeof element === "string" || typeof element === "number") {
//                 console.log('[STRING]', block);
//             } else if (typeof element === "object") {
//                 Object.values(element).forEach(validateElements);
//             }
//         })
//     } else {
//         if (block.uniqueId !== undefined) {
//             console.log("[BLOCK]", block._element);
//             Object.values(block.props).forEach(validateElements);
//         }
//     }
// }

export default {};