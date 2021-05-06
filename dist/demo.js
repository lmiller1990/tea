"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
api_1.describe("Some Function", () => {
    api_1.describe("Nested", () => {
        api_1.it("foo should be foo", () => {
            api_1.expect("foo").toBe("foo");
        });
        api_1.describe("More Nested", () => {
            api_1.it("third level", async () => {
                return new Promise((res) => {
                    setTimeout(() => {
                        api_1.expect("ehhhhh").toBe("ahhhh");
                        res();
                    }, 1000);
                });
            });
            api_1.it("fails", () => {
                api_1.expect('foo').toBe('bar');
            });
        });
        api_1.it("foo should be bar", async () => {
            return new Promise((res) => {
                setTimeout(() => {
                    api_1.expect("foo").toBe("bar");
                    res();
                }, 1000);
            });
        });
    });
});
api_1.run();
