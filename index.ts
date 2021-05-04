import { it, describe, run } from "./framework";
import { expect } from "./assertions";

describe("Some Function", () => {
  describe("Nested", () => {
    it("foo should be foo", () => {
      expect("foo").toBe("foo");
    });

    describe('More Nested', () => {
      it('third level', () => {
        expect("ehhhhh").toBe("ahhhh")
      })
    })

    it("foo should be bar", () => {
      expect("foo").toBe("bar");
    });
  });
});

run();
