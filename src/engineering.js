import bessel from 'bessel'
import jStat from 'jstat'

import * as error from './utils/error.js'
import * as text from './text.js'
import * as utils from './utils/common.js'

function isValidBinaryNumber(number) {
  return /^[01]{1,10}$/.test(number)
}

/**
 * Returns the modified Bessel function In(x).
 *
 * Category: Engineering
 *
 * @param {*} x The value at which to evaluate the function.
 * @param {*} n The order of the Bessel function. If n is not an integer, it is truncated.
 * @returns
 */
export function BESSELI(x, n) {
  x = utils.parseNumber(x)
  n = utils.parseNumber(n)

  if (utils.anyIsError(x, n)) {
    return error.value
  }

  return bessel.besseli(x, n)
}

/**
 * Returns the Bessel function Jn(x).
 *
 * Category: Engineering
 *
 * @param {*} x The value at which to evaluate the function.
 * @param {*} n The order of the Bessel function. If n is not an integer, it is truncated.
 * @returns
 */
export function BESSELJ(x, n) {
  x = utils.parseNumber(x)
  n = utils.parseNumber(n)

  if (utils.anyIsError(x, n)) {
    return error.value
  }

  return bessel.besselj(x, n)
}

/**
 * Returns the modified Bessel function Kn(x).
 *
 * Category: Engineering
 *
 * @param {*} x The value at which to evaluate the function.
 * @param {*} n The order of the function. If n is not an integer, it is truncated.
 * @returns
 */
export function BESSELK(x, n) {
  x = utils.parseNumber(x)
  n = utils.parseNumber(n)

  if (utils.anyIsError(x, n)) {
    return error.value
  }

  return bessel.besselk(x, n)
}

/**
 * Returns the Bessel function Yn(x).
 *
 * Category: Engineering
 *
 * @param {*} x The value at which to evaluate the function.
 * @param {*} n The order of the function. If n is not an integer, it is truncated.
 * @returns
 */
export function BESSELY(x, n) {
  x = utils.parseNumber(x)
  n = utils.parseNumber(n)

  if (utils.anyIsError(x, n)) {
    return error.value
  }

  return bessel.bessely(x, n)
}

/**
 * Converts a binary number to decimal.
 *
 * Category: Engineering
 *
 * @param {*} number The binary number you want to convert. Number cannot contain more than 10 characters (10 bits). The most significant bit of number is the sign bit. The remaining 9 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @returns
 */
export function BIN2DEC(number) {
  // Return error if number is not binary or contains more than 10 characters (10 digits)
  if (!isValidBinaryNumber(number)) {
    return error.num
  }

  // Convert binary number to decimal
  const result = parseInt(number, 2)

  // Handle negative numbers
  const stringified = number.toString()

  if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
    return parseInt(stringified.substring(1), 2) - 512
  } else {
    return result
  }
}

/**
 * Converts a binary number to hexadecimal.
 *
 * Category: Engineering
 *
 * @param {*} number The binary number you want to convert. Number cannot contain more than 10 characters (10 bits). The most significant bit of number is the sign bit. The remaining 9 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @param {*} places Optional. The number of characters to use. If places is omitted, BIN2HEX uses the minimum number of characters necessary. Places is useful for padding the return value with leading 0s (zeros).
 * @returns
 */
export function BIN2HEX(number, places) {
  // Return error if number is not binary or contains more than 10 characters (10 digits)
  if (!isValidBinaryNumber(number)) {
    return error.num
  }

  // Ignore places and return a 10-character hexadecimal number if number is negative
  const stringified = number.toString()

  if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
    return (1099511627264 + parseInt(stringified.substring(1), 2)).toString(16)
  }

  // Convert binary number to hexadecimal
  const result = parseInt(number, 2).toString(16)

  // Return hexadecimal number using the minimum number of characters necessary if places is undefined
  if (places === undefined) {
    return result
  } else {
    // Return error if places is nonnumeric
    if (isNaN(places)) {
      return error.value
    }

    // Return error if places is negative
    if (places < 0) {
      return error.num
    }

    // Truncate places in case it is not an integer
    places = Math.floor(places)

    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
    return places >= result.length ? text.REPT('0', places - result.length) + result : error.num
  }
}

/**
 * Converts a binary number to octal.
 *
 * Category: Engineering
 *
 * @param {*} number The binary number you want to convert. Number cannot contain more than 10 characters (10 bits). The most significant bit of number is the sign bit. The remaining 9 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @param {*} places Optional. The number of characters to use. If places is omitted, BIN2OCT uses the minimum number of characters necessary. Places is useful for padding the return value with leading 0s (zeros).
 * @returns
 */
export function BIN2OCT(number, places) {
  // Return error if number is not binary or contains more than 10 characters (10 digits)
  if (!isValidBinaryNumber(number)) {
    return error.num
  }

  // Ignore places and return a 10-character octal number if number is negative
  const stringified = number.toString()

  if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
    return (1073741312 + parseInt(stringified.substring(1), 2)).toString(8)
  }

  // Convert binary number to octal
  const result = parseInt(number, 2).toString(8)

  // Return octal number using the minimum number of characters necessary if places is undefined
  if (places === undefined) {
    return result
  } else {
    // Return error if places is nonnumeric
    if (isNaN(places)) {
      return error.value
    }

    // Return error if places is negative
    if (places < 0) {
      return error.num
    }

    // Truncate places in case it is not an integer
    places = Math.floor(places)

    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
    return places >= result.length ? text.REPT('0', places - result.length) + result : error.num
  }
}

/**
 * Returns a 'Bitwise And' of two numbers.
 *
 * Category: Engineering
 *
 * @param {*} number1 Must be in decimal form and greater than or equal to 0.
 * @param {*} number2 Must be in decimal form and greater than or equal to 0.
 * @returns
 */
export function BITAND(number1, number2) {
  // Return error if either number is a non-numeric value
  number1 = utils.parseNumber(number1)
  number2 = utils.parseNumber(number2)

  if (utils.anyIsError(number1, number2)) {
    return error.value
  }

  // Return error if either number is less than 0
  if (number1 < 0 || number2 < 0) {
    return error.num
  }

  // Return error if either number is a non-integer
  if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
    return error.num
  }

  // Return error if either number is greater than (2^48)-1
  if (number1 > 281474976710655 || number2 > 281474976710655) {
    return error.num
  }

  // Return bitwise AND of two numbers
  return number1 & number2
}

/**
 * Returns a value number shifted left by shift_amount bits.
 *
 * Category: Engineering
 *
 * @param {*} number Number must be an integer greater than or equal to 0.
 * @param {*} shift_amount Shift_amount must be an integer.
 * @returns
 */
export function BITLSHIFT(number, shift_amount) {
  number = utils.parseNumber(number)
  shift_amount = utils.parseNumber(shift_amount)

  if (utils.anyIsError(number, shift_amount)) {
    return error.value
  }

  // Return error if number is less than 0
  if (number < 0) {
    return error.num
  }

  // Return error if number is a non-integer
  if (Math.floor(number) !== number) {
    return error.num
  }

  // Return error if number is greater than (2^48)-1
  if (number > 281474976710655) {
    return error.num
  }

  // Return error if the absolute value of shift is greater than 53
  if (Math.abs(shift_amount) > 53) {
    return error.num
  }

  // Return number shifted by shift bits to the left or to the right if shift is negative
  return shift_amount >= 0 ? number << shift_amount : number >> -shift_amount
}

/**
 * Returns a bitwise OR of 2 numbers.
 *
 * Category: Engineering
 *
 * @param {*} number1 Must be in decimal form and greater than or equal to 0.
 * @param {*} number2 Must be in decimal form and greater than or equal to 0.
 * @returns
 */
