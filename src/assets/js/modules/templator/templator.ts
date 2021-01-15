import { isEmpty } from "../helpers";

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

export default function compile(template: string, props: TObjectType): Element {
    const templatedProps = getTemplatedProps(props);
    const compileTemplate = window.Handlebars.compile(template);

    function ifEquals(a: unknown, b: unknown, opts: IHandlebarsOptions): unknown {
        return a === b ? opts.fn(this) : opts.inverse(this);
    }

    function greaterThan(a: number, b: number, opts: IHandlebarsOptions): unknown {
        return a > b ? opts.fn(this) : opts.inverse(this);
    }

    function notEmpty(a: unknown, opts: IHandlebarsOptions): unknown {
        return !isEmpty(a) ? opts.fn(this) : opts.inverse(this);
    }

    function isTrue(a: boolean, opts: IHandlebarsOptions): unknown {
        return a ? opts.fn(this) : opts.inverse(this);
    }

    window.Handlebars.registerHelper("if_eq", ifEquals);
    window.Handlebars.registerHelper("gt", greaterThan);
    window.Handlebars.registerHelper("notEmpty", notEmpty);
    window.Handlebars.registerHelper("isTrue", isTrue);

    const tempParentElement = document.createElement("div");
    tempParentElement.innerHTML = compileTemplate(templatedProps);
    const compiledElement = tempParentElement.children[0];

    return compiledElement;
}
