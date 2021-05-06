const { it, describe, expect } = require("./api.js");

describe("Nested", () => {
  it("foo should be foo", () => {
    const blah: string = "foo"
    expect("foooo").toBe(blah);
  });
});