export function BITOR(number1, number2) {
  number1 = utils.parseNumber(number1)
  number2 = utils.parseNumber(number2)

  if (utils.anyIsError(number1, number2)) {
    return error.value
  }

  // Return error if either number is less than 0
  if (number1 < 0 || number2 < 0) {
    return error.num
  }

  // Return error if either number is a non-integer
  if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
    return error.num
  }

  // Return error if either number is greater than (2^48)-1
  if (number1 > 281474976710655 || number2 > 281474976710655) {
    return error.num
  }

  // Return bitwise OR of two numbers
  return number1 | number2
}

/**
 * Returns a value number shifted right by shift_amount bits.
 *
 * Category: Engineering
 *
 * @param {*} number Must be an integer greater than or equal to 0.
 * @param {*} shift_amount Must be an integer.
 * @returns
 */
export function BITRSHIFT(number, shift_amount) {
  number = utils.parseNumber(number)
  shift_amount = utils.parseNumber(shift_amount)

  if (utils.anyIsError(number, shift_amount)) {
    return error.value
  }

  // Return error if number is less than 0
  if (number < 0) {
    return error.num
  }

  // Return error if number is a non-integer
  if (Math.floor(number) !== number) {
    return error.num
  }

  // Return error if number is greater than (2^48)-1
  if (number > 281474976710655) {
    return error.num
  }

  // Return error if the absolute value of shift is greater than 53
  if (Math.abs(shift_amount) > 53) {
    return error.num
  }

  // Return number shifted by shift bits to the right or to the left if shift is negative
  return shift_amount >= 0 ? number >> shift_amount : number << -shift_amount
}

/**
 * Returns a bitwise 'Exclusive Or' of two numbers.
 *
 * Category: Engineering
 *
 * @param {*} number1 Must be greater than or equal to 0.
 * @param {*} number2 Must be greater than or equal to 0.
 * @returns
 */
export function BITXOR(number1, number2) {
  number1 = utils.parseNumber(number1)
  number2 = utils.parseNumber(number2)

  if (utils.anyIsError(number1, number2)) {
    return error.value
  }

  // Return error if either number is less than 0
  if (number1 < 0 || number2 < 0) {
    return error.num
  }

  // Return error if either number is a non-integer
  if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
    return error.num
  }

  // Return error if either number is greater than (2^48)-1
  if (number1 > 281474976710655 || number2 > 281474976710655) {
    return error.num
  }

  // Return bitwise XOR of two numbers
  return number1 ^ number2
}

/**
 * Converts real and imaginary coefficients into a complex number.
 *
 * Category: Engineering
 *
 * @param {*} real_num The real coefficient of the complex number.
 * @param {*} i_num The imaginary coefficient of the complex number.
 * @param {*} suffix Optional. The suffix for the imaginary component of the complex number. If omitted, suffix is assumed to be "i".
 * @returns
 */
export function COMPLEX(real_num, i_num, suffix) {
  real_num = utils.parseNumber(real_num)
  i_num = utils.parseNumber(i_num)

  if (utils.anyIsError(real_num, i_num)) {
    return real_num
  }

  // Set suffix
  suffix = suffix === undefined ? 'i' : suffix

  // Return error if suffix is neither "i" nor "j"
  if (suffix !== 'i' && suffix !== 'j') {
    return error.value
  }

  // Return complex number
  if (real_num === 0 && i_num === 0) {
    return 0
  } else if (real_num === 0) {
    return i_num === 1 ? suffix : i_num.toString() + suffix
  } else if (i_num === 0) {
    return real_num.toString()
  } else {
    const sign = i_num > 0 ? '+' : ''
    return real_num.toString() + sign + (i_num === 1 ? suffix : i_num.toString() + suffix)
  }
}

/**
 * Converts a number from one measurement system to another.
 *
 * Category: Engineering
 *
 * @param {*} number is the value in from_units to convert.
 * @param {*} from_unit is the units for number.
 * @param {*} to_unit is the units for the result. CONVERT accepts the following text values (in quotation marks) for from_unit and to_unit.
 * @returns
 */
