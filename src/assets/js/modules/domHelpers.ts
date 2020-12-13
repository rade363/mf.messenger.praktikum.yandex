export function renderInterface(rootElement: HTMLElement | null, block: any): void {
    const pageElement = block.getContent();
    if (rootElement && pageElement) {
        rootElement.appendChild(pageElement);
        connectBlockWithDom(rootElement, block);
    }
}

export function connectBlockWithDom(domElement: HTMLElement, block: any): void {
    if (block.uniqueId !== undefined) {
        const exactElement = domElement.querySelector(`.uid${block.uniqueId}`) as HTMLElement;
        if (exactElement) {
            block.connectElement(exactElement);

            Object.values(block.props).forEach(prop => connectBlockWithDom(domElement, prop));
        }
    } else if (Array.isArray(block)) {
        block.forEach(element => {
            if (typeof element === "object") {
                Object.values(element).forEach((value) => connectBlockWithDom(domElement, value))
            }
        });
    }
}

export function setImageUpload(event: Event, callback: (avatar: File) => unknown): void {
    const element = event.target as HTMLInputElement;
    const files = element.files;
    if (files !== null && files.length !== undefined) {
        const image = files[0];
        console.log("[INFO] Image uploaded", image);
        callback(files[0]);
    }
}