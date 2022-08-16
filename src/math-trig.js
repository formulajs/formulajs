import * as error from './utils/error.js'
import * as evalExpression from './utils/criteria-eval.js'
import * as information from './information.js'
import * as statistical from './statistical.js'
import * as utils from './utils/common.js'

export function ABS(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  const result = Math.abs(number)

  return result
}

export function ACOS(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  let result = Math.acos(number)

  if (isNaN(result)) {
    result = error.num
  }

  return result
}

export function ACOSH(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  let result = Math.log(number + Math.sqrt(number * number - 1))

  if (isNaN(result)) {
    result = error.num
  }

  return result
}

export function ACOT(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  const result = Math.atan(1 / number)

  return result
}

export function ACOTH(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  let result = 0.5 * Math.log((number + 1) / (number - 1))

  if (isNaN(result)) {
    result = error.num
  }

  return result
}

// TODO: use options
export function AGGREGATE(function_num, options, ref1, ref2) {
  function_num = utils.parseNumber(function_num)
  options = utils.parseNumber(function_num)

  if (utils.anyIsError(function_num, options)) {
    return error.value
  }

  switch (function_num) {
    case 1:
      return statistical.AVERAGE(ref1)
    case 2:
      return statistical.COUNT(ref1)
    case 3:
      return statistical.COUNTA(ref1)
    case 4:
      return statistical.MAX(ref1)
    case 5:
      return statistical.MIN(ref1)
    case 6:
      return PRODUCT(ref1)
    case 7:
      return statistical.STDEV.S(ref1)
    case 8:
      return statistical.STDEV.P(ref1)
    case 9:
      return SUM(ref1)
    case 10:
      return statistical.VAR.S(ref1)
    case 11:
      return statistical.VAR.P(ref1)
    case 12:
      return statistical.MEDIAN(ref1)
    case 13:
      return statistical.MODE.SNGL(ref1)
    case 14:
      return statistical.LARGE(ref1, ref2)
    case 15:
      return statistical.SMALL(ref1, ref2)
    case 16:
      return statistical.PERCENTILE.INC(ref1, ref2)
    case 17:
      return statistical.QUARTILE.INC(ref1, ref2)
    case 18:
      return statistical.PERCENTILE.EXC(ref1, ref2)
    case 19:
      return statistical.QUARTILE.EXC(ref1, ref2)
  }
}

export function ARABIC(text) {
  if (text === undefined || text === null) {
    return 0
  }

  if (text instanceof Error) {
    return text
  }

  // Credits: Rafa? Kukawski
  if (!/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/.test(text)) {
    return error.value
  }

  let r = 0
  text.replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, (i) => {
    r += {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    }[i]
  })

  return r
}

export function ASIN(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  let result = Math.asin(number)

  if (isNaN(result)) {
    result = error.num
  }

  return result
}

export function ASINH(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return Math.log(number + Math.sqrt(number * number + 1))
}

export function ATAN(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return Math.atan(number)
}

export function ATAN2(number_x, number_y) {
  number_x = utils.parseNumber(number_x)
  number_y = utils.parseNumber(number_y)
  const anyError = utils.anyError(number_x, number_y)

  if (anyError) {
    return anyError
  }

  return Math.atan2(number_x, number_y)
}

export function ATANH(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  let result = Math.log((1 + number) / (1 - number)) / 2

  if (isNaN(result)) {
    result = error.num
  }

  return result
}

export function BASE(number, radix, min_length) {
  number = utils.parseNumber(number)
  radix = utils.parseNumber(radix)
  min_length = utils.parseNumber(min_length)
  const anyError = utils.anyError(number, radix, min_length)

  if (anyError) {
    return anyError
  }

  if (radix === 0) {
    return error.num
  }

  const result = number.toString(radix)

  return new Array(Math.max(min_length + 1 - result.length, 0)).join('0') + result
}

