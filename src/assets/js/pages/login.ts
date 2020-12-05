export default `<main class="container login">
    <header class="top-header login__header">
        <div class="top-header__left"></div>
        <div class="top-header__center">
            <h1 class="top-header__title login__title">{{title}}</h1>
        </div>
        <div class="top-header__right"></div>
    </header>
    <form class="form {{form.name}}" method="POST">
        {{#each form.inputFields}}
        <div class="form__item">
            <label class="form__label" for="{{id}}">{{label}}</label>
            <input class="form__input {{../form.name}}__{{id}}-input" type="{{type}}" id="{{id}}" />
            <span class="form__error {{../form.name}}__{{id}}-error"></span>
        </div>
        {{/each}}
        <div class="form__item {{form.name}}__actions">
            <button class="{{form.name}}__{{form.submitButton.className}}" type="{{form.submitButton.type}}">{{form.submitButton.text}}</button>
            <span class="{{form.name}}__alternative">or</span>
            <a class="{{form.name}}__{{form.signUpLink.className}}" href="{{form.signUpLink.url}}">{{form.signUpLink.text}}</a>
        </div>
    </form>
</main>`;