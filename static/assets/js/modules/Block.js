import EventBus from "./EventBus.js";
export default class Block {
    constructor(tagName = "div", props = {}) {
        this._element = null;
        this._meta = null;
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
    _makePropsProxy(props) {
        return new Proxy(props, {
            get(target, prop) {
                if (prop.indexOf('_') === 0) {
                    throw new Error('Отказано в доступе');
                }
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, val) {
                if (prop.indexOf('_') === 0) {
                    throw new Error("Нет доступа");
                }
                target[prop] = val;
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
    }
    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }
    _createResources() {
        if (this._meta) {
            const tagName = this._meta.tagName;
            this._element = this._createDocumentElement(tagName);
        }
    }
    _createDocumentElement(tagName) {
        return document.createElement(tagName);
    }
    _componentDidMount() {
        this.componentDidMount();
        console.log("Mount");
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    componentDidMount() { }
    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }
    componentDidUpdate(oldProps, newProps) {
        console.log(oldProps, newProps);
        return true;
    }
    setProps(nextProps) {
        if (!nextProps) {
            return false;
        }
        Object.assign(this.props, nextProps);
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    }
    ;
    get element() {
        return this._element;
    }
    _render() {
        const block = this.render();
        const element = this._element;
        if (element && block) {
            element.innerHTML = "";
            element.appendChild(block);
        }
    }
    render() {
        return null;
    }
    getContent() {
        return this.element;
    }
    show() {
        const element = this.getContent();
        if (element) {
            element.style.display = "block";
        }
    }
    hide() {
        const element = this.getContent();
        if (element) {
            element.style.display = "none";
        }
    }
}
Block.EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
};
//# sourceMappingURL=Block.js.map