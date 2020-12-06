export default `<main class="container login">
    <header class="top-header login__header">
        <div class="top-header__left"></div>
        <div class="top-header__center">
            <h1 class="top-header__title login__title">{{title}}</h1>
        </div>
        <div class="top-header__right"></div>
    </header>
    <form class="form {{form.name}}" method="POST">
        {{{form.loginInput}}}
        {{{form.passwordInput}}}
        <div class="form__item {{form.name}}__actions">
            {{{form.submitButton}}}
            <span class="{{form.name}}__alternative">or</span>
            {{{form.signUpLink}}}
        </div>
    </form>
</main>`;
//# sourceMappingURL=template.js.map