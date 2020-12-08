export function useState<T>(initialValue: T): [() => T, (newState: T) => T] {
    let state = initialValue;

    function setState(possibleCallback: T): T {
        state = typeof possibleCallback === "function" ? possibleCallback(state) : possibleCallback;
        return state;
    }

    function getState(): T {
        return state;
    }

    return [getState, setState];
}