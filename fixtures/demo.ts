import { expect, describe, it } from "../dist/index";

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
      expect(result).toBe("MESSAGE");
    });
  });

  describe("split", () => {
    it("splits the input by white space", () => {
      const result = StringTools.split("a b c");
      expect(result[0]).toBe("a")
      expect(result[1]).toBe("b")
      expect(result[2]).toBe("c")
    });
  });
});
