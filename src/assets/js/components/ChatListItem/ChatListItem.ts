export default `
<div class="{{className}}">
    <div class="chat-list__userpic userpic">
        <img class="userpic__image" src="{{avatar}}" alt="{{username}}" />
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
</div>`;