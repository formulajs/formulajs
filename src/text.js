import * as error from './utils/error.js'
import * as utils from './utils/common.js'
import { ROUND } from './math-trig.js'

/**
 * Returns the character specified by the code number.
 *
 * Category: Text
 *
 * @param {*} number A number between 1 and 255 specifying which character you want. The character is from the character set used by your computer. Note: Excel for the web supports only CHAR(9), CHAR(10), CHAR(13), and CHAR(32) and above.
 * @returns
 */
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

/**
 * Removes all nonprintable characters from text.
 *
 * Category: Text
 *
 * @param {*} text Any worksheet information from which you want to remove nonprintable characters.
 * @returns
 */
export function CLEAN(text) {
  if (utils.anyIsError(text)) {
    return text
  }

  text = text || ''
  const re = /[\0-\x1F]/g

  return text.replace(re, '')
}

/**
 * Returns a numeric code for the first character in a text string.
 *
 * Category: Text
 *
 * @param {*} text The text for which you want the code of the first character.
 * @returns
 */
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

/**
 * Joins several text items into one text item.
 *
 * Category: Text
 *
 * @returns
 */
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

/**
 * Converts a number to text, using the $ (dollar) currency format.
 *
 * Category: Text
 *
 * @param {*} number A number, a reference to a value containing a number, or a formula that evaluates to a number.
 * @param {*} [decimals] Optional. The number of digits to the right of the decimal point. If this is negative, the number is rounded to the left of the decimal point. If you omit decimals, it is assumed to be 2.
 * @returns
 */
export function DOLLAR(number, decimals = 2) {
  number = utils.parseNumber(number)
  if (isNaN(number)) {
    return error.value
  }

  number = ROUND(number, decimals)

  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals >= 0 ? decimals : 0,
    maximumFractionDigits: decimals >= 0 ? decimals : 0
  }

  const formattedNumber = number.toLocaleString('en-US', options)

  if (number < 0) {
    return '$(' + formattedNumber.slice(2) + ')'
  }

  return formattedNumber
}

/**
 * Checks to see if two text values are identical.
 *
 * Category: Text
 *
 * @param {*} text1 The first text string.
 * @param {*} text2 The second text string.
 * @returns
 */
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

/**
 * Locate one text string within a second text string, and return the number of the starting position of the first text string from the first character of the second text string.
 *
 * Category: Text
 *
 * @param {*} find_text The text you want to find.
 * @param {*} within_text The text containing the text you want to find.
 * @param {*} [start_num] Optional. Specifies the character at which to start the search. The first character in within_text is character number 1. If you omit start_num, it is assumed to be 1.
 * @returns
 */
export function FIND(find_text, within_text, start_num) {
  if (arguments.length < 2) {
    return error.na
  }

  find_text = utils.parseString(find_text)
  within_text = utils.parseString(within_text)
  start_num = start_num === undefined ? 0 : start_num
  const found_index = within_text.indexOf(find_text, start_num - 1)

  if (found_index === -1) {
    return error.value
  }

  return found_index + 1
}

/**
 * Formats a number as text with a fixed number of decimals.
 *
 * Category: Text
 *
 * @param {*} number The number you want to round and convert to text.
 * @param {*} [decimals] Optional. The number of digits to the right of the decimal point.
 * @param {*} [no_commas] Optional. A logical value that, if TRUE, prevents FIXED from including commas in the returned text.
 * @returns
 */
export function FIXED(number, decimals = 2, no_commas = false) {
  number = utils.parseNumber(number)
  if (isNaN(number)) {
    return error.value
  }

  decimals = utils.parseNumber(decimals)
  if (isNaN(decimals)) {
    return error.value
  }

  if (decimals < 0) {
    const factor = Math.pow(10, -decimals)
    number = Math.round(number / factor) * factor
  } else {
    number = number.toFixed(decimals)
  }

  if (no_commas) {
    number = number.toString().replace(/,/g, '')
  } else {
    const parts = number.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+$)/g, ',')
    number = parts.join('.')
  }

  return number
}

/**
 * Returns the leftmost characters from a text value.
 *
 * Category: Text
 *
 * @param {*} text The text string that contains the characters you want to extract.
 * @param {*} [num_chars] Optional. Specifies the number of characters you want LEFT to extract.
 * @returns
 */
export function LEFT(text, num_chars) {
  const someError = utils.anyError(text, num_chars)

  if (someError) {
    return someError
  }

  text = utils.parseString(text)
  num_chars = num_chars === undefined ? 1 : num_chars
  num_chars = utils.parseNumber(num_chars)

  if (num_chars instanceof Error || typeof text !== 'string') {
    return error.value
  }

  return text.substring(0, num_chars)
}

