import { emitter } from "./emitter";

export interface AssertionFailure {
  pass: false
  message: string
}

export interface AssertionSuccess {
  pass: true
}

export type Result = AssertionSuccess | AssertionFailure


function toBe<T>(actual: T): (expected: T) => Result {
  return (expected: T) => {
    if (expected === actual) {
      return {
        pass: true,
      };
    }

    return {
      pass: false,
      message: `Expected '${expected}' to be '${actual}'.`,
    };
  };
}

export function expect<T>(expected: T) {
  return {
    toBe: (actual: T) => {
      const result = toBe(actual)(expected)

      if (result.pass === false) {
        emitter.emit("test:fail", result)
      }
    },
  };
}
