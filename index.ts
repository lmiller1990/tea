#!/usr/bin/env node

import fs from "fs";
import minimist from "minimist";
import { run } from "./api";

const argv = minimist(process.argv.slice(2));

if (!argv._.length) {
  console.error("No test file provided.");
  process.exit(1);
}

// run specific file(s)
for (const file of argv._) {
  const buf = fs.readFileSync(file, "utf-8");
  eval(buf);
}
run();
