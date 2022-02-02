import Table from 'cli-table3'

import * as database from '../src/database.js'
import * as dateTime from '../src/date-time.js'
import * as engineering from '../src/engineering.js'
import * as financial from '../src/financial.js'
import * as information from '../src/information.js'
import * as logical from '../src/logical.js'
import * as lookupReference from '../src/lookup-reference.js'
import * as mathTrig from '../src/math-trig.js'
import * as miscellaneous from '../src/miscellaneous.js'
import * as statistical from '../src/statistical.js'
import * as text from '../src/text.js'

const categories = {
  Database: database,
  'Date Time': dateTime,
  Eningeering: engineering,
  Financial: financial,
  Information: information,
  Logical: logical,
  'Loookup Reference': lookupReference,
  'Math Trig': mathTrig,
  Miscellaneous: miscellaneous,
  Statistical: statistical,
  Text: text
}

const table = new Table({
  head: ['Category', 'Total', 'Not Implemented'],
  style: { head: [], border: [] }
})

let aggregateTotal = 0
let aggregateNotImplemented = 0

for (const c in categories) {
  const categoryName = c
  const category = categories[c]
  let total = 0
  let notImplemented = 0

  const inc = (err) => {
    if (err.message.includes('not implemented')) {
      notImplemented++
    }
  }

  for (const f in category) {
    if (typeof category[f] === 'function') {
      total++
      try {
        category[f]()
      } catch (err) {
        inc(err)
      }
    }

    if (typeof category[f] === 'object') {
      for (const s in category[f]) {
        total++
        try {
          category[s]()
        } catch (err) {
          inc(err)
        }
      }
    }
  }

  aggregateTotal += total
  aggregateNotImplemented += notImplemented

  table.push([categoryName, total, notImplemented])
}

table.push(['Totals', aggregateTotal, aggregateNotImplemented])

console.log(table.toString())
