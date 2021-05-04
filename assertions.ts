type Result =
  | {
      pass: true;
    }
  | {
      pass: false;
      message: string;
    };

function toBe<T>(actual: T): (expected: T) => Result {
  return (expected: T) => {
    if (expected === actual) {
      return {
        pass: true,
      };
    }

    return {
      pass: false,
      message: `Expected ${expected} to be ${actual}.`,
    };
  };
}

function _expect<T>(expected: T) {
  return {
    toBe: (actual: T): Result => {
      if (expected === actual) {
        return {
          pass: true,
        };
      }

      return {
        pass: false,
        message: `Expected ${expected} to be ${actual}.`,
      };
    },
  };
}

export function expect<T>(expected: T) {
  return {
    toBe: (actual: T) => {
      const result = toBe(actual)(expected)
    },
  };
}
