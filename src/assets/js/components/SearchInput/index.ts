import Block from "../../modules/Block/Block";
import {compile} from "../../modules/templator/templator";
import template from "./SearchInput";
import Input from "../Input/index";

import {useState} from "../../modules/state";
import {isXssPresent} from "../../modules/helpers";

const state: ISearchState = {
    searchKey: useState("")
};

export default class SearchInput extends Block {
    constructor(props: ISearchInputProps) {
        const [getSearchKey, setSearchKey] = state.searchKey;
        super("form", {
            attributes: {
                class: "chat__search searchbar",
                method: "POST"
            },
            searchInput: new Input({
                attributes: {
                    class: "searchbar__input",
                    type: "text",
                    placeholder: "Search",
                    name: "search",
                    pattern: "\\S+"
                },
                eventListeners: [
                    ["input", (event: Event) => {
                        const element = event.target as HTMLInputElement;
                        const {value} = element;
                        setSearchKey(value);
                    }]
                ]
            }),
            onSubmit: function(event: Event): void {
                event.preventDefault();
                event.stopPropagation();

                const searchKey = getSearchKey();
                if (isXssPresent(searchKey)) {
                    alert("Invalid symbols");
                } else {
                    console.log("[INFO] Search form submitted", searchKey);
                    props.search(searchKey);
                }
            }
        });
    }

    render() {
        return compile(template, this.props);
    }
}