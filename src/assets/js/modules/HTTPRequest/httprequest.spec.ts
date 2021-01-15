import { expect } from "chai";
import HTTPRequest from "./HTTPRequest";

describe("HTTPRequest", () => {
    const testRequest = new HTTPRequest({
        url: "https://swapi.dev/api/",
        headers: {
            "Content-Type": "application/json"
        }
    });

    describe("Successful request", () => {
        it("Returns proper response", () => {
            testRequest.get("people/1").then((xhr: XMLHttpRequest) => {
                const payload = JSON.parse(xhr.response);
                expect(payload.name).to.equal("Luke Skywalker");
            });
        });
    });

    describe("Invalid request", () => {
        it("Catches error details", () => {
            testRequest.get("people/0").catch((error: XMLHttpRequest) => {
                const payload = JSON.parse(error.response);
                expect(payload.detail).to.equal("Not found");
            });
        });

        it("Catches error status", () => {
            testRequest.get("people/0").catch((error: XMLHttpRequest) => {
                expect(error.status).to.equal(404);
            });
        });
    });
});
