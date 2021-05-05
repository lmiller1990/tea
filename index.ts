#!/usr/bin/env node

import fs from "fs";
import minimist from "minimist";
import { run } from "./api";

const argv = minimist(process.argv.slice(2));

if (!argv._.length) {
  console.error("No test file provided.");
  process.exit(1);
} else {
  const buf = fs.readFileSync(argv._[0], "utf-8");
  eval(buf);
  run();
}

// describe("Some Function", () => {
//   describe("Nested", () => {
//     it("foo should be foo", () => {
//       expect("foo").toBe("foo");
//     });

//     describe("More Nested", () => {
//       it("third level", async () => {
//         return new Promise<void>((res) => {
//           setTimeout(() => {
//             expect("ehhhhh").toBe("ahhhh");
//             res();
//           }, 1000);
//         });
//       });
//     });

//     it("foo should be bar", async () => {
//       return new Promise<void>((res) => {
//         setTimeout(() => {
//           expect("foo").toBe("bar");
//           res();
//         }, 1000);
//       });
//     });
//   });
// });

// run();
