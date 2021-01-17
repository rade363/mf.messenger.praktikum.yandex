import connectBlockWithDom from "./domConnector";
import { API_URL } from "../constants/index";

export function renderInterface(query: string, block: IBlock): void {
    const rootElement = document.querySelector(query) as HTMLElement;
    const pageElement = block.getContent();
    if (rootElement && pageElement) {
        rootElement.appendChild(pageElement);
        connectBlockWithDom(rootElement, block);
    }
}

export function setImageUpload(event: Event, callback: (avatar: File, context: IBlock) => unknown, context: IBlock): void {
    const element = event.target as HTMLInputElement;
    const { files } = element;
    if (files !== null && files.length !== undefined) {
        const image = files[0];
        callback(image, context);
    }
}

export function createAPIUrl(path: string): string {
    return `${API_URL}${path}`;
}

export function scrollToBottomOfElement(element: Element): void {
    element.scrollTop = element.scrollHeight;
}
