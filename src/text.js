import * as error from './utils/error.js'
import * as utils from './utils/common.js'

// TODO
export function ASC() {
  throw new Error('ASC is not implemented')
}

// TODO
export function BAHTTEXT() {
  throw new Error('BAHTTEXT is not implemented')
}

export function CHAR(number) {
  number = utils.parseNumber(number)

  if (number === 0) {
    return error.value
  }

  if (number instanceof Error) {
    return number
  }

  return String.fromCharCode(number)
}

export function CLEAN(text) {
  if (utils.anyIsError(text)) {
    return text
  }

  text = text || ''
  const re = /[\0-\x1F]/g

  return text.replace(re, '')
}

export function CODE(text) {
  if (utils.anyIsError(text)) {
    return text
  }

  text = text || ''
  let result = text.charCodeAt(0)

  if (isNaN(result)) {
    result = error.value
  }

  return result
}

export function CONCATENATE() {
  const args = utils.flatten(arguments)
  const someError = utils.anyError.apply(undefined, args)

  if (someError) {
    return someError
  }

  let trueFound = 0

  while ((trueFound = args.indexOf(true)) > -1) {
    args[trueFound] = 'TRUE'
  }

  let falseFound = 0

  while ((falseFound = args.indexOf(false)) > -1) {
    args[falseFound] = 'FALSE'
  }

  return args.join('')
}

export const CONCAT = CONCATENATE

// TODO
export function DBCS() {
  throw new Error('DBCS is not implemented')
}

// TODO
export function DOLLAR() {
  throw new Error('DOLLAR is not implemented')
}

export function EXACT(text1, text2) {
  if (arguments.length !== 2) {
    return error.na
  }

  const someError = utils.anyError(text1, text2)

  if (someError) {
    return someError
  }

  text1 = utils.parseString(text1)
  text2 = utils.parseString(text2)

  return text1 === text2
}

export function FIND(find_text, within_text, position) {
  if (arguments.length < 2) {
    return error.na
  }

  find_text = utils.parseString(find_text)
  within_text = utils.parseString(within_text)
  position = position === undefined ? 0 : position
  const found_index = within_text.indexOf(find_text, position - 1)

  if (found_index === -1) {
    return error.value
  }

  return found_index + 1
}

// TODO
export function FIXED() {
  throw new Error('FIXED is not implemented')
}

export function HTML2TEXT(value) {
  if (utils.anyIsError(value)) {
    return value
  }

  let result = ''

  if (value) {
    if (value instanceof Array) {
      value.forEach((line) => {
        if (result !== '') {
          result += '\n'
        }

        result += line.replace(/<(?:.|\n)*?>/gm, '')
      })
    } else {
      result = value.replace(/<(?:.|\n)*?>/gm, '')
    }
  }

  return result
}

export function LEFT(text, number) {
  const someError = utils.anyError(text, number)

  if (someError) {
    return someError
  }

  text = utils.parseString(text)
  number = number === undefined ? 1 : number
  number = utils.parseNumber(number)

  if (number instanceof Error || typeof text !== 'string') {
    return error.value
  }

  return text.substring(0, number)
}

export function LEN(text) {
  if (arguments.length === 0) {
    return error.error
  }

  if (text instanceof Error) {
    return text
  }

  if (Array.isArray(text)) {
    return error.value
  }

  const textAsString = utils.parseString(text)

  return textAsString.length
}

export function LOWER(text) {
  if (arguments.length !== 1) {
    return error.value
  }

  text = utils.parseString(text)

  if (utils.anyIsError(text)) {
    return text
  }

  return text.toLowerCase()
}

export function MID(text, start, number) {
  if (start === undefined || start === null) {
    return error.value
  }

  start = utils.parseNumber(start)
  number = utils.parseNumber(number)

  if (utils.anyIsError(start, number) || typeof text !== 'string') {
    return number
  }

  const begin = start - 1
  const end = begin + number

  return text.substring(begin, end)
}

// TODO
export function NUMBERVALUE(text, decimal_separator, group_separator) {
  decimal_separator = typeof decimal_separator === 'undefined' ? '.' : decimal_separator
  group_separator = typeof group_separator === 'undefined' ? ',' : group_separator

  return Number(text.replace(decimal_separator, '.').replace(group_separator, ''))
}

// TODO
export function PRONETIC() {
  throw new Error('PRONETIC is not implemented')
}

