import * as error from './utils/error.js'
import * as evalExpression from './utils/criteria-eval.js'
import * as information from './information.js'
import * as statistical from './statistical.js'
import * as utils from './utils/common.js'

/**
 * Returns the absolute value of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The real number of which you want the absolute value.
 * @returns
 */
export function ABS(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  const result = Math.abs(number)

  return result
}

/**
 * Returns the arccosine of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The cosine of the angle you want and must be from -1 to 1.
 * @returns
 */
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

/**
 * Returns the inverse hyperbolic cosine of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number Any real number equal to or greater than 1.
 * @returns
 */
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

/**
 * Returns the arccotangent of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number Number is the cotangent of the angle you want. This must be a real number.
 * @returns
 */
export function ACOT(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  const result = Math.atan(1 / number)

  return result
}

/**
 * Returns the hyperbolic arccotangent of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The absolute value of Number must be greater than 1.
 * @returns
 */
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
/**
 * Returns an aggregate in a list or database.
 *
 * Category: Math and trigonometry
 *
 * @param {*} function_num A number 1 to 19 that specifies which function to use.
 * @param {*} options A numerical value that determines which values to ignore in the evaluation range for the function. Note: The function will not ignore hidden rows, nested subtotals or nested aggregates if the array argument includes a calculation, for example: =AGGREGATE(14,3,A1:A100*(A1:A100>0),1)
 * @param {*} ref1 The first numeric argument for functions that take multiple numeric arguments for which you want the aggregate value.
 * @param {*} ref2 Optional. Numeric arguments 2 to 253 for which you want the aggregate value. For functions that take an array, ref1 is an array, an array formula, or a reference to a range of values for which you want the aggregate value. Ref2 is a second argument that is required for certain functions.
 * @returns
 */
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

/**
 * Converts a Roman number to Arabic, as a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} text A string enclosed in quotation marks, an empty string (""), or a reference to a value containing text.
 * @returns
 */
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

/**
 * Returns the arcsine of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The sine of the angle you want and must be from -1 to 1.
 * @returns
 */
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

/**
 * Returns the inverse hyperbolic sine of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number Any real number.
 * @returns
 */
export function ASINH(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return Math.log(number + Math.sqrt(number * number + 1))
}

/**
 * Returns the arctangent of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The tangent of the angle you want.
 * @returns
 */
export function ATAN(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return Math.atan(number)
}

/**
 * Returns the arctangent from x- and y-coordinates.
 *
 * Category: Math and trigonometry
 *
 * @param {*} x_num The x-coordinate of the point.
 * @param {*} y_num The y-coordinate of the point.
 * @returns
 */
export function ATAN2(x_num, y_num) {
  x_num = utils.parseNumber(x_num)
  y_num = utils.parseNumber(y_num)
  const anyError = utils.anyError(x_num, y_num)

  if (anyError) {
    return anyError
  }

  return Math.atan2(x_num, y_num)
}

/**
 * Returns the inverse hyperbolic tangent of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number Any real number between 1 and -1.
 * @returns
 */
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

/**
 * Converts a number into a text representation with the given radix (base).
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The number that you want to convert. Must be an integer greater than or equal to 0 and less than 2^53.
 * @param {*} radix The base radix that you want to convert the number into. Must be an integer greater than or equal to 2 and less than or equal to 36.
 * @param {*} min_length Optional. The minimum length of the returned string. Must be an integer greater than or equal to 0.
 * @returns
 */
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

/**
 * Rounds a number to the nearest integer or to the nearest multiple of significance.
 *
 * Category: Compatibility
 *
 * @param {*} number The value you want to round.
 * @param {*} significance The multiple to which you want to round.
 * @param {*} mode Optional. For negative numbers, controls whether Number is rounded toward or away from zero.
 * @returns
 */
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

/**
 * Returns the number of combinations for a given number of objects.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The number of items.
 * @param {*} number_chosen The number of items in each combination.
 * @returns
 */
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

/**
 * Returns the number of combinations with repetitions for a given number of items.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number Must be greater than or equal to 0, and greater than or equal to Number_chosen. Non-integer values are truncated.
 * @param {*} number_chosen Must be greater than or equal to 0. Non-integer values are truncated.
 * @returns
 */
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

/**
 * Returns the cosine of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The angle in radians for which you want the cosine.
 * @returns
 */
