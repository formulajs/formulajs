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

  const newArray = []

  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      for (let j = 0; j < array[i].length; j++) {
        newArray.push(array[i][j])
      }
    } else {
      newArray.push(array[i])
    }
  }

  return newArray
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

export const millisecondsPerDay = 86400000

const excelInitialTime = Date.UTC(1900, 0, 0)

// !IMPORTANT!
// Excel incorrectly considers 1900 to be a leap year
const excelLeapYearBug = Date.UTC(1900, 1, 29)

export function serialNumberToDate(serial) {
  let jsDateInMilliseconds = excelInitialTime + serial * millisecondsPerDay

  if (jsDateInMilliseconds >= excelLeapYearBug + millisecondsPerDay) {
    jsDateInMilliseconds -= millisecondsPerDay
  }

  return new Date(jsDateInMilliseconds)
}

export const dateToSerialNumber = function (jsDate) {
  let jsDateInMilliseconds = jsDate.getTime()

  if (jsDateInMilliseconds >= excelLeapYearBug) {
    jsDateInMilliseconds += millisecondsPerDay
  }

  jsDateInMilliseconds -= excelInitialTime

  return jsDateInMilliseconds / millisecondsPerDay
}

// Parsers
export function parseBool(bool) {
  const type = typeof bool

  if (type === 'boolean' || bool instanceof Error) {
    return bool
  }

  if (bool === null) {
    return false
  }

  if (type === 'number') {
    return bool !== 0
  }

  if (type === 'string') {
    const up = bool.toUpperCase()

    if (up === 'TRUE') {
      return true
    }

    if (up === 'FALSE') {
      return false
    }
  }

  if (bool instanceof Date) {
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
    date = new Date(date)

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

export function anyIsNull() {
  let n = arguments.length

  while (n--) {
    if (arguments[n] === null) {
      return true
    }
  }

  return false
}

export function anyIsUndefined() {
  let n = arguments.length

  while (n--) {
    if (arguments[n] === undefined) {
      return true
    }
  }

  return false
}

// Misc
export function isDefined(arg) {
  return arg !== undefined && arg !== null
}

export const isDigit = (text) => {
  return text >= '0' && text <= '9'
}

export const isValidNumber = (text, allowSignal) => {
  let startOfNumber = 0

  if (allowSignal && (text[0] === '-' || text[0] === '+')) {
    startOfNumber++
  }

  const textLength = text.length

  if (startOfNumber === textLength) {
    return false
  }

  let passedThePoint = false

  for (let index = startOfNumber; index < textLength; index++) {
    if (!isDigit(text[index])) {
      if (!passedThePoint && text[index] === '.' && index > startOfNumber && index < textLength - 1) {
        passedThePoint = true

        continue
      }

      return false
    }
  }

  return true
}

export function getNumber(something) {
  if (something instanceof Date) {
    return dateToSerialNumber(something)
  }

  var type = typeof something
  if (type === 'number') {
    return something
  }
  if (type === 'boolean') {
    return +something
  }
  if (type === 'string') {
    const trimmed = something.trim()
    if (isValidNumber(trimmed, true)) {
      return parseFloat(trimmed)
    }

    const date = new Date(something)
    if (!Number.isNaN(date.getTime())) {
      return dateToSerialNumber(date)
    }

    const hour = hourToNumber(something)
    if (hour !== null) {
      return hour
    }

    return something
  }
  if (something === null) {
    return 0
  }

  return something
}

const hourRegex = /^(\d{2}):(\d{2})(?:(?::(\d{2}))|((?: AM)|(?: PM)))?$/

export const hourToNumber = function (something) {
  const pieces = hourRegex.exec(something)

  if (!hourRegex.test(something)) {
    return null
  }

  // Hours
  let hours = parseInt(pieces[1])
  if (pieces[4]) {
    if (hours < 1 || hours > 12) {
      return something
    }

    if (pieces[4] === ' PM' && hours < 12) {
      hours += 12
    } else if (pieces[4] === ' AM' && hours === 12) {
      hours = 0
    }
  } else if (hours < 0 || hours > 23) {
    return something
  }

  let milliseconds = 0
  milliseconds += hours * 3600000

  // Minutes
  milliseconds += parseInt(pieces[2]) * 60000

  // Seconds
  if (pieces[3]) {
    milliseconds += parseInt(pieces[3]) * 1000
  }

  return milliseconds / millisecondsPerDay
}

export function getHour(something) {
  if (typeof something === 'string') {
    const hour = hourToNumber(something)

    if (hour !== null) {
      return hour
    }
  }

  something = getNumber(something)
  if (typeof something === 'number' && something >= 0) {
    return something % 1
  }
  return something
}
