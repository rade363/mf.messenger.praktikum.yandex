import {isEmpty, isXssPresent} from "./helpers.js";

export function validateForm(formData: IFormObject, errorCallback: (key: string, value: unknown, errorMessage: string) => unknown): void {
    Object.entries(formData).forEach(([key, value]) => {
        if (isEmpty(value)) {
            errorCallback(key, value, "Cannot be empty");
        } else if (typeof value === "string" && isXssPresent(value)) {
            errorCallback(key, value, "Invalid symbols");
        }
    });
}

export function createFormObjectFromState(state: IState, ignorePropsList: string[]): IFormObject {
    const formObj: IFormObject = {};

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