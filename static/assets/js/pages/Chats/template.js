export default `<div class="chat">
    <aside class="chat__sidebar">
        <nav class="chat__nav">
            <div class="chat__topbar">
                <a class="chat__profile-link" href="{{profileLink.url}}">{{profileLink.text}}</a>
            </div>
            {{{searchInput}}}
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
    <main class="chat__conversation chat__conversation_empty">
        <h1 class="chat__empty">Please select a chat to start messaging</h1>
    </main>
</div>`;
//# sourceMappingURL=template.js.map