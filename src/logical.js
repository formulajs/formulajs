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
 * Chooses a value from a list of values.
 *
 * Category: Lookup and reference
 *
 * @param {*} index_num Specifies which value argument is selected. Index_num must be a number between 1 and 254, or a formula or reference to a value containing a number between 1 and 254. If index_num is 1, CHOOSE returns value1; if it is 2, CHOOSE returns value2; and so on. If index_num is less than 1 or greater than the number of the last value in the list, CHOOSE returns the #VALUE! error value. If index_num is a fraction, it is truncated to the lowest integer before being used.
 - If index_num is 1, CHOOSE returns value1; if it is 2, CHOOSE returns value2; and so on.
 - If index_num is less than 1 or greater than the number of the last value in the list, CHOOSE returns the #VALUE! error value.
 - If index_num is a fraction, it is truncated to the lowest integer before being used.
 * @param {*} args value1, value2, ... Value 1 is required, subsequent values are optional. 1 to 254 value arguments from which CHOOSE selects a value or an action to perform based on index_num. The arguments can be numbers, value references, defined names, formulas, functions, or text.
 * @returns
 */
export function CHOOSE() {
  if (arguments.length < 2) {
    return error.na
  }

  const index = arguments[0]

  if (index < 1 || index > 254) {
    return error.value
  }

  if (arguments.length < index + 1) {
    return error.value
  }

  return arguments[index]
}

/**
 * Returns the logical value FALSE.
 *
 * Category: Logical
 *
 * @returns
 */
export function FALSE() {
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
  if (logical_test instanceof Error) {
    return logical_test
  }

  value_if_true = arguments.length >= 2 ? value_if_true : true

  if (value_if_true === undefined || value_if_true === null) {
    value_if_true = 0
  }

  value_if_false = arguments.length === 3 ? value_if_false : false

  if (value_if_false === undefined || value_if_false === null) {
    value_if_false = 0
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
  for (let i = 0; i < arguments.length / 2; i++) {
    if (arguments[i * 2]) {
      return arguments[i * 2 + 1]
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
  if (information.ISERROR(value)) {
    return value_if_error
  }

  return value
}

/**
 * Returns the value you specify if the expression resolves to #N/A, otherwise returns the result of the expression.
 *
 * Category: Logical
 *
 * @returns
 */
export function IFNA(value, value_if_na) {
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
