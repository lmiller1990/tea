#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const minimist_1 = __importDefault(require("minimist"));
const chokidar_1 = __importDefault(require("chokidar"));
const api_1 = require("./api");
const argv = minimist_1.default(process.argv.slice(2));
if (!argv._.length && !argv.watch) {
    console.error("No test file provided.");
    process.exit(1);
}
// watch all
if (!argv._.length && argv.watch) {
    console.log(`Watching ${process.cwd()}`);
    const watcher = chokidar_1.default.watch(process.cwd(), {
        ignored: ["node_modules"],
    });
    watcher.on("change", (file) => {
        console.log(`${file} changed`);
        const buf = fs_1.default.readFileSync(file, "utf-8");
        eval(buf);
        api_1.run();
    });
}
else {
    console.log('Run one test');
    const buf = fs_1.default.readFileSync(argv._[0], "utf-8");
    eval(buf);
    api_1.run();
}
