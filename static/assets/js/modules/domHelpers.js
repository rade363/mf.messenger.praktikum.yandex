export function addClass(element, className) {
    if (element && !element.classList.contains(className)) {
        element.classList.add(className);
    }
}
export function removeClass(element, className) {
    if (element && element.classList.contains(className)) {
        element.classList.remove(className);
    }
}
export function toggleClass(isClassActive, element, className) {
    return element && isClassActive
        ? removeClass(element, className)
        : addClass(element, className);
}
export function setInnerText(element, text) {
    if (element) {
        element.innerText = text;
    }
}
//# sourceMappingURL=domHelpers.js.map