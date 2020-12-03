export function useState(initialValue) {
    let state = initialValue;

    function setState(possibleCallback) {
        if (typeof possibleCallback === "function") {
            const callback = possibleCallback;
            state = callback(state);
        } else {
            const value = possibleCallback;
            state = value;
        }
        return state;
    }

    function getState() {
        return state;
    }

    return [getState, setState];
}