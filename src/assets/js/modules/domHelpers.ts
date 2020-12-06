export function addClass(element: HTMLElement | null, className: string): void {
    if (element && !element.classList.contains(className)) {
        element.classList.add(className);
    }
}

export function removeClass(element: HTMLElement | null, className: string): void {
    if (element && element.classList.contains(className)) {
        element.classList.remove(className);
    }
}

export function toggleClass(isClassActive: boolean, element: HTMLElement | null, className: string): void {
    if (element !== null) {
        return isClassActive
            ? removeClass(element, className)
            : addClass(element, className);
    }
}

export function setInnerText(element: HTMLElement | null, text: string): void {
    if (element) {
        element.innerText = text;
    }
}

export function addEventListener(element: HTMLElement | null, eventName: string, callback:(event: Event) => unknown): void {
    if (element) {
        element.addEventListener(eventName, callback);
    }
}

export function renderInterface(rootElement: HTMLElement | null, block: any): void {
    const pageElement = block.getContent();
    if (rootElement && pageElement) {
        rootElement.appendChild(pageElement);
    }
}