export function CEILING(number, significance, mode) {
  number = utils.parseNumber(number)
  significance = utils.parseNumber(significance)
  mode = utils.parseNumber(mode)
  const anyError = utils.anyError(number, significance, mode)

  if (anyError) {
    return anyError
  }

  if (significance === 0) {
    return 0
  }

  significance = Math.abs(significance)
  const precision = -Math.floor(Math.log(significance) / Math.log(10))

  if (number >= 0) {
    return ROUND(Math.ceil(number / significance) * significance, precision)
  } else {
    if (mode === 0) {
      return -ROUND(Math.floor(Math.abs(number) / significance) * significance, precision)
    } else {
      return -ROUND(Math.ceil(Math.abs(number) / significance) * significance, precision)
    }
  }
}

CEILING.MATH = CEILING

CEILING.PRECISE = CEILING

export function COMBIN(number, number_chosen) {
  number = utils.parseNumber(number)
  number_chosen = utils.parseNumber(number_chosen)
  const anyError = utils.anyError(number, number_chosen)

  if (anyError) {
    return anyError
  }

  if (number < number_chosen) {
    return error.num
  }

  return FACT(number) / (FACT(number_chosen) * FACT(number - number_chosen))
}

export function COMBINA(number, number_chosen) {
  number = utils.parseNumber(number)
  number_chosen = utils.parseNumber(number_chosen)
  const anyError = utils.anyError(number, number_chosen)

  if (anyError) {
    return anyError
  }

  if (number < number_chosen) {
    return error.num
  }

  return number === 0 && number_chosen === 0 ? 1 : COMBIN(number + number_chosen - 1, number - 1)
}

export function COS(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return Math.cos(number)
}

export function COSH(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return (Math.exp(number) + Math.exp(-number)) / 2
}

export function COT(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  if (number === 0) {
    return error.div0
  }

  return 1 / Math.tan(number)
}

export function COTH(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  if (number === 0) {
    return error.div0
  }

  const e2 = Math.exp(2 * number)

  return (e2 + 1) / (e2 - 1)
}

export function CSC(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  if (number === 0) {
    return error.div0
  }

  return 1 / Math.sin(number)
}

export function CSCH(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  if (number === 0) {
    return error.div0
  }

  return 2 / (Math.exp(number) - Math.exp(-number))
}

export function DECIMAL(number, radix) {
  if (arguments.length < 1) {
    return error.value
  }

  number = utils.parseNumber(number)
  radix = utils.parseNumber(radix)
  const anyError = utils.anyError(number, radix)

  if (anyError) {
    return anyError
  }

  if (radix === 0) {
    return error.num
  }

  return parseInt(number, radix)
}

export function DEGREES(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return (number * 180) / Math.PI
}

export function EVEN(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return CEILING(number, -2, -1)
}

export function EXP(number) {
  if (arguments.length < 1) {
    return error.na
  }

  if (arguments.length > 1) {
    return error.error
  }

  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  number = Math.exp(number)

  return number
}

const MEMOIZED_FACT = []
export function FACT(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  const n = Math.floor(number)

  if (n === 0 || n === 1) {
    return 1
  } else if (MEMOIZED_FACT[n] > 0) {
    return MEMOIZED_FACT[n]
  } else {
    MEMOIZED_FACT[n] = FACT(n - 1) * n

    return MEMOIZED_FACT[n]
  }
}

export function FACTDOUBLE(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  const n = Math.floor(number)

  if (n <= 0) {
    return 1
  } else {
    return n * FACTDOUBLE(n - 2)
  }
}

export function FLOOR(number, significance) {
  number = utils.parseNumber(number)
  significance = utils.parseNumber(significance)
  const anyError = utils.anyError(number, significance)

  if (anyError) {
    return anyError
  }

  if (significance === 0) {
    return 0
  }

  if (!(number >= 0 && significance > 0) && !(number <= 0 && significance < 0)) {
    return error.num
  }

  significance = Math.abs(significance)
  const precision = -Math.floor(Math.log(significance) / Math.log(10))

  if (number >= 0) {
    return ROUND(Math.floor(number / significance) * significance, precision)
  } else {
    return -ROUND(Math.ceil(Math.abs(number) / significance), precision)
  }
}

