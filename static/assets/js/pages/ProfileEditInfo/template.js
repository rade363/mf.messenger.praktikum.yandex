export default `<div class="profile">
    <header class="top-header profile__header">
        <div class="top-header__left">
            {{{backButton}}}
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
            {{{form.emailInput}}}
            {{{form.loginInput}}}
            <div class="form__item double">
                <div class="double__child">
                    {{{form.firstNameInput}}}
                </div>
                <div class="double__child">
                    {{{form.lastNameInput}}}
                </div>
            </div>
            {{{form.displayNameInput}}}
            {{{form.phoneInput}}}
            <div class="form__item {{form.name}}__actions double">
                {{{form.submitButton}}}
                {{{form.cancelLink}}}
            </div>
        </form>
    </main>
</div>`;
//# sourceMappingURL=template.js.map