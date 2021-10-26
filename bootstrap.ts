#!/usr/bin/env node

import minimist from 'minimist'
import path from 'path'
import { run, spawnExecCtxs } from './'

const argv = minimist(process.argv.slice(2))

const files = argv._

if (!files.length) {
  console.error('No test file provided.')
  process.exit(1)
}


if (argv.i) {
  spawnExecCtxs(files)
} else {
  // run specific file(s)
  for (const file of files) {
    require(path.resolve(file))
  }

  run()
}
