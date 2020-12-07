import { isEmpty, isXssPresent } from "./helpers.js";
export function validateForm(formData, errorCallback) {
    Object.entries(formData).forEach(([key, value]) => {
        if (isEmpty(value)) {
            errorCallback(key, value, "Cannot be empty");
        }
        else if (typeof value === "string" && isXssPresent(value)) {
            errorCallback(key, value, "Invalid symbols");
        }
    });
}
export function createFormObjectFromState(state, ignorePropsList) {
    const formObj = {};
    Object.entries(state).forEach(keyValuePair => {
        const [propName, propStateMethods] = keyValuePair;
        if (ignorePropsList.indexOf(propName) > -1) {
            return null;
        }
        const [getPropValue] = propStateMethods;
        formObj[propName] = getPropValue();
    });
    return formObj;
}
//# sourceMappingURL=formValidator.js.map