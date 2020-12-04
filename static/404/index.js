// global Handlebars, document
document.addEventListener("DOMContentLoaded", renderInterface);
function renderInterface() {
    const template = Handlebars.compile(getTemplate());
    const data = {
        code: 400,
        description: "Not found yo",
        button: {
            class: "error__link-back button button_thin button_primary",
            url: "/chats/",
            text: "Go back"
        }
    };
    document.getElementById("root").innerHTML = template(data);
}
function getTemplate() {
    return `<main class="container">
    <div class="error">
        <h1 class="error__code">{{code}}</h1>
        <div class="error__description">{{description}}</div>
        <a class="{{button.class}}" href="{{button.url}}">{{button.text}}</a>
    </div>
</main>`;
}
//# sourceMappingURL=index.js.map