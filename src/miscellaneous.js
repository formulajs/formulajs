import * as error from './utils/error.js'
import * as utils from './utils/common.js'

/**
 * Returns a list of unique values in a list or range.
 *
 * Category: Lookup and reference
 *
 * @param {*} an array can be thought of as a row or column of values, or a combination of rows and columns of values. In the examples above, the arrays for our UNIQUE formulas are range D2:D11, and D2:D17 respectively.
 * @param {*} the UNIQUE function will return an array, which will spill if it's the final result of a formula. This means that Excel will dynamically create the appropriate sized array range when you press ENTER. If your supporting data is in an Excel Table, then the array will automatically resize as you add or remove data from your array range if you're using Structured References. For more details, see this article on Spilled Array Behavior.
 * @param {*} excel has limited support for dynamic arrays between workbooks, and this scenario is only supported when both workbooks are open. If you close the source workbook, any linked dynamic array formulas will return a #REF! error when they are refreshed.
 * @returns
 */
export function UNIQUE() {
  const result = []

  for (let i = 0; i < arguments.length; ++i) {
    let hasElement = false
    const element = arguments[i]

    // Check if we've already seen this element.

    for (let j = 0; j < result.length; ++j) {
      hasElement = result[j] === element

      if (hasElement) {
        break
      }
    }

    // If we did not find it, add it to the result.
    if (!hasElement) {
      result.push(element)
    }
  }

  return result
}

export const FLATTEN = utils.flatten

export function ARGS2ARRAY() {
  return Array.prototype.slice.call(arguments, 0)
}

export function REFERENCE(context, reference) {
  if (!arguments.length) {
    return error.error
  }

  try {
    const path = reference.split('.')
    let result = context

    for (let i = 0; i < path.length; ++i) {
      const step = path[i]

      if (step[step.length - 1] === ']') {
        const opening = step.indexOf('[')
        const index = step.substring(opening + 1, step.length - 1)
        result = result[step.substring(0, opening)][index]
      } else {
        result = result[step]
      }
    }

    return result
  } catch (error) {}
}

export function JOIN(array, separator) {
  return array.join(separator)
}

export function NUMBERS() {
  const possibleNumbers = utils.flatten(arguments)

  return possibleNumbers.filter((el) => typeof el === 'number')
}
