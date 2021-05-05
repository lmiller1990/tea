#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const minimist_1 = __importDefault(require("minimist"));
const api_1 = require("./api");
const argv = minimist_1.default(process.argv.slice(2));
if (!argv._.length) {
    console.error("No test file provided.");
    process.exit(1);
}
else {
    const buf = fs_1.default.readFileSync(argv._[0], "utf-8");
    eval(buf);
    api_1.run();
}
// describe("Some Function", () => {
//   describe("Nested", () => {
//     it("foo should be foo", () => {
//       expect("foo").toBe("foo");
//     });
//     describe("More Nested", () => {
//       it("third level", async () => {
//         return new Promise<void>((res) => {
//           setTimeout(() => {
//             expect("ehhhhh").toBe("ahhhh");
//             res();
//           }, 1000);
//         });
//       });
//     });
//     it("foo should be bar", async () => {
//       return new Promise<void>((res) => {
//         setTimeout(() => {
//           expect("foo").toBe("bar");
//           res();
//         }, 1000);
//       });
//     });
//   });
// });
// run();
