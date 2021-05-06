import { emitter } from "./emitter";
import { Handler } from "./types";

type TestDefinition = (title: string, test: () => any) => any;

export interface It extends TestDefinition {
  only: TestDefinition;
}

export const it: It = function (title, handler) {
  emitter.emit("suite:add:test", { title, handler });
};

it.only = (title: string, handler: Handler) => {
  emitter.emit("suite:add:test:only", { title, handler });
};

export function describe(title: string, handler: Handler) {
  emitter.emit("suite:add", {
    title,
    handler,
  });
}

export function run() {
  emitter.emit("run", undefined);
}
