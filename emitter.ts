import { EventEmitter as EE } from "events";
import { AssertionFailure, Result } from "./assertions";
import { TestCase } from "./framework";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

type EventMap = Record<string, any>;

type EventKey<T extends EventMap> = string & keyof T;
type EventReceiver<T> = (params: T) => void;

interface Emitter<T extends EventMap> {
  on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
  emit<K extends EventKey<T>>(eventName: K, params: T[K]): void;
}

interface Suite {
  id: string;
  type: "suite";
  title: string;
  depth: number;
  children: string[];
}

interface Test {
  id: string;
  type: "test";
  parent: string;
  title: string;
  result: Result;
  handler: () => void;
}

const suites = new Map<string, Suite | Test>();

class EventEmitter<T extends EventMap> implements Emitter<T> {
  #emitter = new EE();
  currentTest: string | undefined;
  stack: string[] = [];
  rootSuites: string[] = [];

  on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>) {
    this.#emitter.on(eventName, fn);
  }

  emit<K extends EventKey<T>>(eventName: K, params: T[K]): void {
    this.#emitter.emit(eventName, params);
  }
}

interface Events {
  "suite:add": {
    title: string;
    handler: TestCase;
  };
  "suite:add:test": {
    title: string;
    handler: TestCase;
  };
  "test:fail": AssertionFailure;
  run: undefined;
}

const emitter = new EventEmitter<Events>();

emitter.on("run", () => {
  function runSuites(ids: string[]) {
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
        suite.handler();
        const parent = suites.get(suite.parent);
        if (!parent || parent.type !== "suite") {
          throw Error(`Suite ${id} not found`);
        }
        const symbol = suite.result.pass ? "✔" : "✗";
        console.log(
          "  ".repeat(parent.depth) + "  " + `${symbol} ${suite.title}`
        );
      }
    }
  }

  runSuites(emitter.rootSuites);
});

emitter.on("suite:add:test", ({ title, handler }) => {
  const id = uuidv4();
  const currentSuite = suites.get(
    emitter.stack[emitter.stack.length - 1]
  ) as Suite;

  currentSuite.children.push(id);
  suites.set(id, {
    id,
    type: "test",
    parent: emitter.stack[emitter.stack.length - 1],
    title,
    // assume innocent until proven guilty.
    result: {
      pass: true,
    },
    handler,
  });
});

emitter.on("test:fail", (result) => {
  const test = suites.get(emitter.currentTest!) as Test;
  test.result = result;
});

emitter.on("suite:add", ({ title, handler }) => {
  const id = uuidv4();
  if (emitter.stack.length) {
    const currentSuite = suites.get(
      emitter.stack[emitter.stack.length - 1]
    ) as Suite;
    currentSuite.children.push(id);
  } else {
    emitter.rootSuites.push(id);
  }

  emitter.stack.push(id);
  const suite: Suite = {
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

export { emitter };
