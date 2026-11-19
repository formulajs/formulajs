/**
 * Print to the console the assertions of a test file ready to be pasted in your favorite spreadsheet application.
 *
 * Usage: node bin/export-tests-two-spreadsheet.js test text.js >> assertions.txt
 *
 * Paste the output and split the data to columns using the pipe character as separator. The intention is to
 * facilitate pull request reviews and quickly test new assertions in spreadsheet applications.
 */
import fs from 'fs'

import path from 'path'

/* global console, process */
function extractAssertions(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')

  // Regular expression to match common assertion patterns
  // const assertionRegex = /(expect|assert|should)\s*$([^)]+)$\s*(\.to|\.not\.to|\.toBe|\.toEqual|\.toBeTruthy|\.toBeFalsy|\.toThrow|\.toMatch)\s*$([^)]+)$/g;
  const assertionRegex = /(expect|assert|should)\((.+)\)(.to\.throw|.to\.equal)\((.+)\)/g
  let match
  const assertions = []

  while ((match = assertionRegex.exec(content)) !== null) {
    assertions.push({
      assertion: match[0],
      expected: match[4],
      actual: match[2]
    })
  }

  return assertions
}

// Main function to handle command line arguments
function main() {
  const args = process.argv.slice(2)

  if (args.length !== 1) {
    console.error('Usage: node extractAssertions.js <path_to_test_file>')
    process.exit(1)
  }

  const filePath = path.resolve(args[0])

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`)
    process.exit(1)
  }

  const assertions = extractAssertions(filePath)

  if (assertions.length === 0) {
    console.log('No assertions found.')
  } else {
    console.log('Extracted Assertions:')
    assertions.forEach((assertion) => {
      console.log(
        `${assertion.assertion}|${assertion.actual.replace(/\w+\./, '=').replaceAll("'", '"')}|${assertion.expected}`
      )
    })
  }
}

main()
