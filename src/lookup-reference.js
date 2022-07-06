import * as error from './utils/error.js'
import * as utils from './utils/common.js'

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
        lookup_value = lookup_value.replace(/\?/g, '.')

        if (lookup_array[idx].toLowerCase().match(lookup_value.toLowerCase())) {
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
