import { EventEmitter as EE } from "events";
import { Suite, TestCase } from "./framework";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
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

interface MySuite {
  title: string;
  id: number;
  depth: number;
  tests: Array<{
    title: string;
    handler: TestCase;
  }>;
  parent: number;
}

const suites = new Map<string, any>();

// suites.set("-1", rootSuite);

class EventEmitter<T extends EventMap> implements Emitter<T> {
  #emitter = new EE();
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
  run: undefined;
}

const emitter = new EventEmitter<Events>();

emitter.on("run", () => {
  function runSuites(ids: string[]) {
    for (const id of ids) {
      const suite = suites.get(id);
      if (suite.type === "suite") {
        console.log("  ".repeat(suite.depth) + suite.title);
        runSuites(suite.children);
      } else if (suite.type === "test") {
        const parent = suites.get(suite.parent)
        console.log("  ".repeat(parent.depth) + "  " + suite.title);
        suite.handler();
      } else {
        throw Error("Argh");
      }
    }
  }

  runSuites(emitter.rootSuites);
});

emitter.on("suite:add:test", ({ title, handler }) => {
  const id = uuidv4();
  suites.get(emitter.stack[emitter.stack.length - 1]).children.push(id);
  suites.set(id, {
    id,
    type: "test",
    parent: emitter.stack[emitter.stack.length - 1],
    title,
    handler,
  });
});

emitter.on("suite:add", ({ title, handler }) => {
  const id = uuidv4();
  if (emitter.stack.length) {
    suites.get(emitter.stack[emitter.stack.length - 1]).children.push(id);
  } else {
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

export { emitter };
