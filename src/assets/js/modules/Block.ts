import EventBus from "./EventBus.js";
import {generateUniqueId} from "./helpers.js";
import {connectBlockWithDom} from "./domHelpers.js";

export default class Block {
    static EVENTS: IBlockEvents = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    private _element: HTMLElement | null = null;
    private readonly _meta: IBlockMeta | null = null;
    readonly uniqueId: string | null = null;
    isConnected: boolean = false;

    props: TObjectType;
    oldProps: TObjectType;
    eventBus: () => IEventBus;

    constructor(tagName: string = "div", props: TObjectType = {}) {
        const eventBus = new EventBus();

        this.uniqueId = generateUniqueId();

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
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    componentDidMount(): void {}

    _componentDidUpdate(): void {
        // console.log('[BLOCK] _CDU');
        const oldProps = Object.entries(this.oldProps).reduce((acc: TObjectType, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
        const newProps = Object.entries(this.props).reduce((acc: TObjectType, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
        // console.log('[BLOCK] oldProps', oldProps);
        // console.log('[BLOCK] newProps', newProps);
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    componentDidUpdate(oldProps: TObjectType, newProps: TObjectType): boolean {
        // console.log('[BLOCK] CDU');
        if (oldProps !== undefined && newProps !== undefined) {
            return true;
        }
        return true;
    }


    setProps(nextProps: TObjectType): void | boolean {
        if (!nextProps) {
            return false;
        }

        this.oldProps = {
            ...this.props
        };

        Object.assign(this.props, nextProps);

        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    };

    get element(): HTMLElement | null {
        return this._element;
    }

    _render(): void {
        const block = this.render();
        const element = this.getContent();
        // console.log('[BLOCK] [RENDER]', this._meta?.tagName, element, this.isConnected);
        const attributes = this.props.attributes;
        if (element) {
            if (block) {
                element.innerHTML = "";
                element.appendChild(block);
            }
            if (attributes !== undefined) {
                Object
                    .entries(attributes)
                    .forEach(([attributeName, attributeValue]) => {
                        if (element.hasAttribute(attributeName)) {
                            element.removeAttribute(attributeName);
                        }
                        if (typeof attributeValue === "string") {
                            element.setAttribute(attributeName, attributeValue);
                        }
                    });
            }

            if (this.isConnected) {
                // console.log('Reconnecting...', this._meta?.tagName, this.props);
                Object.values(this.props).forEach((prop: TObjectType) => {
                    connectBlockWithDom(element, prop)
                });
            } else if (!element.classList.contains(`uid${this.uniqueId}`)) {
                element.classList.add(`uid${this.uniqueId}`);
            }
        }
    }

    render(): Element | null {
        return null;
    }

    getContent(): HTMLElement | null {
        return this.element;
    }

    connectElement(domElement: HTMLElement | null):void {
        this._element = domElement;
        this.isConnected = true;

        const element = this._element;
        const eventListeners = this.props.eventListeners;
        if (element) {
            element.classList.remove(`uid${this.uniqueId}`);
            if (eventListeners !== undefined) {
                eventListeners.forEach((eventListener: [string, () => unknown]) => {
                    const [eventName, callback] = eventListener;
                    console.log('[BLOCK] Event listener registered', eventName);
                    element.addEventListener(eventName, callback);
                });
            }
        }

        console.log(`[BLOCK] Element ${this._meta?.tagName} connected`, this._element);
    }

    rerenderComponent(): void {
        this.isConnected = false;
        this._render();
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