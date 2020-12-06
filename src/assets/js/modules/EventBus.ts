export default class EventBus implements IEventBus {
    listeners: IListeners;

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: unknown): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: unknown): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
    }

    emit(event: string, ...args: unknown[]): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach((listener: unknown) => {
            if (typeof listener === "function") {
                listener(...args);
            }
        });
    }
}