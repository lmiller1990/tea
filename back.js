#!/usr/bin/env node

const fs = require("fs");
const minimist = require("minimist");
const { run } = require("./dist/api.js");

const argv = minimist(process.argv.slice(2));

if (!argv._.length) {
  console.error("No test file provided.");
  process.exit(1);
} else {
  const buf = fs.readFileSync(argv._[0], 'utf-8')
  new Function(`return('${buf}')`)()
  run()
}

export {
  run
}
