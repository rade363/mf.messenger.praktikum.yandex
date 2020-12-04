export function useState<T>(initialValue: T): [() => T, (newState: T) => T] {
    let state = initialValue;

    function setState(possibleCallback: T): T {
        if (typeof possibleCallback === "function") {
            const callback = possibleCallback;
            state = callback(state);
        } else {
            const value = possibleCallback;
            state = value;
        }
        return state;
    }

    function getState(): T {
        return state;
    }

    return [getState, setState];
}