export function COS(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return Math.cos(number)
}

/**
 * Returns the hyperbolic cosine of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number Any real number for which you want to find the hyperbolic cosine.
 * @returns
 */
export function COSH(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return (Math.exp(number) + Math.exp(-number)) / 2
}

/**
 * Returns the hyperbolic cosine of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The angle in radians for which you want the cotangent.
 * @returns
 */
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

/**
 * Returns the cotangent of an angle.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number
 * @returns
 */
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

/**
 * Returns the cosecant of an angle.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number
 * @returns
 */
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

/**
 * Returns the hyperbolic cosecant of an angle.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number
 * @returns
 */
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

/**
 * Converts a text representation of a number in a given base into a decimal number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} text
 * @param {*} radix Radix must be an integer.
 * @returns
 */
export function DECIMAL(text, radix) {
  if (arguments.length < 1) {
    return error.value
  }

  text = utils.parseNumber(text)
  radix = utils.parseNumber(radix)
  const anyError = utils.anyError(text, radix)

  if (anyError) {
    return anyError
  }

  if (radix === 0) {
    return error.num
  }

  return parseInt(text, radix)
}

/**
 * Converts radians to degrees.
 *
 * Category: Math and trigonometry
 *
 * @param {*} angle The angle in radians that you want to convert.
 * @returns
 */
export function DEGREES(angle) {
  angle = utils.parseNumber(angle)

  if (angle instanceof Error) {
    return angle
  }

  return (angle * 180) / Math.PI
}

/**
 * Rounds a number up to the nearest even integer.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The value to round.
 * @returns
 */
export function EVEN(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return CEILING(number, -2, -1)
}

/**
 * Returns e raised to the power of a given number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The exponent applied to the base e.
 * @returns
 */
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
/**
 * Returns the factorial of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The nonnegative number for which you want the factorial. If number is not an integer, it is truncated.
 * @returns
 */
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

/**
 * Returns the double factorial of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The value for which to return the double factorial. If number is not an integer, it is truncated.
 * @returns
 */
export function FACTDOUBLE(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  const n = Math.floor(number)

  return n <= 0 ? 1 : n * FACTDOUBLE(n - 2)
}

/**
 * Rounds a number down, toward zero.
 *
 * Category: Compatibility
 *
 * @param {*} number The numeric value you want to round.
 * @param {*} significance The multiple to which you want to round.
 * @returns
 */
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

  return number >= 0
    ? ROUND(Math.floor(number / significance) * significance, precision)
    : -ROUND(Math.ceil(Math.abs(number) / significance), precision)
}

// TODO: Verify

/**
 * Rounds a number down, to the nearest integer or to the nearest multiple of significance.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The number to be rounded down.
 * @param {*} significance Optional. The multiple to which you want to round.
 * @param {*} mode Optional. The direction (toward or away from 0) to round negative numbers.
 * @returns
 */
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

/**
 * Rounds a number the nearest integer or to the nearest multiple of significance. Regardless of the sign of the number, the number is rounded up.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The value to be rounded.
 * @param {*} significance Optional. The multiple to which number is to be rounded. If significance is omitted, its default value is 1.
 * @returns
 */
FLOOR.PRECISE = FLOOR['MATH']

// adapted http://rosettacode.org/wiki/Greatest_common_divisor#JavaScript
/**
 * Returns the greatest common divisor.
 *
 * Category: Math and trigonometry
 *
 * @param {*} args number1, number2, ... Number1 is required, subsequent numbers are optional. 1 to 255 values. If any value is not an integer, it is truncated.
 * @returns
 */
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

/**
 * Rounds a number down to the nearest integer.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The real number you want to round down to an integer.
 * @returns
 */
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

/**
 * Returns the least common multiple.
 *
 * Category: Math and trigonometry
 *
 * @param {*} args number1, number2,... Number1 is required, subsequent numbers are optional. 1 to 255 values for which you want the least common multiple. If value is not an integer, it is truncated.
 * @returns
 */
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

/**
 * Returns the natural logarithm of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The positive real number for which you want the natural logarithm.
 * @returns
 */
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

/**
 * Formula.js only
 *
 * @returns
 */
export function LN10() {
  return Math.log(10)
}

/**
 * Formula.js only
 *
 * @returns
 */
export function LN2() {
  return Math.log(2)
}

