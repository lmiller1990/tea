const { expect, describe, it } = require("../dist");

describe("A", () => {
  describe("B", () => {
    it("foo should be foo", () => {
      expect("foo").toBe("foo");
    });

    it("uh oh", () => {
      expect("uhh").toBe("foo");
    });
  });
});

