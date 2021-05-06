const { it, describe, expect } = require("../");

describe("Suite b", () => {
  it("b is not a", () => {
    expect("b").toBe("a");
  });
});
