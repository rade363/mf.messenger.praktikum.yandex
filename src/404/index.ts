import notFoundTemplate from "../assets/js/pages/notFound.js";

document.addEventListener("DOMContentLoaded", renderInterface);

function renderInterface(): void {
    const template = Handlebars.compile(notFoundTemplate);
    const data: ITemplateData = {
        code: 404,
        description: "Not found",
        button: {
            class: "error__link-back button button_thin button_primary",
            url: "/chats/",
            text: "Go back"
        }
    };
    const root = document.getElementById("root");
    if (root) {
        root.innerHTML = template(data);
    }
}

export default {};