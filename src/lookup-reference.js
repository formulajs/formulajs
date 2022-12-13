import jStat from 'jstat'

import * as error from './utils/error.js'
import * as utils from './utils/common.js'

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
 * Returns the column number of a reference.
 *
 * Category: Lookup and reference
 *
 * @param {*} reference the value or range of values for which you want to return the column number.
 * @param {*} index
 * @returns
 */
export function COLUMN(reference, index) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (index < 0) {
    return error.num
  }

  if (!(reference instanceof Array) || typeof index !== 'number') {
    return error.value
  }

  if (reference.length === 0) {
    return undefined
  }

  return jStat.col(reference, index)
}

/**
 * Returns the number of columns in a reference.
 *
 * Category: Lookup and reference
 *
 * @param {*} array An array or array formula, or a reference to a range of values for which you want the number of columns.
 * @returns
 */
export function COLUMNS(array) {
  if (arguments.length !== 1) {
    return error.na
  }

  if (!(array instanceof Array)) {
    return error.value
  }

  if (array.length === 0) {
    return 0
  }

  return jStat.cols(array)
}

/**
 * Looks in the top row of an array and returns the value of the indicated value.
 *
 * Category: Lookup and reference
 *
 * @param {*} lookup_value The value to be found in the first row of the table. Lookup_value can be a value, a reference, or a text string.
 * @param {*} table_array A table of information in which data is looked up. Use a reference to a range or a range name.
 * @param {*} row_index_num The row number in table_array from which the matching value will be returned. A row_index_num of 1 returns the first row value in table_array, a row_index_num of 2 returns the second row value in table_array, and so on. If row_index_num is less than 1, HLOOKUP returns the #VALUE! error value; if row_index_num is greater than the number of rows on table_array, HLOOKUP returns the #REF! error value.
 * @param {*} range_lookup Optional. A logical value that specifies whether you want HLOOKUP to find an exact match or an approximate match. If TRUE or omitted, an approximate match is returned. In other words, if an exact match is not found, the next largest value that is less than lookup_value is returned. If FALSE, HLOOKUP will find an exact match. If one is not found, the error value #N/A is returned.
 * @returns
 */
export function HLOOKUP(lookup_value, table_array, row_index_num, range_lookup) {
  return VLOOKUP(lookup_value, utils.transpose(table_array), row_index_num, range_lookup)
}

/**
 * Uses an index to choose a value from a reference or array.
 *
 * Category: Lookup and reference
 *
 * @param {*} array A range of values or an array constant.
 - If array contains only one row or column, the corresponding row_num or column_num argument is optional.
 - If array has more than one row and more than one column, and only row_num or column_num is used, INDEX returns an array of the entire row or column in array.
 * @param {*} row_num Required, unless column_num is present. Selects the row in array from which to return a value. If row_num is omitted, column_num is required.
 * @param {*} column_num Optional. Selects the column in array from which to return a value. If column_num is omitted, row_num is required.
 * @returns
 */
export function INDEX(array, row_num, column_num) {
  const someError = utils.anyError(array, row_num, column_num)

  if (someError) {
    return someError
  }

  if (!Array.isArray(array)) {
    return error.value
  }

  const isOneDimensionRange = array.length > 0 && !Array.isArray(array[0])

  if (isOneDimensionRange && !column_num) {
    column_num = row_num
    row_num = 1
  } else {
    column_num = column_num || 1
    row_num = row_num || 1
  }

  if (column_num < 0 || row_num < 0) {
    return error.value
  }

  if (isOneDimensionRange && row_num === 1 && column_num <= array.length) {
    return array[column_num - 1]
  } else if (row_num <= array.length && column_num <= array[row_num - 1].length) {
    return array[row_num - 1][column_num - 1]
  }

  return error.ref
}

/**
 * Looks up values in a vector or array.
 *
 * Category: Lookup and reference
 *
 * @param {*} lookup_value A value that LOOKUP searches for in an array. The lookup_value argument can be a number, text, a logical value, or a name or reference that refers to a value.
 - If LOOKUP can't find the value of lookup_value, it uses the largest value in the array that is less than or equal to lookup_value.
 - If the value of lookup_value is smaller than the smallest value in the first row or column (depending on the array dimensions), LOOKUP returns the #N/A error value.
 * @param {*} array A range of values that contains text, numbers, or logical values that you want to compare with lookup_value. The array form of LOOKUP is very similar to the HLOOKUP and VLOOKUP functions. The difference is that HLOOKUP searches for the value of lookup_value in the first row, VLOOKUP searches in the first column, and LOOKUP searches according to the dimensions of array.
* @param {*} result_array Optional. A range that contains only one row or column. The result_array argument must be the same size as lookup_value. It has to be the same size.
 * @returns
 */
