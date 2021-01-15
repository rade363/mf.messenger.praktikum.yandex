export default function connectBlockWithDom(domElement: HTMLElement, block: IBlock | IBlock[]): void {
    if (Array.isArray(block)) {
        block.forEach((element) => {
            if (typeof element === "object") {
                Object.values(element).forEach((value) => connectBlockWithDom(domElement, value));
            }
        });
    } else if (block.uniqueId !== undefined) {
        const exactElement = domElement.querySelector<HTMLElement>(`.uid${block.uniqueId}`);
        if (exactElement) {
            block.connectElement(exactElement);

            Object.values(block.props).forEach((prop) => connectBlockWithDom(domElement, prop));
        }
    }
}
