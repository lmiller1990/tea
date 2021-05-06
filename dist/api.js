"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expect = exports.run = exports.describe = exports.it = void 0;
const assertions_1 = require("./assertions");
Object.defineProperty(exports, "expect", { enumerable: true, get: function () { return assertions_1.expect; } });
const emitter_1 = require("./emitter");
const it = function (title, handler) {
    emitter_1.emitter.emit("suite:add:test", { title, handler });
};
exports.it = it;
exports.it.only = (title, handler) => {
    emitter_1.emitter.emit("suite:add:test:only", { title, handler });
};
function describe(title, handler) {
    emitter_1.emitter.emit("suite:add", {
        title,
        handler,
    });
}
exports.describe = describe;
function run() {
    emitter_1.emitter.emit("run", undefined);
}
exports.run = run;
