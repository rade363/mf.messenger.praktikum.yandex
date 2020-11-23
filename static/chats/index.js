(function () {
    let state = {
        searchKey: ""
    };
    let view = {};

    document.addEventListener("DOMContentLoaded", initInterface);

    function initInterface() {
        view = initView();
        view.searchInput.addEventListener("input", handleSearchInput);
        view.searchForm.addEventListener("submit", submitSearchFilter);
    }

    function initView() {
        return {
            searchInput: document.querySelector(".searchbar__input"),
            searchForm: document.querySelector(".chat__search")
        };
    }

    function handleSearchInput(event) {
        const {value} = event.target;
        console.log("[INFO] Search input", value);

        setStateProp("searchKey", value);
    }

    function setStateProp(propName, value) {
        state = {
            ...state,
            [propName]: value
        };
    }

    function submitSearchFilter(event) {
        event.preventDefault();
        console.log("[INFO] Search form submitted, this will be handled later in this course", state.searchKey);
    }
})();