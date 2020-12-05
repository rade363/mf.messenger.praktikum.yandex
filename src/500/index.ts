import serverErrorTemplate from "../assets/js/pages/serverError.js";

document.addEventListener("DOMContentLoaded", renderInterface);

function renderInterface(): void {
    const template = Handlebars.compile(serverErrorTemplate);
    const data: ITemplateData = {
        code: 500,
        description: "Something went wrong",
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