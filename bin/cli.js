#!/usr/bin/env node

// eslint-disable-next-line no-unused-vars
import * as formulajs from '../lib/esm/index.mjs'
import * as readline from 'readline'

function runStream(input, output) {
  const rl = readline.createInterface({
    input: input || process.stdin,
    output: output || process.stdout
  })

  if (rl.output.isTTY) {
    rl.setPrompt('> ')
    rl.prompt()
  }

  rl.on('line', (line) => {
    const expr = line.trim()

    switch (expr.toLowerCase()) {
      case 'quit':
      case 'exit':
        rl.close()
        break
      case 'clear':
        if (rl.output.isTTY) {
          rl.prompt()
        }
        break
      default:
        if (!expr) {
          break
        }

        try {
          let result = eval('formulajs.' + expr)
          console.log(result)
        } catch (err) {
          console.log(err.toString())
        }
        break
    }

    if (rl.output.isTTY) {
      rl.prompt()
    }
  })

  rl.on('close', () => {
    console.log()
    process.exit(0)
  })
}

runStream(process.stdin, process.stdout)
