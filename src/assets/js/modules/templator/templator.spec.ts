import { expect } from "chai";
import { compile } from "./templator";

describe("templator", () => {
    describe("compile", () => {
        const testTemplate = `<h1>{{text}}</h1>`;
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

        it("Empty template string returns undefined", () => {
            expect(compile("", {})).to.be.undefined;
        });
    });
});
