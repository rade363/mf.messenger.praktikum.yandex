import Block from "../../modules/Block/Block";
import compile from "../../modules/templator/templator";
import template from "./Double";

export default class Double extends Block {
    constructor(props: TObjectType) {
        super("div", {
            attributes: props.attributes,
            type: props.type,
            children: props.children
        });
    }

    render(): Element | null {
        return compile(template, {
            children: this.props.children
        });
    }
}