/**
 * Returns the number of characters in a text string
 *
 * Category: Text
 *
 * @param {*} text The text whose length you want to find. Spaces count as characters.
 * @returns
 */
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

/**
 * Converts text to lowercase.
 *
 * Category: Text
 *
 * @param {*} text The text you want to convert to lowercase. LOWER does not change characters in text that are not letters.
 * @returns
 */
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

/**
 * Returns a specific number of characters from a text string starting at the position you specify
 *
 * Category: Text
 *
 * @param {*} text The text string containing the characters you want to extract.
 * @param {*} start_num The position of the first character you want to extract in text. The first character in text has start_num 1, and so on.
 * @param {*} num_chars Specifies the number of characters you want MID to return from text.
 * @returns
 */
export function MID(text, start_num, num_chars) {
  if (utils.anyIsError(text, start_num, num_chars)) {
    return utils.anyError(text, start_num, num_chars)
  }

  const numArgs = [start_num, num_chars].map((num) => utils.parseNumber(num))
  const validNumArgs = numArgs.every((numArg) => {
    return !(numArg instanceof Error) && numArg > 0
  })
  if (!validNumArgs) return error.value

  if (!utils.isDefined(text)) {
    text = ''
  } else if (typeof text !== 'string') {
    text = String(text)
  }

  ;[start_num, num_chars] = numArgs

  const begin = start_num - 1
  const end = begin + num_chars

  return text.substring(begin, end)
}

// TODO
/**
 * Converts text to number in a locale-independent manner.
 *
 * Category: Text
 *
 * @param {*} text The text to convert to a number.
 * @param {*} [decimal_separator] Optional. The character used to separate the integer and fractional part of the result.
 * @param {*} [group_separator] Optional. The character used to separate groupings of numbers, such as thousands from hundreds and millions from thousands.
 * @returns
 */
export function NUMBERVALUE(text, decimal_separator, group_separator) {
  text = utils.isDefined(text) ? text : ''

  if (typeof text === 'number') {
    return text
  }

  if (typeof text !== 'string') {
    return error.na
  }

  decimal_separator = typeof decimal_separator === 'undefined' ? '.' : decimal_separator
  group_separator = typeof group_separator === 'undefined' ? ',' : group_separator

  return Number(text.replace(decimal_separator, '.').replace(group_separator, ''))
}

/**
 * Capitalizes the first letter in each word of a text value.
 *
 * Category: Text
 *
 * @param {*} text Text enclosed in quotation marks, a formula that returns text, or a reference to a value containing the text you want to partially capitalize.
 * @returns
 */
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

/**
 * Replaces characters within text
 *
 * Category: Text
 *
 * @param {*} old_text Text in which you want to replace some characters.
 * @param {*} num_chars The number of characters in old_text that you want REPLACE to replace with new_text.
 * @param {*} length he number of characters in old_text that you want REPLACEB to replace with new_text.
 * @param {*} new_text he text that will replace characters in old_text.
 * @returns
 */
export function REPLACE(old_text, num_chars, length, new_text) {
  num_chars = utils.parseNumber(num_chars)
  length = utils.parseNumber(length)

  if (utils.anyIsError(num_chars, length) || typeof old_text !== 'string' || typeof new_text !== 'string') {
    return error.value
  }

  return old_text.substr(0, num_chars - 1) + new_text + old_text.substr(num_chars - 1 + length)
}

/**
 * Repeats text a given number of times.
 *
 * Category: Text
 *
 * @param {*} text The text you want to repeat.
 * @param {*} number_times A positive number specifying the number of times to repeat text.
 * @returns
 */
export function REPT(text, number_times) {
  const someError = utils.anyError(text, number_times)

  if (someError) {
    return someError
  }

  text = utils.parseString(text)
  number_times = utils.parseNumber(number_times)

  if (number_times instanceof Error) {
    return number_times
  }

  return new Array(number_times + 1).join(text)
}

/**
 * Returns the rightmost characters from a text value
 *
 * Category: Text
 *
 * @param {*} text The text string containing the characters you want to extract.
 * @param {*} [num_chars] Optional. Specifies the number of characters you want RIGHT to extract.
 * @returns
 */
