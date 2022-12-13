import * as error from './utils/error.js'
import * as utils from './utils/common.js'

export const FLATTEN = utils.flatten

export function ARGS2ARRAY() {
  return Array.prototype.slice.call(arguments, 0)
}

/**
 * Formula.js only
 *
 * @param {*} context
 * @param {*} reference
 * @returns
 */
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

/**
 * Formula.js only
 *
 * @param {*} array
 * @param {*} separator
 * @returns
 */
export function JOIN(array, separator) {
  return array.join(separator)
}

/**
 * Formula.js only
 *
 * @returns
 */
export function NUMBERS() {
  const possibleNumbers = utils.flatten(arguments)

  return possibleNumbers.filter((el) => typeof el === 'number')
}

/**
 * SINGLE (@ symbol)
 *
 * Implicit intersection - Reduces many values to a single value, e.g. [[1, 2], [3, 4]] -> 1. Supports Excel versions without dynamic array functionality.
 *
 * @param {*} values
 * @returns
 */
export function SINGLE(value) {
  if (value instanceof Array) {
    for (let i = 0; i < value.length; i++) {
      if (!(value[i] instanceof Array)) {
        return error.na
      }

      if (value[i].length === 0) {
        return error.na
      }

      if (value[i].length !== value[0].length) {
        return error.na
      }
    }

    return value[0][0]
  }

  return value
}
