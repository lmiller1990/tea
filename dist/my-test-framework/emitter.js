"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitter = void 0;
const events_1 = require("events");
const chalk_1 = __importDefault(require("chalk"));
const reporter_1 = require("./reporter");
function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0, v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
class EventEmitter {
    constructor() {
        this.#emitter = new events_1.EventEmitter();
        this.stack = [];
        this.rootSuites = [];
        this.hasOnly = false;
    }
    #emitter;
    clear() {
        this.currentTest = undefined;
        this.stack = [];
        this.rootSuites = [];
        this.hasOnly = false;
    }
    on(eventName, fn) {
        this.#emitter.on(eventName, fn);
    }
    emit(eventName, params) {
        console.log(eventName);
        this.#emitter.emit(eventName, params);
    }
}
const emitter = new EventEmitter();
exports.emitter = emitter;
const suites = new Map();
emitter.on("run", () => {
    const summary = [];
    function checkDone(size) {
        return size === 0;
    }
    function summarize(summary) {
        console.log();
        for (const sum of summary) {
            console.log(chalk_1.default.red("FAIL") + `: ${sum.title}`);
            console.log(`  ${sum.message}`);
        }
    }
    async function runSuites(ids) {
        for (const id of ids) {
            const suiteOrTest = suites.get(id);
            if (!suiteOrTest) {
                throw Error(`Suite ${id} not found`);
            }
            if (suiteOrTest.type === "suite") {
                reporter_1.reporterDescribe(suiteOrTest);
                await runSuites(suiteOrTest.children);
                suites.delete(id);
            }
            if (suiteOrTest.type === "test") {
                emitter.currentTest = suiteOrTest.id;
                const parent = suites.get(suiteOrTest.parent);
                if (!parent || parent.type !== "suite") {
                    throw Error(`Suite ${id} not found`);
                }
                if (emitter.hasOnly && !suiteOrTest.only) {
                    reporter_1.reporterItOnly(parent, suiteOrTest);
                    suites.delete(id);
                }
                else {
                    await suiteOrTest.handler();
                    reporter_1.reporterIt(parent, suiteOrTest);
                    if (!suiteOrTest.result.pass) {
                        summary.push({
                            title: suiteOrTest.title,
                            message: suiteOrTest.result.message,
                        });
                    }
                    suites.delete(id);
                }
            }
        }
        const done = checkDone(suites.size);
        if (done) {
            summarize(summary);
            suites.clear();
            emitter.clear();
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
