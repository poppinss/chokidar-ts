import { join } from 'path'

import { TypescriptCompiler } from '../index'
import ts from 'typescript'

const compiler = new TypescriptCompiler(ts, 'tsconfig.json', join(__dirname, '..'))
const watcher = compiler.watcher()

watcher.on('subsequent:build', ({ path, diagnostics, skipped }) => {
  console.log(path)
  console.log(skipped)
  diagnostics.forEach((diagnostic) => {
    console.log(diagnostic.file!.fileName, diagnostic.messageText)
  })
})

const output = watcher.watch()
console.log(ts.formatDiagnosticsWithColorAndContext(output.diagnostics, watcher.host))
