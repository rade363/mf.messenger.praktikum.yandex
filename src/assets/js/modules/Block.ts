import EventBus from "./EventBus.js";

export default class Block {
    static EVENTS: IBlockEvents = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    private _element: HTMLElement | null = null;
    private readonly _meta: IBlockMeta | null = null;

    props: TObjectType;
    eventBus: () => IEventBus;

    constructor(tagName: string = "div", props: TObjectType = {}) {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props
        };

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _makePropsProxy(props: TObjectType): TObjectType {
        return new Proxy(props, {
            get(target: TObjectType, prop: string): unknown {
                if (prop.indexOf('_') === 0) {
                    throw new Error('Отказано в доступе');
                }

                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target: TObjectType, prop: string, val: unknown): never | boolean {
                if (prop.indexOf('_') === 0) {
                    throw new Error("Нет доступа");
                }

                target[prop] = val;
                return true;
            },
            deleteProperty(): never {
                throw new Error('Нет доступа');
            }
        });
    }

    _registerEvents(eventBus: IEventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }


    init(): void {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
    _createResources(): void {
        if (this._meta) {
            const tagName = this._meta.tagName;
            this._element = this._createDocumentElement(tagName);
        }
    }
    _createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    _componentDidMount(): void {
        this.componentDidMount();
        console.log("Mount");
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    componentDidMount(): void {}

    _componentDidUpdate(oldProps: TObjectType, newProps: TObjectType): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    componentDidUpdate(oldProps: TObjectType, newProps: TObjectType): boolean {
        console.log(oldProps, newProps);
        return true;
    }


    setProps(nextProps: TObjectType): void | boolean {
        if (!nextProps) {
            return false;
        }

        Object.assign(this.props, nextProps);
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    };

    get element(): HTMLElement | null {
        return this._element;
    }

    _render(): void {
        const block = this.render();
        const element = this._element;
        if (element && block) {
            element.innerHTML = "";
            element.appendChild(block);
        }
    }

    render(): Element | null {
        return null;
    }

    getContent(): HTMLElement | null {
        return this.element;
    }

    show(): void {
        const element = this.getContent();
        if (element) {
            element.style.display = "block";
        }
    }

    hide(): void {
        const element = this.getContent();
        if (element) {
            element.style.display = "none";
        }
    }
}