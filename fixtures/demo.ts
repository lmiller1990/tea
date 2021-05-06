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
    it("fails", () => {
      demand({ foo: { bar: "qux" } }).to.eql({ foo: { bar: "bar" } });
    });
  });
});
