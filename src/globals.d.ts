type TObjectType = {
    [key: string]: any;
};

type IViewType = {
    [key: string]: HTMLElement | null;
};

interface ITemplateData extends TObjectType{
    [key: string]: boolean | number | string | null | unknown[] | TObjectType;
}

interface IState {
    [key: string]: [() => unknown, (newState: unknown) => unknown];
}

interface IFormObject {
    [key: string]: unknown;
}

interface IListeners {
    [key: string]: unknown[]
}

interface IEventBus {
    listeners: IListeners;
    on: (INIT: string, callback: unknown) => void;
    off: (INIT: string, callback: unknown) => void;
    emit: (INIT: string, ...args: unknown[]) => void;
}

interface IBlockEvents {
    [key: string]: string;
}

interface IBlockMeta {
    tagName: string;
    props: unknown
}