export default class EventBus implements IEventBus {
    listeners: IListeners;

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: (...args: unknown[]) => unknown): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: (...args: unknown[]) => unknown): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
    }

    emit(event: string, ...args: unknown[]): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach((listener: (...listenerArgs: unknown[]) => unknown) => {
            if (typeof listener === "function") {
                listener(...args);
            }
        });
    }
}
