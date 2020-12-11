import {isEmpty} from "./helpers.js";

export function compile(template: string, props: TObjectType): Element {
    const templatedProps = getTemplatedProps(props);
    const compileTemplate = window.Handlebars.compile(template);

    window.Handlebars.registerHelper('if_eq', function(a, b, opts) {
        return a === b ? opts.fn(this) : opts.inverse(this);
    });
    window.Handlebars.registerHelper('gt', function(a, b, opts) {
        return a > b ? opts.fn(this) : opts.inverse(this);
    });
    window.Handlebars.registerHelper('notEmpty', function(a, opts) {
        return !isEmpty(a) ? opts.fn(this) : opts.inverse(this);
    });
    window.Handlebars.registerHelper('isTrue', function(a, opts) {
        return a === true ? opts.fn(this) : opts.inverse(this);
    });

    const tempParentElement = document.createElement("div");
    tempParentElement.innerHTML = compileTemplate(templatedProps);
    const compiledElement = tempParentElement.children[0];

    return compiledElement;
}

function getTemplatedProps(props: IBlockProps): IBlockProps {
    return Object.entries(props).reduce((acc: IBlockProps, [key, prop]) => {
        if (key === "attributes" || key === "eventListeners") {
            return acc;
        }
        acc[key] = getPropValue(prop);
        // console.log(`[TEMPLATOR] Got prop value for ${key}`, acc[key]);
        return acc;
    }, {});
}
function getPropValue(prop: any): any {
    if (typeof prop !== "object") {
        return prop;
    }
    if (prop.uniqueId !== undefined) {
        prop.rerenderComponent();
        return prop.getContent().outerHTML;
    }
    return getTemplatedProps(prop);
}