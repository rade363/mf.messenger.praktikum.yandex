export function compile(template: string, props: TObjectType): string {
    const templatedProps = Object.entries(props).reduce((acc, [key, prop]) => {
        const value = prop.hasOwnProperty("_element") ? prop.getContent().outerHTML : prop;
        return {
            ...acc,
            [key]: value
        };
    }, {});
    const compiledTemplate = window.Handlebars.compile(template);
    window.Handlebars.registerHelper('if_eq', function(a, b, opts) {
        return a === b ? opts.fn(this) : opts.inverse(this);
    });
    window.Handlebars.registerHelper('gt', function(a, b, opts) {
        return a > b ? opts.fn(this) : opts.inverse(this);
    });
    window.Handlebars.registerHelper('notEmpty', function(a, opts) {
        return a !== "" ? opts.fn(this) : opts.inverse(this);
    });
    window.Handlebars.registerHelper('isTrue', function(a, opts) {
        return a === true ? opts.fn(this) : opts.inverse(this);
    });
    return compiledTemplate(templatedProps);
}