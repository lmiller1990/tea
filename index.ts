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
  console.log(`Watching ${process.cwd()}`)
  const watcher = chokidar.watch(process.cwd(), {
    ignored: ["node_modules"],
  });

  watcher.on("change", (file) => {
    console.log(`${file} changed`)
    const buf = fs.readFileSync(file, "utf-8");
    eval(buf);
    run();
  });
} else {
  console.log('Run one test')
  const buf = fs.readFileSync(argv._[0], "utf-8");
  eval(buf);
  run();
}