export function LOOKUP(lookup_value, array, result_array) {
  array = utils.flatten(array)
  result_array = result_array ? utils.flatten(result_array) : array

  const isNumberLookup = typeof lookup_value === 'number'
  let result = error.na

  for (let i = 0; i < array.length; i++) {
    if (array[i] === lookup_value) {
      return result_array[i]
    } else if (
      (isNumberLookup && array[i] <= lookup_value) ||
      (typeof array[i] === 'string' && array[i].localeCompare(lookup_value) < 0)
    ) {
      result = result_array[i]
    } else if (isNumberLookup && array[i] > lookup_value) {
      return result
    }
  }

  return result
}

/**
 * Looks up values in a reference or array.
 *
 * Category: Lookup and reference
 *
 * @param {*} lookup_value The value that you want to match in lookup_array. For example, when you look up someone's number in a telephone book, you are using the person's name as the lookup value, but the telephone number is the value you want.The lookup_value argument can be a value (number, text, or logical value) or a value reference to a number, text, or logical value.
 * @param {*} lookup_array The range of values being searched.
 * @param {*} match_type Optional. The number -1, 0, or 1. The match_type argument specifies how Excel matches lookup_value with values in lookup_array. The default value for this argument is 1.
 * @returns
 */
export function MATCH(lookup_value, lookup_array, match_type) {
  if (!lookup_value && !lookup_array) {
    return error.na
  }

  if (arguments.length === 2) {
    match_type = 1
  }

  if (!(lookup_array instanceof Array)) {
    return error.na
  }

  lookup_array = utils.flatten(lookup_array)

  if (match_type !== -1 && match_type !== 0 && match_type !== 1) {
    return error.na
  }

  let index
  let indexValue

  for (let idx = 0; idx < lookup_array.length; idx++) {
    if (match_type === 1) {
      if (lookup_array[idx] === lookup_value) {
        return idx + 1
      } else if (lookup_array[idx] < lookup_value) {
        if (!indexValue) {
          index = idx + 1
          indexValue = lookup_array[idx]
        } else if (lookup_array[idx] > indexValue) {
          index = idx + 1
          indexValue = lookup_array[idx]
        }
      }
    } else if (match_type === 0) {
      if (typeof lookup_value === 'string') {
        const lookupValueStr = lookup_value.toLowerCase().replace(/\?/g, '.').replace(/\*/g, '.*').replace(/~/g, '\\')
        const regex = new RegExp('^' + lookupValueStr + '$')

        if (regex.test(lookup_array[idx].toLowerCase())) {
          return idx + 1
        }
      } else {
        if (lookup_array[idx] === lookup_value) {
          return idx + 1
        }
      }
    } else if (match_type === -1) {
      if (lookup_array[idx] === lookup_value) {
        return idx + 1
      } else if (lookup_array[idx] > lookup_value) {
        if (!indexValue) {
          index = idx + 1
          indexValue = lookup_array[idx]
        } else if (lookup_array[idx] < indexValue) {
          index = idx + 1
          indexValue = lookup_array[idx]
        }
      }
    }
  }

  return index || error.na
}

/**
 * Returns the number of rows in a reference.
 *
 * Category: Lookup and reference
 *
 * @param {*} array An array, an array formula, or a reference to a range of values for which you want the number of rows.
 * @returns
 */
export function ROWS(array) {
  if (arguments.length !== 1) {
    return error.na
  }

  if (!(array instanceof Array)) {
    return error.value
  }

  if (array.length === 0) {
    return 0
  }

  return jStat.rows(array)
}

/**
 * Returns the transpose of an array.
 *
 * Category: Lookup and reference
 *
 * @param {*} array An array or range of values on a worksheet that you want to transpose. The transpose of an array is created by using the first row of the array as the first column of the new array, the second row of the array as the second column of the new array, and so on. If you're not sure of how to enter an array formula, see Create an array formula.
 * @returns
 */
export function TRANSPOSE(array) {
  if (!array) {
    return error.na
  }

  return jStat.transpose(array)
}

/**
 * Returns a list of unique values in a list or range.
 *
 * Category: Lookup and reference
 *
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

/**
 * Looks in the first column of an array and moves across the row to return the value of a value.
 *
 * Category: Lookup and reference
 *
 * @param {*} lookup_value The value to be found in the first row of the table. Lookup_value can be a value, a reference, or a text string.
 * @param {*} table_array A table of information in which data is looked up. Use a reference to a range or a range name.
 * @param {*} col_index_num The row number in table_array from which the matching value will be returned. A row_index_num of 1 returns the first row value in table_array, a row_index_num of 2 returns the second row value in table_array, and so on. If row_index_num is less than 1, HLOOKUP returns the #VALUE! error value; if row_index_num is greater than the number of rows on table_array, HLOOKUP returns the #REF! error value.
 * @param {*} range_lookup Optional. A logical value that specifies whether you want HLOOKUP to find an exact match or an approximate match. If TRUE or omitted, an approximate match is returned. In other words, if an exact match is not found, the next largest value that is less than lookup_value is returned. If FALSE, HLOOKUP will find an exact match. If one is not found, the error value #N/A is returned.
 * @returns
 */
