import Block from "../../modules/Block";
import {compile} from "../../modules/templator";
import template from "./Double";

export default class Double extends Block {
    constructor(props: TObjectType) {
        super("div", {
            attributes: props.attributes,
            type: props.type,
            children: props.children
        });
    }

    componentDidMount() {
        // console.log(`[DOUBLE] Mounted - ${this.props.type}`, this);
    }

    render() {
        // console.log('[DOUBLE] Render');
        return compile(template, {
            children: this.props.children
        });
    }
}