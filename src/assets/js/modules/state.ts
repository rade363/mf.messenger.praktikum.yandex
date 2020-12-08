export function useState<T>(initialValue: T): [() => T, (newState: T) => T] {
    let state = initialValue;

    function setState(possibleCallback: T): T {
        return typeof possibleCallback === "function" ? possibleCallback(state) : possibleCallback;
    }

    function getState(): T {
        return state;
    }

    return [getState, setState];
}