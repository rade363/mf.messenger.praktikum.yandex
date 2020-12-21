import {isPlainObject, isArray} from "./helpers.js";

function isArrayOrObject(value: unknown): value is [] | TObjectType {
    return isPlainObject(value) || isArray(value);
}

function getKey(key: string, parentKey?: string) {
    return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: TObjectType | [], parentKey?: string) {
    const result: [string, string][] = [];

    for(const [key, value] of Object.entries(data)) {
        if (isArrayOrObject(value)) {
            result.push(...getParams(value, getKey(key, parentKey)));
        } else {
            result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
        }
    }

    return result;
}

export default function queryString(data: TObjectType) {
    if (!isPlainObject(data)) {
        throw new Error('input must be an object');
    }

    return getParams(data).map(arr => arr.join('=')).join('&');
}