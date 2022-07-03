import * as error from './utils/error.js'
import * as utils from './utils/common.js'

/**
 * Looks up values in a reference or array.
 *
 * Category: Lookup and reference
 *
 * @param {*} lookup_value The value that you want to match in lookup_array. For example, when you look up someone's number in a telephone book, you are using the person's name as the lookup value, but the telephone number is the value you want.The lookup_value argument can be a value (number, text, or logical value) or a cell reference to a number, text, or logical value.
 * @param {*} lookup_array The range of cells being searched.
 * @param {*} match_type Optional. The number -1, 0, or 1. The match_type argument specifies how Excel matches lookup_value with values in lookup_array. The default value for this argument is 1.The following table describes how the function finds values based on the setting of the match_type argument.
 * @param {*} match returns the position of the matched value within lookup_array, not the value itself. For example, MATCH("b",{"a","b","c"},0) returns 2, which is the relative position of "b" within the array {"a","b","c"}.
 * @param {*} match does not distinguish between uppercase and lowercase letters when matching text values.
 * @param {*} if MATCH is unsuccessful in finding a match, it returns the #N/A error value.
 * @param {*} if match_type is 0 and lookup_value is a text string, you can use the wildcard characters — the question mark (?) and asterisk (*) — in the lookup_value argument. A question mark matches any single character; an asterisk matches any sequence of characters. If you want to find an actual question mark or asterisk, type a tilde (~) before the character.
 * @returns
 */
export function MATCH(lookupValue, lookupArray, matchType) {
  if (!lookupValue && !lookupArray) {
    return error.na
  }

  if (arguments.length === 2) {
    matchType = 1
  }

  if (!(lookupArray instanceof Array)) {
    return error.na
  }

  lookupArray = utils.flatten(lookupArray)

  if (matchType !== -1 && matchType !== 0 && matchType !== 1) {
    return error.na
  }

  let index
  let indexValue

  for (let idx = 0; idx < lookupArray.length; idx++) {
    if (matchType === 1) {
      if (lookupArray[idx] === lookupValue) {
        return idx + 1
      } else if (lookupArray[idx] < lookupValue) {
        if (!indexValue) {
          index = idx + 1
          indexValue = lookupArray[idx]
        } else if (lookupArray[idx] > indexValue) {
          index = idx + 1
          indexValue = lookupArray[idx]
        }
      }
    } else if (matchType === 0) {
      if (typeof lookupValue === 'string') {
        lookupValue = lookupValue.replace(/\?/g, '.')

        if (lookupArray[idx].toLowerCase().match(lookupValue.toLowerCase())) {
          return idx + 1
        }
      } else {
        if (lookupArray[idx] === lookupValue) {
          return idx + 1
        }
      }
    } else if (matchType === -1) {
      if (lookupArray[idx] === lookupValue) {
        return idx + 1
      } else if (lookupArray[idx] > lookupValue) {
        if (!indexValue) {
          index = idx + 1
          indexValue = lookupArray[idx]
        } else if (lookupArray[idx] < indexValue) {
          index = idx + 1
          indexValue = lookupArray[idx]
        }
      }
    }
  }

  return index || error.na
}

/**
 * Looks in the first column of an array and moves across the row to return the value of a cell.
 *
 * Category: Lookup and reference
 *
 * @returns
 */
export function VLOOKUP(needle, table, index, rangeLookup) {
  if (!table || !index) {
    return error.na
  }

  rangeLookup = !(rangeLookup === 0 || rangeLookup === false)
  let result = error.na
  const isNumberLookup = typeof needle === 'number'
  let exactMatchOnly = false

  for (let i = 0; i < table.length; i++) {
    const row = table[i]

    if (row[0] === needle) {
      result = index < row.length + 1 ? row[index - 1] : error.ref
      break
    } else if (
      !exactMatchOnly &&
      ((isNumberLookup && rangeLookup && row[0] <= needle) ||
        (rangeLookup && typeof row[0] === 'string' && row[0].localeCompare(needle) < 0))
    ) {
      result = index < row.length + 1 ? row[index - 1] : error.ref
    }

    if (isNumberLookup && row[0] > needle) {
      exactMatchOnly = true
    }
  }

  return result
}

