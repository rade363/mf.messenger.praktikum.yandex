export function addClass(element, className) {
    if (!element.classList.contains(className)) {
        element.classList.add(className);
    }
}
export function removeClass(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    }
}
export function toggleClass(isClassActive, element, className) {
    return isClassActive
        ? removeClass(element, className)
        : addClass(element, className);
}
//# sourceMappingURL=domHelpers.js.map