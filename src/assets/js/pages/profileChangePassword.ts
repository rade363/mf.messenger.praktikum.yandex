export default `<div class="profile">
    <header class="top-header profile__header">
        <div class="top-header__left">
            <a class="top-header__back back-button" href="{{backButton.url}}">
                <span class="back-button__arrow">‹</span>
                <span class="back-button__text">Back</span>
            </a>
        </div>
        <div class="top-header__center">
            <h1 class="top-header__title profile__title">{{title}}</h1>
        </div>
        <div class="top-header__right"></div>
    </header>
    <main class="container profile__password-edit">
        <form class="form password-form" method="POST">
            {{#each form.inputFields}}
            <div class="form__item">
                <label class="form__label" for="{{name}}">{{label}}</label>
                <input class="form__input {{../form.name}}__{{name}}-input" type="{{type}}" id="{{name}}" />
                <span class="form__error {{../form.name}}__{{name}}-error"></span>
            </div>
            {{/each}}
            <div class="form__item {{form.name}}__actions double">
                <button class="{{form.name}}__{{form.submitButton.className}}" type="{{form.submitButton.type}}">{{form.submitButton.text}}</button>
                <a class="{{form.name}}__{{form.cancelLink.className}}" href="{{form.cancelLink.url}}">{{form.cancelLink.text}}</a>
            </div>
        </form>
    </main>
</div>`;