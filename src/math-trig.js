import * as error from './utils/error.js'
import * as evalExpression from './utils/criteria-eval.js'
import * as information from './information.js'
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
  if (arguments.length !== 1) {
    return error.na
  }

  if (Array.isArray(number)) {
    return number.map((item) => ABS(item))
  }

  if (number instanceof Error) {
    return number
  }
  if (number === '') {
    return error.value
  }

  number = utils.parseNumber(number)
  if (isNaN(number)) {
    return error.value
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
 * @param {*} number The value you want to round.
 * @param {*} significance The multiple to which you want to round.
 * @param {*} mode Optional. For negative numbers, controls whether Number is rounded toward or away from zero.
 * @returns
 */
function ceiling(number, significance, mode) {
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

/**
 * Returns number rounded up, away from zero, to the nearest multiple of significance.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The value you want to round.
 * @param {*} significance The multiple to which you want to round.
 * @returns
 */
export function CEILING(number, significance) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (number === '' || significance === '') {
    return error.value
  }

  number = utils.parseNumber(number)
  significance = utils.parseNumber(significance)

  const anyError = utils.anyError(number, significance)
  if (anyError) {
    return anyError
  }

  if (significance === 0) {
    return 0
  }

  if (number > 0 && significance > 0 && number < significance) {
    return significance
  }

  const precision = -Math.floor(Math.log(Math.abs(significance)) / Math.log(10))

  return ROUND(Math.ceil(number / significance) * significance, precision)
}

CEILING.MATH = ceiling

CEILING.PRECISE = ceiling

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

  return ceiling(number, -2, -1)
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
 * Category: Math and trigonometry
 *
 * @param {*} number The numeric value you want to round.
 * @param {*} significance The multiple to which you want to round.
 * @returns
 */
export function FLOOR(number, significance) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (number === '' || significance === '') {
    return error.value
  }

  number = utils.parseNumber(number)
  significance = utils.parseNumber(significance)

  const anyError = utils.anyError(number, significance)
  if (anyError) {
    return anyError
  }

  if (number === 0 && significance === 0) {
    return 0
  }

  if (significance === 0) {
    return error.div0
  }

  if (number >= 0 && significance < 0) {
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
FLOOR.PRECISE = FLOOR.MATH

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
  if (arguments.length !== 1) {
    return error.na
  }

  if (number === '') {
    return error.value
  }

  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return Math.floor(number)
}

// TODO: verify
export const ISO = {
  CEILING: ceiling
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
 * Returns the determinant of a given matrix. The matrix must be of type n x n.
 *
 * Category: Math and trigonometry
 *
 * @param {*} matrix Required. Square matrix.
 * @returns
 */
export function MDETERM(matrix) {
  if (!isNaN(matrix)) {
    return matrix
  }

  if (!Array.isArray(matrix) || matrix.length == 0 || !Array.isArray(matrix[0])) {
    return error.value
  }

  const rows = matrix.length
  const cols = matrix[0].length

  if (rows != cols) {
    return error.value
  }

  if (rows > 64) {
    return error.value
  }

  for (let i = 0; i < rows; i++) {
    if (
      utils.anyIsError(...matrix[i]) ||
      utils.anyIsString(...matrix[i]) ||
      utils.anyIsNull(...matrix[i]) ||
      utils.anyIsUndefined(...matrix[i])
    ) {
      return error.value
    }
  }

  let det = 0
  if (rows == 1) {
    det = matrix[0][0]
  } else if (rows == 2) {
    det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
  } else {
    for (let j = 0; j < cols; j++) {
      let subMatrix = []
      for (let i = 1; i < rows; i++) {
        subMatrix.push(matrix[i].slice(0, j).concat(matrix[i].slice(j + 1)))
      }
      let sign = j % 2 == 0 ? 1 : -1
      det += sign * matrix[0][j] * MDETERM(subMatrix)
    }
  }
  return det
}

/**
 * Returns the matrix product of two arrays. The result is an array with the same number of rows as array1 and the same number of columns as array2.
 *
 * Category: Math and trigonometry
 *
 * @param {*} matrix Required. Square matrix with possible inverse.
 * @returns
 */
export function MINVERSE(matrix) {
  if (matrix == undefined || matrix == null) {
    return error.na
  }

  const anyError = utils.anyError(matrix)

  if (anyError) {
    return anyError
  }

  if (!isNaN(matrix)) {
    return 1 / matrix
  }

  const rows = matrix.length
  const cols = matrix[0].length

  for (let i = 0; i < rows; i++) {
    if (
      utils.anyIsError(...matrix[i]) ||
      utils.anyIsString(...matrix[i]) ||
      utils.anyIsNull(...matrix[i]) ||
      utils.anyIsUndefined(...matrix[i])
    ) {
      return error.value
    }
  }

  if (rows != cols) {
    return error.value
  }

  const identity = []
  for (let i = 0; i < rows; i++) {
    identity[i] = []
    for (let j = 0; j < rows; j++) {
      identity[i][j] = i === j ? 1 : 0
    }
  }

  const augmented = matrix.map((row, i) => row.concat(identity[i]))
  for (let i = 0; i < rows; i++) {
    let pivot = augmented[i][i]
    if (pivot === 0) {
      return error.num
    }

    for (let j = i; j < 2 * rows; j++) {
      augmented[i][j] /= pivot
    }

    for (let k = 0; k < rows; k++) {
      if (k !== i) {
        let factor = augmented[k][i]
        for (let j = i; j < 2 * rows; j++) {
          augmented[k][j] -= factor * augmented[i][j]
        }
      }
    }
  }

  const inverse = augmented.map((row) => row.slice(rows))

  return inverse
}

/**
 * Returns the matrix product of two arrays. The result is an array with the same number of rows as array1 and the same number of columns as array2.
 *
 * Category: Math and trigonometry
 *
 * @param {*} array1 Required. 1st array you want to multiply.
 * @param {*} array2 Required. 2nd array you want to multiply.
 * @returns
 */
export function MMULT(array1, array2) {
  if (
    //Arguments are not arrays
    !Array.isArray(array1) ||
    !Array.isArray(array2) ||
    // There are empty arrays
    array1.some((el) => !el.length) ||
    array2.some((el) => !el.length) ||
    // Not all array elements are numbers
    utils.flattenShallow(array1).some((el) => typeof el !== 'number') ||
    utils.flattenShallow(array2).some((el) => typeof el !== 'number') ||
    // Number of columns in array1 is different from the number of rows in array2
    array1[0].length !== array2.length
  ) {
    return error.value
  }

  const matrix = Array(array1.length)
    .fill(0)
    .map(() => Array(array2[0].length).fill(0))

  return matrix.map((row, i) => row.map((_, j) => array1[i].reduce((sum, el, k) => sum + el * array2[k][j], 0)))
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
  if (arguments.length !== 2) {
    return error.na
  }

  if (number === '' || divisor === '') {
    return error.value
  }

  number = utils.parseNumber(number)
  divisor = utils.parseNumber(divisor)

  const anyError = utils.anyError(number, divisor)
  if (anyError) {
    return anyError
  }

  if (divisor === 0) {
    return error.div0
  }

  return number - divisor * INT(number / divisor)
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
  if (arguments.length !== 2) {
    return error.na
  }

  if (typeof number === 'boolean' || typeof multiple === 'boolean') {
    return error.value
  }

  if (number === '' || multiple === '') {
    return error.value
  }

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
 * Returns the unit matrix for the specified dimension.
 *
 * Category: Math and trigonometry
 *
 * @param {*} dimension Required. Dimension is an integer specifying the dimension of the unit matrix that you want to return. It returns an array. The dimension has to be greater than zero.
 * @returns
 */
export function MUNIT(dimension) {
  if (arguments.length > 1) {
    return error.na
  }

  dimension = parseInt(dimension)

  if (!dimension || dimension <= 0) {
    return error.value
  }

  return Array(dimension)
    .fill(0)
    .map(() => Array(dimension).fill(0))
    .map((el, i) => {
      el[i] = 1
      return el
    })
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
  if (arguments.length !== 0) {
    return error.na
  }

  return Math.random()
}

/**
 * Generates an array of random numbers between 0 and 1.
 *
 * Category: Math and trigonometry
 *
 * @param {*} rows Number of quantity of rows generated.
 * @param {*} columns Number of quantity of columns generated.
 * @returns
 */
export function RANDARRAY(rows = 1, columns = 1) {
  if (arguments.length > 2) {
    return error.na
  }

  rows = utils.parseNumber(rows)
  columns = utils.parseNumber(columns)

  const anyError = utils.anyError(rows, columns)

  if (anyError) {
    return anyError
  }

  if (utils.anyIsString(rows, columns)) {
    return error.value
  }

  if (rows <= 0 || columns <= 0) {
    return error.num
  }

  let result = []

  for (let i = 0; i < rows; i++) {
    let row = []
    for (let j = 0; j < columns; j++) {
      row.push(Math.random())
    }
    result.push(row)
  }

  return result
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
  if (arguments.length !== 2) {
    return error.na
  }

  if (typeof bottom === 'boolean' || bottom === '' || typeof top === 'boolean' || top === '') {
    return error.value
  }

  bottom = utils.parseNumber(bottom)
  top = utils.parseNumber(top)
  if (bottom > top) {
    return error.num
  }

  const anyError = utils.anyError(bottom, top)
  if (anyError) {
    return anyError
  }
  // Creative Commons Attribution 3.0 License
  // Copyright (c) 2012 eqcode

  bottom = Math.ceil(bottom)
  top = Math.floor(top)

  return Math.floor(Math.random() * (top - bottom + 1)) + bottom
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
  if (arguments.length !== 2) {
    return error.na
  }

  if (number === '' || num_digits === '') {
    return error.value
  }

  number = utils.parseNumber(number)
  num_digits = utils.parseNumber(num_digits)
  const anyError = utils.anyError(number, num_digits)

  if (anyError) {
    return anyError
  }

  const signal = Math.sign(number)
  number = Math.abs(number)

  var result = Math.round(number * Math.pow(10, num_digits)) / Math.pow(10, num_digits)

  return result * signal
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
  if (arguments.length !== 2) {
    return error.na
  }

  if (number === '' || num_digits === '') {
    return error.value
  }

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
  if (arguments.length !== 2) {
    return error.na
  }

  if (number === '' || num_digits === '') {
    return error.value
  }

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
 * Returns an array of sequential numbers, such as 1, 2, 3, 4.
 *
 * Category: Math and trigonometry
 *
 * @param {*} rows Any integer bigger than 0.
 * @param {*} columns Any integer bigger than 0.
 * @param {*} start Any integer.
 * @param {*} step Any integer.
 * @returns
 */
export function SEQUENCE(rows = 1, columns = 1, start = 1, step = 1) {
  rows = utils.parseNumber(rows)
  columns = utils.parseNumber(columns)
  start = utils.parseNumber(start)
  step = utils.parseNumber(step)

  const anyError = utils.anyError(rows, columns, start, step)

  if (anyError) {
    return anyError
  }

  if (rows < 1 || columns < 1) {
    return error.num
  }

  let result = []
  let value = start
  for (let i = 0; i < rows; i++) {
    let row = []
    for (let j = 0; j < columns; j++) {
      row.push(value)
      value += step
    }
    result.push(row)
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
 * Adds its arguments.
 *
 * Category: Math and trigonometry
 *
 * @returns
 */
export function SUM() {
  if (arguments.length < 1) {
    return error.na
  }

  let result = 0

  utils.arrayEach(utils.argsToArray(arguments), (value) => {
    if (result instanceof Error) {
      return false
    } else if (value instanceof Error) {
      result = value
    } else if (typeof value === 'number') {
      result += value
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
  if (arguments.length < 2 || arguments.length > 3) {
    return error.na
  }

  if (sum_range) {
    const isArray = Array.isArray(range)
    if (isArray !== Array.isArray(sum_range)) {
      return error.value
    }

    if (isArray) {
      if (range.length !== sum_range.length || range[0].length !== sum_range[0].length) {
        return error.value
      }
    }
  }

  if (!Array.isArray(range)) {
    range = [range]
  }

  range = utils.flatten(range)

  if (sum_range) {
    if (!Array.isArray(sum_range)) {
      sum_range = [sum_range]
    }

    sum_range = utils.flatten(sum_range)
  } else {
    sum_range = range
  }

  if (range instanceof Error) {
    return range
  }

  if (criteria === undefined || criteria === null || criteria instanceof Error) {
    return 0
  }

  let result = 0
  const tokenizedCriteria = evalExpression.parse(criteria + '')

  for (let i = 0; i < range.length; i++) {
    const value = range[i]
    const sumValue = sum_range[i]

    const tokens = [evalExpression.createToken(value, evalExpression.TOKEN_TYPE_LITERAL)].concat(tokenizedCriteria)

    result += evalExpression.countIfComputeExpression(tokens) ? sumValue : 0
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
  if (arguments.length < 3 || (arguments.length > 3 && arguments.length % 2 === 0)) {
    return error.na
  }

  if (!Array.isArray(arguments[0])) {
    arguments[0] = [arguments[0]]
  }

  if (!Array.isArray(arguments[0][0])) {
    arguments[0][0] = [arguments[0][0]]
  }

  const height = arguments[0].length
  const width = arguments[0][0].length

  const args = utils.argsToArray(arguments)
  const range = utils.parseNumberArray(utils.flatten(args.shift()))

  if (range instanceof Error) {
    return range
  }

  const criterias = args
  const criteriaLength = criterias.length / 2

  for (let i = 0; i < criteriaLength; i++) {
    if (!Array.isArray(criterias[i * 2])) {
      criterias[i * 2] = [criterias[i * 2]]
    }

    if (!Array.isArray(criterias[i * 2][0])) {
      criterias[i * 2][0] = [criterias[i * 2][0]]
    }

    if (height !== criterias[i * 2].length || width !== criterias[i * 2][0].length) {
      return error.value
    }

    criterias[i * 2] = utils.flatten(criterias[i * 2])
  }

  let result = 0

  for (let i = 0; i < range.length; i++) {
    let isMeetCondition = false

    for (let j = 0; j < criteriaLength; j++) {
      const valueToTest = criterias[j * 2][i]
      const criteria = criterias[j * 2 + 1]
      let computedResult = false

      const tokenizedCriteria = evalExpression.parse(criteria + '')
      const tokens = [evalExpression.createToken(valueToTest, evalExpression.TOKEN_TYPE_LITERAL)].concat(
        tokenizedCriteria
      )

      computedResult = evalExpression.countIfComputeExpression(tokens)

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