// TODO: Verify
FLOOR.MATH = (number, significance, mode) => {
  if (significance instanceof Error) {
    return significance
  }

  significance = significance === undefined ? 0 : significance

  number = utils.parseNumber(number)
  significance = utils.parseNumber(significance)
  mode = utils.parseNumber(mode)
  const anyError = utils.anyError(number, significance, mode)

  if (anyError) {
    return anyError
  }

  if (significance === 0) {
    return 0
  }

  significance = significance ? Math.abs(significance) : 1
  const precision = -Math.floor(Math.log(significance) / Math.log(10))

  if (number >= 0) {
    return ROUND(Math.floor(number / significance) * significance, precision)
  } else if (mode === 0 || mode === undefined) {
    return -ROUND(Math.ceil(Math.abs(number) / significance) * significance, precision)
  }

  return -ROUND(Math.floor(Math.abs(number) / significance) * significance, precision)
}

// Deprecated
FLOOR.PRECISE = FLOOR.MATH

// adapted http://rosettacode.org/wiki/Greatest_common_divisor#JavaScript
export function GCD() {
  const range = utils.parseNumberArray(utils.flatten(arguments))

  if (range instanceof Error) {
    return range
  }

  const n = range.length
  const r0 = range[0]
  let x = r0 < 0 ? -r0 : r0

  for (let i = 1; i < n; i++) {
    const ri = range[i]
    let y = ri < 0 ? -ri : ri

    while (x && y) {
      if (x > y) {
        x %= y
      } else {
        y %= x
      }
    }

    x += y
  }

  return x
}

export function INT(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return Math.floor(number)
}

// TODO: verify
export const ISO = {
  CEILING: CEILING
}

export function LCM() {
  // Credits: Jonas Raoni Soares Silva
  const o = utils.parseNumberArray(utils.flatten(arguments))

  if (o instanceof Error) {
    return o
  }

  for (var i, j, n, d, r = 1; (n = o.pop()) !== undefined; ) {
    if (n === 0) {
      return 0
    }

    while (n > 1) {
      if (n % 2) {
        for (i = 3, j = Math.floor(Math.sqrt(n)); i <= j && n % i; i += 2) {
          // empty
        }

        d = i <= j ? i : n
      } else {
        d = 2
      }

      for (n /= d, r *= d, i = o.length; i; o[--i] % d === 0 && (o[i] /= d) === 1 && o.splice(i, 1)) {
        // empty
      }
    }
  }

  return r
}

export function LN(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  if (number === 0) {
    return error.num
  }

  return Math.log(number)
}

export function LN10() {
  return Math.log(10)
}

export function LN2() {
  return Math.log(2)
}

export function LOG10E() {
  return Math.LOG10E
}

export function LOG2E() {
  return Math.LOG2E
}

export function LOG(number, base) {
  number = utils.parseNumber(number)
  base = utils.parseNumber(base)
  const anyError = utils.anyError(number, base)

  if (anyError) {
    return anyError
  }

  if (number === 0 || base === 0) {
    return error.num
  }

  return Math.log(number) / Math.log(base)
}

export function LOG10(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  if (number === 0) {
    return error.num
  }

  return Math.log(number) / Math.log(10)
}

export function MOD(dividend, divisor) {
  dividend = utils.parseNumber(dividend)
  divisor = utils.parseNumber(divisor)
  const anyError = utils.anyError(dividend, divisor)

  if (anyError) {
    return anyError
  }

  if (divisor === 0) {
    return error.div0
  }

  let modulus = Math.abs(dividend % divisor)
  modulus = dividend < 0 ? divisor - modulus : modulus

  return divisor > 0 ? modulus : -modulus
}

export function MROUND(number, multiple) {
  number = utils.parseNumber(number)
  multiple = utils.parseNumber(multiple)
  const anyError = utils.anyError(number, multiple)

  if (anyError) {
    return anyError
  }

  if (number * multiple === 0) {
    return 0
  }

  if (number * multiple < 0) {
    return error.num
  }

  return Math.round(number / multiple) * multiple
}

export function MULTINOMIAL() {
  const args = utils.parseNumberArray(utils.flatten(arguments))

  if (args instanceof Error) {
    return args
  }

  let sum = 0
  let divisor = 1

  for (let i = 0; i < args.length; i++) {
    sum += args[i]
    divisor *= FACT(args[i])
  }

  return FACT(sum) / divisor
}

