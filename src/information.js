import * as error from './utils/error.js'

// TODO
export function CELL() {
  throw new Error('CELL is not implemented')
}

export const ERROR = {}

ERROR.TYPE = (error_val) => {
  switch (error_val) {
    case error.nil:
      return 1
    case error.div0:
      return 2
    case error.value:
      return 3
    case error.ref:
      return 4
    case error.name:
      return 5
    case error.num:
      return 6
    case error.na:
      return 7
    case error.data:
      return 8
  }

  return error.na
}

// TODO
export function INFO() {
  throw new Error('INFO is not implemented')
}

export function ISBLANK(value) {
  return value === null
}

export function ISBINARY(number) {
  return /^[01]{1,10}$/.test(number)
}

export function ISERR(value) {
  return (
    [error.value, error.ref, error.div0, error.num, error.name, error.nil].indexOf(value) >= 0 ||
    (typeof value === 'number' && (isNaN(value) || !isFinite(value)))
  )
}

export function ISERROR(value) {
  return ISERR(value) || value === error.na
}

export function ISEVEN(number) {
  return !(Math.floor(Math.abs(number)) & 1)
}

// TODO
export function ISFORMULA() {
  throw new Error('ISFORMULA is not implemented')
}

export function ISLOGICAL(value) {
  return value === true || value === false
}

export function ISNA(value) {
  return value === error.na
}

export function ISNONTEXT(value) {
  return typeof value !== 'string'
}

export function ISNUMBER(value) {
  return typeof value === 'number' && !isNaN(value) && isFinite(value)
}

export function ISODD(value) {
  return !!(Math.floor(Math.abs(value)) & 1)
}

// TODO
export function ISREF() {
  throw new Error('ISREF is not implemented')
}

export function ISTEXT(value) {
  return typeof value === 'string'
}

export function N(value) {
  if (ISNUMBER(value)) {
    return value
  }

  if (value instanceof Date) {
    return value.getTime()
  }

  if (value === true) {
    return 1
  }

  if (value === false) {
    return 0
  }

  if (ISERROR(value)) {
    return value
  }

  return 0
}

export function NA() {
  return error.na
}

// TODO
export function SHEET() {
  throw new Error('SHEET is not implemented')
}

// TODO
export function SHEETS() {
  throw new Error('SHEETS is not implemented')
}

export function TYPE(value) {
  if (ISNUMBER(value)) {
    return 1
  }

  if (ISTEXT(value)) {
    return 2
  }

  if (ISLOGICAL(value)) {
    return 4
  }

  if (ISERROR(value)) {
    return 16
  }

  if (Array.isArray(value)) {
    return 64
  }
}
