import * as error from './utils/error.js'

// TODO
/**
 * -- Not implemented --
 *
 * Returns information about the formatting, location, or contents of a value.
 *
 * Category: Information
 *
 * @returns
 */
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
/**
 * -- Not implemented --
 *
 * Returns information about the current operating environment.
 *
 * Category: Information
 *
 * @returns
 */
export function INFO() {
  throw new Error('INFO is not implemented')
}

/**
 * Returns TRUE if the value is blank.
 *
 * Category: Information
 *
 * @param {*} value The value that you want tested. The value argument can be a blank (empty value), error, logical value, text, number, or reference value, or a name referring to any of these.
 * @returns
 */
export function ISBLANK(value) {
  return value === null
}

/**
 * Formula.js only
 *
 * @param {*} number
 * @returns
 */
export function ISBINARY(number) {
  return /^[01]{1,10}$/.test(number)
}

/**
 * Returns TRUE if the value is any error value except #N/A.
 *
 * Category: Information
 *
 * @param {*} value The value that you want tested. The value argument can be a blank (empty value), error, logical value, text, number, or reference value, or a name referring to any of these.
 * @returns
 */
export function ISERR(value) {
  return (
    [error.value, error.ref, error.div0, error.num, error.name, error.nil].indexOf(value) >= 0 ||
    (typeof value === 'number' && (isNaN(value) || !isFinite(value)))
  )
}

/**
 * Returns TRUE if the value is any error value.
 *
 * Category: Information
 *
 * @param {*} value The value that you want tested. The value argument can be a blank (empty value), error, logical value, text, number, or reference value, or a name referring to any of these.
 * @returns
 */
export function ISERROR(value) {
  return ISERR(value) || value === error.na
}

/**
 * Returns TRUE if the number is even.
 *
 * Category: Information
 *
 * @param {*} number The value to test. If number is not an integer, it is truncated.
 * @returns
 */
export function ISEVEN(number) {
  return !(Math.floor(Math.abs(number)) & 1)
}

// TODO
/**
 * -- Not implemented --
 *
 * Returns TRUE if there is a reference to a value that contains a formula.
 *
 * Category: Information
 *
 * @param {*} reference Reference is a reference to the value you want to test. Reference can be a value reference, a formula, or a name that refers to a value.
 * @returns
 */
export function ISFORMULA() {
  throw new Error('ISFORMULA is not implemented')
}

/**
 * Returns TRUE if the value is a logical value.
 *
 * Category: Information
 *
 * @param {*} value The value that you want tested. The value argument can be a blank (empty value), error, logical value, text, number, or reference value, or a name referring to any of these.
 * @returns
 */
export function ISLOGICAL(value) {
  return value === true || value === false
}

/**
 * Returns TRUE if the value is the #N/A error value.
 *
 * Category: Information
 *
 * @param {*} value The value that you want tested. The value argument can be a blank (empty value), error, logical value, text, number, or reference value, or a name referring to any of these.
 * @returns
 */
export function ISNA(value) {
  return value === error.na
}

/**
 * Returns TRUE if the value is not text.
 *
 * Category: Information
 *
 * @param {*} value The value that you want tested. The value argument can be a blank (empty value), error, logical value, text, number, or reference value, or a name referring to any of these.
 * @returns
 */
export function ISNONTEXT(value) {
  return typeof value !== 'string'
}

/**
 * Returns TRUE if the value is a number.
 *
 * Category: Information
 *
 * @param {*} value The value that you want tested. The value argument can be a blank (empty value), error, logical value, text, number, or reference value, or a name referring to any of these.
 * @returns
 */
export function ISNUMBER(value) {
  return typeof value === 'number' && !isNaN(value) && isFinite(value)
}

/**
 * Returns TRUE if the number is odd.
 *
 * Category: Information
 *
 * @param {*} value The value that you want tested. The value argument can be a blank (empty value), error, logical value, text, number, or reference value, or a name referring to any of these.
 * @returns
 */
export function ISODD(value) {
  return !!(Math.floor(Math.abs(value)) & 1)
}

// TODO
/**
 * -- Not implemented --
 *
 * Returns TRUE if the value is a reference.
 *
 * Category: Information
 *
 * @param {*} value The value that you want tested. The value argument can be a blank (empty value), error, logical value, text, number, or reference value, or a name referring to any of these.
 * @returns
 */
export function ISREF() {
  throw new Error('ISREF is not implemented')
}

/**
 * Returns TRUE if the value is text.
 *
 * Category: Information
 *
 * @param {*} value The value that you want tested. The value argument can be a blank (empty value), error, logical value, text, number, or reference value, or a name referring to any of these.
 * @returns
 */
export function ISTEXT(value) {
  return typeof value === 'string'
}

/**
 * Returns a value converted to a number.
 *
 * Category: Information
 *
 * @param {*} value The value you want converted. N converts values listed in the following table.
 * @returns
 */
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

/**
 * Returns the error value #N/A.
 *
 * Category: Information
 *
 * @returns
 */
export function NA() {
  return error.na
}

// TODO
/**
 * -- Not implemented --
 *
 * Returns the sheet number of the referenced sheet.
 *
 * Category: Information
 *
 * @param {*} value Optional. Value is the name of a sheet or a reference for which you want the sheet number. If value is omitted, SHEET returns the number of the sheet that contains the function.
 * @returns
 */
export function SHEET() {
  throw new Error('SHEET is not implemented')
}

// TODO
/**
 * -- Not implemented --
 *
 * Returns the number of sheets in a reference.
 *
 * Category: Information
 *
 * @param {*} reference Optional. Reference is a reference for which you want to know the number of sheets it contains. If Reference is omitted, SHEETS returns the number of sheets in the workbook that contains the function.
 * @returns
 */
export function SHEETS() {
  throw new Error('SHEETS is not implemented')
}

/**
 * Returns a number indicating the data type of a value.
 *
 * Category: Information
 *
 * @param {*} value Can be any Microsoft Excel value, such as a number, text, logical value, and so on.
 * @returns
 */
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
