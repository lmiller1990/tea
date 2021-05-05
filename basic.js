const { it, describe, expect } = require("./dist/api.js");

describe("Nested", () => {
  it("foo should be foo", () => {
    expect("foo").toBe("foo");
  });
});
