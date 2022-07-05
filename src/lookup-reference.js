import * as error from './utils/error.js'
import * as utils from './utils/common.js'

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

export function HLOOKUP(lookup_value, table_array, row_index_num, range_lookup) {
  return VLOOKUP(lookup_value, utils.transpose(table_array), row_index_num, range_lookup)
}

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