export function CONVERT(number, from_unit, to_unit) {
  if (arguments.length !== 3 || from_unit === null || to_unit === null) {
    return error.na
  }

  if (number === '' || typeof number === 'boolean' || typeof from_unit === 'boolean' || typeof to_unit === 'boolean') {
    return error.value
  }

  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  // List of units supported by CONVERT and units defined by the International System of Units
  // [Symbols, Group, Get from base unit, Translate to base unit]
  const units = [
    [['g'], 'mass'],
    [['sg'], 'mass', (gram) => gram / 14593.9029372064, (slug) => slug * 14593.9029372064],
    [['lbm'], 'mass', (gram) => gram / 453.59237, (pound) => pound * 453.59237],
    [['u'], 'mass', (gram) => gram * 6.0221366516752e23, (u) => u * 1.6605402e-24],
    [['ozm'], 'mass', (gram) => gram / 28.349523125, (ounce) => ounce * 28.349523125],
    [['grain'], 'mass', (gram) => gram * 15.4323583529, (grain) => grain / 15.4323583529],
    [['cwt', 'shweight'], 'mass', (gram) => gram * 2.2046226218488e-5, (shweight) => shweight / 2.2046226218488e-5],
    [
      ['uk_cwt', 'lcwt', 'hweight'],
      'mass',
      (gram) => gram * 1.9684130552221e-5,
      (hweight) => hweight / 1.9684130552221e-5
    ],
    [['stone'], 'mass', (gram) => gram / 6350.29318, (stone) => stone * 6350.29318],
    [['ton'], 'mass', (gram) => gram / 907184.74, (ton) => ton * 907184.74],
    [['uk_ton', 'LTON', 'brton'], 'mass', (gram) => gram / 1016046.9088, (ton) => ton * 1016046.9088],

    [['m'], 'distance'],
    [['mi'], 'distance', (metre) => metre / 1609.344, (mile) => mile * 1609.344],
    [['Nmi'], 'distance', (metre) => metre / 1852, (mile) => mile * 1852],
    [['in'], 'distance', (metre) => metre / 0.0254, (inch) => inch * 0.0254],
    [['ft'], 'distance', (metre) => metre / 0.3048, (foot) => foot * 0.3048],
    [['yd'], 'distance', (metre) => metre / 0.9144, (yard) => yard * 0.9144],
    [['ang'], 'distance', (metre) => metre / 1e-10, (angstrom) => angstrom * 1e-10],
    [['ell'], 'distance', (metre) => metre / 1.143, (ell) => ell * 1.143],
    [['ly'], 'distance', (metre) => metre * 1.057e-16, (lightYear) => lightYear / 1.057e-16],
    [['parsec', 'pc'], 'distance', (metre) => metre / 3.08567758128e16, (parsec) => parsec * 3.08567758128e16],
    [['Picapt', 'Pica'], 'distance', (metre) => metre / 3.52778e-4, (pica) => pica * 3.52778e-4],
    [['pica'], 'distance', (metre) => metre * 236.2204724409, (pica) => pica / 236.2204724409],
    [['survey_mi'], 'distance', (metre) => metre * 6.2137e-4, (pica) => pica / 6.2137e-4],

    [['sec', 's'], 'time'],
    [['yr'], 'time', (second) => second / 31557600, (year) => year * 31557600],
    [['day', 'd'], 'time', (second) => second / 86400, (day) => day * 86400],
    [['hr'], 'time', (second) => second / 3600, (hour) => hour * 3600],
    [['mn', 'min'], 'time', (second) => second / 60, (minute) => minute * 60],

    [['Pa', 'p'], 'pressure'],
    [['atm', 'at'], 'pressure', (pascal) => pascal / 101325, (atmosphere) => atmosphere * 101325],
    [['mmHg'], 'pressure', (pascal) => pascal / 133.322, (mmHg) => mmHg * 133.322],
    [['psi'], 'pressure', (pascal) => pascal / 6894.757293, (psi) => psi * 6894.757293],
    [['Torr'], 'pressure', (pascal) => pascal / 133.3223684, (torr) => torr * 133.3223684],

    [['N'], 'force'],
    [['dyn', 'dy'], 'force', (newton) => newton / 1e-5, (dyne) => dyne * 1e-5],
    [['lbf'], 'force', (newton) => newton / 4.448221615, (poundForce) => poundForce * 4.448221615],
    [['pond'], 'force', (newton) => newton / 0.00980665, (pond) => pond * 0.00980665],

    [['J'], 'energy'],
    [['e'], 'energy', (joule) => joule / 1e-7, (erg) => erg * 1e-7],
    [['c'], 'energy', (joule) => joule / 4.184, (calorie) => calorie * 4.184],
    [['cal'], 'energy', (joule) => joule / 4.1868, (calorie) => calorie * 4.1868],
    [
      ['eV', 'ev'],
      'energy',
      (joule) => joule / 1.6021766531138543e-19,
      (electronVolt) => electronVolt * 1.6021766531138543e-19
    ],
    [['HPh', 'hh'], 'energy', (joule) => joule / 2684519.538, (horsepowerHour) => horsepowerHour * 2684519.538],
    [['Wh', 'wh'], 'energy', (joule) => joule / 3600, (wattHour) => wattHour * 3600],
    [['flb'], 'energy', (joule) => joule / 1.3558179483, (footPound) => footPound * 1.3558179483],
    [['BTU', 'btu'], 'energy', (joule) => joule / 1055.055853, (btu) => btu * 1055.055853],

    [['HP', 'h'], 'power'],
    [['PS'], 'power', (horsepower) => horsepower / 0.986320071, (ps) => ps * 0.986320071],
    [['W', 'w'], 'power', (horsepower) => horsepower / 1.3410220888438076e-3, (ps) => ps * 1.3410220888438076e-3],

    [['T'], 'magnetism'],
    [['ga'], 'magnetism', (tesla) => tesla / 1e-4, (gauss) => gauss * 1e-4],

    [['C', 'cel'], 'temperature'],
    [['K', 'kel'], 'temperature', (celsius) => celsius + 273, (kelvin) => kelvin - 273],
    [['F', 'fah'], 'temperature', (celsius) => celsius * 1.8 + 32, (fahrenheit) => (fahrenheit - 32) / 1.8],
    [['Rank'], 'temperature', (celsius) => ((celsius + 273.15) * 9) / 5, (rank) => ((rank - 491.67) * 5) / 9],
    [['Reau'], 'temperature', (celsius) => celsius * 0.8, (reau) => reau / 0.8],

    [['l', 'L', 'lt'], 'volume'],
    [['tsp'], 'volume', (liter) => liter / 4.9289215940186e-3, (teaspoon) => teaspoon * 4.9289215940186e-3],
    [['tspm'], 'volume', (liter) => liter / 0.005, (teaspoon) => teaspoon * 0.005],
    [['tbs'], 'volume', (liter) => liter / 0.014786764782055936, (tablespoon) => tablespoon * 0.014786764782055936],
    [['oz'], 'volume', (liter) => liter / 0.029573529564111873, (fluidOunce) => fluidOunce * 0.029573529564111873],
    [['cup'], 'volume', (liter) => liter / 0.2365882365, (cup) => cup * 0.2365882365],
    [['pt', 'us_pt'], 'volume', (liter) => liter / 0.473176473, (pint) => pint * 0.473176473],
    [['uk_pt'], 'volume', (liter) => liter / 0.56826125, (pint) => pint * 0.56826125],
    [['qt'], 'volume', (liter) => liter / 0.946352946, (quart) => quart * 0.946352946],
    [['uk_qt'], 'volume', (liter) => liter / 1.1365225, (quart) => quart * 1.1365225],
    [['gal'], 'volume', (liter) => liter / 3.785411784, (gallon) => gallon * 3.785411784],
    [['uk_gal'], 'volume', (liter) => liter / 4.54609, (gallon) => gallon * 4.54609],
    [['ang3', 'ang^3'], 'volume', (liter) => liter / 1e-27, (cubicAngstrom) => cubicAngstrom * 1e-27],
    [['barrel'], 'volume', (liter) => liter / 158.987294928, (barrel) => barrel * 158.987294928],
    [['bushel'], 'volume', (liter) => liter / 35.23907017, (bushel) => bushel * 35.23907017],
    [['ft3', 'ft^3'], 'volume', (liter) => liter / 28.316846592, (cubicFeet) => cubicFeet * 28.316846592],
    [['in3', 'in^3'], 'volume', (liter) => liter / 0.016387064, (cubicInch) => cubicInch * 0.016387064],
    [
      ['ly3', 'ly^3'],
      'volume',
      (liter) => liter / 8.46786664623715e50,
      (cubicLightYear) => cubicLightYear * 8.46786664623715e50
    ],
    [['m3', 'm^3'], 'volume', (liter) => liter / 1000, (cubicMeter) => cubicMeter * 1000],
    [['mi3', 'mi^3'], 'volume', (liter) => liter / 4168181825440.6, (cubicMile) => cubicMile * 4168181825440.6],
    [['yd3', 'yd^3'], 'volume', (liter) => liter / 764.554857984, (cubicYard) => cubicYard * 764.554857984],
    [
      ['Nmi3', 'Nmi^3'],
      'volume',
      (liter) => liter / 6.352182208e12,
      (cubicNauticalMile) => cubicNauticalMile * 6.352182208e12
    ],
    [
      ['Picapt3', 'Picapt^3', 'Pica3', 'Pica^3'],
      'volume',
      (liter) => liter / 4.39039566186557e-8,
      (cubicPica) => cubicPica * 4.39039566186557e-8
    ],
    [['GRT', 'regton'], 'volume', (liter) => liter / 2831.6846592, (regton) => regton * 2831.6846592],
    [['MTON'], 'volume', (liter) => liter / 1132.67386368, (mton) => mton * 1132.67386368],

    [['m2', 'm^2'], 'area'],
    [['uk_acre'], 'area', (meter) => meter / 4046.8564224, (acre) => acre * 4046.8564224],
    [['us_acre'], 'area', (meter) => meter / 4046.87260987425, (acre) => acre * 4046.87260987425],
    [['ang2', 'ang^2'], 'area', (meter) => meter / 1e-20, (squareAngstrom) => squareAngstrom * 1e-20],
    [['ar'], 'area', (meter) => meter / 100, (are) => are * 100],
    [['ft2', 'ft^2'], 'area', (meter) => meter / 0.09290304, (squareFeet) => squareFeet * 0.09290304],
    [['ha'], 'area', (meter) => meter / 10000, (hectare) => hectare * 10000],
    [['in2', 'in^2'], 'area', (meter) => meter / 0.00064516, (squareInches) => squareInches * 0.00064516],
    [
      ['ly2', 'ly^2'],
      'area',
      (meter) => meter / 8.95054210748189e31,
      (squareLightYear) => squareLightYear * 8.95054210748189e31
    ],
    [['Morgen'], 'area', (meter) => meter / 2500, (morgen) => morgen * 2500],
    [['mi2', 'mi^2'], 'area', (meter) => meter / 2589988.110336, (squareMiles) => squareMiles * 2589988.110336],
    [['Nmi2', 'Nmi^2'], 'area', (meter) => meter / 3429904, (squareNauticalMiles) => squareNauticalMiles * 3429904],
    [
      ['Picapt2', 'Pica2', 'Pica^2', 'Picapt^2'],
      'area',
      (meter) => meter / 1.2445216049382718e-7,
      (squarePica) => squarePica * 1.2445216049382718e-7
    ],
    [['yd2', 'yd^2'], 'area', (meter) => meter / 0.83612736, (squareYards) => squareYards * 0.83612736],

    [['bit'], 'information'],
    [['byte'], 'information', (bit) => bit / 8, (byte) => byte * 8],

    [['m/s', 'm/sec'], 'speed'],
    [
      ['admkn'],
      'speed',
      (metersPerSecond) => metersPerSecond / 0.5147733333333333,
      (knot) => knot * 0.5147733333333333
    ],
    [['kn'], 'speed', (metersPerSecond) => metersPerSecond / 0.5144444444444445, (knot) => knot * 0.5144444444444445],
    [
      ['m/h', 'm/hr'],
      'speed',
      (metersPerSecond) => metersPerSecond / 0.0002777777777777778,
      (metersPerHour) => metersPerHour * 0.0002777777777777778
    ],
    [['mph'], 'speed', (metersPerSecond) => metersPerSecond / 0.44704, (milesPerHour) => milesPerHour * 0.44704]
  ]

  // Binary prefixes
  // [Name, Prefix power of 2 value, Previx value, Abbreviation, Derived from]
  const binary_prefixes = {
    Yi: ['yobi', 80, 1208925819614629174706176, 'Yi', 'yotta'],
    Zi: ['zebi', 70, 1180591620717411303424, 'Zi', 'zetta'],
    Ei: ['exbi', 60, 1152921504606846976, 'Ei', 'exa'],
    Pi: ['pebi', 50, 1125899906842624, 'Pi', 'peta'],
    Ti: ['tebi', 40, 1099511627776, 'Ti', 'tera'],
    Gi: ['gibi', 30, 1073741824, 'Gi', 'giga'],
    Mi: ['mebi', 20, 1048576, 'Mi', 'mega'],
    ki: ['kibi', 10, 1024, 'ki', 'kilo']
  }

  // Unit prefixes
  // [Name, Multiplier, Abbreviation]
  const unit_prefixes = {
    Y: ['yotta', 1e24, 'Y'],
    Z: ['zetta', 1e21, 'Z'],
    E: ['exa', 1e18, 'E'],
    P: ['peta', 1e15, 'P'],
    T: ['tera', 1e12, 'T'],
    G: ['giga', 1e9, 'G'],
    M: ['mega', 1e6, 'M'],
    k: ['kilo', 1e3, 'k'],
    h: ['hecto', 1e2, 'h'],
    e: ['dekao', 1e1, 'e'],
    d: ['deci', 1e-1, 'd'],
    c: ['centi', 1e-2, 'c'],
    m: ['milli', 1e-3, 'm'],
    u: ['micro', 1e-6, 'u'],
    n: ['nano', 1e-9, 'n'],
    p: ['pico', 1e-12, 'p'],
    f: ['femto', 1e-15, 'f'],
    a: ['atto', 1e-18, 'a'],
    z: ['zepto', 1e-21, 'z'],
    y: ['yocto', 1e-24, 'y']
  }

  // Initialize units and multipliers
  let from = null
  let to = null
  let base_from_unit = from_unit
  let base_to_unit = to_unit
  let from_multiplier = 1
  let to_multiplier = 1

  // Lookup from and to units
  from = units.find((conversion) => conversion[0].includes(base_from_unit))
  to = units.find((conversion) => conversion[0].includes(base_to_unit))

  // Lookup from prefix
  if (!from) {
    const from_binary_prefix = binary_prefixes[from_unit.substring(0, 2)]
    let from_unit_prefix = unit_prefixes[from_unit.substring(0, 1)]

    // Handle dekao unit prefix (only unit prefix with two characters)
    if (from_unit.substring(0, 2) === 'da') {
      from_unit_prefix = ['dekao', 1e1, 'da']
    }

    // Handle binary prefixes first (so that 'Yi' is processed before 'Y')
    if (from_binary_prefix) {
      from_multiplier = from_binary_prefix[2]
      base_from_unit = from_unit.substring(2)
    } else if (from_unit_prefix) {
      from_multiplier = from_unit_prefix[1]
      base_from_unit = from_unit.substring(from_unit_prefix[2].length)
    }

    // Lookup from unit
    from = units.find((conversion) => conversion[0].includes(base_from_unit))
  }

  // Lookup to prefix
  if (!to) {
    const to_binary_prefix = binary_prefixes[to_unit.substring(0, 2)]
    let to_unit_prefix = unit_prefixes[to_unit.substring(0, 1)]

    // Handle dekao unit prefix (only unit prefix with two characters)
    if (to_unit.substring(0, 2) === 'da') {
      to_unit_prefix = ['dekao', 1e1, 'da']
    }

    // Handle binary prefixes first (so that 'Yi' is processed before 'Y')
    if (to_binary_prefix) {
      to_multiplier = to_binary_prefix[2]
      base_to_unit = to_unit.substring(2)
    } else if (to_unit_prefix) {
      to_multiplier = to_unit_prefix[1]
      base_to_unit = to_unit.substring(to_unit_prefix[2].length)
    }

    // Lookup to unit
    to = units.find((conversion) => conversion[0].includes(base_to_unit))
  }

  // Return error if a unit does not exist
  if (!from || !to) {
    return error.na
  }

  // Return error if units represent different quantities
  if (from[1] !== to[1]) {
    return error.na
  }

  // Return converted number
  if (from[3]) {
    number = from[3](number)
  }
  number *= from_multiplier

  if (to[2]) {
    number = to[2](number)
  }
  number /= to_multiplier

  return number
}

