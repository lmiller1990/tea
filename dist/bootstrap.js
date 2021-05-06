#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimist_1 = __importDefault(require("minimist"));
const path_1 = __importDefault(require("path"));
const _1 = require("./");
const argv = minimist_1.default(process.argv.slice(2));
if (!argv._.length) {
    console.error("No test file provided.");
    process.exit(1);
}
// run specific file(s)
for (const file of argv._) {
    require(path_1.default.resolve(file));
}
_1.run();
