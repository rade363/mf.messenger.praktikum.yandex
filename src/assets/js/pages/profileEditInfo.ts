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
    <main class="container profile__edit">
        <form class="form {{form.name}}" method="POST">
            <div class="profile__picture profile-pic {{#if form.avatarInput.isEmpty}}profile__picture_empty{{/if}}">
                <img class="profile-pic__image" src="../assets/img/{{form.avatarInput.url}}" alt="{{form.avatarInput.name}}" />
                <div class="profile-pic__edit">
                    <span class="profile-pic__label">Edit</span>
                    <input class="profile-pic__input {{form.name}}__{{form.avatarInput.name}}-input" type="file" name="{{form.avatarInput.name}}" />
                </div>
            </div>
            {{#each form.inputFields}}
                {{#if_eq type 'double'}}
                <div class="form__item double">
                    {{#each items }}
                    <div class="form__item double__child ">
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
            <div class="form__item {{form.name}}__actions double">
                <button class="{{form.name}}__{{form.submitButton.className}}" type="{{form.submitButton.type}}">{{form.submitButton.text}}</button>
                <a class="{{form.name}}__{{form.cancelLink.className}}" href="{{form.cancelLink.url}}">{{form.cancelLink.text}}</a>
            </div>
        </form>
    </main>
</div>`;