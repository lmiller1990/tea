"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitter = void 0;
const events_1 = require("events");
function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0, v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
const suites = new Map();
class EventEmitter {
    constructor() {
        this.#emitter = new events_1.EventEmitter();
        this.stack = [];
        this.rootSuites = [];
        this.hasOnly = false;
    }
    #emitter;
    on(eventName, fn) {
        this.#emitter.on(eventName, fn);
    }
    emit(eventName, params) {
        this.#emitter.emit(eventName, params);
    }
}
const emitter = new EventEmitter();
exports.emitter = emitter;
emitter.on("run", () => {
    async function runSuites(ids) {
        for (const id of ids) {
            const suite = suites.get(id);
            if (!suite) {
                throw Error(`Suite ${id} not found`);
            }
            if (suite.type === "suite") {
                console.log("  ".repeat(suite.depth) + suite.title);
                runSuites(suite.children);
            }
            if (suite.type === "test") {
                emitter.currentTest = suite.id;
                const parent = suites.get(suite.parent);
                if (!parent || parent.type !== "suite") {
                    throw Error(`Suite ${id} not found`);
                }
                if (emitter.hasOnly && !suite.only) {
                    console.log("  ".repeat(parent.depth) + "  " + `○ ${suite.title}`);
                }
                else {
                    await suite.handler();
                    const symbol = suite.result.pass ? "✔" : "✗";
                    console.log("  ".repeat(parent.depth) + "  " + `${symbol} ${suite.title}`);
                }
            }
        }
    }
    runSuites(emitter.rootSuites);
});
function addTest({ title, handler, only, }) {
    const id = uuidv4();
    const currentSuite = suites.get(emitter.stack[emitter.stack.length - 1]);
    currentSuite.children.push(id);
    suites.set(id, {
        id,
        type: "test",
        only,
        parent: emitter.stack[emitter.stack.length - 1],
        title,
        // assume innocent until proven guilty.
        result: {
            pass: true,
        },
        handler,
    });
}
emitter.on("suite:add:test", ({ title, handler }) => {
    addTest({ title, handler, only: false });
});
emitter.on("suite:add:test:only", ({ title, handler }) => {
    addTest({ title, handler, only: true });
    emitter.hasOnly = true;
});
emitter.on("test:fail", (result) => {
    const test = suites.get(emitter.currentTest);
    test.result = result;
});
emitter.on("suite:add", ({ title, handler }) => {
    const id = uuidv4();
    if (emitter.stack.length) {
        const currentSuite = suites.get(emitter.stack[emitter.stack.length - 1]);
        currentSuite.children.push(id);
    }
    else {
        emitter.rootSuites.push(id);
    }
    emitter.stack.push(id);
    const suite = {
        id,
        type: "suite",
        title,
        depth: emitter.stack.length - 1,
        children: [],
    };
    suites.set(id, suite);
    handler();
    emitter.stack.pop();
});
