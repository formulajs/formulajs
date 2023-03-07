import * as error from './utils/error.js'
import * as utils from './utils/common.js'

import { POWER } from './math-trig.js'

/**
 * The functions in this file refer to the functions of the google sheets operator category
 */

/**
 * Returns the sum of two numbers. Equivalent to the '+' operator.
 *
 * @param {*} num1
 * @param {*} num2
 * @returns
 */
export function ADD(num1, num2) {
  if (arguments.length !== 2) {
    return error.na
  }

  num1 = utils.parseNumber(num1)
  num2 = utils.parseNumber(num2)
  const anyError = utils.anyError(num1, num2)

  if (anyError) {
    return anyError
  }

  return num1 + num2
}

/**
 * Returns one number divided by another. Equivalent to the '/' operator.
 *
 * @param {*} dividend
 * @param {*} divisor
 * @returns
 */
export function DIVIDE(dividend, divisor) {
  if (arguments.length !== 2) {
    return error.na
  }

  dividend = utils.parseNumber(dividend)
  divisor = utils.parseNumber(divisor)
  const anyError = utils.anyError(dividend, divisor)

  if (anyError) {
    return anyError
  }

  if (divisor === 0) {
    return error.div0
  }

  return dividend / divisor
}

/**
 * Returns 'TRUE' if two specified values are equal and 'FALSE' otherwise. Equivalent to the '=' operator.
 *
 * @param {*} value1
 * @param {*} value2
 * @returns
 */
export function EQ(value1, value2) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (value1 instanceof Error) {
    return value1
  }

  if (value2 instanceof Error) {
    return value2
  }

  if (value1 === null) {
    value1 = undefined
  }

  if (value2 === null) {
    value2 = undefined
  }

  return value1 === value2
}

/**
 * Returns 'TRUE' if the first argument is strictly greater than the second, and 'FALSE' otherwise. Equivalent to the '>' operator.
 *
 * @param {*} num1
 * @param {*} num2
 * @returns
 */
export function GT(num1, num2) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (num1 instanceof Error) {
    return num1
  }

  if (num2 instanceof Error) {
    return num2
  }

  if (utils.anyIsString(num1, num2)) {
    num1 = utils.parseString(num1)
    num2 = utils.parseString(num2)
  } else {
    num1 = utils.parseNumber(num1)
    num2 = utils.parseNumber(num2)
  }

  const anyError = utils.anyError(num1, num2)

  if (anyError) {
    return anyError
  }

  return num1 > num2
}

/**
 * Returns 'TRUE' if the first argument is greater than or equal to the second, and 'FALSE' otherwise. Equivalent to the '>=' operator.
 *
 * @param {*} num1
 * @param {*} num2
 * @returns
 */
export function GTE(num1, num2) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (utils.anyIsString(num1, num2)) {
    num1 = utils.parseString(num1)
    num2 = utils.parseString(num2)
  } else {
    num1 = utils.parseNumber(num1)
    num2 = utils.parseNumber(num2)
  }

  const anyError = utils.anyError(num1, num2)

  if (anyError) {
    return anyError
  }

  return num1 >= num2
}

/**
 * Returns 'TRUE' if the first argument is strictly less than the second, and 'FALSE' otherwise. Equivalent to the '<' operator.
 *
 * @param {*} num1
 * @param {*} num2
 * @returns
 */
export function LT(num1, num2) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (utils.anyIsString(num1, num2)) {
    num1 = utils.parseString(num1)
    num2 = utils.parseString(num2)
  } else {
    num1 = utils.parseNumber(num1)
    num2 = utils.parseNumber(num2)
  }

  const anyError = utils.anyError(num1, num2)

  if (anyError) {
    return anyError
  }

  return num1 < num2
}

/**
 * Returns 'TRUE' if the first argument is less than or equal to the second, and 'FALSE' otherwise. Equivalent to the '<=' operator.
 *
 * @param {*} num1
 * @param {*} num2
 * @returns
 */
export function LTE(num1, num2) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (utils.anyIsString(num1, num2)) {
    num1 = utils.parseString(num1)
    num2 = utils.parseString(num2)
  } else {
    num1 = utils.parseNumber(num1)
    num2 = utils.parseNumber(num2)
  }

  const anyError = utils.anyError(num1, num2)

  if (anyError) {
    return anyError
  }

  return num1 <= num2
}

/**
 * Returns the difference of two numbers. Equivalent to the '-' operator.
 *
 * @param {*} num1
 * @param {*} num2
 * @returns
 */
export function MINUS(num1, num2) {
  if (arguments.length !== 2) {
    return error.na
  }

  num1 = utils.parseNumber(num1)
  num2 = utils.parseNumber(num2)
  const anyError = utils.anyError(num1, num2)

  if (anyError) {
    return anyError
  }

  return num1 - num2
}

/**
 * Returns the product of two numbers. Equivalent to the '*' operator.
 *
 * @param {*} factor1
 * @param {*} factor2
 * @returns
 */
export function MULTIPLY(factor1, factor2) {
  if (arguments.length !== 2) {
    return error.na
  }

  factor1 = utils.parseNumber(factor1)
  factor2 = utils.parseNumber(factor2)
  const anyError = utils.anyError(factor1, factor2)

  if (anyError) {
    return anyError
  }

  return factor1 * factor2
}

/**
 * Returns 'TRUE' if two specified values are not equal and 'FALSE' otherwise. Equivalent to the '<>' operator.
 *
 * @param {*} value1
 * @param {*} value2
 * @returns
 */
export function NE(value1, value2) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (value1 instanceof Error) {
    return value1
  }

  if (value2 instanceof Error) {
    return value2
  }

  if (value1 === null) {
    value1 = undefined
  }

  if (value2 === null) {
    value2 = undefined
  }

  return value1 !== value2
}

/**
 * Returns a number raised to a power.
 *
 * @param {*} base
 * @param {*} exponent
 * @returns
 */
export function POW(base, exponent) {
  if (arguments.length !== 2) {
    return error.na
  }

  return POWER(base, exponent)
}

/**
 * Checks whether a provided number is between two other numbers either inclusively or exclusively.
 *
 * @param {*} value
 * @param {*} start
 * @param {*} end
 * @param {*} inclusiveLower
 * @param {*} inclusiveUpper
 * @returns
 */

export function ISBETWEEN(value, start, end, inclusiveLower = true, inclusiveUpper = true) {
  if (arguments.length < 3) {
    return error.na
  }

  if (
    utils.anyIsString(value, start, end, inclusiveLower, inclusiveUpper) ||
    utils.anyIsError(value, start, end, inclusiveLower, inclusiveUpper)
  ) {
    return error.error
  }

  if ((start === undefined && end === undefined) || value === undefined) {
    return false
  }

  if (start === undefined || end === undefined) {
    return true
  }

  if (start > end) {
    [start, end] = [end, start];
  }

  if (inclusiveLower && inclusiveUpper) {
    return value >= start && value <= end;
  } else if (inclusiveLower) {
    return value >= start && value < end;
  } else if (inclusiveUpper) {
    return value > start && value <= end;
  } else {
    return value > start && value < end;
  }
}

export function UMINUS() {
  throw new Error('UMINUS is not implemented')
}

export function UNARY_PERCENT() {
  throw new Error('UNARY_PERCENT is not implemented')
}

export function UPLUS() {
  throw new Error('UPLUS is not implemented')
}
