document.addEventListener("DOMContentLoaded", renderInterface);

function renderInterface(): void {
    const template = Handlebars.compile(getTemplate());
    const data: TemplateData = {
        code: 400,
        description: "Not found yo",
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

function getTemplate(): string {
    return `<main class="container">
    <div class="error">
        <h1 class="error__code">{{code}}</h1>
        <div class="error__description">{{description}}</div>
        <a class="{{button.class}}" href="{{button.url}}">{{button.text}}</a>
    </div>
</main>`;
}

export default {};