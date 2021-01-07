const Handlebars = require("handlebars");
const { JSDOM } = require("jsdom");
const dom = new JSDOM("<!DOCTYPE html><html><head></head><body><div id='root'></div></body></html>", { url: "https://messenger.com/login/" });
global["window"] = dom.window;
global["document"] = dom.window.document;
window.Handlebars = Handlebars;