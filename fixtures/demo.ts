import { expect, describe, it } from "../dist/index.js"

describe("Some Function", () => {
  describe("Nested", () => {
    it("foo should be foo", () => {
      expect("foo").toBe("foo");
    });

    describe("More Nested", () => {
      it("third level", async () => {
        return new Promise<void>((res) => {
          setTimeout(() => {
            expect("ehhhhh").toBe("ahhhh");
            res();
          }, 1000);
        });
      });

      it("fails", () => {
        expect('foo').toBe('bar')
      })
    });

    it("foo should be bar", async () => {
      return new Promise<void>((res) => {
        setTimeout(() => {
          expect("foo").toBe("bar");
          res();
        }, 1000);
      });
    });
  });
});

