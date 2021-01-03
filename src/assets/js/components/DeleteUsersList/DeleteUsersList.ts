export default `<div>
    {{#each users}}
        <div class="delete-user__row">
            <div class="delete-user__login">{{login}}</div>
            <div class="delete-user__button">{{{deleteButton}}}</div>
        </div>
    {{/each}}
    <div class="delete-user__action">
        {{{closeButton}}}
    </div>
</div>
`;