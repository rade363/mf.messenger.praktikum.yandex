import { expect } from "chai";
import Router from "./Router";
import {initInterface} from "../domHelpers";

describe("Router", () => {
    initInterface();

    const router = new Router("#root");

    it("Interface got rendered", () => {
        expect(document.querySelector("#root")?.innerHTML).to.not.equal("");
    });

    it("Navigated to a different page", () => {
        router.go("/register/");
        expect(window.location.pathname).to.equal("/register/");
    });

    it("Non-existing path redirects to 404", () => {
        router.go("/random-url/");
        expect(window.location.pathname).to.equal("/404/");
    });
});