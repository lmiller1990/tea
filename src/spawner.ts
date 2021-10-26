import vm from 'vm'
import fs from 'fs'
import path from 'path'

import * as api from './api'
import demand from 'must'

export function spawnExecCtxs(files: string[]) {
  let i = files.length
  function done() {
    if (!--i) api.run()
  }

  const contextObject = vm.createContext({ done, console, demand, ...api })

  for (const file of files) {
    fs.readFile(path.resolve(file), 'utf8', (_, data) => {
      const terminator = `\ndone();`

      const script = new vm.Script(data + terminator)

      script.runInNewContext(contextObject)
    })
  }
}
