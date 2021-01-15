import { expect } from "chai";
import * as sinon from "sinon";
import Block from "./Block";
import { renderInterface } from "../domHelpers";
import SampleButton from "./SampleButton";

describe("Block", () => {
    const testProps = {
        _privateProp: "someValue",
        someProp: "42"
    };
    const button = new Block("button", testProps);

    describe("Create Block", () => {
        it("Created block has a unique id", () => {
            expect(button).to.have.property("uniqueId");
        });
    });

    describe("Props accessibility (Block._makePropsProxy)", () => {
        it("Private properties are inaccessible", () => {
            expect(() => button.props._privateProp).to.throw("Отказано в доступе");
        });

        it("Regular props are accessible", () => {
            expect(button.props.someProp).to.equal("42");
        });

        it("Regular props can be updated without the setProps() method", () => {
            button.props.someProp = "24";
            expect(button.props.someProp).to.equal("24");
        });

        it("Existing regular props can be updated with setProps() method", () => {
            button.setProps({ someProp: "test123" });
            expect(button.props.someProp).to.equal("test123");
        });

        it("Existing private props cannot be updated with setProps() method", () => {
            expect(() => button.setProps({ _privateProp: "someNewValue" })).to.throw("Нет доступа");
        });

        it("New props can be added with setProps() method", () => {
            button.setProps({ newProp: "54321" });
            expect(button.props.newProp).to.equal("54321");
        });

        it("Any property can't be deleted", () => {
            expect(() => delete button.props.newProp).to.throw("Нет доступа");
        });
    });

    describe("Render", () => {
        it("Block is represented as a DOM element and is accessible via the getContent() method", () => {
            expect(button.getContent()?.tagName).to.equal("BUTTON");
        });

        it("Block DOM representation can also be accessed using the .element getter", () => {
            expect(button.element?.tagName).to.equal("BUTTON");
        });

        it("Block DOM representation cannot be overwritten using the .element property", () => {
            expect(() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                button.element = document.createElement("h1");
            }).to.throw();
        });
    });
});

describe("Button (extended Block)", () => {
    const buttonProps = {
        text: "Click me",
        attributes: {
            name: "sample-button",
            class: "btn",
            id: "test"
        },
        eventListeners: [["click", () => console.info("Button clicked")]]
    };
    const testButton = new SampleButton(buttonProps);
    renderInterface("#root", testButton);

    describe("Render", () => {
        it("Must have correct InnerHTML compiled by the templator", () => {
            expect(testButton.getContent()?.innerHTML).to.equal("<span>Click me</span>");
        });

        it("Must be present in DOM", () => {
            expect(document.querySelector("button")?.outerHTML).to.equal(testButton.getContent()?.outerHTML);
        });

        it("Must be marked as connected to DOM (internally)", () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            expect(testButton._isConnected).to.be.true; // eslint-disable-line @typescript-eslint/no-unused-expressions
        });

        it("Must have correct attributes", () => {
            expect(testButton.getContent()?.getAttribute("name")).to.equal(buttonProps.attributes.name);
        });

        it("Must have correct class name, configured in attributes", () => {
            expect(testButton.getContent()?.className).to.equal(buttonProps.attributes.class);
        });

        it("Must have configured event listeners", () => {
            const consoleSpy = sinon.spy(console, "info");
            testButton.element?.click();
            sinon.assert.calledWith(consoleSpy, "Button clicked");
        });

        it("Must be deleted from DOM on the .detach() method", () => {
            testButton.detach();
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(document.querySelector(".btn")).to.be.null;
        });
    });
});
