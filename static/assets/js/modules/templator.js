import { isEmpty } from "./helpers.js";
export function compile(template, props) {
    const templatedProps = getTemplatedProps(props);
    const compiledTemplate = window.Handlebars.compile(template);
    window.Handlebars.registerHelper('if_eq', function (a, b, opts) {
        return a === b ? opts.fn(this) : opts.inverse(this);
    });
    window.Handlebars.registerHelper('gt', function (a, b, opts) {
        return a > b ? opts.fn(this) : opts.inverse(this);
    });
    window.Handlebars.registerHelper('notEmpty', function (a, opts) {
        return !isEmpty(a) ? opts.fn(this) : opts.inverse(this);
    });
    window.Handlebars.registerHelper('isTrue', function (a, opts) {
        return a === true ? opts.fn(this) : opts.inverse(this);
    });
    const tempParentElement = document.createElement("div");
    tempParentElement.innerHTML = compiledTemplate(templatedProps);
    const compiledElement = tempParentElement.children;
    return compiledElement[0];
}
function getTemplatedProps(props) {
    return Object.entries(props).reduce((acc, [key, prop]) => {
        const value = getPropValue(prop);
        return Object.assign(Object.assign({}, acc), { [key]: value });
    }, {});
}
function getPropValue(prop) {
    if (typeof prop !== "object") {
        return prop;
    }
    if (prop.nodeType !== undefined) {
        return prop.outerHTML;
    }
    if (Array.isArray(prop)) {
        return prop.map(getPropValue);
    }
    return getTemplatedProps(prop);
}
//# sourceMappingURL=templator.js.map