/**
 * Looks in the top row of an array and returns the value of the indicated cell.
 *
 * Category: Lookup and reference
 *
 * @param {*} lookup_value The value to be found in the first row of the table. Lookup_value can be a value, a reference, or a text string.
 * @param {*} table_array A table of information in which data is looked up. Use a reference to a range or a range name. The values in the first row of table_array can be text, numbers, or logical values. If range_lookup is TRUE, the values in the first row of table_array must be placed in ascending order: ...-2, -1, 0, 1, 2,... , A-Z, FALSE, TRUE; otherwise, HLOOKUP may not give the correct value. If range_lookup is FALSE, table_array does not need to be sorted. Uppercase and lowercase text are equivalent. Sort the values in ascending order, left to right. For more information, see Sort data in a range or table.
 * @param {*} the values in the first row of table_array can be text, numbers, or logical values.
 * @param {*} if range_lookup is TRUE, the values in the first row of table_array must be placed in ascending order: ...-2, -1, 0, 1, 2,... , A-Z, FALSE, TRUE; otherwise, HLOOKUP may not give the correct value. If range_lookup is FALSE, table_array does not need to be sorted.
 * @param {*} uppercase and lowercase text are equivalent.
 * @param {*} sort the values in ascending order, left to right. For more information, see Sort data in a range or table.
 * @param {*} row_index_num The row number in table_array from which the matching value will be returned. A row_index_num of 1 returns the first row value in table_array, a row_index_num of 2 returns the second row value in table_array, and so on. If row_index_num is less than 1, HLOOKUP returns the #VALUE! error value; if row_index_num is greater than the number of rows on table_array, HLOOKUP returns the #REF! error value.
 * @param {*} range_lookup Optional. A logical value that specifies whether you want HLOOKUP to find an exact match or an approximate match. If TRUE or omitted, an approximate match is returned. In other words, if an exact match is not found, the next largest value that is less than lookup_value is returned. If FALSE, HLOOKUP will find an exact match. If one is not found, the error value #N/A is returned.
 * @returns
 */
export function HLOOKUP(needle, table, index, rangeLookup) {
  return VLOOKUP(needle, utils.transpose(table), index, rangeLookup)
}

/**
 * Looks up values in a vector or array.
 *
 * Category: Lookup and reference
 *
 * @param {*} lookup_value A value that LOOKUP searches for in the first vector. Lookup_value can be a number, text, a logical value, or a name or reference that refers to a value.
 * @param {*} lookup_vector A range that contains only one row or one column. The values in lookup_vector can be text, numbers, or logical values. Important: The values in lookup_vector must be placed in ascending order: ..., -2, -1, 0, 1, 2, ..., A-Z, FALSE, TRUE; otherwise, LOOKUP might not return the correct value. Uppercase and lowercase text are equivalent.
 * @param {*} result_vector Optional. A range that contains only one row or column. The result_vector argument must be the same size as lookup_vector. It has to be the same size.
 * @param {*} lookup_value A value that LOOKUP searches for in an array. The lookup_value argument can be a number, text, a logical value, or a name or reference that refers to a value. If LOOKUP can't find the value of lookup_value, it uses the largest value in the array that is less than or equal to lookup_value. If the value of lookup_value is smaller than the smallest value in the first row or column (depending on the array dimensions), LOOKUP returns the #N/A error value.
 * @param {*} if LOOKUP can't find the value of lookup_value, it uses the largest value in the array that is less than or equal to lookup_value.
 * @param {*} if the value of lookup_value is smaller than the smallest value in the first row or column (depending on the array dimensions), LOOKUP returns the #N/A error value.
 * @param {*} array A range of cells that contains text, numbers, or logical values that you want to compare with lookup_value. The array form of LOOKUP is very similar to the HLOOKUP and VLOOKUP functions. The difference is that HLOOKUP searches for the value of lookup_value in the first row, VLOOKUP searches in the first column, and LOOKUP searches according to the dimensions of array. If array covers an area that is wider than it is tall (more columns than rows), LOOKUP searches for the value of lookup_value in the first row. If an array is square or is taller than it is wide (more rows than columns), LOOKUP searches in the first column. With the HLOOKUP and VLOOKUP functions, you can index down or across, but LOOKUP always selects the last value in the row or column. Important: The values in array must be placed in ascending order: ..., -2, -1, 0, 1, 2, ..., A-Z, FALSE, TRUE; otherwise, LOOKUP might not return the correct value. Uppercase and lowercase text are equivalent.
 * @param {*} if array covers an area that is wider than it is tall (more columns than rows), LOOKUP searches for the value of lookup_value in the first row.
 * @param {*} if an array is square or is taller than it is wide (more rows than columns), LOOKUP searches in the first column.
 * @param {*} with the HLOOKUP and VLOOKUP functions, you can index down or across, but LOOKUP always selects the last value in the row or column. Important: The values in array must be placed in ascending order: ..., -2, -1, 0, 1, 2, ..., A-Z, FALSE, TRUE; otherwise, LOOKUP might not return the correct value. Uppercase and lowercase text are equivalent.
 * @returns
 */
