export default class GlobalState {
    private static __instance: GlobalState;

    state: TObjectType;

    constructor(initialState: TObjectType = {}) {
        if (GlobalState.__instance) {
            return GlobalState.__instance;
        }

        GlobalState.__instance = this;
        this.state = initialState;
    }

    setProp(propName: string, possibleCallback: unknown): void {
        this.state[propName] =
            typeof possibleCallback === "function" && this.state[propName] !== undefined ? possibleCallback(this.state[propName]) : possibleCallback;
    }

    getProp(propName: string): any {
        if (this.state[propName]) {
            return this.state[propName];
        }
        return null;
    }

    check(): TObjectType {
        return this.state;
    }
}
