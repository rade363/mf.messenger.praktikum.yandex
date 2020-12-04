type ObjectType = {
    [key: string]: any;
};

type ViewType = {
    [key: string]: HTMLElement | null;
};

interface TemplateData extends ObjectType{
    [key: string]: boolean | number | string | null | unknown[] | ObjectType;
}

interface State {
    [key: string]: [() => unknown, (newState: unknown) => unknown];
}

interface FormObject {
    [key: string]: unknown;
}