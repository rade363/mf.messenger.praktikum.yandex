export default `<div>
    <aside class="chat__sidebar">
        <nav class="chat__nav">
            <div class="chat__topbar">
                <a class="chat__profile-link" href="{{profileLink.url}}">{{profileLink.text}}</a>
            </div>
            {{{searchInput}}}
        </nav>
        {{{chatList}}}
    </aside>
    <main class="chat__conversation chat__conversation_empty">
        <h1 class="chat__empty">Please select a chat to start messaging</h1>
    </main>
</div>`;