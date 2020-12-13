export default `
<div class="double">
    {{#each children}}
        <div class="double__child">
            {{{child}}}
        </div>
    {{/each}}
</div>`;