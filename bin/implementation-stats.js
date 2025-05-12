import { writeFileSync } from 'fs'
import { JSDOM } from 'jsdom'
import * as formulajs from './../src/index.js'

const FILE_NAME = 'IMPLEMENTATION_STATS'
const URL =
  'https://support.microsoft.com/en-us/office/excel-functions-alphabetical-b3944572-255d-4efb-bb96-c6d90033e188'

/**
 * Generates a Markdown table from the stats array.
 */
function generateMarkdownTable(stats) {
  const total = stats.length
  const implemented = stats.filter((stat) => stat.implemented).length
  const notImplemented = total - implemented
  const pageTitle = `## Excel functions implemented in Formula.js\nAs of ${new Date().toUTCString()} \n\n`
  const tableStats = `Total: ${total} functions | Implemented: ${implemented} | Not Implemented: ${notImplemented}\n\n`
  const tableHeader = `| Function Name | Category | Description | Implemented |\n| :--- | :--- | :--- | :--- |\n`
  const tableRows = stats
    .map((stat) => `| ${stat.name} | ${stat.category} | ${stat.description} | ${stat.implemented ? '✅' : '❌'} |`)
    .join('\n')

  return pageTitle + tableStats + tableHeader + tableRows
}

/**
 * Generates a YML table from the stats array.
 */
function generateYMLTable(stats) {
  const groupedStats = stats.reduce((acc, stat) => {
    acc[stat.category] = acc[stat.category] || []
    acc[stat.category].push(stat)
    return acc
  }, {})

  return Object.entries(groupedStats)
    .sort()
    .map(([category, funcs]) => {
      return `- category: ${category}\n  functions:\n${funcs
        .map((f) => `    - title: ${f.name}\n      description: ${f.description}\n      implemented: ${f.implemented}`)
        .join('\n')}`
    })
    .join('\n')
}

/**
 * Fetches data from the specified URL, processes it, and generates Markdown and YML files with implementation stats.
 */
async function fetchAndProcessData() {
  const stats = []

  try {
    const response = await fetch(URL)
    const data = await response.text()
    const dom = new JSDOM(data)
    const rows = dom.window.document.querySelectorAll('.ocpIntroduction table tbody tr')

    if (!rows.length) {
      throw new Error('No rows found in the table. The webpage structure might have changed.')
    }

    rows.forEach((row) => {
      const cells = row.querySelectorAll('td')

      if (cells.length < 2) return

      const name = cells[0].textContent
        .trim()
        .split(' ')[0]
        .replace(/[a-z]|,|\n+/g, '')
        .toUpperCase()
      const category = cells[1].textContent.trim().split(/:/)[0]
      const desc = cells[1].textContent.trim().split(/:/)
      desc.shift()
      let description = desc.join(':').replace(/\n+/, '. ').replace(/\s+/g, ' ').replace(/#/g, '').trim()
      description = description.endsWith('.') ? description : description + '.'

      const implemented = typeof name.split('.').reduce((o, k) => o?.[k], formulajs) === 'function'

      stats.push({ name, category, description, implemented })
    })

    writeFileSync(FILE_NAME + '.md', generateMarkdownTable(stats))
    console.log(`${FILE_NAME}.md has been successfully generated.`)

    writeFileSync(FILE_NAME + '.yml', generateYMLTable(stats))
    console.log(`${FILE_NAME}.yml has been successfully generated.`)
  } catch (err) {
    console.error(`Failed to fetch or process data: ${err.message}`)
  }
}

fetchAndProcessData()