export function PROPER(text) {
  if (utils.anyIsError(text)) {
    return text
  }

  if (isNaN(text) && typeof text === 'number') {
    return error.value
  }

  text = utils.parseString(text)

  return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

export function REGEXEXTRACT(text, regular_expression) {
  if (arguments.length < 2) {
    return error.na
  }

  const match = text.match(new RegExp(regular_expression))

  return match ? match[match.length > 1 ? match.length - 1 : 0] : null
}

export function REGEXMATCH(text, regular_expression, full) {
  if (arguments.length < 2) {
    return error.na
  }

  const match = text.match(new RegExp(regular_expression))

  return full ? match : !!match
}

export function REGEXREPLACE(text, regular_expression, replacement) {
  if (arguments.length < 3) {
    return error.na
  }

  return text.replace(new RegExp(regular_expression), replacement)
}

export function REPLACE(text, position, length, new_text) {
  position = utils.parseNumber(position)
  length = utils.parseNumber(length)

  if (utils.anyIsError(position, length) || typeof text !== 'string' || typeof new_text !== 'string') {
    return error.value
  }

  return text.substr(0, position - 1) + new_text + text.substr(position - 1 + length)
}

export function REPT(text, number) {
  const someError = utils.anyError(text, number)

  if (someError) {
    return someError
  }

  text = utils.parseString(text)
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return new Array(number + 1).join(text)
}

export function RIGHT(text, number) {
  const someError = utils.anyError(text, number)

  if (someError) {
    return someError
  }

  text = utils.parseString(text)
  number = number === undefined ? 1 : number
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return text.substring(text.length - number)
}

export function SEARCH(find_text, within_text, position) {
  let foundAt

  if (typeof find_text !== 'string' || typeof within_text !== 'string') {
    return error.value
  }

  position = position === undefined ? 0 : position
  foundAt = within_text.toLowerCase().indexOf(find_text.toLowerCase(), position - 1) + 1

  return foundAt === 0 ? error.value : foundAt
}

export function SPLIT(text, separator) {
  return text.split(separator)
}

export function SUBSTITUTE(text, old_text, new_text, occurrence) {
  if (arguments.length < 3) {
    return error.na
  }

  if (!text || !old_text) {
    return text
  } else if (occurrence === undefined) {
    return text.split(old_text).join(new_text)
  } else {
    occurrence = Math.floor(Number(occurrence))

    if (Number.isNaN(occurrence) || occurrence <= 0) {
      return error.value
    }

    let index = 0
    let i = 0

    while (index > -1 && text.indexOf(old_text, index) > -1) {
      index = text.indexOf(old_text, index + 1)
      i++

      if (index > -1 && i === occurrence) {
        return text.substring(0, index) + new_text + text.substring(index + old_text.length)
      }
    }

    return text
  }
}

export function T(value) {
  if (value instanceof Error) {
    return value
  }

  return typeof value === 'string' ? value : ''
}

// TODO incomplete implementation
export function TEXT() {
  throw new Error('TEXT is not implemented')
}

export function TEXTJOIN(delimiter, ignore_empty, ...args) {
  if (typeof ignore_empty !== 'boolean') {
    ignore_empty = utils.parseBool(ignore_empty)
  }

  if (arguments.length < 3) {
    return error.na
  }

  delimiter = delimiter !== null && delimiter !== undefined ? delimiter : ''

  let flatArgs = utils.flatten(args)
  let textToJoin = ignore_empty ? flatArgs.filter((text) => text) : flatArgs

  if (Array.isArray(delimiter)) {
    delimiter = utils.flatten(delimiter)

    let chunks = textToJoin.map((item) => [item])
    let index = 0

    for (let i = 0; i < chunks.length - 1; i++) {
      chunks[i].push(delimiter[index])
      index++

      if (index === delimiter.length) {
        index = 0
      }
    }

    textToJoin = utils.flatten(chunks)

    return textToJoin.join('')
  }

  return textToJoin.join(delimiter)
}

export function TRIM(text) {
  text = utils.parseString(text)

  if (text instanceof Error) {
    return text
  }

  return text.replace(/\s+/g, ' ').trim()
}

export const UNICHAR = CHAR

export const UNICODE = CODE

export function UPPER(text) {
  text = utils.parseString(text)

  if (text instanceof Error) {
    return text
  }

  return text.toUpperCase()
}

export function VALUE(num) {
  const anyError = utils.anyError(num)

  if (anyError) {
    return anyError
  }

  if (typeof num === 'number') {
    return num
  }

  if (typeof num !== 'string') {
    return error.value
  }

  const isPercent = /(%)$/.test(num) || /^(%)/.test(num)
  num = num.replace(/^[^0-9-]{0,3}/, '')
  num = num.replace(/[^0-9]{0,3}$/, '')
  num = num.replace(/[ ,]/g, '')

  if (num === '') {
    return error.value
  }

  let output = Number(num)

  if (isNaN(output)) {
    return error.value
  }

  output = output || 0

  if (isPercent) {
    output = output * 0.01
  }

  return output
}