/**
 * Converts a decimal number to binary.
 *
 * Category: Engineering
 *
 * @param {*} number The decimal integer you want to convert. If number is negative, valid place values are ignored and DEC2BIN returns a 10-character (10-bit) binary number in which the most significant bit is the sign bit. The remaining 9 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @param {*} places Optional. The number of characters to use. If places is omitted, DEC2BIN uses the minimum number of characters necessary. Places is useful for padding the return value with leading 0s (zeros).
 * @returns
 */
export function DEC2BIN(number, places) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  // Return error if number is not decimal, is lower than -512, or is greater than 511
  if (!/^-?[0-9]{1,3}$/.test(number) || number < -512 || number > 511) {
    return error.num
  }

  // Ignore places and return a 10-character binary number if number is negative
  if (number < 0) {
    return '1' + text.REPT('0', 9 - (512 + number).toString(2).length) + (512 + number).toString(2)
  }

  // Convert decimal number to binary
  const result = parseInt(number, 10).toString(2)

  // Return binary number using the minimum number of characters necessary if places is undefined
  if (typeof places === 'undefined') {
    return result
  } else {
    // Return error if places is nonnumeric
    if (isNaN(places)) {
      return error.value
    }

    // Return error if places is negative
    if (places < 0) {
      return error.num
    }

    // Truncate places in case it is not an integer
    places = Math.floor(places)

    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
    return places >= result.length ? text.REPT('0', places - result.length) + result : error.num
  }
}

/**
 * Converts a decimal number to hexadecimal.
 *
 * Category: Engineering
 *
 * @param {*} number The decimal integer you want to convert. If number is negative, places is ignored and DEC2HEX returns a 10-character (40-bit) hexadecimal number in which the most significant bit is the sign bit. The remaining 39 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @param {*} places Optional. The number of characters to use. If places is omitted, DEC2HEX uses the minimum number of characters necessary. Places is useful for padding the return value with leading 0s (zeros).
 * @returns
 */
