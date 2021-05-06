#!/usr/bin/env node

import minimist from "minimist";
import path from "path";
import { run } from "./";

const argv = minimist(process.argv.slice(2));

if (!argv._.length) {
  console.error("No test file provided.");
  process.exit(1);
}


// run specific file(s)
for (const file of argv._) {
  require(path.resolve(file));
}

run();
