export default `
<div class="conversation">
    <header class="conversation__header">
        <div class="conversation__user-info user-info">
            <h1 class="user-info__name">{{user.name}}</h1>
            <span class="user-info__activity">{{user.status}}</span>
        </div>
        {{{conversationActionsButton}}}
        {{{conversationActionsMenu}}}
    </header>
    <main class="conversation__list">
        {{#each messagesList}}
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
    {{{messageForm}}}
</div>`;