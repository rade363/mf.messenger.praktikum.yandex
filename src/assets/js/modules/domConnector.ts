export default function connectBlockWithDom(domElement: HTMLElement, block: any): void {
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