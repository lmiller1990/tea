#!/usr/bin/env node

import fs from "fs";
import minimist from "minimist";
import chokidar from "chokidar";
import { run } from "./api";

const argv = minimist(process.argv.slice(2));

if (!argv._.length && !argv.watch) {
  console.error("No test file provided.");
  process.exit(1);
}

// watch all
if (!argv._.length && argv.watch) {
  const loc = process.cwd();
  console.log(`Watching for changes in ${loc} ...`);
  const watcher = chokidar.watch(loc, {
    ignored: ["node_modules"],
  });

  watcher.on("change", (file) => {
    console.clear();
    const buf = fs.readFileSync(file, "utf-8");
    eval(buf);
    run();
  });
}

// watch specific file(s)
if (argv._.length && argv.watch) {
  throw Error('Watching specific files is not supported yet.')
}

// run specific file(s)
if (argv._.length && !argv.watch) {
  for (const file of argv._) {
    const buf = fs.readFileSync(file, "utf-8");
    eval(buf);
  }
  run();
}