export function VLOOKUP(lookup_value, table_array, col_index_num, range_lookup) {
  if (!table_array || !col_index_num) {
    return error.na
  }

  range_lookup = !(range_lookup === 0 || range_lookup === false)
  let result = error.na
  const isNumberLookup = typeof lookup_value === 'number'
  let exactMatchOnly = false

  for (let i = 0; i < table_array.length; i++) {
    const row = table_array[i]

    if (row[0] === lookup_value) {
      result = col_index_num < row.length + 1 ? row[col_index_num - 1] : error.ref
      break
    } else if (
      !exactMatchOnly &&
      ((isNumberLookup && range_lookup && row[0] <= lookup_value) ||
        (range_lookup && typeof row[0] === 'string' && row[0].localeCompare(lookup_value) < 0))
    ) {
      result = col_index_num < row.length + 1 ? row[col_index_num - 1] : error.ref
    }

    if (isNumberLookup && row[0] > lookup_value) {
      exactMatchOnly = true
    }
  }

  return result
}

/**
 * Returns a sorted array of the elements in an array. The returned array is the same shape as the provided array argument.
 *
 * Category: Lookup and reference
 *
 * @param {*} array The range, or array to sort.
 * @param {*} sort_index Optional. A number indicating the row or column to sort by. Default is 1.
 * @param {*} sort_order Optional. A number indicating the sort order. 1 for ascending, -1 for descending. Default is 1.
 * @param {*} by_col Optional. A logical value indicating the desired sort direction. FALSE to sort by row. TRUE to sort by column. Default is FALSE.
 * @returns
 */
 export function SORT(array, sort_index, sort_order, by_col) {
  if (!array) {
    return error.na
  }

  if (!(array instanceof Array)) {
    return error.na
  }

  if (array.length === 0) {
    return error.na
  }

  for (let i = 0; i < array.length; i++) {
    if (!(array[i] instanceof Array)) {
      return error.na
    }

    if (array[i].length === 0) {
      return error.na
    }

    if (array[i].length !== array[0].length) {
      return error.na
    }
  }

  const arrayWidth = array[0].length
  const arrayHeight = array.length

   if (by_col == null) {
    by_col = "FALSE"
  }

  const byCol = utils.parseBool(by_col)
  if (typeof byCol !== 'boolean') {
    return utils.addEmptyValuesToArray([[error.value]], arrayWidth, arrayHeight)
  }

  if (sort_index == null) {
    sort_index = 1
  }

  if (typeof sort_index !== 'number') {
    return utils.addEmptyValuesToArray([[error.value]], arrayWidth, arrayHeight)
  }

  if (sort_index < 1) {
    return utils.addEmptyValuesToArray([[error.value]], arrayWidth, arrayHeight)
  }

  if (byCol && sort_index > arrayHeight) {
    return utils.addEmptyValuesToArray([[error.value]], arrayWidth, arrayHeight)
  }

  if (!byCol && sort_index > arrayWidth) {
    return utils.addEmptyValuesToArray([[error.value]], arrayWidth, arrayHeight)
  }

  if (sort_order == null) {
    sort_order = 1
  }

  if (sort_order !== 1 && sort_order !== -1) {
    return utils.addEmptyValuesToArray([[error.value]], arrayWidth, arrayHeight)
  }

  let result = []
  if (byCol) {
    let columns = []
    for (let i = 0; i < arrayWidth; i++) {
      const column = []
      for (let j = 0; j < arrayHeight; j++) {
        column.push(array[j][i])
      }
      columns.push(column)
    }

    const sortedColumns = columns.sort((a, b) => {
      // NOTE: Excel sorts all values as strings, e.g. 1 => "1"
      if (a[sort_index - 1].toString() < b[sort_index - 1].toString()) {
        return -1 * sort_order
      }

      if (a[sort_index - 1].toString() > b[sort_index - 1].toString()) {
        return 1 * sort_order
      }

      return 0
    })

    for (let i = 0; i < arrayHeight; i++) {
      const row = []
      for (let j = 0; j < arrayWidth; j++) {
        row.push(sortedColumns[j][i])
      }

      result.push(row)
    }
  } else {
    result = array.sort((a, b) => {
      // NOTE: Excel sorts all values as strings, e.g. 1 => "1"
      if (a[sort_index - 1].toString() < b[sort_index - 1].toString()) {
        return -1 * sort_order
      }

      if (a[sort_index - 1].toString() > b[sort_index - 1].toString()) {
        return 1 * sort_order
      }

      return 0
    })
  }

  // replace empty strings with zeros
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].length; j++) {
      if (result[i][j] === '') {
        result[i][j] = 0
      }
    }
  }

  return result
}
