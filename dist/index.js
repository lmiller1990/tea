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