export function ODD(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  let temp = Math.ceil(Math.abs(number))
  temp = temp & 1 ? temp : temp + 1

  return number >= 0 ? temp : -temp
}

export function PI() {
  return Math.PI
}

export function E() {
  return Math.E
}

export function POWER(number, power) {
  number = utils.parseNumber(number)
  power = utils.parseNumber(power)
  const anyError = utils.anyError(number, power)

  if (anyError) {
    return anyError
  }

  if (number === 0 && power === 0) {
    return error.num
  }

  const result = Math.pow(number, power)

  if (isNaN(result)) {
    return error.num
  }

  return result
}

export function PRODUCT() {
  const flatArguments = utils.flatten(arguments)
  const flatArgumentsDefined = flatArguments.filter((arg) => arg !== undefined && arg !== null)

  if (flatArgumentsDefined.length === 0) {
    return 0
  }

  const args = utils.parseNumberArray(flatArgumentsDefined)

  if (args instanceof Error) {
    return args
  }

  let result = 1

  for (let i = 0; i < args.length; i++) {
    result *= args[i]
  }

  return result
}

export function QUOTIENT(numerator, denominator) {
  numerator = utils.parseNumber(numerator)
  denominator = utils.parseNumber(denominator)
  const anyError = utils.anyError(numerator, denominator)

  if (anyError) {
    return anyError
  }

  return parseInt(numerator / denominator, 10)
}

export function RADIANS(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return (number * Math.PI) / 180
}

export function RAND() {
  return Math.random()
}

export function RANDBETWEEN(bottom, top) {
  bottom = utils.parseNumber(bottom)
  top = utils.parseNumber(top)
  const anyError = utils.anyError(bottom, top)

  if (anyError) {
    return anyError
  }
  // Creative Commons Attribution 3.0 License
  // Copyright (c) 2012 eqcode

  return bottom + Math.ceil((top - bottom + 1) * Math.random()) - 1
}

// TODO
export function ROMAN(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  // The MIT License
  // Copyright (c) 2008 Steven Levithan
  const digits = String(number).split('')
  const key = [
    '',
    'C',
    'CC',
    'CCC',
    'CD',
    'D',
    'DC',
    'DCC',
    'DCCC',
    'CM',
    '',
    'X',
    'XX',
    'XXX',
    'XL',
    'L',
    'LX',
    'LXX',
    'LXXX',
    'XC',
    '',
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX'
  ]
  let roman = ''
  let i = 3

  while (i--) {
    roman = (key[+digits.pop() + i * 10] || '') + roman
  }

  return new Array(+digits.join('') + 1).join('M') + roman
}

export function ROUND(number, digits) {
  number = utils.parseNumber(number)
  digits = utils.parseNumber(digits)
  const anyError = utils.anyError(number, digits)

  if (anyError) {
    return anyError
  }

  return Number(Math.round(Number(number + 'e' + digits)) + 'e' + digits * -1)
}

