## Tea

Tea is a very simple test runner. It's written for an upcoming YouTube and blog post series on how to build a test runner. It works with JavaScript and TypeScript.

Here's a simple snippet, using Tea with [must.js](https://github.com/moll/js-must) for the assertion library:

```ts
import demand from "must";
import { describe, it } from "@lmiller1990/tea";

const StringTools = {
  upcase(str: string) {
    return str.toUpperCase();
  },

  split(str: string, sep = " ") {
    return str.split(sep);
  },
};

describe("StringTools", () => {
  describe("upcase", () => {
    it("upcases the input", () => {
      const result = StringTools.upcase("message");
      demand(result).to.eql("MESSAGE");
    });
  });

  describe("split", () => {
    it("splits the input by white space", () => {
      const result = StringTools.split("a b c");
      demand(result).to.eql(["a", "b", "c"]);
    });
  });

  describe("example failure", () => {
    it("foo.bar is qux", () => {
      demand({ foo: { bar: "qux" } }).to.eql({ foo: { bar: "bar" } });
    });
  });
});
```

Running this produces the following output:

```sh
StringTools
  upcase
    ✔ upcases the input
  split
    ✔ splits the input by white space
  example failure
    ✗ foo.bar is qux

FAIL: foo.bar is qux
  Expected: {"foo":{"bar":"bar"}}
  Received: {"foo":{"bar":"qux"}}
```

## Installation

It's available on npm, but unstable and prone to change. This is not intended for production use, but for educational purposes. None the less, you can install it with `yarn add @lmiller1990/tea`.

## Local Development

- clone the repo
- `yarn install`
- `yarn build` to build (you need do to this when you make any changes to the source)
- `yarn demo:ts` to run a TypeScript test project
- `yarn demo:js` to run a JavaScript test project
- `yarn demo:inject` to run a Javascript test project where `describe`, `it`, `must` do not need to be explicitly imported.

## Design Goals

The code base is as small and simple as possible. It only provides the runner component, so you need to bring your own assertion library. The examples here use [must.js](https://github.com/moll/js-must).

## API

- `describe`
- `describe.only`
- `it`
- `it.only`

## Usage

If you test is written in JavaScript, just run `yarn tea <test files>`.

If you are using TypeScript, you can run using `ts-node`: `ts-node -T node_modules/.bin/tea demo.ts`. I might implement some kind of register API in the future, eg `yarn tea --register ts-node/register demo.ts`, but it is not implemented right now.
