function getPropValue(prop: any): string | IBlockProps {
    if (typeof prop !== "object") {
        return prop;
    }
    if (prop.uniqueId !== undefined) {
        prop.rerenderComponent();
        return prop.getContent().outerHTML;
    }
    return getTemplatedProps(prop);
}

function getTemplatedProps(props: IBlockProps): IBlockProps {
    return Object.entries(props).reduce((acc: IBlockProps, [key, prop]) => {
        if (key === "attributes" || key === "eventListeners") {
            return acc;
        }
        acc[key] = getPropValue(prop);
        return acc;
    }, {});
}

export default function compile(compileTemplate: THandlebarsPrecompiler, props: TObjectType): Element {
    const templatedProps = getTemplatedProps(props);

    const tempParentElement = document.createElement("div");
    tempParentElement.innerHTML = compileTemplate(templatedProps);
    const compiledElement = tempParentElement.children[0];

    return compiledElement;
}