export function ROUNDDOWN(number, digits) {
  number = utils.parseNumber(number)
  digits = utils.parseNumber(digits)
  const anyError = utils.anyError(number, digits)

  if (anyError) {
    return anyError
  }

  const sign = number > 0 ? 1 : -1

  return (sign * Math.floor(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits)
}

export function ROUNDUP(number, digits) {
  number = utils.parseNumber(number)
  digits = utils.parseNumber(digits)
  const anyError = utils.anyError(number, digits)

  if (anyError) {
    return anyError
  }

  const sign = number > 0 ? 1 : -1

  return (sign * Math.ceil(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits)
}

export function SEC(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return 1 / Math.cos(number)
}

export function SECH(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return 2 / (Math.exp(number) + Math.exp(-number))
}

export function SERIESSUM(x, n, m, coefficients) {
  x = utils.parseNumber(x)
  n = utils.parseNumber(n)
  m = utils.parseNumber(m)
  coefficients = utils.parseNumberArray(coefficients)

  if (utils.anyIsError(x, n, m, coefficients)) {
    return error.value
  }

  let result = coefficients[0] * Math.pow(x, n)

  for (let i = 1; i < coefficients.length; i++) {
    result += coefficients[i] * Math.pow(x, n + i * m)
  }

  return result
}

export function SIGN(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  if (number < 0) {
    return -1
  } else if (number === 0) {
    return 0
  } else {
    return 1
  }
}

export function SIN(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return Math.sin(number)
}

export function SINH(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return (Math.exp(number) - Math.exp(-number)) / 2
}

export function SQRT(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  if (number < 0) {
    return error.num
  }

  return Math.sqrt(number)
}

export function SQRTPI(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return Math.sqrt(number * Math.PI)
}

export function SQRT1_2() {
  return 1 / Math.sqrt(2)
}

export function SQRT2() {
  return Math.sqrt(2)
}

export function SUBTOTAL(function_code, ref1) {
  function_code = utils.parseNumber(function_code)

  if (function_code instanceof Error) {
    return function_code
  }

  switch (function_code) {
    case 1:
      return statistical.AVERAGE(ref1)
    case 2:
      return statistical.COUNT(ref1)
    case 3:
      return statistical.COUNTA(ref1)
    case 4:
      return statistical.MAX(ref1)
    case 5:
      return statistical.MIN(ref1)
    case 6:
      return PRODUCT(ref1)
    case 7:
      return statistical.STDEV.S(ref1)
    case 8:
      return statistical.STDEV.P(ref1)
    case 9:
      return SUM(ref1)
    case 10:
      return statistical.VAR.S(ref1)
    case 11:
      return statistical.VAR.P(ref1)
    // no hidden values for us
    case 101:
      return statistical.AVERAGE(ref1)
    case 102:
      return statistical.COUNT(ref1)
    case 103:
      return statistical.COUNTA(ref1)
    case 104:
      return statistical.MAX(ref1)
    case 105:
      return statistical.MIN(ref1)
    case 106:
      return PRODUCT(ref1)
    case 107:
      return statistical.STDEV.S(ref1)
    case 108:
      return statistical.STDEV.P(ref1)
    case 109:
      return SUM(ref1)
    case 110:
      return statistical.VAR.S(ref1)
    case 111:
      return statistical.VAR.P(ref1)
  }
}

export function ADD(num1, num2) {
  if (arguments.length !== 2) {
    return error.na
  }

  num1 = utils.parseNumber(num1)
  num2 = utils.parseNumber(num2)
  const anyError = utils.anyError(num1, num2)

  if (anyError) {
    return anyError
  }

  return num1 + num2
}

export function MINUS(num1, num2) {
  if (arguments.length !== 2) {
    return error.na
  }

  num1 = utils.parseNumber(num1)
  num2 = utils.parseNumber(num2)
  const anyError = utils.anyError(num1, num2)

  if (anyError) {
    return anyError
  }

  return num1 - num2
}

export function DIVIDE(dividend, divisor) {
  if (arguments.length !== 2) {
    return error.na
  }

  dividend = utils.parseNumber(dividend)
  divisor = utils.parseNumber(divisor)
  const anyError = utils.anyError(dividend, divisor)

  if (anyError) {
    return anyError
  }

  if (divisor === 0) {
    return error.div0
  }

  return dividend / divisor
}

export function MULTIPLY(factor1, factor2) {
  if (arguments.length !== 2) {
    return error.na
  }

  factor1 = utils.parseNumber(factor1)
  factor2 = utils.parseNumber(factor2)
  const anyError = utils.anyError(factor1, factor2)

  if (anyError) {
    return anyError
  }

  return factor1 * factor2
}

export function GT(num1, num2) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (num1 instanceof Error) {
    return num1
  }

  if (num2 instanceof Error) {
    return num2
  }

  if (utils.anyIsString(num1, num2)) {
    num1 = utils.parseString(num1)
    num2 = utils.parseString(num2)
  } else {
    num1 = utils.parseNumber(num1)
    num2 = utils.parseNumber(num2)
  }

  const anyError = utils.anyError(num1, num2)

  if (anyError) {
    return anyError
  }

  return num1 > num2
}

export function GTE(num1, num2) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (utils.anyIsString(num1, num2)) {
    num1 = utils.parseString(num1)
    num2 = utils.parseString(num2)
  } else {
    num1 = utils.parseNumber(num1)
    num2 = utils.parseNumber(num2)
  }

  const anyError = utils.anyError(num1, num2)

  if (anyError) {
    return anyError
  }

  return num1 >= num2
}

