import Block from "../../modules/Block/Block";
import compile from "../../modules/templator/templator";
import template from "./Button";

export default class Button extends Block {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(tag: string, props: IButtonProps) {
        super(tag, props);
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}
