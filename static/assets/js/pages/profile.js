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
    <main class="container profile__card">
        <div class="profile__picture profile-pic {{#if profile.avatar.isEmpty}}profile__picture_empty{{/if}}">
            <img class="profile-pic__image" src="../assets/img/{{profile.avatar.url}}" alt="avatar" />
        </div>
        <div class="profile__fullname">{{fullname}}</div>
        <div class="profile__info">
            {{#each profile.infoBlock}}
            <div class="profile__{{type}} prop">
                <span class="prop__title">{{title}}</span>
                <span class="prop__value">{{value}}</span>
            </div>
            {{/each}}
        </div>
        <div class="profile__action">
            <div class="profile__buttons double">
                <a class="{{editProfileLink.className}}" href="{{editProfileLink.url}}">{{editProfileLink.text}}</a>
                <a class="{{changePasswordLink.className}}" href="{{changePasswordLink.url}}">{{changePasswordLink.text}}</a>
            </div>
            <button class="{{logOutButton.className}}" type="{{logOutButton.type}}">{{logOutButton.text}}</button>
        </div>
    </main>
</div>`;
//# sourceMappingURL=profile.js.map