export function DEC2HEX(number, places) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  // Return error if number is not decimal, is lower than -549755813888, or is greater than 549755813887
  if (!/^-?[0-9]{1,12}$/.test(number) || number < -549755813888 || number > 549755813887) {
    return error.num
  }

  // Ignore places and return a 10-character hexadecimal number if number is negative
  if (number < 0) {
    return (1099511627776 + number).toString(16)
  }

  // Convert decimal number to hexadecimal
  const result = parseInt(number, 10).toString(16)

  // Return hexadecimal number using the minimum number of characters necessary if places is undefined
  if (typeof places === 'undefined') {
    return result
  } else {
    // Return error if places is nonnumeric
    if (isNaN(places)) {
      return error.value
    }

    // Return error if places is negative
    if (places < 0) {
      return error.num
    }

    // Truncate places in case it is not an integer
    places = Math.floor(places)

    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
    return places >= result.length ? text.REPT('0', places - result.length) + result : error.num
  }
}

/**
 * Converts a decimal number to octal.
 *
 * Category: Engineering
 *
 * @param {*} number The decimal integer you want to convert. If number is negative, places is ignored and DEC2OCT returns a 10-character (30-bit) octal number in which the most significant bit is the sign bit. The remaining 29 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @param {*} places Optional. The number of characters to use. If places is omitted, DEC2OCT uses the minimum number of characters necessary. Places is useful for padding the return value with leading 0s (zeros).
 * @returns
 */
export function DEC2OCT(number, places) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  // Return error if number is not decimal, is lower than -549755813888, or is greater than 549755813887
  if (!/^-?[0-9]{1,9}$/.test(number) || number < -536870912 || number > 536870911) {
    return error.num
  }

  // Ignore places and return a 10-character octal number if number is negative
  if (number < 0) {
    return (1073741824 + number).toString(8)
  }

  // Convert decimal number to octal
  const result = parseInt(number, 10).toString(8)

  // Return octal number using the minimum number of characters necessary if places is undefined
  if (typeof places === 'undefined') {
    return result
  } else {
    // Return error if places is nonnumeric
    if (isNaN(places)) {
      return error.value
    }

    // Return error if places is negative
    if (places < 0) {
      return error.num
    }

    // Truncate places in case it is not an integer
    places = Math.floor(places)

    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
    return places >= result.length ? text.REPT('0', places - result.length) + result : error.num
  }
}

/**
 * Tests whether two values are equal.
 *
 * Category: Engineering
 *
 * @param {*} number1 The first number.
 * @param {*} number2 Optional. The second number. If omitted, number2 is assumed to be zero.
 * @returns
 */
export function DELTA(number1, number2) {
  // Set number2 to zero if undefined
  number2 = number2 === undefined ? 0 : number2
  number1 = utils.parseNumber(number1)
  number2 = utils.parseNumber(number2)

  if (utils.anyIsError(number1, number2)) {
    return error.value
  }

  // Return delta
  return number1 === number2 ? 1 : 0
}

// TODO: why is upper_bound not used ? The excel documentation has no examples with upper_bound
/**
 * Returns the error function.
 *
 * Category: Engineering
 *
 * @param {*} lower_limit The lower bound for integrating ERF.
 * @param {*} upper_limit Optional. The upper bound for integrating ERF. If omitted, ERF integrates between zero and lower_limit.
 * @returns
 */
export function ERF(lower_limit, upper_limit) {
  // Set number2 to zero if undefined
  upper_limit = upper_limit === undefined ? 0 : upper_limit

  lower_limit = utils.parseNumber(lower_limit)
  upper_limit = utils.parseNumber(upper_limit)

  if (utils.anyIsError(lower_limit, upper_limit)) {
    return error.value
  }

  return jStat.erf(lower_limit)
}

// TODO

/**
 * -- Not implemented --
 *
 * Returns the error function.
 *
 * Category: Engineering
 *
 * @param {*} x The lower bound for integrating ERF.PRECISE.
 * @returns
 */
ERF.PRECISE = () => {
  throw new Error('ERF.PRECISE is not implemented')
}

/**
 * Returns the complementary error function.
 *
 * Category: Engineering
 *
 * @param {*} x The lower bound for integrating ERFC.
 * @returns
 */
export function ERFC(x) {
  // Return error if x is not a number
  if (isNaN(x)) {
    return error.value
  }

  return jStat.erfc(x)
}

// TODO

/**
 * -- Not implemented --
 *
 * Returns the complementary ERF function integrated between x and infinity.
 *
 * Category: Engineering
 *
 * @param {*} x The lower bound for integrating ERFC.PRECISE.
 * @returns
 */
ERFC.PRECISE = () => {
  throw new Error('ERFC.PRECISE is not implemented')
}

/**
 * Tests whether a number is greater than a threshold value.
 *
 * Category: Engineering
 *
 * @param {*} number The value to test against step.
 * @param {*} step Optional. The threshold value. If you omit a value for step, GESTEP uses zero.
 * @returns
 */
export function GESTEP(number, step) {
  step = step || 0
  number = utils.parseNumber(number)

  if (utils.anyIsError(step, number)) {
    return number
  }

  // Return delta
  return number >= step ? 1 : 0
}

/**
 * Converts a hexadecimal number to binary.
 *
 * Category: Engineering
 *
 * @param {*} number The hexadecimal number you want to convert. Number cannot contain more than 10 characters. The most significant bit of number is the sign bit (40th bit from the right). The remaining 9 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @param {*} places Optional. The number of characters to use. If places is omitted, HEX2BIN uses the minimum number of characters necessary. Places is useful for padding the return value with leading 0s (zeros).
 * @returns
 */
export function HEX2BIN(number, places) {
  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
  if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
    return error.num
  }

  // Check if number is negative
  const negative = !!(number.length === 10 && number.substring(0, 1).toLowerCase() === 'f')

  // Convert hexadecimal number to decimal
  const decimal = negative ? parseInt(number, 16) - 1099511627776 : parseInt(number, 16)

  // Return error if number is lower than -512 or greater than 511
  if (decimal < -512 || decimal > 511) {
    return error.num
  }

  // Ignore places and return a 10-character binary number if number is negative
  if (negative) {
    return '1' + text.REPT('0', 9 - (512 + decimal).toString(2).length) + (512 + decimal).toString(2)
  }

  // Convert decimal number to binary
  const result = decimal.toString(2)

  // Return binary number using the minimum number of characters necessary if places is undefined
  if (places === undefined) {
    return result
  } else {
    // Return error if places is nonnumeric
    if (isNaN(places)) {
      return error.value
    }

    // Return error if places is negative
    if (places < 0) {
      return error.num
    }

    // Truncate places in case it is not an integer
    places = Math.floor(places)

    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
    return places >= result.length ? text.REPT('0', places - result.length) + result : error.num
  }
}

/**
 * Converts a hexadecimal number to decimal.
 *
 * Category: Engineering
 *
 * @param {*} number The hexadecimal number you want to convert. Number cannot contain more than 10 characters (40 bits). The most significant bit of number is the sign bit. The remaining 39 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @returns
 */
export function HEX2DEC(number) {
  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
  if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
    return error.num
  }

  // Convert hexadecimal number to decimal
  const decimal = parseInt(number, 16)

  // Return decimal number
  return decimal >= 549755813888 ? decimal - 1099511627776 : decimal
}

/**
 * Converts a hexadecimal number to octal.
 *
 * Category: Engineering
 *
 * @param {*} number The hexadecimal number you want to convert. Number cannot contain more than 10 characters. The most significant bit of number is the sign bit. The remaining 39 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @param {*} places Optional. The number of characters to use. If places is omitted, HEX2OCT uses the minimum number of characters necessary. Places is useful for padding the return value with leading 0s (zeros).
 * @returns
 */