export function RIGHT(text, num_chars) {
  const someError = utils.anyError(text, num_chars)

  if (someError) {
    return someError
  }

  text = utils.parseString(text)
  num_chars = num_chars === undefined ? 1 : num_chars
  num_chars = utils.parseNumber(num_chars)

  if (num_chars instanceof Error) {
    return num_chars
  }

  return text.substring(text.length - num_chars)
}

/**
 * Finds one text value within another (not case-sensitive)
 *
 * Category: Text
 *
 * @param {*} find_text The text that you want to find.
 * @param {*} within_text The text in which you want to search for the value of the find_text argument.
 * @param {*} [start_num] Optional. The character number in the within_text argument at which you want to start searching.
 * @returns
 */
export function SEARCH(find_text, within_text, start_num) {
  let foundAt

  if (typeof find_text !== 'string' || typeof within_text !== 'string') {
    return error.value
  }

  start_num = start_num === undefined ? 0 : start_num
  foundAt = within_text.toLowerCase().indexOf(find_text.toLowerCase(), start_num - 1) + 1

  return foundAt === 0 ? error.value : foundAt
}

/**
 * Substitutes new text for old text in a text string.
 *
 * Category: Text
 *
 * @param {*} text The text or the reference to a value containing text for which you want to substitute characters.
 * @param {*} old_text The text you want to replace.
 * @param {*} new_text The text you want to replace old_text with.
 * @param {*} [instance_num] Optional. Specifies which occurrence of old_text you want to replace with new_text. If you specify instance_num, only that instance of old_text is replaced. Otherwise, every occurrence of old_text in text is changed to new_text.
 * @returns
 */
export function SUBSTITUTE(text, old_text, new_text, instance_num) {
  if (arguments.length < 3) {
    return error.na
  }

  if (!text || !old_text) {
    return text
  } else if (instance_num === undefined) {
    return text.split(old_text).join(new_text)
  } else {
    instance_num = Math.floor(Number(instance_num))

    if (Number.isNaN(instance_num) || instance_num <= 0) {
      return error.value
    }

    let index = 0
    let i = 0

    while (index > -1 && text.indexOf(old_text, index) > -1) {
      index = text.indexOf(old_text, index + 1)
      i++

      if (index > -1 && i === instance_num) {
        return text.substring(0, index) + new_text + text.substring(index + old_text.length)
      }
    }

    return text
  }
}

/**
 * Converts its arguments to text.
 *
 * Category: Text
 *
 * @param {*} value The value you want to test.
 * @returns
 */
export function T(value) {
  if (value instanceof Error) {
    return value
  }

  return typeof value === 'string' ? value : ''
}

/**
 * Formats a number and converts it to text.
 *
 * Category: Text
 *
 * @param {*} value A numeric value that you want to be converted into text.
 * @param {*} format_text A text string that defines the formatting that you want to be applied to the supplied value.
 * @returns
 */
export function TEXT(value, format_text) {
  if (value === undefined || value instanceof Error || format_text instanceof Error) {
    return error.na
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10)
  }

  if (format_text === undefined || format_text === null) {
    return ''
  }

  if (typeof format_text === 'number') {
    return String(format_text)
  }

  if (typeof format_text !== 'string') {
    return error.value
  }

  const currencySymbol = format_text.startsWith('$') ? '$' : ''
  const isPercent = format_text.endsWith('%')
  format_text = format_text.replace(/%/g, '').replace(/\$/g, '')

  // count all 0s after the decimal point
  const decimalPlaces = format_text.includes('.') ? format_text.split('.')[1].match(/0/g).length : 0

  const noCommas = !format_text.includes(',')

  if (isPercent) {
    value = value * 100
  }

  value = FIXED(value, decimalPlaces, noCommas)

  if (value.startsWith('-')) {
    value = value.replace('-', '')
    value = '-' + currencySymbol + value
  } else {
    value = currencySymbol + value
  }

  if (isPercent) {
    value = value + '%'
  }

  return value
}

/**
 * Converts a value to text the way Excel does when a text argument receives another type:
 * numbers in the "General" format (15 significant digits), booleans as TRUE/FALSE, empty as ''.
 */
function valueToText(value) {
  if (value === undefined || value === null) {
    return ''
  }

  if (typeof value === 'boolean') {
    return value ? 'TRUE' : 'FALSE'
  }

  if (typeof value === 'number' && isFinite(value)) {
    const text = String(Number(value.toPrecision(15)))
    // JS writes 1e+21 / 1e-7, Excel writes 1E+21 / 1E-07
    return text.replace(/e([+-])(\d+)$/, (_, sign, exponent) => 'E' + sign + exponent.padStart(2, '0'))
  }

  return utils.parseString(value)
}

