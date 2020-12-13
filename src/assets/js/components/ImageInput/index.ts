import Block from "../../modules/Block.js";
import {compile} from "../../modules/templator.js";
import template from "./ImageInput.js";

export default class ImageInput extends Block {
    constructor(props: IImageInput) {
        super("div", props);
    }

    componentDidMount() {
        console.log(`[IMAGE] Mounted - ${this.props.name}`);
    }

    render() {
        console.log('[IMAGE] Render', this);
        return compile(template, this.props);
    }
}