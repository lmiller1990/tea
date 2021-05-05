import { emitter } from "./emitter";

export type TestCase = () => any;

type TestDefinition = (title: string, test: () => any) => any;

export interface It extends TestDefinition {
  only: TestDefinition;
}

interface Callable {
  title: string;
  body: () => any;
}

export interface Suite {
  title: string;
  tests: Callable[];
}

export const it: It = function (title, handler) {
  emitter.emit("suite:add:test", { title, handler });
};

it.only = (title: string, test: () => any) => {};

export function describe(title: string, handler: TestCase) {
  emitter.emit("suite:add", {
    title,
    handler,
  });
}

export function run() {
  emitter.emit("run", undefined);
}
