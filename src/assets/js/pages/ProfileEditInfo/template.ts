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
        {{{child}}}
    </main>
</div>`;
