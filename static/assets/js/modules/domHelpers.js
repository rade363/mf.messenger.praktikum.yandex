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
    if (element !== null) {
        return isClassActive
            ? removeClass(element, className)
            : addClass(element, className);
    }
}
export function setInnerText(element, text) {
    if (element) {
        element.innerText = text;
    }
}
export function addEventListener(element, eventName, callback) {
    if (element) {
        element.addEventListener(eventName, callback);
    }
}
export function renderInterface(rootElement, block) {
    const pageElement = block.getContent();
    if (rootElement && pageElement) {
        rootElement.appendChild(pageElement);
    }
}
//# sourceMappingURL=domHelpers.js.map