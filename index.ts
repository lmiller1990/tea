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
