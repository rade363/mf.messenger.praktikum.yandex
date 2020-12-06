import {useState} from "../assets/js/modules/state.js";
import {renderInterface, addEventListener, removeClass, setInnerText} from "../assets/js/modules/domHelpers.js";
import Chats from "../assets/js/pages/Chats/index.js";

let state: IState = {
    searchKey: useState("")
};
let view: IViewType = {};

document.addEventListener("DOMContentLoaded", initInterface);

function initInterface() {
    renderInterface(document.getElementById("root"), new Chats());

    view = initView();
    addEventListener(view.searchInput, "input", (event) => setStatePropValue(event, "searchKey"));
    addEventListener(view.searchForm, "submit", submitSearchFilter);
}

function initView(): IViewType {
    return {
        searchInput: document.querySelector(".searchbar__input"),
        searchForm: document.querySelector(".chat__search")
    };
}

function setStatePropValue(event: Event, propName: string): void {
    const element = event.target as HTMLInputElement;
    const {value} = element;
    console.log(`[INFO] ${propName}`, value);

    const [, setStateCallback] = state[propName];
    setStateCallback(value);

    setInnerText(view[`${propName}Error`], "");
    removeClass(view[`${propName}Input`], "form__input_error");
}

function submitSearchFilter(event: Event) {
    event.preventDefault();
    const [getSearchKey] = state.searchKey;
    const searchKey = getSearchKey();
    console.log("[INFO] Search form submitted, this will be handled later in this course", searchKey);
}

export default {};