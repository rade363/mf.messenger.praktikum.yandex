let view: ViewType = {};
document.addEventListener("DOMContentLoaded", initInterface);

function initInterface(): void {
    renderInterface();

    view = initView();

    if (view.logoutButton) {
        view.logoutButton.addEventListener("click", logOut);
    }
}

function renderInterface(): void {
    const template = Handlebars.compile(getTemplate());
    const data: TemplateData = {
        title: "Profile",
        backButton: {
            url: "/chats/"
        },
        profile: {
            avatar: {
                isEmpty: true,
                url: "userpic-empty.svg"
            },
            fullname: "Ivan Ivanov",
            infoBlock: [
                {
                    type: "email",
                    title: "Email",
                    value: "ivan.ivanov@yandex.ru"
                },
                {
                    type: "username",
                    title: "Username",
                    value: "ivan.ivanov"
                },
                {
                    type: "first-name",
                    title: "First name",
                    value: "Ivan"
                },
                {
                    type: "last-name",
                    title: "Last name",
                    value: "Ivanov"
                },
                {
                    type: "display-name",
                    title: "Display name",
                    value: "Ivan Ivanov"
                },
                {
                    type: "phone",
                    title: "Phone",
                    value: "+7(911)123-45-67"
                },
            ]
        },
        editProfileLink: {
            className: "profile__edit-info-button button button_thin button_secondary double__child",
            text: "Edit profile",
            url: "/profile-edit-info/"
        },
        changePasswordLink: {
            className: "profile__change-password-button button button_thin button_secondary double__child",
            text: "Change password",
            url: "/profile-change-password/"
        },
        logOutButton: {
            className: "profile__log-out-button button button_wide button_logout",
            type: "button",
            text: "Log out"
        }
    };
    const root = document.getElementById("root");
    if (root) {
        root.innerHTML = template(data);
    }
}

function initView(): ViewType {
    return {
        logoutButton: document.querySelector(".profile__log-out-button")
    };
}

function logOut(event: Event) {
    event.preventDefault();
    console.log("[INFO] Logging out will be implemented later in the course");
}

function getTemplate(): string {
    return `<div class="profile">
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
}