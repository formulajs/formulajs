import * as error from './utils/error.js'
import * as information from './information.js'
import * as utils from './utils/common.js'

/**
 * Returns TRUE if all of its arguments are TRUE.
 *
 * Category: Logical
 *
 * @returns
 */
export function AND() {
  if (arguments.length === 0) {
    return error.na
  }

  const args = utils.flatten(arguments)
  let result = error.value

  for (let i = 0; i < args.length; i++) {
    if (args[i] instanceof Error) {
      return args[i]
    }

    if (args[i] === undefined || args[i] === null || typeof args[i] === 'string') {
      continue
    }

    if (result === error.value) {
      result = true
    }

    if (!args[i]) {
      result = false
    }
  }

  return result
}

/**
 * Returns the logical value FALSE.
 *
 * Category: Logical
 *
 * @returns
 */
export function FALSE() {
  if (arguments.length !== 0) {
    return error.na
  }

  return false
}

/**
 * Specifies a logical test to perform.
 *
 * Category: Logical
 *
 * @param {*} logical_test
 * @param {*} value_if_true
 * @param {*} value_if_false
 *
 * @returns
 */
export function IF(logical_test, value_if_true, value_if_false) {
  if (arguments.length < 2 || arguments.length > 3) {
    return error.na
  }

  if (logical_test instanceof Error) {
    return logical_test
  }

  if (typeof logical_test === 'string') {
    if (logical_test === 'true') {
      logical_test = true
    } else if (logical_test === 'false') {
      logical_test = false
    } else {
      return error.value
    }
  }

  if (value_if_true === undefined || value_if_true === null) {
    value_if_true = 0
  }

  if (arguments.length !== 3) {
    value_if_false = false
  }

  if (value_if_false === undefined || value_if_false === null) {
    value_if_false = 0
  }

  if (Array.isArray(logical_test)) {
    return logical_test.map((item) => IF(item, value_if_true, value_if_false))
  }

  return logical_test ? value_if_true : value_if_false
}

/**
 * Checks whether one or more conditions are met and returns a value that corresponds to the first TRUE condition.
 *
 * Category: Logical
 *
 * @returns
 */
export function IFS() {
  if (arguments.length < 2 || arguments.length % 2 === 1) {
    return error.na
  }

  for (let i = 0; i < arguments.length / 2; i++) {
    let test = arguments[i * 2]

    if (Object.values(error).includes(test)) {
      return test
    }

    if (test === 'true') {
      test = true
    } else if (test === 'false') {
      test = false
    } else if (typeof test === 'string') {
      return error.value
    }

    if (test) {
      if (arguments[i * 2 + 1] == undefined || arguments[i * 2 + 1] == null) {
        return 0
      } else {
        return arguments[i * 2 + 1]
      }
    }
  }

  return error.na
}

/**
 * Returns a value you specify if a formula evaluates to an error; otherwise, returns the result of the formula.
 *
 * Category: Logical
 *
 * @param {*} value The argument that is checked for an error.
 * @param {*} value_if_error The value to return if the formula evaluates to an error. The following error types are evaluated: #N/A, #VALUE!, #REF!, #DIV/0!, #NUM!, #NAME?, or #NULL!.
 * @returns
 */
export function IFERROR(value, value_if_error) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (value === null) {
    return 0
  }

  return information.ISERROR(value) ? value_if_error : value
}

/**
 * Returns the value you specify if the expression resolves to #N/A, otherwise returns the result of the expression.
 *
 * Category: Logical
 *
 * @returns
 */
export function IFNA(value, value_if_na) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (value === null) {
    return 0
  }

  return value === error.na ? value_if_na : value
}

/**
 * Reverses the logic of its argument.
 *
 * Category: Logical
 *
 * @returns
 */
export function NOT(logical) {
  if (typeof logical === 'string') {
    return error.value
  }

  if (logical instanceof Error) {
    return logical
  }

  return !logical
}

/**
 * Returns TRUE if any argument is TRUE.
 *
 * Category: Logical
 *
 * @returns
 */
export function OR() {
  const args = utils.flatten(arguments)
  let result = error.value

  for (let i = 0; i < args.length; i++) {
    if (args[i] instanceof Error) {
      return args[i]
    }

    if (args[i] === undefined || args[i] === null || typeof args[i] === 'string') {
      continue
    }

    if (result === error.value) {
      result = false
    }

    if (args[i]) {
      result = true
    }
  }

  return result
}

/**
 * Returns the logical value TRUE.
 *
 * Category: Logical
 *
 * @returns
 */
export function TRUE() {
  return true
}

/**
 * Returns a logical exclusive OR of all arguments.
 *
 * Category: Logical
 *
 * @param {*} args logical1, logical2,… Logical 1 is required, subsequent logical values are optional. 1 to 254 conditions you want to test that can be either TRUE or FALSE, and can be logical values, arrays, or references.
 * @returns
 */
export function XOR() {
  const args = utils.flatten(arguments)
  let result = error.value

  for (let i = 0; i < args.length; i++) {
    if (args[i] instanceof Error) {
      return args[i]
    }

    if (args[i] === undefined || args[i] === null || typeof args[i] === 'string') {
      continue
    }

    if (result === error.value) {
      result = 0
    }

    if (args[i]) {
      result++
    }
  }

  if (result === error.value) {
    return result
  }

  return !!(Math.floor(Math.abs(result)) & 1)
}

/**
 * Evaluates an expression against a list of values and returns the result corresponding to the first matching value. If there is no match, an optional default value may be returned.
 *
 * Category: Logical
 *
 * @returns
 */
export function SWITCH() {
  let result

  if (arguments.length > 0) {
    const targetValue = arguments[0]
    const argc = arguments.length - 1
    const switchCount = Math.floor(argc / 2)
    let switchSatisfied = false
    const hasDefaultClause = argc % 2 !== 0
    const defaultClause = argc % 2 === 0 ? null : arguments[arguments.length - 1]

    if (switchCount) {
      for (let index = 0; index < switchCount; index++) {
        if (targetValue === arguments[index * 2 + 1]) {
          result = arguments[index * 2 + 2]
          switchSatisfied = true
          break
        }
      }
    }

    if (!switchSatisfied) {
      result = hasDefaultClause ? defaultClause : error.na
    }
  } else {
    result = error.value
  }

  return result
}