export function HEX2OCT(number, places) {
  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
  if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
    return error.num
  }

  // Convert hexadecimal number to decimal
  const decimal = parseInt(number, 16)

  // Return error if number is positive and greater than 0x1fffffff (536870911)
  if (decimal > 536870911 && decimal < 1098974756864) {
    return error.num
  }

  // Ignore places and return a 10-character octal number if number is negative
  if (decimal >= 1098974756864) {
    return (decimal - 1098437885952).toString(8)
  }

  // Convert decimal number to octal
  const result = decimal.toString(8)

  // Return octal number using the minimum number of characters necessary if places is undefined
  if (places === undefined) {
    return result
  } else {
    // Return error if places is nonnumeric
    if (isNaN(places)) {
      return error.value
    }

    // Return error if places is negative
    if (places < 0) {
      return error.num
    }

    // Truncate places in case it is not an integer
    places = Math.floor(places)

    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
    return places >= result.length ? text.REPT('0', places - result.length) + result : error.num
  }
}

/**
 * Returns the absolute value (modulus) of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the absolute value.
 * @returns
 */
export function IMABS(inumber) {
  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
  const x = IMREAL(inumber)
  const y = IMAGINARY(inumber)

  // Return error if either coefficient is not a number
  if (utils.anyIsError(x, y)) {
    return error.value
  }

  // Return absolute value of complex number
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
}

/**
 * Returns the imaginary coefficient of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the imaginary coefficient.
 * @returns
 */
export function IMAGINARY(inumber) {
  if (inumber === undefined || inumber === true || inumber === false) {
    return error.value
  }

  // Return 0 if inumber is equal to 0
  if (inumber === 0 || inumber === '0') {
    return 0
  }

  // Handle special cases
  if (['i', 'j'].indexOf(inumber) >= 0) {
    return 1
  }

  // Force string type
  inumber = inumber + ''

  // Normalize imaginary coefficient
  inumber = inumber.replace('+i', '+1i').replace('-i', '-1i').replace('+j', '+1j').replace('-j', '-1j')

  // Lookup sign
  let plus = inumber.indexOf('+')
  let minus = inumber.indexOf('-')

  if (plus === 0) {
    plus = inumber.indexOf('+', 1)
  }

  if (minus === 0) {
    minus = inumber.indexOf('-', 1)
  }

  // Lookup imaginary unit
  const last = inumber.substring(inumber.length - 1, inumber.length)
  const unit = last === 'i' || last === 'j'

  if (plus >= 0 || minus >= 0) {
    // Return error if imaginary unit is neither i nor j
    if (!unit) {
      return error.num
    }

    // Return imaginary coefficient of complex number
    if (plus >= 0) {
      return isNaN(inumber.substring(0, plus)) || isNaN(inumber.substring(plus + 1, inumber.length - 1))
        ? error.num
        : Number(inumber.substring(plus + 1, inumber.length - 1))
    } else {
      return isNaN(inumber.substring(0, minus)) || isNaN(inumber.substring(minus + 1, inumber.length - 1))
        ? error.num
        : -Number(inumber.substring(minus + 1, inumber.length - 1))
    }
  } else {
    if (unit) {
      return isNaN(inumber.substring(0, inumber.length - 1)) ? error.num : inumber.substring(0, inumber.length - 1)
    } else {
      return isNaN(inumber) ? error.num : 0
    }
  }
}

/**
 * Returns the argument theta, an angle expressed in radians.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the argument .
 * @returns
 */
export function IMARGUMENT(inumber) {
  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
  const x = IMREAL(inumber)
  const y = IMAGINARY(inumber)

  // Return error if either coefficient is not a number
  if (utils.anyIsError(x, y)) {
    return error.value
  }

  // Return error if inumber is equal to zero
  if (x === 0 && y === 0) {
    return error.div0
  }

  // Return PI/2 if x is equal to zero and y is positive
  if (x === 0 && y > 0) {
    return Math.PI / 2
  }

  // Return -PI/2 if x is equal to zero and y is negative
  if (x === 0 && y < 0) {
    return -Math.PI / 2
  }

  // Return zero if x is negative and y is equal to zero
  if (y === 0 && x > 0) {
    return 0
  }

  // Return zero if x is negative and y is equal to zero
  if (y === 0 && x < 0) {
    return -Math.PI
  }

  // Return argument of complex number
  if (x > 0) {
    return Math.atan(y / x)
  } else if (x < 0 && y >= 0) {
    return Math.atan(y / x) + Math.PI
  } else {
    return Math.atan(y / x) - Math.PI
  }
}

/**
 * Returns the complex conjugate of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the conjugate.
 * @returns
 */
export function IMCONJUGATE(inumber) {
  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
  const x = IMREAL(inumber)
  const y = IMAGINARY(inumber)

  if (utils.anyIsError(x, y)) {
    return error.value
  }

  // Lookup imaginary unit
  let unit = inumber.substring(inumber.length - 1)
  unit = unit === 'i' || unit === 'j' ? unit : 'i'

  // Return conjugate of complex number
  return y !== 0 ? COMPLEX(x, -y, unit) : inumber
}

/**
 * Returns the cosine of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the cosine.
 * @returns
 */
export function IMCOS(inumber) {
  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
  const x = IMREAL(inumber)
  const y = IMAGINARY(inumber)

  if (utils.anyIsError(x, y)) {
    return error.value
  }

  // Lookup imaginary unit
  let unit = inumber.substring(inumber.length - 1)
  unit = unit === 'i' || unit === 'j' ? unit : 'i'

  // Return cosine of complex number
  return COMPLEX(
    (Math.cos(x) * (Math.exp(y) + Math.exp(-y))) / 2,
    (-Math.sin(x) * (Math.exp(y) - Math.exp(-y))) / 2,
    unit
  )
}

/**
 * Returns the hyperbolic cosine of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the hyperbolic cosine.
 * @returns
 */
export function IMCOSH(inumber) {
  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
  const x = IMREAL(inumber)
  const y = IMAGINARY(inumber)

  if (utils.anyIsError(x, y)) {
    return error.value
  }

  // Lookup imaginary unit
  let unit = inumber.substring(inumber.length - 1)
  unit = unit === 'i' || unit === 'j' ? unit : 'i'

  // Return hyperbolic cosine of complex number
  return COMPLEX(
    (Math.cos(y) * (Math.exp(x) + Math.exp(-x))) / 2,
    (Math.sin(y) * (Math.exp(x) - Math.exp(-x))) / 2,
    unit
  )
}

/**
 * Returns the cotangent of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the cotangent.
 * @returns
 */
export function IMCOT(inumber) {
  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  const x = IMREAL(inumber)
  const y = IMAGINARY(inumber)

  if (utils.anyIsError(x, y)) {
    return error.value
  }

  // Return cotangent of complex number
  return IMDIV(IMCOS(inumber), IMSIN(inumber))
}

/**
 * Returns the quotient of two complex numbers.
 *
 * Category: Engineering
 *
 * @param {*} inumber1 The complex numerator or dividend.
 * @param {*} inumber2 The complex denominator or divisor.
 * @returns
 */
export function IMDIV(inumber1, inumber2) {
  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  const a = IMREAL(inumber1)
  const b = IMAGINARY(inumber1)
  const c = IMREAL(inumber2)
  const d = IMAGINARY(inumber2)

  if (utils.anyIsError(a, b, c, d)) {
    return error.value
  }

  // Lookup imaginary unit
  const unit1 = inumber1.substring(inumber1.length - 1)
  const unit2 = inumber2.substring(inumber2.length - 1)
  let unit = 'i'

  if (unit1 === 'j') {
    unit = 'j'
  } else if (unit2 === 'j') {
    unit = 'j'
  }

  // Return error if inumber2 is null
  if (c === 0 && d === 0) {
    return error.num
  }

  // Return exponential of complex number
  const den = c * c + d * d
  return COMPLEX((a * c + b * d) / den, (b * c - a * d) / den, unit)
}

/**
 * Returns the exponential of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the exponential.
 * @returns
 */
