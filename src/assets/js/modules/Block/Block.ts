import EventBus from "../EventBus";
import {generateUniqueId, areObjectsEqual, createObjectWithoutPrivateProps} from "../helpers";
import connectBlockWithDom from "../domConnector";

export default class Block implements IBlock{
    static EVENTS: IBlockEvents = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    private _element: HTMLElement | null = null;
    private readonly _meta: IBlockMeta | null = null;
    private _isConnected: boolean = false;

    uniqueId: string | null = null;

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
        this.oldProps = { ...props };

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _makePropsProxy(props: TObjectType): TObjectType {
        return new Proxy(props, {
            get(target: TObjectType, prop: string): unknown {
                if (prop && typeof prop === "string" && prop.indexOf("_") === 0) {
                    throw new Error("Отказано в доступе");
                }

                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target: TObjectType, prop: string, val: unknown): never | boolean {
                if (prop && prop.indexOf("_") === 0) {
                    throw new Error("Нет доступа");
                }

                target[prop] = val;
                return true;
            },
            deleteProperty(): never {
                throw new Error("Нет доступа");
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

    componentDidMount(): void {
    }

    _componentDidUpdate(): void {
        const oldProps = createObjectWithoutPrivateProps(this.oldProps);
        const newProps = createObjectWithoutPrivateProps(this.props);
        const shouldBeUpdated = this.componentDidUpdate(oldProps, newProps);
        if (shouldBeUpdated) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    componentDidUpdate(oldProps: TObjectType, newProps: TObjectType): boolean {
        return !areObjectsEqual(oldProps, newProps);
    }


    setProps(nextProps: TObjectType): void {
        if (!nextProps) {
            return;
        }

        for (let key in this.props) {
            if (this.props.hasOwnProperty(key) && key.indexOf("_") !== 0) {
                this.oldProps[key] = this.props[key];
            }
        }

        Object.assign(this.props, nextProps);

        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    };

    get element(): HTMLElement | null {
        return this._element;
    }

    _render(): void | null {
        const block = this.render();
        const element = this.getContent();
        const attributes = this.props.attributes;
        if (!element) {
            return null;
        }
        if (block) {
            element.innerHTML = "";
            element.appendChild(block);
        }
        if (attributes) {
            Object
                .entries(attributes)
                .forEach(([attributeName, attributeValue]) => {
                    if (typeof attributeValue === "string") {
                        element.setAttribute(attributeName, attributeValue);
                    }
                });
        }

        if (this._isConnected) {
            Object.values(this.props).forEach((prop: TObjectType) => {
                connectBlockWithDom(element, prop)
            });
        } else if (!element.classList.contains(`uid${this.uniqueId}`)) {
            element.classList.add(`uid${this.uniqueId}`);
        }
    }

    render(): Element | null {
        return null;
    }

    getContent(): HTMLElement | null {
        return this.element;
    }

    connectElement(domElement: HTMLElement | null): void | null {
        this._element = domElement;
        this._isConnected = true;

        const element = this._element;
        if (!element) {
            return null;
        }

        element.classList.remove(`uid${this.uniqueId}`);

        const {eventListeners, onSubmit} = this.props;
        if (eventListeners !== undefined) {
            eventListeners.forEach((eventListener: [string, () => unknown]) => {
                const [eventName, callback] = eventListener;
                element.addEventListener(eventName, callback);
            });
        }
        if (onSubmit !== undefined) {
            element.addEventListener("submit", onSubmit);
        }
    }

    rerenderComponent(): void {
        this._isConnected = false;
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

    detach(): void {
        const element = this.getContent();
        if (element) {
            element.remove();
        }
    }
}