export function LOOKUP(searchCriterion, array, resultArray) {
  array = utils.flatten(array)
  resultArray = resultArray ? utils.flatten(resultArray) : array

  const isNumberLookup = typeof searchCriterion === 'number'
  let result = error.na

  for (let i = 0; i < array.length; i++) {
    if (array[i] === searchCriterion) {
      return resultArray[i]
    } else if (
      (isNumberLookup && array[i] <= searchCriterion) ||
      (typeof array[i] === 'string' && array[i].localeCompare(searchCriterion) < 0)
    ) {
      result = resultArray[i]
    } else if (isNumberLookup && array[i] > searchCriterion) {
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
 * @param {*} array A range of cells or an array constant. If array contains only one row or column, the corresponding row_num or column_num argument is optional. If array has more than one row and more than one column, and only row_num or column_num is used, INDEX returns an array of the entire row or column in array.
 * @param {*} if array contains only one row or column, the corresponding row_num or column_num argument is optional.
 * @param {*} if array has more than one row and more than one column, and only row_num or column_num is used, INDEX returns an array of the entire row or column in array.
 * @param {*} row_num Required, unless column_num is present. Selects the row in array from which to return a value. If row_num is omitted, column_num is required.
 * @param {*} column_num Optional. Selects the column in array from which to return a value. If column_num is omitted, row_num is required.
 * @param {*} reference A reference to one or more cell ranges. If you are entering a non-adjacent range for the reference, enclose reference in parentheses. If each area in reference contains only one row or column, the row_num or column_num argument, respectively, is optional. For example, for a single row reference, use INDEX(reference,,column_num).
 * @param {*} if you are entering a non-adjacent range for the reference, enclose reference in parentheses.
 * @param {*} if each area in reference contains only one row or column, the row_num or column_num argument, respectively, is optional. For example, for a single row reference, use INDEX(reference,,column_num).
 * @param {*} row_num The number of the row in reference from which to return a reference.
 * @param {*} column_num Optional. The number of the column in reference from which to return a reference.
 * @param {*} area_num Optional. Selects a range in reference from which to return the intersection of row_num and column_num. The first area selected or entered is numbered 1, the second is 2, and so on. If area_num is omitted, INDEX uses area 1. The areas listed here must all be located on one sheet. If you specify areas that are not on the same sheet as each other, it will cause a #VALUE! error. If you need to use ranges that are located on different sheets from each other, it is recommended that you use the array form of the INDEX function, and use another function to calculate the range that makes up the array. For example, you could use the CHOOSE function to calculate which range will be used.
 * @returns
 */
export function INDEX(cellRange, rowNumber, columnNumber) {
  const someError = utils.anyError(cellRange, rowNumber, columnNumber)

  if (someError) {
    return someError
  }

  if (!Array.isArray(cellRange)) {
    return error.value
  }

  const isOneDimensionRange = cellRange.length > 0 && !Array.isArray(cellRange[0])

  if (isOneDimensionRange && !columnNumber) {
    columnNumber = rowNumber
    rowNumber = 1
  } else {
    columnNumber = columnNumber || 1
    rowNumber = rowNumber || 1
  }

  if (columnNumber < 0 || rowNumber < 0) {
    return error.value
  }

  if (isOneDimensionRange && rowNumber === 1 && columnNumber <= cellRange.length) {
    return cellRange[columnNumber - 1]
  } else if (rowNumber <= cellRange.length && columnNumber <= cellRange[rowNumber - 1].length) {
    return cellRange[rowNumber - 1][columnNumber - 1]
  }

  return error.ref
}
