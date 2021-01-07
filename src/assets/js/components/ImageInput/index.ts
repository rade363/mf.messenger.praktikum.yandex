import Block from "../../modules/Block/Block";
import {compile} from "../../modules/templator/templator";
import template from "./ImageInput";

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