export function LT(num1, num2) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (utils.anyIsString(num1, num2)) {
    num1 = utils.parseString(num1)
    num2 = utils.parseString(num2)
  } else {
    num1 = utils.parseNumber(num1)
    num2 = utils.parseNumber(num2)
  }

  const anyError = utils.anyError(num1, num2)

  if (anyError) {
    return anyError
  }

  return num1 < num2
}

export function LTE(num1, num2) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (utils.anyIsString(num1, num2)) {
    num1 = utils.parseString(num1)
    num2 = utils.parseString(num2)
  } else {
    num1 = utils.parseNumber(num1)
    num2 = utils.parseNumber(num2)
  }

  const anyError = utils.anyError(num1, num2)

  if (anyError) {
    return anyError
  }

  return num1 <= num2
}

export function EQ(value1, value2) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (value1 instanceof Error) {
    return value1
  }

  if (value2 instanceof Error) {
    return value2
  }

  if (value1 === null) {
    value1 = undefined
  }

  if (value2 === null) {
    value2 = undefined
  }

  return value1 === value2
}

export function NE(value1, value2) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (value1 instanceof Error) {
    return value1
  }

  if (value2 instanceof Error) {
    return value2
  }

  if (value1 === null) {
    value1 = undefined
  }

  if (value2 === null) {
    value2 = undefined
  }

  return value1 !== value2
}

export function POW(base, exponent) {
  if (arguments.length !== 2) {
    return error.na
  }

  return POWER(base, exponent)
}

export function SUM() {
  let result = 0

  utils.arrayEach(utils.argsToArray(arguments), (value) => {
    if (result instanceof Error) {
      return false
    } else if (value instanceof Error) {
      result = value
    } else if (typeof value === 'number') {
      result += value
    } else if (typeof value === 'string') {
      const parsed = parseFloat(value)

      !isNaN(parsed) && (result += parsed)
    } else if (Array.isArray(value)) {
      const inner_result = SUM.apply(null, value)

      if (inner_result instanceof Error) {
        result = inner_result
      } else {
        result += inner_result
      }
    }
  })

  return result
}

export function SUMIF(range, criteria, sumRange) {
  range = utils.flatten(range)

  if (sumRange) {
    sumRange = utils.flatten(sumRange)
  } else {
    sumRange = range
  }

  if (range instanceof Error) {
    return range
  }

  if (criteria === undefined || criteria === null || criteria instanceof Error) {
    return 0
  }

  let result = 0
  const isWildcard = criteria === '*'
  const tokenizedCriteria = isWildcard ? null : evalExpression.parse(criteria + '')

  for (let i = 0; i < range.length; i++) {
    const value = range[i]
    const sumValue = sumRange[i]

    if (isWildcard) {
      result += value
    } else {
      const tokens = [evalExpression.createToken(value, evalExpression.TOKEN_TYPE_LITERAL)].concat(tokenizedCriteria)

      result += evalExpression.compute(tokens) ? sumValue : 0
    }
  }

  return result
}

export function SUMIFS() {
  const args = utils.argsToArray(arguments)
  const range = utils.parseNumberArray(utils.flatten(args.shift()))

  if (range instanceof Error) {
    return range
  }

  const criterias = args
  const criteriaLength = criterias.length / 2

  for (let i = 0; i < criteriaLength; i++) {
    criterias[i * 2] = utils.flatten(criterias[i * 2])
  }

  let result = 0

  for (let i = 0; i < range.length; i++) {
    let isMeetCondition = false

    for (let j = 0; j < criteriaLength; j++) {
      const valueToTest = criterias[j * 2][i]
      const criteria = criterias[j * 2 + 1]
      const isWildcard = criteria === void 0 || criteria === '*'
      let computedResult = false

      if (isWildcard) {
        computedResult = true
      } else {
        const tokenizedCriteria = evalExpression.parse(criteria + '')
        const tokens = [evalExpression.createToken(valueToTest, evalExpression.TOKEN_TYPE_LITERAL)].concat(
          tokenizedCriteria
        )

        computedResult = evalExpression.compute(tokens)
      }

      // Criterias are calculated as AND so any `false` breakes the loop as unmeet condition
      if (!computedResult) {
        isMeetCondition = false
        break
      }

      isMeetCondition = true
    }

    if (isMeetCondition) {
      result += range[i]
    }
  }

  return result
}