/**
 * Formula.js only
 *
 * @returns
 */
export function LOG10E() {
  return Math.LOG10E
}

/**
 * Formula.js only
 *
 * @returns
 */
export function LOG2E() {
  return Math.LOG2E
}

/**
 * Returns the logarithm of a number to a specified base.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The positive real number for which you want the logarithm.
 * @param {*} base Optional. The base of the logarithm. If base is omitted, it is assumed to be 10.
 * @returns
 */
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

/**
 * Returns the base-10 logarithm of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The positive real number for which you want the base-10 logarithm.
 * @returns
 */
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

/**
 * Returns the remainder from division.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The number for which you want to find the remainder.
 * @param {*} divisor The number by which you want to divide number.
 * @returns
 */
export function MOD(number, divisor) {
  number = utils.parseNumber(number)
  divisor = utils.parseNumber(divisor)
  const anyError = utils.anyError(number, divisor)

  if (anyError) {
    return anyError
  }

  if (divisor === 0) {
    return error.div0
  }

  let modulus = Math.abs(number % divisor)
  modulus = number < 0 ? divisor - modulus : modulus

  return divisor > 0 ? modulus : -modulus
}

/**
 * Returns a number rounded to the desired multiple.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The value to round.
 * @param {*} multiple The multiple to which you want to round number.
 * @returns
 */
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

/**
 * Returns the multinomial of a set of numbers.
 *
 * Category: Math and trigonometry
 *
 * @param {*} args number1, number2, ... Number1 is required, subsequent numbers are optional. 1 to 255 values for which you want the multinomial.
 * @returns
 */
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

/**
 * Rounds a number up to the nearest odd integer.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number: The value to round.
 * @returns
 */
export function ODD(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  let temp = Math.ceil(Math.abs(number))
  temp = temp & 1 ? temp : temp + 1

  return number >= 0 ? temp : -temp
}

/**
 * Returns the value of pi.
 *
 * Category: Math and trigonometry
 *
 * @returns
 */
export function PI() {
  return Math.PI
}

/**
 * Formula.js only
 *
 * @returns
 */
export function E() {
  return Math.E
}

/**
 * Returns the result of a number raised to a power.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The base number. It can be any real number.
 * @param {*} power The exponent to which the base number is raised.
 * @returns
 */
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

/**
 * Multiplies its arguments.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number1 The first number or range that you want to multiply.
 * @param {*} args number2, ... Optional. Additional numbers or ranges that you want to multiply, up to a maximum of 255 arguments.
 * @returns
 */
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

/**
 * Returns the integer portion of a division.
 *
 * Category: Math and trigonometry
 *
 * @param {*} numerator The dividend.
 * @param {*} denominator The divisor.
 * @returns
 */
export function QUOTIENT(numerator, denominator) {
  numerator = utils.parseNumber(numerator)
  denominator = utils.parseNumber(denominator)
  const anyError = utils.anyError(numerator, denominator)

  if (anyError) {
    return anyError
  }

  return parseInt(numerator / denominator, 10)
}

/**
 * Converts degrees to radians.
 *
 * Category: Math and trigonometry
 *
 * @param {*} angle An angle in degrees that you want to convert.
 * @returns
 */
export function RADIANS(angle) {
  angle = utils.parseNumber(angle)

  if (angle instanceof Error) {
    return angle
  }

  return (angle * Math.PI) / 180
}

/**
 * Returns a random number between 0 and 1.
 *
 * Category: Math and trigonometry
 *
 * @returns
 */
export function RAND() {
  return Math.random()
}

/**
 * Returns a random number between the numbers you specify.
 *
 * Category: Math and trigonometry
 *
 * @param {*} bottom The smallest integer RANDBETWEEN will return.
 * @param {*} top The largest integer RANDBETWEEN will return.
 * @returns
 */
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
/**
 * Converts an arabic numeral to roman, as text.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The Arabic numeral you want converted.
 * @returns
 */
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

/**
 * Rounds a number to a specified number of digits.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The number that you want to round.
 * @param {*} num_digits The number of digits to which you want to round the number argument.
 * @returns
 */
export function ROUND(number, num_digits) {
  number = utils.parseNumber(number)
  num_digits = utils.parseNumber(num_digits)
  const anyError = utils.anyError(number, num_digits)

  if (anyError) {
    return anyError
  }

  return Math.round(number * Math.pow(10, num_digits)) / Math.pow(10, num_digits)
}

