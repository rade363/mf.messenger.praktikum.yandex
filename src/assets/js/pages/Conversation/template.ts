export default `
<div>
    <div class="chat">
        <aside class="chat__sidebar">
            <nav class="chat__nav">
                <div class="chat__topbar top-header">
                    <div class="topbar__left top-header__left">{{{newChatButton}}}</div>
                    <div class="topbar__right top-header__right">{{{profileLink}}}</div>
                </div>
                {{{searchInput}}}
            </nav>
            {{{chatList}}}
        </aside>
        {{{conversationMain}}}
    </div>
    {{#each modals}}
        {{{modal}}}
    {{/each}}
</div>`;