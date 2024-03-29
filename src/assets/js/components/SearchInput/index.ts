import Block from "../../modules/Block/Block";
import compile from "../../modules/templator/templator";
import template from "./SearchInput.handlebars";
import Input from "../Input/index";
import useState from "../../modules/state";
import { isXssPresent } from "../../modules/utils";

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
                    [
                        "input",
                        (event: Event) => {
                            const element = event.target as HTMLInputElement;
                            const { value } = element;
                            setSearchKey(value);
                        }
                    ]
                ]
            }),
            onSubmit(event: Event): void {
                event.preventDefault();
                event.stopPropagation();

                const searchKey = getSearchKey();
                if (isXssPresent(searchKey)) {
                    // eslint-disable-next-line no-alert
                    alert("Invalid symbols");
                } else {
                    props.search(searchKey);
                }
            }
        });
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}
