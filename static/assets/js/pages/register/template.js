export default `<main class="container register">
    <header class="top-header register__header">
        <div class="top-header__left">
            {{{backButton}}}
        </div>
        <div class="top-header__center">
            <h1 class="top-header__title register__title">{{title}}</h1>
        </div>
        <div class="top-header__right"></div>
    </header>
    <form class="form {{form.name}}" method="POST">
        {{{form.emailInput}}}
        <div class="form__item double">
            <div class="double__child">
                {{{form.firstNameInput}}}
            </div>
            <div class="double__child">
                {{{form.lastNameInput}}}
            </div>
        </div>
        {{{form.loginInput}}}
        {{{form.phoneInput}}}
        {{{form.passwordInput}}}
        {{{form.repeatPasswordInput}}}
        <div class="form__item {{form.name}}__actions">
            {{{form.submitButton}}}
        </div>
    </form>
</main>`;
//# sourceMappingURL=template.js.map