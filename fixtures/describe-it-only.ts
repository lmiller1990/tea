import demand from "must";
import { describe, it } from "../dist/index";

const StringTools = {
  upcase(str: string) {
    return str.toUpperCase();
  },

  split(str: string, sep = " ") {
    return str.split(sep);
  },
};

describe("StringTools", () => {
  describe("Another level", () => {
    describe("Another level 2", () => {
      describe.only("upcase", () => {
        it.only("upcases the input", () => {
          const result = StringTools.upcase("message");
          demand(result).to.eql("MESSAGE");
        });

        it("skips this one", () => {});
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
});
