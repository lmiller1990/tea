"use strict";
const { expect, describe, it } = require("../index");
describe("Some Function", () => {
    describe("nothing nothing", () => {
        it("asdf", () => {
        });
    });
    describe("Nested", () => {
        it("foo should be foo", () => {
            expect("foo").toBe("foo");
        });
        describe("More Nested", () => {
            it("third level", async () => {
                return new Promise((res) => {
                    setTimeout(() => {
                        expect("ehhhhh").toBe("ahhhh");
                        res();
                    }, 1000);
                });
            });
            it("fails", () => {
                expect('foo').toBe('bar');
            });
        });
        it("foo should be bar", async () => {
            return new Promise((res) => {
                setTimeout(() => {
                    expect("foo").toBe("bar");
                    res();
                }, 1000);
            });
        });
    });
});
