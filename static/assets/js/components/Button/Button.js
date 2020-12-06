export default `
{{#notEmpty type}}
<button class="{{className}}" type="{{type}}">
    {{text}}
</button>
{{/notEmpty}}

{{#notEmpty url}}
<a class="{{className}} button_link" href="{{url}}">
    {{text}}
</a>
{{/notEmpty}}
`;
//# sourceMappingURL=Button.js.map