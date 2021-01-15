import Block from "./Block";
import compile from "../templator/templator";
import testTemplate from "./testTemplate.handlebars";

interface ISampleButtonProps {
    text: string;
    attributes?: IAttributes;
    eventListeners?: unknown[];
}

export default class SampleButton extends Block {
    constructor(props: ISampleButtonProps) {
        super("button", props);
    }

    render(): Element | null {
        return compile(testTemplate, this.props);
    }
}
