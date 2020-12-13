export default `
<div>
    {{#each inputFields}}
        {{{inputField}}}
    {{/each}}
    
    <div class="form__item {{name}}__actions">
    {{#each actions}}
        {{{action}}}
    {{/each}}
    </div>
</div>`;