/**
 * Lowercases each character on its own (simple case mapping), so that the folded text keeps the
 * positions of the original one (e.g. 'İ' becomes 'i', not the two-character 'i̇').
 */
function foldCase(text) {
  let folded = ''

  for (const char of text) {
    const lower = char.toLowerCase()
    folded += lower.length === char.length ? lower : String.fromCodePoint(lower.codePointAt(0))
  }

  return folded
}

/**
 * Parses an optional integer argument of TEXTAFTER / TEXTBEFORE.
 * Returns the default value when omitted, the error when given an error or an array (#VALUE!),
 * otherwise the number rounded with `round` (an empty cell counts as 0).
 */
function parseTextAroundNumber(value, defaultValue, round) {
  if (value === undefined) {
    return defaultValue
  }

  if (Array.isArray(value)) {
    return error.value
  }

  if (value === '') {
    return error.value
  }

  const number = utils.parseNumber(value)

  return number instanceof Error ? number : round(number)
}

/**
 * Shared implementation of TEXTAFTER and TEXTBEFORE.
 *
 * The rules below were measured in Excel (see test/text.js):
 * - arguments are converted in order, the first error (received or from a conversion) wins;
 * - then values are validated: instance_num 0, match_mode / match_end not 0 or 1 => #VALUE!,
 *   and an explicit |instance_num| > LEN(text) - LEN(shortest delimiter) + 1 => #VALUE!
 *   (no such bound when the shortest delimiter is empty);
 * - forward search (instance_num > 0): at each position the longest matching delimiter wins,
 *   the next search starts right after it;
 * - backward search (instance_num < 0): positions are tried from the end, the longest delimiter
 *   starting at a position wins, the next search starts at (position - its length);
 * - match_end = 1 adds one virtual delimiter at the end (forward) or at the start (backward);
 * - if_not_found replaces #N/A only, converted to text.
 */
function textAroundDelimiter(after, text, delimiter, instance_num, match_mode, match_end, if_not_found) {
  if (text instanceof Error) {
    return text
  }

  if (Array.isArray(text)) {
    return error.value
  }

  text = valueToText(text)

  const delimiterList = Array.isArray(delimiter) ? utils.flatten(delimiter) : [delimiter]

  if (delimiterList.length === 0) {
    return error.value
  }

  const delimiterError = delimiterList.find((item) => item instanceof Error)

  if (delimiterError) {
    return delimiterError
  }

  const delimiters = delimiterList.map(valueToText)

  const isInstanceOmitted = instance_num === undefined
  instance_num = parseTextAroundNumber(instance_num, 1, Math.floor)

  if (instance_num instanceof Error) {
    return instance_num
  }

  match_mode = parseTextAroundNumber(match_mode, 0, Math.trunc)

  if (match_mode instanceof Error) {
    return match_mode
  }

  match_end = parseTextAroundNumber(match_end, 0, Math.trunc)

  if (match_end instanceof Error) {
    return match_end
  }

  if (Array.isArray(if_not_found)) {
    return error.value
  }

  if (instance_num === 0 || (match_mode !== 0 && match_mode !== 1) || (match_end !== 0 && match_end !== 1)) {
    return error.value
  }

  const shortestLength = Math.min(...delimiters.map((item) => item.length))

  if (!isInstanceOmitted && shortestLength > 0 && Math.abs(instance_num) > text.length - shortestLength + 1) {
    return error.value
  }

  const notFound = () => {
    if (if_not_found === undefined) {
      return error.na
    }

    return if_not_found instanceof Error ? if_not_found : valueToText(if_not_found)
  }

  if (shortestLength > text.length) {
    return notFound()
  }

  const ignoreCase = match_mode === 1
  const candidates = delimiters
    .map((item) => ({ length: item.length, value: ignoreCase ? foldCase(item) : item }))
    .sort((a, b) => b.length - a.length)

  // length of the longest delimiter starting at `position`, or -1
  const matchLengthAt = (position) => {
    for (const candidate of candidates) {
      if (position + candidate.length <= text.length) {
        const slice = text.slice(position, position + candidate.length)

        if ((ignoreCase ? foldCase(slice) : slice) === candidate.value) {
          return candidate.length
        }
      }
    }

    return -1
  }

  const forward = instance_num > 0
  const target = Math.abs(instance_num)
  let count = 0
  let found = null
  let position = forward ? 0 : text.length

  while (position >= 0 && position <= text.length) {
    const length = matchLengthAt(position)

    if (length < 0) {
      position += forward ? 1 : -1
      continue
    }

    count++

    // an empty delimiter matches again at the same position: every instance is this one
    if (count === target || length === 0) {
      found = { position, length }
      break
    }

    position += forward ? length : -length
  }

  if (!found && match_end === 1 && count === target - 1) {
    found = { position: forward ? text.length : 0, length: 0 }
  }

  if (!found) {
    return notFound()
  }

  return after ? text.slice(found.position + found.length) : text.slice(0, found.position)
}

