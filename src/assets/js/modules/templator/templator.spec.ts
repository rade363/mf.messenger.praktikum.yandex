import { expect } from "chai";
import compile from "./templator";
import testTemplate from "./testTemplate.handlebars";

describe("templator", () => {
    describe("compile", () => {
        const testProps = {
            _privateProp: "someValue",
            text: "Hello world"
        };

        const compiledElement = compile(testTemplate, testProps);

        it("Compiled HTML element content equals props", () => {
            expect(compiledElement.innerHTML).to.equal(testProps.text);
        });

        it("Compiled HTML element tag is correct", () => {
            expect(compiledElement.tagName, "H1");
        });
    });
});
