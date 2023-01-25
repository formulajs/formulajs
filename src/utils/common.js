import * as error from './error.js'

// Arrays
export function argsToArray(args) {
  const result = []

  arrayEach(args, (value) => {
    result.push(value)
  })

  return result
}

export function arrayEach(array, iteratee) {
  let index = -1
  const length = array.length

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break
    }
  }

  return array
}

export function arrayValuesToNumbers(arr) {
  let n = arr.length
  let el

  while (n--) {
    el = arr[n]

    if (typeof el === 'number') {
      continue
    }

    if (el === true) {
      arr[n] = 1
      continue
    }

    if (el === false) {
      arr[n] = 0
      continue
    }

    if (typeof el === 'string') {
      const number = parseNumber(el)

      arr[n] = number instanceof Error ? 0 : number
    }
  }

  return arr
}

export function fillMatrix(matrix, fill_value) {
  if (!matrix) {
    return error.value
  }

  if (!matrix.every((el) => Array.isArray(el)) || matrix.length === 0) {
    matrix = [[...matrix]]
  }

  matrix.map((arr, i) => {
    arr.map((a, j) => {
      if (!a) {
        matrix[i][j] = 0
      }
    })
  })

  const longestArrayIndex = matrix.reduce((acc, arr, i) => (arr.length > matrix[acc].length ? i : acc), 0)
  const longestArrayLength = matrix[longestArrayIndex].length

  return matrix.map((el) => [...el, ...Array(longestArrayLength - el.length).fill(fill_value ? fill_value : 0)])
}

export function flatten() {
  let result

  if (arguments.length === 1) {
    const argument = arguments[0]
    result = isArrayLike(argument) ? argsToArray.apply(null, arguments) : [argument]
  } else {
    result = Array.from(arguments)
  }

  while (!isFlat(result)) {
    result = flattenShallow(result)
  }

  return result
}

export function flattenShallow(array) {
  if (!array || !array.reduce) {
    return [array]
  }

  return array.reduce((a, b) => {
    const aIsArray = Array.isArray(a)
    const bIsArray = Array.isArray(b)

    if (aIsArray && bIsArray) {
      return a.concat(b)
    }

    if (aIsArray) {
      a.push(b)

      return a
    }

    if (bIsArray) {
      return [a].concat(b)
    }

    return [a, b]
  })
}

export function initial(array, idx) {
  idx = idx || 1

  if (!array || typeof array.slice !== 'function') {
    return array
  }

  return array.slice(0, array.length - idx)
}

export function isArrayLike(a) {
  return a != null && typeof a.length === 'number' && typeof a !== 'string'
}

export function isFlat(array) {
  if (!array) {
    return false
  }

  for (let i = 0; i < array.length; ++i) {
    if (Array.isArray(array[i])) {
      return false
    }
  }

  return true
}

export function rest(array, idx) {
  idx = idx || 1

  if (!array || typeof array.slice !== 'function') {
    return array
  }

  return array.slice(idx)
}

export function transpose(matrix) {
  if (!matrix) {
    return error.value
  }

  return matrix[0].map((col, i) => matrix.map((row) => row[i]))
}

// Databases
export function findField(database, title) {
  let index = null

  arrayEach(database, (value, i) => {
    if (value[0] === title) {
      index = i

      return false
    }
  })

  // Return error if the input field title is incorrect
  if (index == null) {
    return error.value
  }

  return index
}

// Errors
export function anyError() {
  for (let n = 0; n < arguments.length; n++) {
    if (arguments[n] instanceof Error) {
      return arguments[n]
    }
  }

  return undefined
}

export function anyIsError() {
  let n = arguments.length

  while (n--) {
    if (arguments[n] instanceof Error) {
      return true
    }
  }

  return false
}

// Numbers
export function cleanFloat(number) {
  const power = 1e14

  return Math.round(number * power) / power
}

export function numbers() {
  const possibleNumbers = flatten.apply(null, arguments)

  return possibleNumbers.filter((el) => typeof el === 'number')
}

export function serialNumberToDate(serial) {
  if (serial < 60) {
    serial += 1
  }

  const utc_days = Math.floor(serial - 25569)
  const utc_value = utc_days * 86400
  const date_info = new Date(utc_value * 1000)
  const fractional_day = serial - Math.floor(serial) + 0.0000001

  let total_seconds = Math.floor(86400 * fractional_day)

  const seconds = total_seconds % 60

  total_seconds -= seconds

  const hours = Math.floor(total_seconds / (60 * 60))
  const minutes = Math.floor(total_seconds / 60) % 60
  let days = date_info.getUTCDate()
  let month = date_info.getUTCMonth()

  if (serial >= 60 && serial < 61) {
    days = 29
    month = 1
  }

  return new Date(date_info.getUTCFullYear(), month, days, hours, minutes, seconds)
}

// Parsers
export function parseBool(bool) {
  if (typeof bool === 'boolean') {
    return bool
  }

  if (bool instanceof Error) {
    return bool
  }

  if (typeof bool === 'number') {
    return bool !== 0
  }

  if (typeof bool === 'string') {
    const up = bool.toUpperCase()

    if (up === 'TRUE') {
      return true
    }

    if (up === 'FALSE') {
      return false
    }
  }

  if (bool instanceof Date && !isNaN(bool)) {
    return true
  }

  return error.value
}

export function parseDate(date) {
  if (!isNaN(date)) {
    if (date instanceof Date) {
      return new Date(date)
    }

    const d = parseFloat(date)

    if (d < 0 || d >= 2958466) {
      return error.num
    }

    return serialNumberToDate(d)
  }

  if (typeof date === 'string') {
    date = /(\d{4})-(\d\d?)-(\d\d?)$/.test(date) ? new Date(date + 'T00:00:00.000') : new Date(date)

    if (!isNaN(date)) {
      return date
    }
  }

  return error.value
}

export function parseDateArray(arr) {
  let len = arr.length
  let parsed

  while (len--) {
    parsed = parseDate(arr[len])

    if (parsed === error.value) {
      return parsed
    }

    arr[len] = parsed
  }

  return arr
}

export function parseMatrix(matrix) {
  if (!matrix || (matrix.length && matrix.length === 0)) {
    return error.value
  }

  let pnarr

  for (let i = 0; i < matrix.length; i++) {
    pnarr = parseNumberArray(matrix[i])
    matrix[i] = pnarr

    if (pnarr instanceof Error) {
      return pnarr
    }
  }

  return matrix
}

export function parseNumber(string) {
  if (string instanceof Error) {
    return string
  }

  if (string === undefined || string === null) {
    return 0
  }

  if (typeof string === 'boolean') {
    string = +string
  }

  if (!isNaN(string) && string !== '') {
    return parseFloat(string)
  }

  return error.value
}

export function parseNumberArray(arr) {
  let len

  if (!arr || (len = arr.length) === 0) {
    return error.value
  }

  let parsed

  while (len--) {
    if (arr[len] instanceof Error) {
      return arr[len]
    }

    parsed = parseNumber(arr[len])

    if (parsed instanceof Error) {
      return parsed
    }

    arr[len] = parsed
  }

  return arr
}

export function parseString(string) {
  if (string instanceof Error) {
    return string
  }

  if (string === undefined || string === null) {
    return ''
  }

  return string.toString()
}

// Strings
export function anyIsString() {
  let n = arguments.length

  while (n--) {
    if (typeof arguments[n] === 'string') {
      return true
    }
  }

  return false
}

// Misc
export function isDefined(arg) {
  return arg !== undefined && arg !== null
}
