import * as error from './utils/error.js'
import * as information from './information.js'
import * as utils from './utils/common.js'

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

export function FALSE() {
  return false
}

export function IF(test, then_value, otherwise_value) {
  if (test instanceof Error) {
    return test
  }

  then_value = arguments.length >= 2 ? then_value : true

  if (then_value === undefined || then_value === null) {
    then_value = 0
  }

  otherwise_value = arguments.length === 3 ? otherwise_value : false

  if (otherwise_value === undefined || otherwise_value === null) {
    otherwise_value = 0
  }

  return test ? then_value : otherwise_value
}

export function IFS() {
  for (let i = 0; i < arguments.length / 2; i++) {
    if (arguments[i * 2]) {
      return arguments[i * 2 + 1]
    }
  }

  return error.na
}

export function IFERROR(value, valueIfError) {
  if (information.ISERROR(value)) {
    return valueIfError
  }

  return value
}

export function IFNA(value, value_if_na) {
  return value === error.na ? value_if_na : value
}

export function NOT(logical) {
  if (typeof logical === 'string') {
    return error.value
  }

  if (logical instanceof Error) {
    return logical
  }

  return !logical
}

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

export function TRUE() {
  return true
}

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
