"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reporterIt = exports.reporterItOnly = exports.reporterDescribe = void 0;
const chalk_1 = __importDefault(require("chalk"));
function reporterDescribe(suite) {
    if (suite.depth === 0) {
        console.log();
    }
    console.log("  ".repeat(suite.depth) + suite.title);
}
exports.reporterDescribe = reporterDescribe;
function reporterItOnly(suite, test) {
    console.log("  ".repeat(suite.depth) + "  " + chalk_1.default.yellow("○") + ` ${test.title}`);
}
exports.reporterItOnly = reporterItOnly;
function reporterIt(suite, test) {
    const symbol = test.result.pass ? chalk_1.default.green("✔") : chalk_1.default.red("✗");
    console.log("  ".repeat(suite.depth) + "  " + symbol + ` ${test.title}`);
}
exports.reporterIt = reporterIt;