export function IMEXP(inumber) {
  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  const x = IMREAL(inumber)
  const y = IMAGINARY(inumber)

  if (utils.anyIsError(x, y)) {
    return error.value
  }

  // Lookup imaginary unit
  let unit = inumber.substring(inumber.length - 1)
  unit = unit === 'i' || unit === 'j' ? unit : 'i'

  // Return exponential of complex number
  const e = Math.exp(x)
  return COMPLEX(e * Math.cos(y), e * Math.sin(y), unit)
}

/**
 * Returns the natural logarithm of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the natural logarithm.
 * @returns
 */
export function IMLN(inumber) {
  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  const x = IMREAL(inumber)
  const y = IMAGINARY(inumber)

  if (utils.anyIsError(x, y)) {
    return error.value
  }

  // Lookup imaginary unit
  let unit = inumber.substring(inumber.length - 1)
  unit = unit === 'i' || unit === 'j' ? unit : 'i'

  // Return exponential of complex number
  return COMPLEX(Math.log(Math.sqrt(x * x + y * y)), Math.atan(y / x), unit)
}

/**
 * Returns the base-10 logarithm of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the common logarithm.
 * @returns
 */
export function IMLOG10(inumber) {
  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  const x = IMREAL(inumber)
  const y = IMAGINARY(inumber)

  if (utils.anyIsError(x, y)) {
    return error.value
  }

  // Lookup imaginary unit
  let unit = inumber.substring(inumber.length - 1)
  unit = unit === 'i' || unit === 'j' ? unit : 'i'

  // Return exponential of complex number
  return COMPLEX(Math.log(Math.sqrt(x * x + y * y)) / Math.log(10), Math.atan(y / x) / Math.log(10), unit)
}

/**
 * Returns the base-2 logarithm of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the base-2 logarithm.
 * @returns
 */
export function IMLOG2(inumber) {
  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  const x = IMREAL(inumber)
  const y = IMAGINARY(inumber)

  if (utils.anyIsError(x, y)) {
    return error.value
  }

  // Lookup imaginary unit
  let unit = inumber.substring(inumber.length - 1)
  unit = unit === 'i' || unit === 'j' ? unit : 'i'

  // Return exponential of complex number
  return COMPLEX(Math.log(Math.sqrt(x * x + y * y)) / Math.log(2), Math.atan(y / x) / Math.log(2), unit)
}

/**
 * Returns a complex number raised to an integer power.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number you want to raise to a power.
 * @param {*} number The power to which you want to raise the complex number.
 * @returns
 */
export function IMPOWER(inumber, number) {
  number = utils.parseNumber(number)
  const x = IMREAL(inumber)
  const y = IMAGINARY(inumber)

  if (utils.anyIsError(number, x, y)) {
    return error.value
  }

  // Lookup imaginary unit
  let unit = inumber.substring(inumber.length - 1)
  unit = unit === 'i' || unit === 'j' ? unit : 'i'

  // Calculate power of modulus
  const p = Math.pow(IMABS(inumber), number)

  // Calculate argument
  const t = IMARGUMENT(inumber)

  // Return exponential of complex number
  return COMPLEX(p * Math.cos(number * t), p * Math.sin(number * t), unit)
}

/**
 * Returns the product of complex numbers.
 *
 * Category: Engineering
 *
 * @param {*} args inumber1, [inumber2], … Inumber1 is required, subsequent inumbers are not. 1 to 255 complex numbers to multiply.
 * @returns
 */
export function IMPRODUCT() {
  // Initialize result
  let result = arguments[0]

  if (!arguments.length) {
    return error.value
  }

  // Loop on all numbers
  for (let i = 1; i < arguments.length; i++) {
    // Lookup coefficients of two complex numbers
    const a = IMREAL(result)
    const b = IMAGINARY(result)
    const c = IMREAL(arguments[i])
    const d = IMAGINARY(arguments[i])

    if (utils.anyIsError(a, b, c, d)) {
      return error.value
    }

    // Complute product of two complex numbers
    result = COMPLEX(a * c - b * d, a * d + b * c)
  }

  // Return product of complex numbers
  return result
}

/**
 * Returns the real coefficient of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the real coefficient.
 * @returns
 */
export function IMREAL(inumber) {
  if (inumber === undefined || inumber === true || inumber === false) {
    return error.value
  }

  // Return 0 if inumber is equal to 0
  if (inumber === 0 || inumber === '0') {
    return 0
  }

  // Handle special cases
  if (['i', '+i', '1i', '+1i', '-i', '-1i', 'j', '+j', '1j', '+1j', '-j', '-1j'].indexOf(inumber) >= 0) {
    return 0
  }

  // Force String type
  inumber = inumber + ''

  // Lookup sign
  let plus = inumber.indexOf('+')
  let minus = inumber.indexOf('-')

  if (plus === 0) {
    plus = inumber.indexOf('+', 1)
  }

  if (minus === 0) {
    minus = inumber.indexOf('-', 1)
  }

  // Lookup imaginary unit
  const last = inumber.substring(inumber.length - 1, inumber.length)
  const unit = last === 'i' || last === 'j'

  if (plus >= 0 || minus >= 0) {
    // Return error if imaginary unit is neither i nor j
    if (!unit) {
      return error.num
    }

    // Return real coefficient of complex number
    if (plus >= 0) {
      return isNaN(inumber.substring(0, plus)) || isNaN(inumber.substring(plus + 1, inumber.length - 1))
        ? error.num
        : Number(inumber.substring(0, plus))
    } else {
      return isNaN(inumber.substring(0, minus)) || isNaN(inumber.substring(minus + 1, inumber.length - 1))
        ? error.num
        : Number(inumber.substring(0, minus))
    }
  } else {
    if (unit) {
      return isNaN(inumber.substring(0, inumber.length - 1)) ? error.num : 0
    } else {
      return isNaN(inumber) ? error.num : inumber
    }
  }
}

/**
 * Returns the secant of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the secant.
 * @returns
 */
export function IMSEC(inumber) {
  // Return error if inumber is a logical value
  if (inumber === true || inumber === false) {
    return error.value
  }

  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  const x = IMREAL(inumber)
  const y = IMAGINARY(inumber)

  if (utils.anyIsError(x, y)) {
    return error.value
  }

  // Return secant of complex number
  return IMDIV('1', IMCOS(inumber))
}

/**
 * Returns the hyperbolic secant of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the hyperbolic secant.
 * @returns
 */
export function IMSECH(inumber) {
  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  const x = IMREAL(inumber)
  const y = IMAGINARY(inumber)

  if (utils.anyIsError(x, y)) {
    return error.value
  }

  // Return hyperbolic secant of complex number
  return IMDIV('1', IMCOSH(inumber))
}

/**
 * Returns the sine of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the sine.
 * @returns
 */
export function IMSIN(inumber) {
  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  const x = IMREAL(inumber)
  const y = IMAGINARY(inumber)

  if (utils.anyIsError(x, y)) {
    return error.value
  }

  // Lookup imaginary unit
  let unit = inumber.substring(inumber.length - 1)
  unit = unit === 'i' || unit === 'j' ? unit : 'i'

  // Return sine of complex number
  return COMPLEX(
    (Math.sin(x) * (Math.exp(y) + Math.exp(-y))) / 2,
    (Math.cos(x) * (Math.exp(y) - Math.exp(-y))) / 2,
    unit
  )
}

/**
 * Returns the hyperbolic sine of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the hyperbolic sine.
 * @returns
 */
export function IMSINH(inumber) {
  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  const x = IMREAL(inumber)
  const y = IMAGINARY(inumber)

  if (utils.anyIsError(x, y)) {
    return error.value
  }

  // Lookup imaginary unit
  let unit = inumber.substring(inumber.length - 1)
  unit = unit === 'i' || unit === 'j' ? unit : 'i'

  // Return hyperbolic sine of complex number
  return COMPLEX(
    (Math.cos(y) * (Math.exp(x) - Math.exp(-x))) / 2,
    (Math.sin(y) * (Math.exp(x) + Math.exp(-x))) / 2,
    unit
  )
}

