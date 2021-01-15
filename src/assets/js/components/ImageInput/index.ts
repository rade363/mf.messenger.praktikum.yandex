import Block from "../../modules/Block/Block";
import compile from "../../modules/templator/templator";
import template from "./ImageInput.handlebars";

export default class ImageInput extends Block {
    constructor(props: IImageInput) {
        super("div", props);
    }

    render(): Element | null {
        return compile(template, this.props);
    }
}
