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
        <main class="chat__conversation chat__conversation_empty">
            <h1 class="chat__empty">Please select a chat to start messaging</h1>
        </main>
    </div>
    {{#each modals}}
        {{{modal}}}
    {{/each}}
</div>`;