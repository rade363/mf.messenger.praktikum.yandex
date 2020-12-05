export default `<main class="container register">
    <header class="top-header register__header">
        <div class="top-header__left">
            <a class="top-header__back back-button" href="{{backButton.url}}">
                <span class="back-button__arrow">‹</span>
                <span class="back-button__text">Back</span>
            </a>
        </div>
        <div class="top-header__center">
            <h1 class="top-header__title register__title">{{title}}</h1>
        </div>
        <div class="top-header__right"></div>
    </header>
    <form class="form {{form.name}}" method="POST">
        {{#each form.inputFields}}
            {{#if_eq type 'double'}}
            <div class="form__item double">
                {{#each items }}
                <div class="double__child form__item">
                    <label class="form__label" for="{{name}}">{{label}}</label>
                    <input class="form__input {{../../form.name}}__{{name}}-input" type="{{type}}" id="{{name}}" />
                    <span class="form__error {{../../form.name}}__{{name}}-error"></span>
                </div>
                {{/each}}
            </div>
            {{else}}
            <div class="form__item">
                <label class="form__label" for="{{name}}">{{label}}</label>
                <input class="form__input {{../form.name}}__{{name}}-input" type="{{type}}" id="{{name}}" />
                <span class="form__error {{../form.name}}__{{name}}-error"></span>
            </div>
            {{/if_eq}}
        {{/each}}
        <div class="form__item {{form.name}}__actions">
            <button class="{{form.name}}__{{form.submitButton.className}}" type="{{form.submitButton.type}}">{{form.submitButton.text}}</button>
        </div>
    </form>
</main>`;
//# sourceMappingURL=register.js.map