const Handlebars = require("handlebars");
const { JSDOM } = require("jsdom");
const dom = new JSDOM("<!DOCTYPE html><html><head></head><body></body></html>");
global["window"] = dom.window;
global["document"] = dom.window.document;
global.Handlebars = Handlebars;