export function SUMPRODUCT() {
  if (!arguments || arguments.length === 0) {
    return error.value
  }

  const arrays = arguments.length + 1
  let result = 0
  let product
  let k
  let _i
  let _ij

  for (let i = 0; i < arguments[0].length; i++) {
    if (!(arguments[0][i] instanceof Array)) {
      product = 1

      for (k = 1; k < arrays; k++) {
        const _i_arg = arguments[k - 1][i]

        if (_i_arg instanceof Error) {
          return _i_arg
        }

        _i = utils.parseNumber(_i_arg)

        if (_i instanceof Error) {
          return _i
        }

        product *= _i
      }

      result += product
    } else {
      for (let j = 0; j < arguments[0][i].length; j++) {
        product = 1

        for (k = 1; k < arrays; k++) {
          const _ij_arg = arguments[k - 1][i][j]

          if (_ij_arg instanceof Error) {
            return _ij_arg
          }

          _ij = utils.parseNumber(_ij_arg)

          if (_ij instanceof Error) {
            return _ij
          }

          product *= _ij
        }

        result += product
      }
    }
  }

  return result
}

export function SUMSQ() {
  const numbers = utils.parseNumberArray(utils.flatten(arguments))

  if (numbers instanceof Error) {
    return numbers
  }

  let result = 0
  const length = numbers.length

  for (let i = 0; i < length; i++) {
    result += information.ISNUMBER(numbers[i]) ? numbers[i] * numbers[i] : 0
  }

  return result
}

export function SUMX2MY2(array_x, array_y) {
  array_x = utils.parseNumberArray(utils.flatten(array_x))
  array_y = utils.parseNumberArray(utils.flatten(array_y))

  if (utils.anyIsError(array_x, array_y)) {
    return error.value
  }

  let result = 0

  for (let i = 0; i < array_x.length; i++) {
    result += array_x[i] * array_x[i] - array_y[i] * array_y[i]
  }

  return result
}

export function SUMX2PY2(array_x, array_y) {
  array_x = utils.parseNumberArray(utils.flatten(array_x))
  array_y = utils.parseNumberArray(utils.flatten(array_y))

  if (utils.anyIsError(array_x, array_y)) {
    return error.value
  }

  let result = 0
  array_x = utils.parseNumberArray(utils.flatten(array_x))
  array_y = utils.parseNumberArray(utils.flatten(array_y))

  for (let i = 0; i < array_x.length; i++) {
    result += array_x[i] * array_x[i] + array_y[i] * array_y[i]
  }

  return result
}

export function SUMXMY2(array_x, array_y) {
  array_x = utils.parseNumberArray(utils.flatten(array_x))
  array_y = utils.parseNumberArray(utils.flatten(array_y))

  if (utils.anyIsError(array_x, array_y)) {
    return error.value
  }

  let result = 0
  array_x = utils.flatten(array_x)
  array_y = utils.flatten(array_y)

  for (let i = 0; i < array_x.length; i++) {
    result += Math.pow(array_x[i] - array_y[i], 2)
  }

  return result
}

export function TAN(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return Math.tan(number)
}

export function TANH(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  const e2 = Math.exp(2 * number)

  return (e2 - 1) / (e2 + 1)
}

export function TRUNC(number, digits) {
  number = utils.parseNumber(number)
  digits = utils.parseNumber(digits)
  const anyError = utils.anyError(number, digits)

  if (anyError) {
    return anyError
  }

  const sign = number > 0 ? 1 : -1

  return (sign * Math.floor(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits)
}