/**
 * Rounds a number down, toward zero.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number Any real number that you want rounded down.
 * @param {*} num_digits The number of digits to which you want to round number.
 * @returns
 */
export function ROUNDDOWN(number, num_digits) {
  number = utils.parseNumber(number)
  num_digits = utils.parseNumber(num_digits)
  const anyError = utils.anyError(number, num_digits)

  if (anyError) {
    return anyError
  }

  const sign = number > 0 ? 1 : -1

  return (sign * Math.floor(Math.abs(number) * Math.pow(10, num_digits))) / Math.pow(10, num_digits)
}

/**
 * Rounds a number up, away from zero.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number Any real number that you want rounded up.
 * @param {*} num_digits The number of digits to which you want to round number.
 * @returns
 */
export function ROUNDUP(number, num_digits) {
  number = utils.parseNumber(number)
  num_digits = utils.parseNumber(num_digits)
  const anyError = utils.anyError(number, num_digits)

  if (anyError) {
    return anyError
  }

  const sign = number > 0 ? 1 : -1

  return (sign * Math.ceil(Math.abs(number) * Math.pow(10, num_digits))) / Math.pow(10, num_digits)
}

/**
 * Returns the secant of an angle.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The angle in radians for which you want the secant.
 * @returns
 */
export function SEC(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return 1 / Math.cos(number)
}

/**
 * Returns the hyperbolic secant of an angle.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The angle in radians for which you want the hyperbolic secant.
 * @returns
 */
export function SECH(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return 2 / (Math.exp(number) + Math.exp(-number))
}

/**
 * Returns the sum of a power series based on the formula.
 *
 * Category: Math and trigonometry
 *
 * @param {*} x The input value to the power series.
 * @param {*} n The initial power to which you want to raise x.
 * @param {*} m The step by which to increase n for each term in the series.
 * @param {*} coefficients A set of coefficients by which each successive power of x is multiplied. The number of values in coefficients determines the number of terms in the power series. For example, if there are three values in coefficients, then there will be three terms in the power series.
 * @returns
 */
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

/**
 * Returns the sign of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number Any real number.
 * @returns
 */
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

/**
 * Returns the sine of the given angle.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The angle in radians for which you want the sine.
 * @returns
 */
export function SIN(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return Math.sin(number)
}

/**
 * Returns the hyperbolic sine of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number Any real number.
 * @returns
 */
export function SINH(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return (Math.exp(number) - Math.exp(-number)) / 2
}

/**
 * Returns a positive square root.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The number for which you want the square root.
 * @returns
 */
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

/**
 * Returns the square root of (number * pi).
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The number by which pi is multiplied.
 * @returns
 */
export function SQRTPI(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return Math.sqrt(number * Math.PI)
}

/**
 * Formula.js only
 *
 * @returns
 */
export function SQRT1_2() {
  return 1 / Math.sqrt(2)
}

/**
 * Formula.js only
 *
 * @returns
 */
export function SQRT2() {
  return Math.sqrt(2)
}

/**
 * Returns a subtotal in a list or database.
 *
 * Category: Math and trigonometry
 *
 * @param {*} function_num The number 1-11 or 101-111 that specifies the function to use for the subtotal. 1-11 includes manually-hidden rows, while 101-111 excludes them; filtered-out values are always excluded.
 * @param {*} ref1 The first named range or reference for which you want the subtotal.
 * @returns
 */
