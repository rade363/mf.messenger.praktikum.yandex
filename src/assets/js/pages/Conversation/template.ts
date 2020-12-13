export default `
<div>
    <div class="chat">
        <aside class="chat__sidebar">
            <nav class="chat__nav">
                <div class="chat__topbar">
                    <a class="chat__profile-link" href="{{profileLink.url}}">{{profileLink.text}}</a>
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