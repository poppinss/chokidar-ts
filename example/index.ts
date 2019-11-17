import { join } from 'path'

import { TypescriptCompiler } from '../index'
import ts from 'typescript'

const compiler = new TypescriptCompiler(ts, 'tsconfig.json', join(__dirname, '..'))
const watcher = compiler.watcher()

watcher.on('subsequent:build', ({ path, diagnostics, skipped }) => {
  console.log(path)
  console.log(skipped)
  console.log(ts.formatDiagnosticsWithColorAndContext(diagnostics, watcher.host))
})

const output = watcher.watch()
console.log(ts.formatDiagnosticsWithColorAndContext(output.diagnostics, watcher.host))
