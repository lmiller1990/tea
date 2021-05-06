"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../dist/index.js");
index_js_1.describe("Some Function", () => {
    index_js_1.describe("Nested", () => {
        index_js_1.it("foo should be foo", () => {
            index_js_1.expect("foo").toBe("foo");
        });
        index_js_1.describe("More Nested", () => {
            index_js_1.it("third level", async () => {
                return new Promise((res) => {
                    setTimeout(() => {
                        index_js_1.expect("ehhhhh").toBe("ahhhh");
                        res();
                    }, 1000);
                });
            });
            index_js_1.it("fails", () => {
                index_js_1.expect('foo').toBe('bar');
            });
        });
        index_js_1.it("foo should be bar", async () => {
            return new Promise((res) => {
                setTimeout(() => {
                    index_js_1.expect("foo").toBe("bar");
                    res();
                }, 1000);
            });
        });
    });
});