export function SUBTOTAL(function_num, ref1) {
  function_num = utils.parseNumber(function_num)

  if (function_num instanceof Error) {
    return function_num
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

/**
 * Formula.js only
 *
 * @param {*} num1
 * @param {*} num2
 * @returns
 */
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

/**
 * Formula.js only
 *
 * @param {*} num1
 * @param {*} num2
 * @returns
 */
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

/**
 * Formula.js only
 *
 * @param {*} dividend
 * @param {*} divisor
 * @returns
 */
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

/**
 * Formula.js only
 *
 * @param {*} factor1
 * @param {*} factor2
 * @returns
 */
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

/**
 * Formula.js only
 *
 * @param {*} num1
 * @param {*} num2
 * @returns
 */
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

/**
 * Formula.js only
 *
 * @param {*} num1
 * @param {*} num2
 * @returns
 */
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

/**
 * Formula.js only
 *
 * @param {*} num1
 * @param {*} num2
 * @returns
 */
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

/**
 * Formula.js only
 *
 * @param {*} num1
 * @param {*} num2
 * @returns
 */
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

/**
 * Formula.js only
 *
 * @param {*} value1
 * @param {*} value2
 * @returns
 */
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

/**
 * Formula.js only
 *
 * @param {*} value1
 * @param {*} value2
 * @returns
 */
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

/**
 * Formula.js only
 *
 * @param {*} base
 * @param {*} exponent
 * @returns
 */
export function POW(base, exponent) {
  if (arguments.length !== 2) {
    return error.na
  }

  return POWER(base, exponent)
}

/**
 * Adds its arguments.
 *
 * Category: Math and trigonometry
 *
 * @returns
 */
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

/**
 * Adds the values specified by a given criteria.
 *
 * Category: Math and trigonometry
 *
 * @param {*} range The range of values that you want evaluated by criteria. Cells in each range must be numbers or names, arrays, or references that contain numbers. Blank and text values are ignored.
 * @param {*} criteria The criteria in the form of a number, expression, a value reference, text, or a function that defines which values will be added.
 * @param {*} sum_range Optional. The actual values to add, if you want to add values other than those specified in the range argument. If the sum_range argument is omitted, Excel adds the values that are specified in the range argument (the same values to which the criteria is applied). Sum_range should be the same size and shape as range. If it isn't, performance may suffer, and the formula will sum a range of values that starts with the first value in sum_range but has the same dimensions as range.
 * @returns
 */
export function SUMIF(range, criteria, sum_range) {
  range = utils.flatten(range)

  sum_range = sum_range ? utils.flatten(sum_range) : range

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
    const sumValue = sum_range[i]

    if (isWildcard) {
      result += value
    } else {
      const tokens = [evalExpression.createToken(value, evalExpression.TOKEN_TYPE_LITERAL)].concat(tokenizedCriteria)

      result += evalExpression.compute(tokens) ? sumValue : 0
    }
  }

  return result
}

/**
 * Adds the values in a range that meet multiple criteria.
 *
 * Category: Math and trigonometry
 *
 * @returns
 */
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

/**
 * Returns the sum of the products of corresponding array components.
 *
 * Category: Math and trigonometry
 *
 * @returns
 */
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

/**
 * Returns the sum of the squares of the arguments.
 *
 * Category: Math and trigonometry
 *
 * @param {*} args number1, number2, ... Number1 is required, subsequent numbers are optional. 1 to 255 arguments for which you want the sum of the squares. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
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

/**
 * Returns the sum of the difference of squares of corresponding values in two arrays.
 *
 * Category: Math and trigonometry
 *
 * @param {*} array_x The first array or range of values.
 * @param {*} array_y The second array or range of values.
 * @returns
 */
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

/**
 * Returns the sum of the sum of squares of corresponding values in two arrays.
 *
 * Category: Math and trigonometry
 *
 * @param {*} array_x The first array or range of values.
 * @param {*} array_y The second array or range of values.
 * @returns
 */
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

/**
 * Returns the sum of squares of differences of corresponding values in two arrays.
 *
 * Category: Math and trigonometry
 *
 * @param {*} array_x The first array or range of values.
 * @param {*} array_y The second array or range of values.
 * @returns
 */
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

/**
 * Returns the tangent of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The angle in radians for which you want the tangent.
 * @returns
 */
export function TAN(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return Math.tan(number)
}

/**
 * Returns the hyperbolic tangent of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number Any real number.
 * @returns
 */
export function TANH(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  const e2 = Math.exp(2 * number)

  return (e2 - 1) / (e2 + 1)
}

/**
 * Truncates a number to an integer.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The number you want to truncate.
 * @param {*} num_digits Optional. A number specifying the precision of the truncation. The default value for num_digits is 0 (zero).
 * @returns
 */
export function TRUNC(number, num_digits) {
  number = utils.parseNumber(number)
  num_digits = utils.parseNumber(num_digits)
  const anyError = utils.anyError(number, num_digits)

  if (anyError) {
    return anyError
  }

  const sign = number > 0 ? 1 : -1

  return (sign * Math.floor(Math.abs(number) * Math.pow(10, num_digits))) / Math.pow(10, num_digits)
}
