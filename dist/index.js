"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framework_1 = require("./framework");
const assertions_1 = require("./assertions");
framework_1.describe("Some Function", () => {
    framework_1.describe("Nested", () => {
        framework_1.it("foo should be foo", () => {
            assertions_1.expect("foo").toBe("foo");
        });
        framework_1.describe("More Nested", () => {
            framework_1.it("third level", async () => {
                return new Promise((res) => {
                    setTimeout(() => {
                        assertions_1.expect("ehhhhh").toBe("ahhhh");
                        res();
                    }, 1000);
                });
            });
        });
        framework_1.it("foo should be bar", async () => {
            return new Promise((res) => {
                setTimeout(() => {
                    assertions_1.expect("foo").toBe("bar");
                    res();
                }, 1000);
            });
        });
    });
});
framework_1.run();