/**
 * Returns text that occurs after a given character or string.
 *
 * Category: Text
 *
 * @param {*} text The text you are searching within. Wildcard characters are not allowed.
 * @param {*} delimiter The text that marks the point after which you want to extract. Can be an array or a range of several delimiters.
 * @param {*} instance_num [Optional] The instance of the delimiter after which you want to extract the text. Default is 1. A negative number starts searching from the end.
 * @param {*} match_mode [Optional] 0 (default) for a case-sensitive match, 1 for a case-insensitive match.
 * @param {*} match_end [Optional] 1 to treat the end of the text as a delimiter, 0 (default) otherwise.
 * @param {*} if_not_found [Optional] Value returned if no match is found. Default is #N/A.
 * @returns
 */
export function TEXTAFTER(text, delimiter, instance_num, match_mode, match_end, if_not_found) {
  return textAroundDelimiter(true, text, delimiter, instance_num, match_mode, match_end, if_not_found)
}

/**
 * Returns text that occurs before a given character or string.
 *
 * Category: Text
 *
 * @param {*} text The text you are searching within. Wildcard characters are not allowed.
 * @param {*} delimiter The text that marks the point before which you want to extract. Can be an array or a range of several delimiters.
 * @param {*} instance_num [Optional] The instance of the delimiter before which you want to extract the text. Default is 1. A negative number starts searching from the end.
 * @param {*} match_mode [Optional] 0 (default) for a case-sensitive match, 1 for a case-insensitive match.
 * @param {*} match_end [Optional] 1 to treat the end of the text as a delimiter, 0 (default) otherwise.
 * @param {*} if_not_found [Optional] Value returned if no match is found. Default is #N/A.
 * @returns
 */
export function TEXTBEFORE(text, delimiter, instance_num, match_mode, match_end, if_not_found) {
  return textAroundDelimiter(false, text, delimiter, instance_num, match_mode, match_end, if_not_found)
}

/**
 * Combines the text from multiple ranges and/or strings.
 *
 * Category: Text
 * @param {*} delimiter A text string, either empty, or one or more characters enclosed by double quotes, or a reference to a valid text string. If a number is supplied, it will be treated as text.
 * @param {*} ignore_empty If TRUE, ignores empty values.
 * @param {*} args Text item to be joined. A text string, or array of strings, such as a range of values.
 * @returns
 */
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

/**
 * Removes spaces from text.
 *
 * Category: Text
 *
 * @param {*} text The text from which you want spaces removed.
 * @returns
 */
export function TRIM(text) {
  text = utils.parseString(text)

  if (text instanceof Error) {
    return text
  }

  return text.replace(/\s+/g, ' ').trim()
}

export const UNICHAR = CHAR

export const UNICODE = CODE

/**
 * Converts text to uppercase.
 *
 * Category: Text
 *
 * @param {*} text The text you want converted to uppercase. Text can be a reference or text string.
 * @returns
 */
export function UPPER(text) {
  text = utils.parseString(text)

  if (text instanceof Error) {
    return text
  }

  return text.toUpperCase()
}

/**
 * Converts a text argument to a number.
 *
 * Category: Text
 *
 * @param {*} text The text enclosed in quotation marks or a reference to a value containing the text you want to convert.
 * @returns
 */
export function VALUE(text) {
  const anyError = utils.anyError(text)

  if (anyError) {
    return anyError
  }

  if (typeof text === 'number') {
    return text
  }

  if (!utils.isDefined(text)) {
    text = ''
  }

  if (typeof text !== 'string') {
    return error.value
  }

  const isPercent = /(%)$/.test(text) || /^(%)/.test(text)
  text = text.replace(/^[^0-9-]{0,3}/, '')
  text = text.replace(/[^0-9]{0,3}$/, '')
  text = text.replace(/[ ,]/g, '')

  if (text === '') {
    return 0
  }

  let output = Number(text)

  if (isNaN(output)) {
    return error.value
  }

  output = output || 0

  if (isPercent) {
    output = output * 0.01
  }

  return output
}