/**
 * Returns the square root of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the square root.
 * @returns
 */
export function IMSQRT(inumber) {
  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  const x = IMREAL(inumber)
  const y = IMAGINARY(inumber)

  if (utils.anyIsError(x, y)) {
    return error.value
  }

  // Lookup imaginary unit
  let unit = inumber.substring(inumber.length - 1)
  unit = unit === 'i' || unit === 'j' ? unit : 'i'

  // Calculate power of modulus
  const s = Math.sqrt(IMABS(inumber))

  // Calculate argument
  const t = IMARGUMENT(inumber)

  // Return exponential of complex number
  return COMPLEX(s * Math.cos(t / 2), s * Math.sin(t / 2), unit)
}

/**
 * Returns the cosecant of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the cosecant.
 * @returns
 */
export function IMCSC(inumber) {
  // Return error if inumber is a logical value
  if (inumber === true || inumber === false) {
    return error.value
  }

  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  const x = IMREAL(inumber)
  const y = IMAGINARY(inumber)

  // Return error if either coefficient is not a number
  if (utils.anyIsError(x, y)) {
    return error.num
  }

  // Return cosecant of complex number
  return IMDIV('1', IMSIN(inumber))
}

/**
 * Returns the hyperbolic cosecant of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the hyperbolic cosecant.
 * @returns
 */
export function IMCSCH(inumber) {
  // Return error if inumber is a logical value
  if (inumber === true || inumber === false) {
    return error.value
  }

  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  const x = IMREAL(inumber)
  const y = IMAGINARY(inumber)

  // Return error if either coefficient is not a number
  if (utils.anyIsError(x, y)) {
    return error.num
  }

  // Return hyperbolic cosecant of complex number
  return IMDIV('1', IMSINH(inumber))
}

/**
 * Returns the difference between two complex numbers.
 *
 * Category: Engineering
 *
 * @param {*} inumber1 The complex number from which to subtract inumber2.
 * @param {*} inumber2 The complex number to subtract from inumber1.
 * @returns
 */
export function IMSUB(inumber1, inumber2) {
  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  const a = IMREAL(inumber1)
  const b = IMAGINARY(inumber1)
  const c = IMREAL(inumber2)
  const d = IMAGINARY(inumber2)

  if (utils.anyIsError(a, b, c, d)) {
    return error.value
  }

  // Lookup imaginary unit
  const unit1 = inumber1.substring(inumber1.length - 1)
  const unit2 = inumber2.substring(inumber2.length - 1)
  let unit = 'i'

  if (unit1 === 'j') {
    unit = 'j'
  } else if (unit2 === 'j') {
    unit = 'j'
  }

  // Return _ of two complex numbers
  return COMPLEX(a - c, b - d, unit)
}

/**
 * Returns the sum of complex numbers.
 *
 * Category: Engineering
 *
 * @param {*} args inumber1, [inumber2], ... Inumber1 is required, subsequent numbers are not. 1 to 255 complex numbers to add.
 * @returns
 */
export function IMSUM() {
  if (!arguments.length) {
    return error.value
  }

  const args = utils.flatten(arguments)

  // Initialize result
  let result = args[0]

  // Loop on all numbers
  for (let i = 1; i < args.length; i++) {
    // Lookup coefficients of two complex numbers
    const a = IMREAL(result)
    const b = IMAGINARY(result)
    const c = IMREAL(args[i])
    const d = IMAGINARY(args[i])

    if (utils.anyIsError(a, b, c, d)) {
      return error.value
    }

    // Complute product of two complex numbers
    result = COMPLEX(a + c, b + d)
  }

  // Return sum of complex numbers
  return result
}

/**
 * Returns the tangent of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the tangent.
 * @returns
 */
export function IMTAN(inumber) {
  // Return error if inumber is a logical value
  if (inumber === true || inumber === false) {
    return error.value
  }

  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
  const x = IMREAL(inumber)
  const y = IMAGINARY(inumber)

  if (utils.anyIsError(x, y)) {
    return error.value
  }

  // Return tangent of complex number
  return IMDIV(IMSIN(inumber), IMCOS(inumber))
}

/**
 * Converts an octal number to binary.
 *
 * Category: Engineering
 *
 * @param {*} number The octal number you want to convert. Number may not contain more than 10 characters. The most significant bit of number is the sign bit. The remaining 29 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @param {*} places Optional. The number of characters to use. If places is omitted, OCT2BIN uses the minimum number of characters necessary. Places is useful for padding the return value with leading 0s (zeros).
 * @returns
 */
export function OCT2BIN(number, places) {
  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
  if (!/^[0-7]{1,10}$/.test(number)) {
    return error.num
  }

  // Check if number is negative
  const negative = !!(number.length === 10 && number.substring(0, 1) === '7')

  // Convert octal number to decimal
  const decimal = negative ? parseInt(number, 8) - 1073741824 : parseInt(number, 8)

  // Return error if number is lower than -512 or greater than 511
  if (decimal < -512 || decimal > 511) {
    return error.num
  }

  // Ignore places and return a 10-character binary number if number is negative
  if (negative) {
    return '1' + text.REPT('0', 9 - (512 + decimal).toString(2).length) + (512 + decimal).toString(2)
  }

  // Convert decimal number to binary
  const result = decimal.toString(2)

  // Return binary number using the minimum number of characters necessary if places is undefined
  if (typeof places === 'undefined') {
    return result
  } else {
    // Return error if places is nonnumeric
    if (isNaN(places)) {
      return error.value
    }

    // Return error if places is negative
    if (places < 0) {
      return error.num
    }

    // Truncate places in case it is not an integer
    places = Math.floor(places)

    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
    return places >= result.length ? text.REPT('0', places - result.length) + result : error.num
  }
}

/**
 * Converts an octal number to decimal.
 *
 * Category: Engineering
 *
 * @param {*} number The octal number you want to convert. Number may not contain more than 10 octal characters (30 bits). The most significant bit of number is the sign bit. The remaining 29 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @returns
 */
export function OCT2DEC(number) {
  // Return error if number is not octal or contains more than ten characters (10 digits)
  if (!/^[0-7]{1,10}$/.test(number)) {
    return error.num
  }

  // Convert octal number to decimal
  const decimal = parseInt(number, 8)

  // Return decimal number
  return decimal >= 536870912 ? decimal - 1073741824 : decimal
}

/**
 * Converts an octal number to hexadecimal.
 *
 * Category: Engineering
 *
 * @param {*} number The octal number you want to convert. Number may not contain more than 10 octal characters (30 bits). The most significant bit of number is the sign bit. The remaining 29 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @param {*} places Optional. The number of characters to use. If places is omitted, OCT2HEX uses the minimum number of characters necessary. Places is useful for padding the return value with leading 0s (zeros).
 * @returns
 */
export function OCT2HEX(number, places) {
  // Return error if number is not octal or contains more than ten characters (10 digits)
  if (!/^[0-7]{1,10}$/.test(number)) {
    return error.num
  }

  // Convert octal number to decimal
  const decimal = parseInt(number, 8)

  // Ignore places and return a 10-character octal number if number is negative
  if (decimal >= 536870912) {
    return 'ff' + (decimal + 3221225472).toString(16)
  }

  // Convert decimal number to hexadecimal
  const result = decimal.toString(16)

  // Return hexadecimal number using the minimum number of characters necessary if places is undefined
  if (places === undefined) {
    return result
  } else {
    // Return error if places is nonnumeric
    if (isNaN(places)) {
      return error.value
    }

    // Return error if places is negative
    if (places < 0) {
      return error.num
    }

    // Truncate places in case it is not an integer
    places = Math.floor(places)

    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
    return places >= result.length ? text.REPT('0', places - result.length) + result : error.num
  }
}
