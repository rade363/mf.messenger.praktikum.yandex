export default `<div class="chat">
    <aside class="chat__sidebar">
        <nav class="chat__nav">
            <div class="chat__topbar">
                <a class="chat__profile-link" href="{{profileLink.url}}">{{profileLink.text}}</a>
            </div>
            <form class="chat__search searchbar" method="POST">
                <input class="searchbar__input" type="text" placeholder="Search" name="search" pattern="\\S+"/>
            </form>
        </nav>
        <ul class="chat__list chat-list">
            {{#each chatListItems}}
                <li class="chat-list__item {{#if isSelected}}chat-list__item_active{{/if}}">
                    <div class="chat-list__userpic userpic">
                        <img class="userpic__image" src="../assets/img/{{avatar}}" alt="{{username}}" />
                    </div>
                    <div class="chat-list__content">
                        <h2 class="chat-list__username">{{username}}</h2>
                        <div class="chat-list__preview preview">
                            {{#notEmpty lastMessageBy}}
                            <span class="preview__highlight">{{lastMessageBy}}:</span>
                            {{/notEmpty}}
                            {{lastMessage}}
                        </div>
                    </div>
                    <div class="chat-list__meta">
                        <time class="chat-list__datetime">{{time}}</time>
                        <div class="chat-list__indicator">
                            {{#gt unread 0}}
                            <mark class="chat-list__unread">{{unread}}</mark>
                            {{/gt}}
                        </div>
                    </div>
                </li>
            {{/each}}
        </ul>
    </aside>
    <div class="chat__conversation conversation">
        <header class="conversation__header">
            <div class="conversation__user-info user-info">
                <h1 class="user-info__name">{{conversation.user.name}}</h1>
                <span class="user-info__activity">{{conversation.user.status}}</span>
            </div>
            <button class="conversation__actions-button actions-button" type="button"></button>
            <div class="conversation__context context-menu">
                {{#each conversation.actionsPopupButtons}}
                <button class="{{class}} context-button" type="button">
                    <img class="context-button__icon" src="../assets/img/{{icon}}" alt="{{text}}" />
                    <span class="context-button__text">{{text}}</span>
                </button>
                {{/each}}
            </div>
        </header>
        <main class="conversation__list">
            {{#each conversation.messagesList}}
            <div class="message message_{{#if outgoing}}outgoing{{else}}incoming{{/if}}">
                <div class="message__bubble">
                    {{#notEmpty imageUrl}}
                    <img class="message_media" src="../assets/img/{{imageUrl}}" alt="image" />
                    {{else}}
                    <p class="message__text">{{text}}</p>
                    {{/notEmpty}}
                    <div class="message__meta">
                        {{#if outgoing}}
                        <div class="message__status message__status_{{status}}"></div>
                        {{/if}}
                        <time class="message__time">{{time}}</time>
                    </div>
                </div>
            </div>
            {{/each}}
        </main>
        <form class="conversation__message-form message-form" method="POST">
            <button class="message-form__attachment-button" type="button"></button>
            <input class="message-form__message" type="text" placeholder="Write a message&mldr;" name="message"/>
            <button class="message-form__submit-button" type="submit"></button>
            <div class="context-menu attachment-menu">
                {{#each conversation.attachmentOptions}}
                <div class="context-button attachment-menu__item">
                    <input class="message-form__{{name}}-input attachment-menu__input" type="file" name="{{name}}" id="{{name}}"/>
                    <img class="context-button__icon" src="../assets/img/{{icon}}" alt="{{text}}" />
                    <label class="context-button__text" for="{{name}}">{{text}}</label>
                </div>
                {{/each}}
            </div>
        </form>
    </div>
</div>
<div class="overlay add-user">
<div class="container modal">
    <div class="modal__title">Add user</div>
    <form class="form add-user-form" method="POST">
        <div class="form__item">
            <label class="form__label" for="username">Username</label>
            <input class="form__input add-user-form__username-input" type="text" id="username" />
            <span class="form__error add-user-form__username-error"></span>
        </div>
        <div class="form__item add-user-form__actions double">
            <button class="add-user-form__add-button button button_thin button_primary double__child" type="submit">Add</button>
            <button class="add-user-form__cancel-button button button_thin button_secondary double__child" type="button">Cancel</button>
        </div>
    </form>
</div>
</div>
<div class="overlay delete-conversation">
<div class="container modal delete-conversation__modal">
    <div class="modal__title">Delete conversation</div>
    <div class="modal__message">Are you sure? <br/>This action cannot be undone.</div>
    <div class="modal__buttons delete-conversation__actions double">
        <button class="delete-conversation__approve button button_thin button_danger double__child" type="button">Delete</button>
        <button class="delete-conversation__cancel button button_thin button_secondary double__child" type="button">Cancel</button>
    </div>
</div>
</div>`