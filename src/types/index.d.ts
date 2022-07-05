/**
 * Returns the absolute value of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The real number of which you want the absolute value.
 * @returns
 */
export function ABS(number: any): number | Error

/**
 * Returns the accrued interest for a security that pays periodic interest.
 *
 * Category: Financial
 *
 * @param {*} issue The security's issue date.
 * @param {*} first_interest The security's first interest date.
 * @param {*} settlement The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer.
 * @param {*} rate The security's annual coupon rate.
 * @param {*} par The security's par value. If you omit par, ACCRINT uses $1,000.
 * @param {*} frequency The number of coupon payments per year. For annual payments, frequency = 1; for semiannual, frequency = 2; for quarterly, frequency = 4.
 * @param {*} basis Optional. The type of day count basis to use.
 * @param {*} calc_method Optional. Not implemented in formulajs. A logical value that specifies the way to calculate the total accrued interest when the date of settlement is later than the date of first_interest. A value of TRUE (1) returns the total accrued interest from issue to settlement. A value of FALSE (0) returns the accrued interest from first_interest to settlement. If you do not enter the argument, it defaults to TRUE.
 * @returns
 */
export function ACCRINT(
  issue: any,
  first_interest: any,
  settlement: any,
  rate: any,
  par: any,
  frequency: any,
  basis: any
): number | Error

/**
 * -- Not implemented --
 *
 * Returns the accrued interest for a security that pays interest at maturity.
 *
 * Category: Financial
 *
 * @param {*} issue The security's issue date.
 * @param {*} settlement The security's maturity date.
 * @param {*} rate The security's annual coupon rate.
 * @param {*} par The security's par value. If you omit par, ACCRINTM uses $1,000.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function ACCRINTM(): void

/**
 * Returns the arccosine of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The cosine of the angle you want and must be from -1 to 1.
 * @returns
 */
export function ACOS(number: any): number | Error

/**
 * Returns the inverse hyperbolic cosine of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number Any real number equal to or greater than 1.
 * @returns
 */
export function ACOSH(number: any): number | Error

/**
 * Returns the arccotangent of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number Number is the cotangent of the angle you want. This must be a real number.
 * @returns
 */
export function ACOT(number: any): number | Error

/**
 * Returns the hyperbolic arccotangent of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The absolute value of Number must be greater than 1.
 * @returns
 */
export function ACOTH(number: any): number | Error

/**
 * Formula.js only
 *
 * @param {*} num1
 * @param {*} num2
 * @returns
 */
export function ADD(num1: any, num2: any, ...args: any[]): any

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
export function AGGREGATE(function_num: any, options: any, ref1: any, ref2: any): any

/**
 * -- Not implemented --
 *
 * Returns the depreciation for each accounting period by using a depreciation coefficient.
 *
 * Category: Financial
 *
 * @param {*} cost The cost of the asset.
 * @param {*} date_purchased The date of the purchase of the asset.
 * @param {*} first_period The date of the end of the first period.
 * @param {*} salvage The salvage value at the end of the life of the asset.
 * @param {*} period The period.
 * @param {*} rate The rate of depreciation.
 * @param {*} basis Optional. The year basis to be used.
 * @returns
 */
export function AMORDEGRC(): void

/**
 * -- Not implemented --
 *
 * Returns the depreciation for each accounting period.
 *
 * Category: Financial
 *
 * @param {*} cost The cost of the asset.
 * @param {*} date_purchased The date of the purchase of the asset.
 * @param {*} first_period The date of the end of the first period.
 * @param {*} salvage The salvage value at the end of the life of the asset.
 * @param {*} period The period.
 * @param {*} rate The rate of depreciation.
 * @param {*} basis Optional. The year basis to be used.
 * @returns
 */
export function AMORLINC(): void

/**
 * Returns TRUE if all of its arguments are TRUE.
 *
 * Category: Logical
 *
 * @returns
 */
export function AND(...args: any[]): any

/**
 * Converts a Roman number to Arabic, as a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} text A string enclosed in quotation marks, an empty string (""), or a reference to a value containing text.
 * @returns
 */
export function ARABIC(text: any): number | Error
export function ARGS2ARRAY(...args: any[]): any

/**
 * -- Not implemented --
 *
 * Changes full-width (double-byte) English letters or katakana within a character string to half-width (single-byte) characters.
 *
 * Category: Text
 *
 * @param {*} text The text or a reference to a value that contains the text you want to change. If text does not contain any full-width letters, text is not changed.
 * @returns
 */
export function ASC(): void

/**
 * Returns the arcsine of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The sine of the angle you want and must be from -1 to 1.
 * @returns
 */
export function ASIN(number: any): number | Error

/**
 * Returns the inverse hyperbolic sine of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number Any real number.
 * @returns
 */
export function ASINH(number: any): number | Error

/**
 * Returns the arctangent of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The tangent of the angle you want.
 * @returns
 */
export function ATAN(number: any): number | Error

/**
 * Returns the arctangent from x- and y-coordinates.
 *
 * Category: Math and trigonometry
 *
 * @param {*} x_num The x-coordinate of the point.
 * @param {*} y_num The y-coordinate of the point.
 * @returns
 */
export function ATAN2(x_num: any, y_num: any): any

/**
 * Returns the inverse hyperbolic tangent of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number Any real number between 1 and -1.
 * @returns
 */
export function ATANH(number: any): number | Error

/**
 * Returns the average of the absolute deviations of data points from their mean.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number1 is required, subsequent numbers are optional. 1 to 255 arguments for which you want the average of the absolute deviations. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
export function AVEDEV(...args: any[]): number | Error

/**
 * Returns the average of its arguments.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ...Numbers, value references or ranges for which you want the average.
 * @returns
 */
export function AVERAGE(...args: any[]): any

/**
 * Returns the average of its arguments, including numbers, text, and logical values.
 *
 * Category: Statistical
 *
 * @param {*} args value1, value2, ... Value1 is required, subsequent values are optional. 1 to 255 values, ranges of values, or values for which you want the average.
 * @returns
 */
export function AVERAGEA(...args: any[]): any

/**
 * Returns the average (arithmetic mean) of all the values in a range that meet a given criteria.
 *
 * Category: Statistical
 *
 * @param {*} range One or more values to average, including numbers or names, arrays, or references that contain numbers.
 * @param {*} criteria The criteria in the form of a number, expression, value reference, or text that defines which values are averaged.
 * @param {*} average_range Optional. The actual set of values to average. If omitted, range is used.
 * @returns
 */
export function AVERAGEIF(range: any, criteria: any, average_range: any, ...args: any[]): number | Error

/**
 * Returns the average (arithmetic mean) of all values that meet multiple criteria.
 *
 * Category: Statistical
 *
 * @param {*} args One or more values to average, including numbers or names, arrays, or references that contain numbers.
 * @returns
 */
export function AVERAGEIFS(...args: any[]): number

/**
 * -- Not implemented --
 *
 * Converts a number to text, using the ß (baht) currency format.
 *
 * Category: Text
 *
 * @param {*} number A number you want to convert to text, or a reference to a value containing a number, or a formula that evaluates to a number.
 * @returns
 */
export function BAHTTEXT(): void

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
export function BASE(number: any, radix: any, min_length: any): any

/**
 * Returns the modified Bessel function In(x).
 *
 * Category: Engineering
 *
 * @param {*} x The value at which to evaluate the function.
 * @param {*} n The order of the Bessel function. If n is not an integer, it is truncated.
 * @returns
 */
export function BESSELI(x: any, n: any): any

/**
 * Returns the Bessel function Jn(x).
 *
 * Category: Engineering
 *
 * @param {*} x The value at which to evaluate the function.
 * @param {*} n The order of the Bessel function. If n is not an integer, it is truncated.
 * @returns
 */
export function BESSELJ(x: any, n: any): any

/**
 * Returns the modified Bessel function Kn(x).
 *
 * Category: Engineering
 *
 * @param {*} x The value at which to evaluate the function.
 * @param {*} n The order of the function. If n is not an integer, it is truncated.
 * @returns
 */
export function BESSELK(x: any, n: any): any

/**
 * Returns the Bessel function Yn(x).
 *
 * Category: Engineering
 *
 * @param {*} x The value at which to evaluate the function.
 * @param {*} n The order of the function. If n is not an integer, it is truncated.
 * @returns
 */
export function BESSELY(x: any, n: any): any
export namespace BETA {
  /**
   * Returns the beta cumulative distribution function.
   *
   * Category: Statistical
   *
   * @param {*} x The value between A and B at which to evaluate the function
   * @param {*} alpha A parameter of the distribution.
   * @param {*} beta A parameter of the distribution.
   * @param {*} cumulative A logical value that determines the form of the function. If cumulative is TRUE, BETA.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function.
   * @param {*} a Optional. A lower bound to the interval of x.
   * @param {*} b Optional. An upper bound to the interval of x.
   * @returns
   */
  function DIST(x: any, alpha: any, beta: any, cumulative: any, a: any, b: any, ...args: any[]): any

  /**
   * Returns the inverse of the cumulative distribution function for a specified beta distribution.
   *
   * Category: Statistical
   *
   * @param {*} probability A probability associated with the beta distribution.
   * @param {*} alpha A parameter of the distribution.
   * @param {*} beta A parameter the distribution.
   * @param {*} a Optional. A lower bound to the interval of x.
   * @param {*} b Optional. An upper bound to the interval of x.
   * @returns
   */
  function INV(probability: any, alpha: any, beta: any, a: any, b: any): any
}

/**
 * Returns the beta cumulative distribution function.
 *
 * Category: Statistical
 *
 * @param {*} x The value between A and B at which to evaluate the function
 * @param {*} alpha A parameter of the distribution.
 * @param {*} beta A parameter of the distribution.
 * @param {*} cumulative A logical value that determines the form of the function. If cumulative is TRUE, BETA.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function.
 * @param {*} a Optional. A lower bound to the interval of x.
 * @param {*} b Optional. An upper bound to the interval of x.
 * @returns
 */
export function BETADIST(x: any, alpha: any, beta: any, cumulative: any, a: any, b: any, ...args: any[]): any

/**
 * Returns the inverse of the cumulative distribution function for a specified beta distribution.
 *
 * Category: Statistical
 *
 * @param {*} probability A probability associated with the beta distribution.
 * @param {*} alpha A parameter of the distribution.
 * @param {*} beta A parameter the distribution.
 * @param {*} a Optional. A lower bound to the interval of x.
 * @param {*} b Optional. An upper bound to the interval of x.
 * @returns
 */
export function BETAINV(probability: any, alpha: any, beta: any, a: any, b: any): any

/**
 * Converts a binary number to decimal.
 *
 * Category: Engineering
 *
 * @param {*} number The binary number you want to convert. Number cannot contain more than 10 characters (10 bits). The most significant bit of number is the sign bit. The remaining 9 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @returns
 */
export function BIN2DEC(number: any): number | Error

/**
 * Converts a binary number to hexadecimal.
 *
 * Category: Engineering
 *
 * @param {*} number The binary number you want to convert. Number cannot contain more than 10 characters (10 bits). The most significant bit of number is the sign bit. The remaining 9 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @param {*} places Optional. The number of characters to use. If places is omitted, BIN2HEX uses the minimum number of characters necessary. Places is useful for padding the return value with leading 0s (zeros).
 * @returns
 */
export function BIN2HEX(number: any, places: any): string | Error

/**
 * Converts a binary number to octal.
 *
 * Category: Engineering
 *
 * @param {*} number The binary number you want to convert. Number cannot contain more than 10 characters (10 bits). The most significant bit of number is the sign bit. The remaining 9 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @param {*} places Optional. The number of characters to use. If places is omitted, BIN2OCT uses the minimum number of characters necessary. Places is useful for padding the return value with leading 0s (zeros).
 * @returns
 */
export function BIN2OCT(number: any, places: any): string | Error
export namespace BINOM {
  /**
   * Returns the individual term binomial distribution probability.
   *
   * Category: Statistical
   *
   * @param {*} number_s The number of successes in trials.
   * @param {*} trials The number of independent trials.
   * @param {*} probability_s The probability of success on each trial.
   * @param {*} cumulative A logical value that determines the form of the function. If cumulative is TRUE, then BINOM.DIST returns the cumulative distribution function, which is the probability that there are at most number_s successes; if FALSE, it returns the probability mass function, which is the probability that there are number_s successes.
   * @returns
   */
  function DIST(number_s: any, trials: any, probability_s: any, cumulative: any): any
  namespace DIST {
    /**
     * Returns the probability of a trial result using a binomial distribution.
     *
     * Category: Statistical
     *
     * @param {*} trials The number of independent trials. Must be greater than or equal to 0.
     * @param {*} probability_s The probability of success in each trial. Must be greater than or equal to 0 and less than or equal to 1.
     * @param {*} number_s The number of successes in trials. Must be greater than or equal to 0 and less than or equal to Trials.
     * @param {*} number_s2 Optional. If provided, returns the probability that the number of successful trials will fall between Number_s and number_s2. Must be greater than or equal to Number_s and less than or equal to Trials.
     * @returns
     */
    function RANGE(trials: any, probability_s: any, number_s: any, number_s2: any): number | Error
  }

  /**
   * Returns the smallest value for which the cumulative binomial distribution is less than or equal to a criterion value.
   *
   * Category: Statistical
   *
   * @param {*} trials The number of Bernoulli trials.
   * @param {*} probability_s The probability of a success on each trial.
   * @param {*} alpha The criterion value.
   * @returns
   */
  function INV(trials: any, probability_s: any, alpha: any): number | Error
}

/**
 * Returns the individual term binomial distribution probability.
 *
 * Category: Statistical
 *
 * @param {*} number_s The number of successes in trials.
 * @param {*} trials The number of independent trials.
 * @param {*} probability_s The probability of success on each trial.
 * @param {*} cumulative A logical value that determines the form of the function. If cumulative is TRUE, then BINOM.DIST returns the cumulative distribution function, which is the probability that there are at most number_s successes; if FALSE, it returns the probability mass function, which is the probability that there are number_s successes.
 * @returns
 */
export function BINOMDIST(number_s: any, trials: any, probability_s: any, cumulative: any): any
export namespace BINOMDIST {}

/**
 * Returns a 'Bitwise And' of two numbers.
 *
 * Category: Engineering
 *
 * @param {*} number1 Must be in decimal form and greater than or equal to 0.
 * @param {*} number2 Must be in decimal form and greater than or equal to 0.
 * @returns
 */
export function BITAND(number1: any, number2: any): number | Error

/**
 * Returns a value number shifted left by shift_amount bits.
 *
 * Category: Engineering
 *
 * @param {*} number Number must be an integer greater than or equal to 0.
 * @param {*} shift_amount Shift_amount must be an integer.
 * @returns
 */
export function BITLSHIFT(number: any, shift_amount: any): number | Error

/**
 * Returns a bitwise OR of 2 numbers.
 *
 * Category: Engineering
 *
 * @param {*} number1 Must be in decimal form and greater than or equal to 0.
 * @param {*} number2 Must be in decimal form and greater than or equal to 0.
 * @returns
 */
export function BITOR(number1: any, number2: any): number | Error

/**
 * Returns a value number shifted right by shift_amount bits.
 *
 * Category: Engineering
 *
 * @param {*} number Must be an integer greater than or equal to 0.
 * @param {*} shift_amount Must be an integer.
 * @returns
 */
export function BITRSHIFT(number: any, shift_amount: any): number | Error

/**
 * Returns a bitwise 'Exclusive Or' of two numbers.
 *
 * Category: Engineering
 *
 * @param {*} number1 Must be greater than or equal to 0.
 * @param {*} number2 Must be greater than or equal to 0.
 * @returns
 */
export function BITXOR(number1: any, number2: any): number | Error

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
export function CEILING(number: any, significance: any, mode: any): any
export namespace CEILING {
  export { CEILING as MATH }
  export { CEILING as PRECISE }
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
export function CEILINGMATH(number: any, significance: any, mode: any): any
export namespace CEILINGMATH {}

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
export function CEILINGPRECISE(number: any, significance: any, mode: any): any
export namespace CEILINGPRECISE {}

/**
 * -- Not implemented --
 *
 * Returns information about the formatting, location, or contents of a value.
 *
 * Category: Information
 *
 * @returns
 */
export function CELL(): void

/**
 * Returns the character specified by the code number.
 *
 * Category: Text
 *
 * @param {*} number A number between 1 and 255 specifying which character you want. The character is from the character set used by your computer. Note: Excel for the web supports only CHAR(9), CHAR(10), CHAR(13), and CHAR(32) and above.
 * @returns
 */
export function CHAR(number: any): string | Error

/**
 * Returns the cumulative beta probability density function.
 *
 * Category: Statistical
 *
 * @param {*} x The value at which you want to evaluate the distribution.
 * @param {*} deg_freedom The number of degrees of freedom.
 * @param {*} cumulative A logical value that determines the form of the function. If cumulative is TRUE, CHISQ.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function.
 * @returns
 */
export function CHIDIST(x: any, deg_freedom: any, cumulative: any): any
export namespace CHIDIST {
  /**
   * Returns the one-tailed probability of the chi-squared distribution.
   *
   * Category: Statistical
   *
   * @param {*} x The value at which you want to evaluate the distribution.
   * @param {*} deg_freedom The number of degrees of freedom.
   * @returns
   */
  function RT(x: any, deg_freedom: any): number | Error
}

/**
 * Returns the one-tailed probability of the chi-squared distribution.
 *
 * Category: Statistical
 *
 * @param {*} x The value at which you want to evaluate the distribution.
 * @param {*} deg_freedom The number of degrees of freedom.
 * @returns
 */
export function CHIDISTRT(x: any, deg_freedom: any): number | Error

/**
 * Returns the cumulative beta probability density function.
 *
 * Category: Statistical
 *
 * @param {*} probability A probability associated with the chi-squared distribution.
 * @param {*} deg_freedom The number of degrees of freedom.
 * @returns
 */
export function CHIINV(probability: any, deg_freedom: any): any
export namespace CHIINV {
  /**
   * Returns the inverse of the one-tailed probability of the chi-squared distribution.
   *
   * Category: Statistical
   *
   * @param {*} probability A probability associated with the chi-squared distribution.
   * @param {*} deg_freedom The number of degrees of freedom.
   * @returns
   */
  function RT(probability: any, deg_freedom: any): any
}

/**
 * Returns the inverse of the one-tailed probability of the chi-squared distribution.
 *
 * Category: Statistical
 *
 * @param {*} probability A probability associated with the chi-squared distribution.
 * @param {*} deg_freedom The number of degrees of freedom.
 * @returns
 */
export function CHIINVRT(probability: any, deg_freedom: any): any
export namespace CHISQ {
  /**
   * Returns the cumulative beta probability density function.
   *
   * Category: Statistical
   *
   * @param {*} x The value at which you want to evaluate the distribution.
   * @param {*} deg_freedom The number of degrees of freedom.
   * @param {*} cumulative A logical value that determines the form of the function. If cumulative is TRUE, CHISQ.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function.
   * @returns
   */
  function DIST(x: any, deg_freedom: any, cumulative: any): any
  namespace DIST {}

  /**
   * Returns the cumulative beta probability density function.
   *
   * Category: Statistical
   *
   * @param {*} probability A probability associated with the chi-squared distribution.
   * @param {*} deg_freedom The number of degrees of freedom.
   * @returns
   */
  function INV(probability: any, deg_freedom: any): any
  namespace INV {}

  /**
   * Returns the test for independence.
   *
   * Category: Statistical
   *
   * @param {*} actual_range The range of data that contains observations to test against expected values.
   * @param {*} expected_range The range of data that contains the ratio of the product of row totals and column totals to the grand total.
   * @returns
   */
  function TEST(actual_range: any, expected_range: any, ...args: any[]): number | Error
}

/**
 * Returns the test for independence.
 *
 * Category: Statistical
 *
 * @param {*} actual_range The range of data that contains observations to test against expected values.
 * @param {*} expected_range The range of data that contains the ratio of the product of row totals and column totals to the grand total.
 * @returns
 */
export function CHITEST(actual_range: any, expected_range: any, ...args: any[]): number | Error

/**
 * Chooses a value from a list of values.
 *
 * Category: Lookup and reference
 *
 * @param {*} index_num Specifies which value argument is selected. Index_num must be a number between 1 and 254, or a formula or reference to a value containing a number between 1 and 254. If index_num is 1, CHOOSE returns value1; if it is 2, CHOOSE returns value2; and so on. If index_num is less than 1 or greater than the number of the last value in the list, CHOOSE returns the #VALUE! error value. If index_num is a fraction, it is truncated to the lowest integer before being used.
 - If index_num is 1, CHOOSE returns value1; if it is 2, CHOOSE returns value2; and so on.
 - If index_num is less than 1 or greater than the number of the last value in the list, CHOOSE returns the #VALUE! error value.
 - If index_num is a fraction, it is truncated to the lowest integer before being used.
 * @param {*} args value1, value2, ... Value 1 is required, subsequent values are optional. 1 to 254 value arguments from which CHOOSE selects a value or an action to perform based on index_num. The arguments can be numbers, value references, defined names, formulas, functions, or text.
 * @returns
 */
export function CHOOSE(...args: any[]): any

/**
 * Removes all nonprintable characters from text.
 *
 * Category: Text
 *
 * @param {*} text Any worksheet information from which you want to remove nonprintable characters.
 * @returns
 */
export function CLEAN(text: any): any

/**
 * Returns a numeric code for the first character in a text string.
 *
 * Category: Text
 *
 * @param {*} text The text for which you want the code of the first character.
 * @returns
 */
export function CODE(text: any): any

/**
 * Returns the column number of a reference.
 *
 * Category: Lookup and reference
 *
 * @param {*} reference the value or range of values for which you want to return the column number.
 * @param {*} index
 * @returns
 */
export function COLUMN(reference: any, index: any, ...args: any[]): any

/**
 * Returns the number of columns in a reference.
 *
 * Category: Lookup and reference
 *
 * @param {*} array An array or array formula, or a reference to a range of values for which you want the number of columns.
 * @returns
 */
export function COLUMNS(array: any, ...args: any[]): any

/**
 * Returns the number of combinations for a given number of objects.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The number of items.
 * @param {*} number_chosen The number of items in each combination.
 * @returns
 */
export function COMBIN(number: any, number_chosen: any): any

/**
 * Returns the number of combinations with repetitions for a given number of items.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number Must be greater than or equal to 0, and greater than or equal to Number_chosen. Non-integer values are truncated.
 * @param {*} number_chosen Must be greater than or equal to 0. Non-integer values are truncated.
 * @returns
 */
export function COMBINA(number: any, number_chosen: any): any

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
export function COMPLEX(real_num: any, i_num: any, suffix: any): any

/**
 * Joins several text items into one text item.
 *
 * Category: Text
 *
 * @returns
 */
export function CONCAT(...args: any[]): any

/**
 * Joins several text items into one text item.
 *
 * Category: Text
 *
 * @returns
 */
export function CONCATENATE(...args: any[]): any
export namespace CONFIDENCE {
  /**
   * Returns the confidence interval for a population mean.
   *
   * Category: Statistical
   *
   * @param {*} alpha The significance level used to compute the confidence level. The confidence level equals 100*(1 - alpha)%, or in other words, an alpha of 0.05 indicates a 95 percent confidence level.
   * @param {*} standard_dev The population standard deviation for the data range and is assumed to be known.
   * @param {*} size The sample size.
   * @returns
   */
  function NORM(alpha: any, standard_dev: any, size: any): number | Error

  /**
   * Returns the confidence interval for a population mean, using a Student's t distribution.
   *
   * Category: Statistical
   *
   * @param {*} alpha The significance level used to compute the confidence level. The confidence level equals 100*(1 - alpha)%, or in other words, an alpha of 0.05 indicates a 95 percent confidence level.
   * @param {*} standard_dev The population standard deviation for the data range and is assumed to be known.
   * @param {*} size The sample size.
   * @returns
   */
  function T(alpha: any, standard_dev: any, size: any): number | Error
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
export function CONVERT(number: any, from_unit: any, to_unit: any): number | Error

/**
 * Returns the correlation coefficient between two data sets.
 *
 * Category: Statistical
 *
 * @param {*} array1 A range of value values.
 * @param {*} array2 A second range of value values.
 * @returns
 */
export function CORREL(array1: any, array2: any): any

/**
 * Returns the cosine of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The angle in radians for which you want the cosine.
 * @returns
 */
export function COS(number: any): number | Error

/**
 * Returns the hyperbolic cosine of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number Any real number for which you want to find the hyperbolic cosine.
 * @returns
 */
export function COSH(number: any): number | Error

/**
 * Returns the hyperbolic cosine of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The angle in radians for which you want the cotangent.
 * @returns
 */
export function COT(number: any): number | Error

/**
 * Returns the cotangent of an angle.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number
 * @returns
 */
export function COTH(number: any): number | Error

/**
 * Counts how many numbers are in the list of arguments.
 *
 * Category: Statistical
 *
 * @param {*} args Cell reference, or range within which you want to count numbers.count numbers.
 * @returns
 */
export function COUNT(...args: any[]): any

/**
 * Counts how many values are in the list of arguments.
 *
 * Category: Statistical
 *
 * @param {*} args Arguments representing the values that you want to count.
 * @returns
 */
export function COUNTA(...args: any[]): number

/**
 * Counts the number of blank values within a range.
 *
 * Category: Statistical
 *
 * @param {*} args The range from which you want to count the blank values.
 * @returns
 */
export function COUNTBLANK(...args: any[]): number

/**
 * Counts the number of values within a range that meet the given criteria.
 *
 * Category: Statistical
 *
 * @returns
 */
export function COUNTIF(range: any, criteria: any): any

/**
 * Counts the number of values within a range that meet multiple criteria.
 *
 * Category: Statistical
 *
 * @param {*} args Range in which to evaluate the associated criteria.
 * @returns
 */
export function COUNTIFS(...args: any[]): number

/**
 * Formula.js only
 *
 * @param {*} range
 * @param {*} value
 * @returns
 */
export function COUNTIN(range: any, value: any): number

/**
 * Formula.js only
 *
 * @returns
 */
export function COUNTUNIQUE(...args: any[]): any

/**
 * -- Not implemented --
 *
 * Returns the number of days from the beginning of the coupon period to the settlement date.
 *
 * Category: Financial
 *
 * @param {*} settlement The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer.
 * @param {*} maturity The security's maturity date. The maturity date is the date when the security expires.
 * @param {*} frequency The number of coupon payments per year. For annual payments, frequency = 1; for semiannual, frequency = 2; for quarterly, frequency = 4.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function COUPDAYBS(): void

/**
 * -- Not implemented --
 *
 * Returns the number of days in the coupon period that contains the settlement date.
 *
 * Category: Financial
 *
 * @param {*} settlement The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer.
 * @param {*} maturity The security's maturity date. The maturity date is the date when the security expires.
 * @param {*} frequency The number of coupon payments per year. For annual payments, frequency = 1; for semiannual, frequency = 2; for quarterly, frequency = 4.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function COUPDAYS(): void

/**
 * -- Not implemented --
 *
 * Returns the number of days from the settlement date to the next coupon date.
 *
 * Category: Financial
 *
 * @param {*} settlement The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer.
 * @param {*} maturity The security's maturity date. The maturity date is the date when the security expires.
 * @param {*} frequency The number of coupon payments per year. For annual payments, frequency = 1; for semiannual, frequency = 2; for quarterly, frequency = 4.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function COUPDAYSNC(): void

/**
 * -- Not implemented --
 *
 * Returns the next coupon date after the settlement date.
 *
 * Category: Financial
 *
 * @param {*} settlement The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer.
 * @param {*} maturity The security's maturity date. The maturity date is the date when the security expires.
 * @param {*} frequency The number of coupon payments per year. For annual payments, frequency = 1; for semiannual, frequency = 2; for quarterly, frequency = 4.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function COUPNCD(): void

/**
 * -- Not implemented --
 *
 * Returns the number of coupons payable between the settlement date and maturity date.
 *
 * Category: Financial
 *
 * @param {*} settlement The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer.
 * @param {*} maturity The security's maturity date. The maturity date is the date when the security expires.
 * @param {*} frequency The number of coupon payments per year. For annual payments, frequency = 1; for semiannual, frequency = 2; for quarterly, frequency = 4.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function COUPNUM(): void

/**
 * -- Not implemented --
 *
 * Returns the previous coupon date before the settlement date.
 *
 * Category: Financial
 *
 * @param {*} settlement The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer.
 * @param {*} maturity The security's maturity date. The maturity date is the date when the security expires.
 * @param {*} frequency The number of coupon payments per year. For annual payments, frequency = 1; for semiannual, frequency = 2; for quarterly, frequency = 4.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function COUPPCD(): void

/**
 * Returns covariance, the average of the products of paired deviations.
 *
 * Category: Statistical
 *
 * @param {*} array1 The first value range of integers.
 * @param {*} array2 The second value range of integers.
 * @returns
 */
export function COVAR(array1: any, array2: any): number | Error
export namespace COVARIANCE {
  /**
   * Returns covariance, the average of the products of paired deviations.
   *
   * Category: Statistical
   *
   * @param {*} array1 The first value range of integers.
   * @param {*} array2 The second value range of integers.
   * @returns
   */
  function P(array1: any, array2: any): number | Error

  /**
   * Returns the sample covariance, the average of the products deviations for each data point pair in two data sets.
   *
   * Category: Statistical
   *
   * @param {*} array1 The first value range of integers.
   * @param {*} array2 The second value range of integers.
   * @returns
   */
  function S(array1: any, array2: any): any
}

/**
 * Returns covariance, the average of the products of paired deviations.
 *
 * Category: Statistical
 *
 * @param {*} array1 The first value range of integers.
 * @param {*} array2 The second value range of integers.
 * @returns
 */
export function COVARIANCEP(array1: any, array2: any): number | Error

/**
 * Returns the sample covariance, the average of the products deviations for each data point pair in two data sets.
 *
 * Category: Statistical
 *
 * @param {*} array1 The first value range of integers.
 * @param {*} array2 The second value range of integers.
 * @returns
 */
export function COVARIANCES(array1: any, array2: any): any

/**
 * Returns the smallest value for which the cumulative binomial distribution is less than or equal to a criterion value.
 *
 * Category: Statistical
 *
 * @param {*} trials The number of Bernoulli trials.
 * @param {*} probability_s The probability of a success on each trial.
 * @param {*} alpha The criterion value.
 * @returns
 */
export function CRITBINOM(trials: any, probability_s: any, alpha: any): number | Error

/**
 * Returns the cosecant of an angle.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number
 * @returns
 */
export function CSC(number: any): number | Error

/**
 * Returns the hyperbolic cosecant of an angle.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number
 * @returns
 */
export function CSCH(number: any): number | Error

/**
 * Returns the cumulative interest paid between two periods.
 *
 * Category: Financial
 *
 * @param {*} rate The interest rate.
 * @param {*} nper The total number of payment periods.
 * @param {*} pv The present value.
 * @param {*} start_period The first period in the calculation. Payment periods are numbered beginning with 1.
 * @param {*} end_period The last period in the calculation.
 * @param {*} type The timing of the payment.
 * @returns
 */
export function CUMIPMT(rate: any, nper: any, pv: any, start_period: any, end_period: any, type: any): number | Error

/**
 * Returns the cumulative principal paid on a loan between two periods.
 *
 * Category: Financial
 *
 * @param {*} rate The interest rate.
 * @param {*} nper The total number of payment periods.
 * @param {*} pv The present value.
 * @param {*} start_period The first period in the calculation. Payment periods are numbered beginning with 1.
 * @param {*} end_period The last period in the calculation.
 * @param {*} type The timing of the payment.
 * @returns
 */
export function CUMPRINC(rate: any, nper: any, pv: any, start_period: any, end: any, type: any): number | Error

/**
 * Returns the serial number of a particular date.
 *
 * Category: Date and time
 *
 * @param {*} year Year
 * @param {*} month Month
 * @param {*} day Day
 * @returns
 */
export function DATE(year: any, month: any, day: any): Date | Error

/**
 * Calculates the number of days, months, or years between two dates. This function is useful in formulas where you need to calculate an age.
 *
 * Category: Date and time
 *
 * @param {*} start_date A date that represents the first, or starting date of a given period.
 * @param {*} end_date A date that represents the last, or ending, date of the period.
 * @param {*} unit The type of information that you want returned, where:
 - "Y": The number of complete years in the period.
 - "M": The number of complete months in the period.
 - "D": The number of days in the period.
 - "MD": The difference between the days in start_date and end_date. The months and years of the dates are ignored.
 - "YM": The difference between the months in start_date and end_date. The days and years of the dates are ignored
 - "YD": The difference between the days of start_date and end_date. The years of the dates are ignored.
 * @returns
 */
export function DATEDIF(start_date: any, end_date: any, unit: any): number | Error

/**
 * Converts a date in the form of text to a serial number.
 *
 * Category: Date and time
 *
 * @param {*} date_text Text that represents a date in an Excel date format, or a reference to a value that contains text that represents a date in an Excel date format.
 * @returns
 */
export function DATEVALUE(date_text: any): Date | Error

/**
 * Returns the average of selected database entries.
 *
 * Category: Database
 *
 * @param {*} database Range of values that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column.
 * @param {*} field Indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as "Age" or "Yield," or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on.
 * @param {*} criteria Range of values that contains the conditions you specify. You can use any range for the criteria argument, as long as it includes at least one column label and at least one value below the column label in which you specify a condition for the column.
 * @returns
 */
export function DAVERAGE(database: any, field: any, criteria: any): number | Error

/**
 * Converts a serial number to a day of the month.
 *
 * Category: Date and time
 *
 * @param {*} serial_number The date of the day you are trying to find.
 * @returns
 */
export function DAY(serial_number: any): any

/**
 * Returns the number of days between two dates.
 *
 * Category: Date and time
 *
 * @param {*} end_date Start_date and End_date are the two dates between which you want to know the number of days.
 * @param {*} start_date Start_date and End_date are the two dates between which you want to know the number of days.
 * @returns
 */
export function DAYS(end_date: any, start_date: any): number | Error

/**
 * Calculates the number of days between two dates based on a 360-day year.
 *
 * Category: Date and time
 *
 * @param {*} start_date A date that represents the start date. If start_date occurs after end_date, the DAYS360 function returns a negative number.
 * @param {*} end_date A date that represents the end date.
 * @param {*} method Optional. A logical value that specifies whether to use the U.S. or European method in the calculation.
 * @returns
 */
export function DAYS360(start_date: any, end_date: any, method: any): number | Error

/**
 * Returns the depreciation of an asset for a specified period by using the fixed-declining balance method.
 *
 * Category: Financial
 *
 * @param {*} cost The initial cost of the asset.
 * @param {*} salvage The value at the end of the depreciation (sometimes called the salvage value of the asset).
 * @param {*} life The number of periods over which the asset is being depreciated (sometimes called the useful life of the asset).
 * @param {*} period The period for which you want to calculate the depreciation. Period must use the same units as life.
 * @param {*} month Optional. The number of months in the first year. If month is omitted, it is assumed to be 12.
 * @returns
 */
export function DB(cost: any, salvage: any, life: any, period: any, month: any): number | Error

/**
 * -- Not implemented --
 *
 * Changes half-width (single-byte) English letters or katakana within a character string to full-width (double-byte) characters.
 *
 * Category: Text
 *
 * @param {*} text The text or a reference to a value that contains the text you want to change. If text does not contain any half-width English letters or katakana, text is not changed.
 * @returns
 */
export function DBCS(): void

/**
 * Counts the values that contain numbers in a database.
 *
 * Category: Database
 *
 * @param {*} database The range of values that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column.
 * @param {*} field Indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as "Age" or "Yield," or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on.
 * @param {*} criteria The range of values that contains the conditions that you specify. You can use any range for the criteria argument, as long as the argument includes at least one column label and at least one value below the column label in which you specify a condition for the column.
 * @returns
 */
export function DCOUNT(database: any, field: any, criteria: any): any

/**
 * Counts nonblank values in a database.
 *
 * Category: Database
 *
 * @param {*} database The range of values that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column.
 * @param {*} field Optional. Indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as "Age" or "Yield," or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on.
 * @param {*} criteria The range of values that contains the conditions that you specify. You can use any range for the criteria argument, as long as it includes at least one column label and at least one value below the column label in which you specify a condition for the column.
 * @returns
 */
export function DCOUNTA(database: any, field: any, criteria: any): number | Error

/**
 * Returns the depreciation of an asset for a specified period by using the double-declining balance method or some other method that you specify.
 *
 * Category: Financial
 *
 * @param {*} cost The initial cost of the asset.
 * @param {*} salvage The value at the end of the depreciation (sometimes called the salvage value of the asset). This value can be 0.
 * @param {*} life The number of periods over which the asset is being depreciated (sometimes called the useful life of the asset).
 * @param {*} period The period for which you want to calculate the depreciation. Period must use the same units as life.
 * @param {*} factor Optional. The rate at which the balance declines. If factor is omitted, it is assumed to be 2 (the double-declining balance method).
 * @returns
 */
export function DDB(cost: any, salvage: any, life: any, period: any, factor: any): number | Error

/**
 * Converts a decimal number to binary.
 *
 * Category: Engineering
 *
 * @param {*} number The decimal integer you want to convert. If number is negative, valid place values are ignored and DEC2BIN returns a 10-character (10-bit) binary number in which the most significant bit is the sign bit. The remaining 9 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @param {*} places Optional. The number of characters to use. If places is omitted, DEC2BIN uses the minimum number of characters necessary. Places is useful for padding the return value with leading 0s (zeros).
 * @returns
 */
export function DEC2BIN(number: any, places: any): string | Error

/**
 * Converts a decimal number to hexadecimal.
 *
 * Category: Engineering
 *
 * @param {*} number The decimal integer you want to convert. If number is negative, places is ignored and DEC2HEX returns a 10-character (40-bit) hexadecimal number in which the most significant bit is the sign bit. The remaining 39 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @param {*} places Optional. The number of characters to use. If places is omitted, DEC2HEX uses the minimum number of characters necessary. Places is useful for padding the return value with leading 0s (zeros).
 * @returns
 */
export function DEC2HEX(number: any, places: any): any

/**
 * Converts a decimal number to octal.
 *
 * Category: Engineering
 *
 * @param {*} number The decimal integer you want to convert. If number is negative, places is ignored and DEC2OCT returns a 10-character (30-bit) octal number in which the most significant bit is the sign bit. The remaining 29 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @param {*} places Optional. The number of characters to use. If places is omitted, DEC2OCT uses the minimum number of characters necessary. Places is useful for padding the return value with leading 0s (zeros).
 * @returns
 */
export function DEC2OCT(number: any, places: any): any

/**
 * Converts a text representation of a number in a given base into a decimal number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} text
 * @param {*} radix Radix must be an integer.
 * @returns
 */
export function DECIMAL(text: any, radix: any, ...args: any[]): any

/**
 * Converts radians to degrees.
 *
 * Category: Math and trigonometry
 *
 * @param {*} angle The angle in radians that you want to convert.
 * @returns
 */
export function DEGREES(angle: any): number | Error

/**
 * Tests whether two values are equal.
 *
 * Category: Engineering
 *
 * @param {*} number1 The first number.
 * @param {*} number2 Optional. The second number. If omitted, number2 is assumed to be zero.
 * @returns
 */
export function DELTA(number1: any, number2: any): Error | 1 | 0

/**
 * Returns the sum of squares of deviations.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number1 is required, subsequent numbers are optional. 1 to 255 arguments for which you want to calculate the sum of squared deviations. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
export function DEVSQ(...args: any[]): number | Error

/**
 * Extracts from a database a single record that matches the specified criteria.
 *
 * Category: Database
 *
 * @param {*} database The range of values that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column.
 * @param {*} field Indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as "Age" or "Yield," or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on.
 * @param {*} criteria The range of values that contains the conditions that you specify. You can use any range for the criteria argument, as long as it includes at least one column label and at least one value below the column label in which you specify a condition for the column.
 * @returns
 */
export function DGET(database: any, field: any, criteria: any): any

/**
 * -- Not implemented --
 *
 * Returns the discount rate for a security.
 *
 * Category: Financial
 *
 * @param {*} settlement The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer.
 * @param {*} maturity The security's maturity date. The maturity date is the date when the security expires.
 * @param {*} pr The security's price per $100 face value.
 * @param {*} redemption The security's redemption value per $100 face value.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function DISC(): void

/**
 * Formula.js only
 *
 * @param {*} dividend
 * @param {*} divisor
 * @returns
 */
export function DIVIDE(dividend: any, divisor: any, ...args: any[]): any

/**
 * Returns the maximum value from selected database entries.
 *
 * Category: Database
 *
 * @param {*} database The range of values that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column.
 * @param {*} field Indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as "Age" or "Yield," or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on.
 * @param {*} criteria The range of values that contains the conditions that you specify. You can use any range for the criteria argument, as long as it includes at least one column label and at least one value below the column label in which you specify a condition for the column.
 * @returns
 */
export function DMAX(database: any, field: any, criteria: any): any

/**
 * Returns the minimum value from selected database entries.
 *
 * Category: Database
 *
 * @param {*} database The range of values that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column.
 * @param {*} field Indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as "Age" or "Yield," or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on.
 * @param {*} criteria The range of values that contains the conditions that you specify. You can use any range for the criteria argument, as long as it includes at least one column label and at least one value below the column label in which you specify a condition for the column.
 * @returns
 */
export function DMIN(database: any, field: any, criteria: any): any

/**
 * -- Not implemented --
 *
 * Converts a number to text, using the $ (dollar) currency format.
 *
 * Category: Text
 *
 * @param {*} number A number, a reference to a value containing a number, or a formula that evaluates to a number.
 * @param {*} decimals Optional. The number of digits to the right of the decimal point. If this is negative, the number is rounded to the left of the decimal point. If you omit decimals, it is assumed to be 2.
 * @returns
 */
export function DOLLAR(): void

/**
 * Converts a dollar price, expressed as a fraction, into a dollar price, expressed as a decimal number.
 *
 * Category: Financial
 *
 * @param {*} fractional_dollar A number expressed as an integer part and a fraction part, separated by a decimal symbol.
 * @param {*} fraction The integer to use in the denominator of the fraction.
 * @returns
 */
export function DOLLARDE(fractional_dollar: any, fraction: any): number | Error

/**
 * Converts a dollar price, expressed as a decimal number, into a dollar price, expressed as a fraction.
 *
 * Category: Financial
 *
 * @param {*} decimal_dollar A decimal number.
 * @param {*} fraction The integer to use in the denominator of a fraction.
 * @returns
 */
export function DOLLARFR(decimal_dollar: any, fraction: any): number | Error

/**
 * Multiplies the values in a particular field of records that match the criteria in a database.
 *
 * Category: Database
 *
 * @param {*} database The range of values that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column.
 * @param {*} field Indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as "Age" or "Yield," or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on.
 * @param {*} criteria The range of values that contains the conditions that you specify. You can use any range for the criteria argument, as long as it includes at least one column label and at least one value below the column label in which you specify a condition for the column.
 * @returns
 */
export function DPRODUCT(database: any, field: any, criteria: any): number | Error

/**
 * Estimates the standard deviation based on a sample of selected database entries.
 *
 * Category: Database
 *
 * @param {*} database The range of values that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column.
 * @param {*} field Indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as "Age" or "Yield," or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on.
 * @param {*} criteria The range of values that contains the conditions that you specify. You can use any range for the criteria argument, as long as it includes at least one column label and at least one value below the column label in which you specify a condition for the column.
 * @returns
 */
export function DSTDEV(database: any, field: any, criteria: any): number | Error

/**
 * Calculates the standard deviation based on the entire population of selected database entries.
 *
 * Category: Database
 *
 * @param {*} database The range of values that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column.
 * @param {*} field Indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as "Age" or "Yield," or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on.
 * @param {*} criteria The range of values that contains the conditions that you specify. You can use any range for the criteria argument, as long as it includes at least one column label and at least one value below the column label in which you specify a condition for the column.
 * @returns
 */
export function DSTDEVP(database: any, field: any, criteria: any): number | Error

/**
 * Adds the numbers in the field column of records in the database that match the criteria.
 *
 * Category: Database
 *
 * @param {*} database The range of values that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column.
 * @param {*} field Indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as "Age" or "Yield," or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on.
 * @param {*} criteria Is the range of values that contains the conditions that you specify. You can use any range for the criteria argument, as long as it includes at least one column label and at least one value below the column label in which you specify a condition for the column.
 * @returns
 */
export function DSUM(database: any, field: any, criteria: any): number | Error

/**
 * -- Not implemented --
 *
 * Returns the annual duration of a security with periodic interest payments.
 *
 * Category: Financial
 *
 * @param {*} settlement The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer.
 * @param {*} maturity The security's maturity date. The maturity date is the date when the security expires.
 * @param {*} coupon The security's annual coupon rate.
 * @param {*} yld The security's annual yield.
 * @param {*} frequency The number of coupon payments per year. For annual payments, frequency = 1; for semiannual, frequency = 2; for quarterly, frequency = 4.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function DURATION(): void

/**
 * Estimates variance based on a sample from selected database entries.
 *
 * Category: Database
 *
 * @param {*} database The range of values that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column.
 * @param {*} field Indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as "Age" or "Yield," or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on.
 * @param {*} criteria The range of values that contains the conditions that you specify. You can use any range for the criteria argument, as long as it includes at least one column label and at least one value below the column label in which you specify a condition for the column.
 * @returns
 */
export function DVAR(database: any, field: any, criteria: any): number | Error

/**
 * Calculates variance based on the entire population of selected database entries.
 *
 * Category: Database
 *
 * @param {*} database The range of values that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column.
 * @param {*} field Indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as "Age" or "Yield," or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on.
 * @param {*} criteria The range of values that contains the conditions that you specify. You can use any range for the criteria argument, as long as it includes at least one column label and at least one value below the column label in which you specify a condition for the column.
 * @returns
 */
export function DVARP(database: any, field: any, criteria: any): number | Error

/**
 * Formula.js only
 *
 * @returns
 */
export function E(): number

/**
 * Returns the serial number of the date that is the indicated number of months before or after the start date.
 *
 * Category: Date and time
 *
 * @param {*} start_date A date that represents the start date.
 * @param {*} months The number of months before or after start_date. A positive value for months yields a future date; a negative value yields a past date.
 * @returns
 */
export function EDATE(start_date: any, months: any): any

/**
 * Returns the effective annual interest rate.
 *
 * Category: Financial
 *
 * @param {*} nominal_rate The nominal interest rate.
 * @param {*} npery The number of compounding periods per year.
 * @returns
 */
export function EFFECT(nominal_rate: any, npery: any): number | Error

/**
 * Returns the serial number of the last day of the month before or after a specified number of months.
 *
 * Category: Date and time
 *
 * @param {*} start_date A date that represents the starting date.
 * @param {*} months The number of months before or after start_date. A positive value for months yields a future date; a negative value yields a past date.
 * @returns
 */
export function EOMONTH(start_date: any, months: any): Date | Error

/**
 * Formula.js only
 *
 * @param {*} value1
 * @param {*} value2
 * @returns
 */
export function EQ(value1: any, value2: any, ...args: any[]): boolean | Error

/**
 * Returns the error function.
 *
 * Category: Engineering
 *
 * @param {*} lower_limit The lower bound for integrating ERF.
 * @param {*} upper_limit Optional. The upper bound for integrating ERF. If omitted, ERF integrates between zero and lower_limit.
 * @returns
 */
export function ERF(lower_limit: any, upper_limit: any): any
export namespace ERF {
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
  function PRECISE(): never
}

/**
 * Returns the complementary error function.
 *
 * Category: Engineering
 *
 * @param {*} x The lower bound for integrating ERFC.
 * @returns
 */
export function ERFC(x: any): any
export namespace ERFC {
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
  function PRECISE(): never
}

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
export function ERFCPRECISE(): never

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
export function ERFPRECISE(): never
export namespace ERROR {
  function TYPE(error_val: any): Error | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
}

/**
 * Rounds a number up to the nearest even integer.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The value to round.
 * @returns
 */
export function EVEN(number: any): any

/**
 * Checks to see if two text values are identical.
 *
 * Category: Text
 *
 * @param {*} text1 The first text string.
 * @param {*} text2 The second text string.
 * @returns
 */
export function EXACT(text1: any, text2: any, ...args: any[]): any

/**
 * Returns e raised to the power of a given number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The exponent applied to the base e.
 * @returns
 */
export function EXP(number: any, ...args: any[]): any
export namespace EXPON {
  /**
   * Returns the exponential distribution.
   *
   * Category: Statistical
   *
   * @param {*} x The value of the function.
   * @param {*} lambda The parameter value.
   * @param {*} cumulative A logical value that indicates which form of the exponential function to provide. If cumulative is TRUE, EXPON.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function.
   * @returns
   */
  function DIST(x: any, lambda: any, cumulative: any): any
}

/**
 * Returns the exponential distribution.
 *
 * Category: Statistical
 *
 * @param {*} x The value of the function.
 * @param {*} lambda The parameter value.
 * @param {*} cumulative A logical value that indicates which form of the exponential function to provide. If cumulative is TRUE, EXPON.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function.
 * @returns
 */
export function EXPONDIST(x: any, lambda: any, cumulative: any): any
export namespace F {
  /**
   * Returns the F probability distribution.
   *
   * Category: Statistical
   *
   * @param {*} x The value at which to evaluate the function.
   * @param {*} deg_freedom1 The numerator degrees of freedom.
   * @param {*} deg_freedom2 The denominator degrees of freedom.
   * @param {*} cumulative A logical value that determines the form of the function. If cumulative is TRUE, F.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function.
   * @returns
   */
  function DIST(x: any, deg_freedom1: any, deg_freedom2: any, cumulative: any): any
  namespace DIST {
    /**
     * Returns the F probability distribution.
     *
     * Category: Statistical
     *
     * @param {*} x The value at which to evaluate the function.
     * @param {*} deg_freedom1 The numerator degrees of freedom.
     * @param {*} deg_freedom2 The denominator degrees of freedom.
     * @returns
     */
    function RT(x: any, deg_freedom1: any, deg_freedom2: any, ...args: any[]): number | Error
  }

  /**
   * Returns the inverse of the F probability distribution.
   *
   * Category: Statistical
   *
   * @param {*} probability A probability associated with the F cumulative distribution.
   * @param {*} deg_freedom1 The numerator degrees of freedom.
   * @param {*} deg_freedom2 The denominator degrees of freedom.
   * @returns
   */
  function INV(probability: any, deg_freedom1: any, deg_freedom2: any): any
  namespace INV {
    /**
     * Returns the inverse of the F probability distribution.
     *
     * Category: Statistical
     *
     * @param {*} probability A probability associated with the F cumulative distribution.
     * @param {*} deg_freedom1 The numerator degrees of freedom.
     * @param {*} deg_freedom2 The denominator degrees of freedom.
     * @returns
     */
    function RT(probability: any, deg_freedom1: any, deg_freedom2: any, ...args: any[]): any
  }

  /**
   * Returns the result of an F-test.
   *
   * Category: Statistical
   *
   * @param {*} array1 The first array or range of data.
   * @param {*} array2 The second array or range of data.
   * @returns
   */
  function TEST(array1: any, array2: any): number | Error
}

/**
 * Returns the factorial of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The nonnegative number for which you want the factorial. If number is not an integer, it is truncated.
 * @returns
 */
export function FACT(number: any): any

/**
 * Returns the double factorial of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The value for which to return the double factorial. If number is not an integer, it is truncated.
 * @returns
 */
export function FACTDOUBLE(number: any): any

/**
 * Returns the logical value FALSE.
 *
 * Category: Logical
 *
 * @returns
 */
export function FALSE(): boolean

/**
 * Returns the F probability distribution.
 *
 * Category: Statistical
 *
 * @param {*} x The value at which to evaluate the function.
 * @param {*} deg_freedom1 The numerator degrees of freedom.
 * @param {*} deg_freedom2 The denominator degrees of freedom.
 * @param {*} cumulative A logical value that determines the form of the function. If cumulative is TRUE, F.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function.
 * @returns
 */
export function FDIST(x: any, deg_freedom1: any, deg_freedom2: any, cumulative: any): any
export namespace FDIST {}

/**
 * Returns the F probability distribution.
 *
 * Category: Statistical
 *
 * @param {*} x The value at which to evaluate the function.
 * @param {*} deg_freedom1 The numerator degrees of freedom.
 * @param {*} deg_freedom2 The denominator degrees of freedom.
 * @returns
 */
export function FDISTRT(x: any, deg_freedom1: any, deg_freedom2: any, ...args: any[]): number | Error

/**
 * Locate one text string within a second text string, and return the number of the starting position of the first text string from the first character of the second text string.
 *
 * Category: Text
 *
 * @param {*} find_text The text you want to find.
 * @param {*} within_text The text containing the text you want to find.
 * @param {*} start_num Optional. Specifies the character at which to start the search. The first character in within_text is character number 1. If you omit start_num, it is assumed to be 1.
 * @returns
 */
export function FIND(find_text: any, within_text: any, start_num: any, ...args: any[]): any

/**
 * Formula.js only
 *
 * @param {*} database
 * @param {*} title
 * @returns
 */
export function FINDFIELD(database: any, title: any): Error

/**
 * Returns the inverse of the F probability distribution.
 *
 * Category: Statistical
 *
 * @param {*} probability A probability associated with the F cumulative distribution.
 * @param {*} deg_freedom1 The numerator degrees of freedom.
 * @param {*} deg_freedom2 The denominator degrees of freedom.
 * @returns
 */
export function FINV(probability: any, deg_freedom1: any, deg_freedom2: any): any
export namespace FINV {}

/**
 * Returns the inverse of the F probability distribution.
 *
 * Category: Statistical
 *
 * @param {*} probability A probability associated with the F cumulative distribution.
 * @param {*} deg_freedom1 The numerator degrees of freedom.
 * @param {*} deg_freedom2 The denominator degrees of freedom.
 * @returns
 */
export function FINVRT(probability: any, deg_freedom1: any, deg_freedom2: any, ...args: any[]): any

/**
 * Returns the Fisher transformation.
 *
 * Category: Statistical
 *
 * @param {*} x A numeric value for which you want the transformation.
 * @returns
 */
export function FISHER(x: any): number | Error

/**
 * Returns the inverse of the Fisher transformation.
 *
 * Category: Statistical
 *
 * @param {*} y The value for which you want to perform the inverse of the transformation.
 * @returns
 */
export function FISHERINV(y: any): number | Error

/**
 * -- Not implemented --
 *
 * Formats a number as text with a fixed number of decimals.
 *
 * Category: Text
 *
 * @param {*} number The number you want to round and convert to text.
 * @param {*} decimals Optional. The number of digits to the right of the decimal point.
 * @param {*} no_commas Optional. A logical value that, if TRUE, prevents FIXED from including commas in the returned text.
 * @returns
 */
export function FIXED(): void
export function FLATTEN(...args: any[]): any

/**
 * Rounds a number down, toward zero.
 *
 * Category: Compatibility
 *
 * @param {*} number The numeric value you want to round.
 * @param {*} significance The multiple to which you want to round.
 * @returns
 */
export function FLOOR(number: any, significance: any): any
export namespace FLOOR {
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
  export function MATH(number: any, significance: any, mode: any): any
  import PRECISE = FLOOR.MATH
  export { PRECISE }
}

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
export function FLOORMATH(number: any, significance: any, mode: any): any

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
export function FLOORPRECISE(number: any, significance: any, mode: any): any

/**
 * Returns a value along a linear trend.
 *
 * Category: Statistical
 *
 * @param {*} x The data point for which you want to predict a value.
 * @param {*} known_ys The dependent array or range of data.
 * @param {*} known_xs The independent array or range of data.
 * @returns
 */
export function FORECAST(x: any, known_ys: any, known_xs: any): number | Error

/**
 * Returns a frequency distribution as a vertical array.
 *
 * Category: Statistical
 *
 * @param {*} data_array An array of or reference to a set of values for which you want to count frequencies. If data_array contains no values, FREQUENCY returns an array of zeros.
 * @param {*} bins_array An array of or reference to intervals into which you want to group the values in data_array. If bins_array contains no values, FREQUENCY returns the number of elements in data_array.
 * @returns
 */
export function FREQUENCY(data_array: any, bins_array: any): number[] | Error

/**
 * Returns the result of an F-test.
 *
 * Category: Statistical
 *
 * @param {*} array1 The first array or range of data.
 * @param {*} array2 The second array or range of data.
 * @returns
 */
export function FTEST(array1: any, array2: any): number | Error

/**
 * Returns the future value of an investment.
 *
 * Category: Financial
 *
 * @param {*} rate The interest rate per period.
 * @param {*} nper The total number of payment periods in an annuity.
 * @param {*} pmt The payment made each period; it cannot change over the life of the annuity. Typically, pmt contains principal and interest but no other fees or taxes. If pmt is omitted, you must include the pv argument.
 * @param {*} pv Optional. The present value, or the lump-sum amount that a series of future payments is worth right now. If pv is omitted, it is assumed to be 0 (zero), and you must include the pmt argument.
 * @param {*} type Optional. The number 0 or 1 and indicates when payments are due. If type is omitted, it is assumed to be 0.
 * @returns
 */
export function FV(rate: any, nper: any, payment: any, value$1: any, type: any): number | Error

/**
 * Returns the future value of an initial principal after applying a series of compound interest rates.
 *
 * Category: Financial
 *
 * @param {*} principal The present value.
 * @param {*} schedule An array of interest rates to apply.
 * @returns
 */
export function FVSCHEDULE(principal: any, schedule: any): any

/**
 * Returns the Gamma function value.
 *
 * Category: Statistical
 *
 * @param {*} number Returns a number.
 * @returns
 */
export function GAMMA(number: any): any
export namespace GAMMA {
  /**
   * Returns the gamma distribution.
   *
   * Category: Statistical
   *
   * @param {*} x The value at which you want to evaluate the distribution.
   * @param {*} alpha A parameter to the distribution.
   * @param {*} beta A parameter to the distribution. If beta = 1, GAMMA.DIST returns the standard gamma distribution.
   * @param {*} cumulative A logical value that determines the form of the function. If cumulative is TRUE, GAMMA.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function.
   * @returns
   */
  function DIST(value$1: any, alpha: any, beta: any, cumulative: any, ...args: any[]): any

  /**
   * Returns the inverse of the gamma cumulative distribution.
   *
   * Category: Statistical
   *
   * @param {*} probability The probability associated with the gamma distribution.
   * @param {*} alpha A parameter to the distribution.
   * @param {*} beta A parameter to the distribution. If beta = 1, GAMMA.INV returns the standard gamma distribution.
   * @returns
   */
  function INV(probability: any, alpha: any, beta: any, ...args: any[]): any
}

/**
 * Returns the gamma distribution.
 *
 * Category: Statistical
 *
 * @param {*} x The value at which you want to evaluate the distribution.
 * @param {*} alpha A parameter to the distribution.
 * @param {*} beta A parameter to the distribution. If beta = 1, GAMMA.DIST returns the standard gamma distribution.
 * @param {*} cumulative A logical value that determines the form of the function. If cumulative is TRUE, GAMMA.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function.
 * @returns
 */
export function GAMMADIST(value$1: any, alpha: any, beta: any, cumulative: any, ...args: any[]): any

/**
 * Returns the inverse of the gamma cumulative distribution.
 *
 * Category: Statistical
 *
 * @param {*} probability The probability associated with the gamma distribution.
 * @param {*} alpha A parameter to the distribution.
 * @param {*} beta A parameter to the distribution. If beta = 1, GAMMA.INV returns the standard gamma distribution.
 * @returns
 */
export function GAMMAINV(probability: any, alpha: any, beta: any, ...args: any[]): any

/**
 * Returns the natural logarithm of the gamma function, Γ(x).
 *
 * Category: Statistical
 *
 * @param {*} x The value for which you want to calculate GAMMALN.
 * @returns
 */
export function GAMMALN(x: any): any
export namespace GAMMALN {
  /**
   * Returns the natural logarithm of the gamma function, Γ(x).
   *
   * Category: Statistical
   *
   * @param {*} x The value for which you want to calculate GAMMALN.PRECISE.
   * @returns
   */
  function PRECISE(x: any, ...args: any[]): any
}

/**
 * Returns the natural logarithm of the gamma function, Γ(x).
 *
 * Category: Statistical
 *
 * @param {*} x The value for which you want to calculate GAMMALN.PRECISE.
 * @returns
 */
export function GAMMALNPRECISE(x: any, ...args: any[]): any

/**
 * Returns 0.5 less than the standard normal cumulative distribution.
 *
 * Category: Statistical
 *
 * @param {*} z Returns a number.
 * @returns
 */
export function GAUSS(z: any): number | Error

/**
 * Returns the greatest common divisor.
 *
 * Category: Math and trigonometry
 *
 * @param {*} args number1, number2, ... Number1 is required, subsequent numbers are optional. 1 to 255 values. If any value is not an integer, it is truncated.
 * @returns
 */
export function GCD(...args: any[]): any

/**
 * Returns the geometric mean.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number1 is required, subsequent numbers are optional. 1 to 255 arguments for which you want to calculate the mean. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
export function GEOMEAN(...args: any[]): any

/**
 * Tests whether a number is greater than a threshold value.
 *
 * Category: Engineering
 *
 * @param {*} number The value to test against step.
 * @param {*} step Optional. The threshold value. If you omit a value for step, GESTEP uses zero.
 * @returns
 */
export function GESTEP(number: any, step: any): any

/**
 * Returns values along an exponential trend.
 *
 * Category: Statistical
 *
 * @param {*} known_y The set of y-values you already know in the relationship y = b*m^x.
 - If the array known_y's is in a single column, then each column of known_x's is interpreted as a separate variable.
 - If the array known_y's is in a single row, then each row of known_x's is interpreted as a separate variable.
 - If any of the numbers in known_y's is 0 or negative, GROWTH returns the #NUM! error value.
 * @param {*} known_x Optional. An optional set of x-values that you may already know in the relationship y = b*m^x.
 - The array known_x's can include one or more sets of variables. If only one variable is used, known_y's and known_x's can be ranges of any shape, as long as they have equal dimensions. If more than one variable is used, known_y's must be a vector (that is, a range with a height of one row or a width of one column).
 - If known_x's is omitted, it is assumed to be the array {1,2,3,...} that is the same size as known_y's.
 * @param {*} new_x Optional. Are new x-values for which you want GROWTH to return corresponding y-values.
 - new_x's must include a column (or row) for each independent variable, just as known_x's does. So, if known_y's is in a single column, known_x's and new_x's must have the same number of columns. If known_y's is in a single row, known_x's and new_x's must have the same number of rows.
 - If new_x's is omitted, it is assumed to be the same as known_x's.
 - If both known_x's and new_x's are omitted, they are assumed to be the array {1,2,3,...} that is the same size as known_y's.
 * @param {*} use_const Optional. A logical value specifying whether to force the constant b to equal 1. If const is TRUE or omitted, b is calculated normally. If const is FALSE, b is set equal to 1 and the m-values are adjusted so that y = m^x.
 - If const is TRUE or omitted, b is calculated normally.
 - If const is FALSE, b is set equal to 1 and the m-values are adjusted so that y = m^x.
 * @returns
 */
export function GROWTH(known_y: any, known_x: any, new_x: any, use_const: any): number[] | Error

/**
 * Formula.js only
 *
 * @param {*} num1
 * @param {*} num2
 * @returns
 */
export function GT(num1: any, num2: any, ...args: any[]): any

/**
 * Formula.js only
 *
 * @param {*} num1
 * @param {*} num2
 * @returns
 */
export function GTE(num1: any, num2: any, ...args: any[]): any

/**
 * Returns the harmonic mean.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number1 is required, subsequent numbers are optional. 1 to 255 arguments for which you want to calculate the mean. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
export function HARMEAN(...args: any[]): number | Error

/**
 * Converts a hexadecimal number to binary.
 *
 * Category: Engineering
 *
 * @param {*} number The hexadecimal number you want to convert. Number cannot contain more than 10 characters. The most significant bit of number is the sign bit (40th bit from the right). The remaining 9 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @param {*} places Optional. The number of characters to use. If places is omitted, HEX2BIN uses the minimum number of characters necessary. Places is useful for padding the return value with leading 0s (zeros).
 * @returns
 */
export function HEX2BIN(number: any, places: any): string | Error

/**
 * Converts a hexadecimal number to decimal.
 *
 * Category: Engineering
 *
 * @param {*} number The hexadecimal number you want to convert. Number cannot contain more than 10 characters (40 bits). The most significant bit of number is the sign bit. The remaining 39 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @returns
 */
export function HEX2DEC(number: any): number | Error

/**
 * Converts a hexadecimal number to octal.
 *
 * Category: Engineering
 *
 * @param {*} number The hexadecimal number you want to convert. Number cannot contain more than 10 characters. The most significant bit of number is the sign bit. The remaining 39 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @param {*} places Optional. The number of characters to use. If places is omitted, HEX2OCT uses the minimum number of characters necessary. Places is useful for padding the return value with leading 0s (zeros).
 * @returns
 */
export function HEX2OCT(number: any, places: any): string | Error

/**
 * Looks in the top row of an array and returns the value of the indicated value.
 *
 * Category: Lookup and reference
 *
 * @param {*} lookup_value The value to be found in the first row of the table. Lookup_value can be a value, a reference, or a text string.
 * @param {*} table_array A table of information in which data is looked up. Use a reference to a range or a range name.
 * @param {*} row_index_num The row number in table_array from which the matching value will be returned. A row_index_num of 1 returns the first row value in table_array, a row_index_num of 2 returns the second row value in table_array, and so on. If row_index_num is less than 1, HLOOKUP returns the #VALUE! error value; if row_index_num is greater than the number of rows on table_array, HLOOKUP returns the #REF! error value.
 * @param {*} range_lookup Optional. A logical value that specifies whether you want HLOOKUP to find an exact match or an approximate match. If TRUE or omitted, an approximate match is returned. In other words, if an exact match is not found, the next largest value that is less than lookup_value is returned. If FALSE, HLOOKUP will find an exact match. If one is not found, the error value #N/A is returned.
 * @returns
 */
export function HLOOKUP(lookup_value: any, table_array: any, row_index_num: any, range_lookup: any): Error

/**
 * Converts a serial number to an hour.
 *
 * Category: Date and time
 *
 * @param {*} serial_number The time that contains the hour you want to find. Times may be entered as text strings within quotation marks (for example, "6:45 PM"), as decimal numbers (for example, 0.78125, which represents 6:45 PM), or as results of other formulas or functions (for example, TIMEVALUE("6:45 PM")).
 * @returns
 */
export function HOUR(serial_number: any): any

/**
 * Formula.js only
 *
 * @param {*} value
 * @returns
 */
export function HTML2TEXT(value: any): any
export namespace HYPGEOM {
  /**
   * Returns the hypergeometric distribution.
   *
   * Category: Statistical
   *
   * @param {*} sample_s The number of successes in the sample.
   * @param {*} number_sample The size of the sample.
   * @param {*} population_s The number of successes in the population.
   * @param {*} number_pop The population size.
   * @param {*} cumulative A logical value that determines the form of the function. If cumulative is TRUE, then HYPGEOM.DIST returns the cumulative distribution function; if FALSE, it returns the probability mass function.
   * @returns
   */
  function DIST(sample_s: any, number_sample: any, population_s: any, number_pop: any, cumulative: any): number | Error
}

/**
 * Returns the hypergeometric distribution.
 *
 * Category: Statistical
 *
 * @param {*} sample_s The number of successes in the sample.
 * @param {*} number_sample The size of the sample.
 * @param {*} population_s The number of successes in the population.
 * @param {*} number_pop The population size.
 * @param {*} cumulative A logical value that determines the form of the function. If cumulative is TRUE, then HYPGEOM.DIST returns the cumulative distribution function; if FALSE, it returns the probability mass function.
 * @returns
 */
export function HYPGEOMDIST(
  sample_s: any,
  number_sample: any,
  population_s: any,
  number_pop: any,
  cumulative: any
): number | Error

/**
 * Specifies a logical test to perform.
 *
 * Category: Logical
 *
 * @param {*} logical_test
 * @param {*} value_if_true
 * @param {*} value_if_false
 *
 * @returns
 */
export function IF(logical_test: any, value_if_true: any, value_if_false: any, ...args: any[]): any

/**
 * Returns a value you specify if a formula evaluates to an error; otherwise, returns the result of the formula.
 *
 * Category: Logical
 *
 * @param {*} value The argument that is checked for an error.
 * @param {*} value_if_error The value to return if the formula evaluates to an error. The following error types are evaluated: #N/A, #VALUE!, #REF!, #DIV/0!, #NUM!, #NAME?, or #NULL!.
 * @returns
 */
export function IFERROR(value: any, value_if_error: any): any

/**
 * Returns the value you specify if the expression resolves to #N/A, otherwise returns the result of the expression.
 *
 * Category: Logical
 *
 * @returns
 */
export function IFNA(value: any, value_if_na: any): any

/**
 * Checks whether one or more conditions are met and returns a value that corresponds to the first TRUE condition.
 *
 * Category: Logical
 *
 * @returns
 */
export function IFS(...args: any[]): any

/**
 * Returns the absolute value (modulus) of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the absolute value.
 * @returns
 */
export function IMABS(inumber: any): number | Error

/**
 * Returns the imaginary coefficient of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the imaginary coefficient.
 * @returns
 */
export function IMAGINARY(inumber: any): any

/**
 * Returns the argument theta, an angle expressed in radians.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the argument .
 * @returns
 */
export function IMARGUMENT(inumber: any): number | Error

/**
 * Returns the complex conjugate of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the conjugate.
 * @returns
 */
export function IMCONJUGATE(inumber: any): any

/**
 * Returns the cosine of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the cosine.
 * @returns
 */
export function IMCOS(inumber: any): any

/**
 * Returns the hyperbolic cosine of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the hyperbolic cosine.
 * @returns
 */
export function IMCOSH(inumber: any): any

/**
 * Returns the cotangent of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the cotangent.
 * @returns
 */
export function IMCOT(inumber: any): any

/**
 * Returns the cosecant of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the cosecant.
 * @returns
 */
export function IMCSC(inumber: any): any

/**
 * Returns the hyperbolic cosecant of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the hyperbolic cosecant.
 * @returns
 */
export function IMCSCH(inumber: any): any

/**
 * Returns the quotient of two complex numbers.
 *
 * Category: Engineering
 *
 * @param {*} inumber1 The complex numerator or dividend.
 * @param {*} inumber2 The complex denominator or divisor.
 * @returns
 */
export function IMDIV(inumber1: any, inumber2: any): any

/**
 * Returns the exponential of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the exponential.
 * @returns
 */
export function IMEXP(inumber: any): any

/**
 * Returns the natural logarithm of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the natural logarithm.
 * @returns
 */
export function IMLN(inumber: any): any

/**
 * Returns the base-10 logarithm of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the common logarithm.
 * @returns
 */
export function IMLOG10(inumber: any): any

/**
 * Returns the base-2 logarithm of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the base-2 logarithm.
 * @returns
 */
export function IMLOG2(inumber: any): any

/**
 * Returns a complex number raised to an integer power.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number you want to raise to a power.
 * @param {*} number The power to which you want to raise the complex number.
 * @returns
 */
export function IMPOWER(inumber: any, number: any): any

/**
 * Returns the product of complex numbers.
 *
 * Category: Engineering
 *
 * @param {*} args inumber1, [inumber2], … Inumber1 is required, subsequent inumbers are not. 1 to 255 complex numbers to multiply.
 * @returns
 */
export function IMPRODUCT(...args: any[]): any

/**
 * Returns the real coefficient of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the real coefficient.
 * @returns
 */
export function IMREAL(inumber: any): any

/**
 * Returns the secant of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the secant.
 * @returns
 */
export function IMSEC(inumber: any): any

/**
 * Returns the hyperbolic secant of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the hyperbolic secant.
 * @returns
 */
export function IMSECH(inumber: any): any

/**
 * Returns the sine of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the sine.
 * @returns
 */
export function IMSIN(inumber: any): any

/**
 * Returns the hyperbolic sine of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the hyperbolic sine.
 * @returns
 */
export function IMSINH(inumber: any): any

/**
 * Returns the square root of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the square root.
 * @returns
 */
export function IMSQRT(inumber: any): any

/**
 * Returns the difference between two complex numbers.
 *
 * Category: Engineering
 *
 * @param {*} inumber1 The complex number from which to subtract inumber2.
 * @param {*} inumber2 The complex number to subtract from inumber1.
 * @returns
 */
export function IMSUB(inumber1: any, inumber2: any): any

/**
 * Returns the sum of complex numbers.
 *
 * Category: Engineering
 *
 * @param {*} args inumber1, [inumber2], ... Inumber1 is required, subsequent numbers are not. 1 to 255 complex numbers to add.
 * @returns
 */
export function IMSUM(...args: any[]): any

/**
 * Returns the tangent of a complex number.
 *
 * Category: Engineering
 *
 * @param {*} inumber A complex number for which you want the tangent.
 * @returns
 */
export function IMTAN(inumber: any): any

/**
 * Uses an index to choose a value from a reference or array.
 *
 * Category: Lookup and reference
 *
 * @param {*} array A range of values or an array constant.
 - If array contains only one row or column, the corresponding row_num or column_num argument is optional.
 - If array has more than one row and more than one column, and only row_num or column_num is used, INDEX returns an array of the entire row or column in array.
 * @param {*} row_num Required, unless column_num is present. Selects the row in array from which to return a value. If row_num is omitted, column_num is required.
 * @param {*} column_num Optional. Selects the column in array from which to return a value. If column_num is omitted, row_num is required.
 * @returns
 */
export function INDEX(array: any, row_num: any, column_num: any): any

/**
 * -- Not implemented --
 *
 * Returns information about the current operating environment.
 *
 * Category: Information
 *
 * @returns
 */
export function INFO(): void

/**
 * Rounds a number down to the nearest integer.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The real number you want to round down to an integer.
 * @returns
 */
export function INT(number: any): number | Error

/**
 * Returns the intercept of the linear regression line.
 *
 * Category: Statistical
 *
 * @param {*} known_y The dependent set of observations or data.
 * @param {*} known_x The independent set of observations or data.
 * @returns
 */
export function INTERCEPT(known_y: any, known_x: any): number | Error

/**
 * Formula.js only
 *
 * @param {*} second
 * @returns
 */
export function INTERVAL(second: any): string | Error

/**
 * -- Not implemented --
 *
 * Returns the interest rate for a fully invested security.
 *
 * Category: Financial
 *
 * @param {*} settlement The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer.
 * @param {*} maturity The security's maturity date. The maturity date is the date when the security expires.
 * @param {*} investment The amount invested in the security.
 * @param {*} redemption The amount to be received at maturity.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function INTRATE(): void

/**
 * Returns the interest payment for an investment for a given period.
 *
 * Category: Financial
 *
 * @param {*} rate The interest rate per period.
 * @param {*} per The period for which you want to find the interest and must be in the range 1 to nper.
 * @param {*} nper The total number of payment periods in an annuity.
 * @param {*} pv The present value, or the lump-sum amount that a series of future payments is worth right now.
 * @param {*} fv Optional. The future value, or a cash balance you want to attain after the last payment is made. If fv is omitted, it is assumed to be 0 (the future value of a loan, for example, is 0).
 * @param {*} type Optional. The number 0 or 1 and indicates when payments are due. If type is omitted, it is assumed to be 0.
 * @returns
 */
export function IPMT(rate: any, per: any, nper: any, pv: any, fv: any, type: any): number | Error

/**
 * Returns the internal rate of return for a series of cash flows.
 *
 * Category: Financial
 *
 * @param {*} values An array or a reference to values that contain numbers for which you want to calculate the internal rate of return.
 - Values must contain at least one positive value and one negative value to calculate the internal rate of return.
 - IRR uses the order of values to interpret the order of cash flows. Be sure to enter your payment and income values in the sequence you want.
 - If an array or reference argument contains text, logical values, or empty values, those values are ignored.
 * @param {*} guess Optional. A number that you guess is close to the result of IRR.
 - Microsoft Excel uses an iterative technique for calculating IRR. Starting with guess, IRR cycles through the calculation until the result is accurate within 0.00001 percent. If IRR can't find a result that works after 20 tries, the #NUM! error value is returned.
 - In most cases you do not need to provide guess for the IRR calculation. If guess is omitted, it is assumed to be 0.1 (10 percent).
 - If IRR gives the #NUM! error value, or if the result is not close to what you expected, try again with a different value for guess.
 * @returns
 */
export function IRR(values: any, guess: any): any

/**
 * Formula.js only
 *
 * @param {*} number
 * @returns
 */
export function ISBINARY(number: any): boolean

/**
 * Returns TRUE if the value is blank.
 *
 * Category: Information
 *
 * @param {*} value The value that you want tested. The value argument can be a blank (empty value), error, logical value, text, number, or reference value, or a name referring to any of these.
 * @returns
 */
export function ISBLANK(value: any): boolean

/**
 * Returns TRUE if the value is any error value except #N/A.
 *
 * Category: Information
 *
 * @param {*} value The value that you want tested. The value argument can be a blank (empty value), error, logical value, text, number, or reference value, or a name referring to any of these.
 * @returns
 */
export function ISERR(value$1: any): boolean

/**
 * Returns TRUE if the value is any error value.
 *
 * Category: Information
 *
 * @param {*} value The value that you want tested. The value argument can be a blank (empty value), error, logical value, text, number, or reference value, or a name referring to any of these.
 * @returns
 */
export function ISERROR(value: any): boolean

/**
 * Returns TRUE if the number is even.
 *
 * Category: Information
 *
 * @param {*} number The value to test. If number is not an integer, it is truncated.
 * @returns
 */
export function ISEVEN(number: any): boolean

/**
 * -- Not implemented --
 *
 * Returns TRUE if there is a reference to a value that contains a formula.
 *
 * Category: Information
 *
 * @param {*} reference Reference is a reference to the value you want to test. Reference can be a value reference, a formula, or a name that refers to a value.
 * @returns
 */
export function ISFORMULA(): void

/**
 * Returns TRUE if the value is a logical value.
 *
 * Category: Information
 *
 * @param {*} value The value that you want tested. The value argument can be a blank (empty value), error, logical value, text, number, or reference value, or a name referring to any of these.
 * @returns
 */
export function ISLOGICAL(value: any): boolean

/**
 * Returns TRUE if the value is the #N/A error value.
 *
 * Category: Information
 *
 * @param {*} value The value that you want tested. The value argument can be a blank (empty value), error, logical value, text, number, or reference value, or a name referring to any of these.
 * @returns
 */
export function ISNA(value: any): boolean

/**
 * Returns TRUE if the value is not text.
 *
 * Category: Information
 *
 * @param {*} value The value that you want tested. The value argument can be a blank (empty value), error, logical value, text, number, or reference value, or a name referring to any of these.
 * @returns
 */
export function ISNONTEXT(value: any): boolean

/**
 * Returns TRUE if the value is a number.
 *
 * Category: Information
 *
 * @param {*} value The value that you want tested. The value argument can be a blank (empty value), error, logical value, text, number, or reference value, or a name referring to any of these.
 * @returns
 */
export function ISNUMBER(value: any): boolean
export namespace ISO {
  export { CEILING }
}

/**
 * Returns TRUE if the number is odd.
 *
 * Category: Information
 *
 * @param {*} value The value that you want tested. The value argument can be a blank (empty value), error, logical value, text, number, or reference value, or a name referring to any of these.
 * @returns
 */
export function ISODD(value: any): boolean

/**
 * Returns the number of the ISO week number of the year for a given date.
 *
 * Category: Date and time
 *
 * @param {*} date Date is the date-time code used by Excel for date and time calculation.
 * @returns
 */
export function ISOWEEKNUM(date: any): number | Error

/**
 * Calculates the interest paid during a specific period of an investment.
 *
 * Category: Financial
 *
 * @param {*} rate The interest rate for the investment.
 * @param {*} per The period for which you want to find the interest, and must be between 1 and Nper.
 * @param {*} nper The total number of payment periods for the investment.
 * @param {*} pv The present value of the investment. For a loan, Pv is the loan amount.
 *
 * @returns
 */
export function ISPMT(rate: any, per: any, nper: any, pv: any): number | Error

/**
 * -- Not implemented --
 *
 * Returns TRUE if the value is a reference.
 *
 * Category: Information
 *
 * @param {*} value The value that you want tested. The value argument can be a blank (empty value), error, logical value, text, number, or reference value, or a name referring to any of these.
 * @returns
 */
export function ISREF(): void

/**
 * Returns TRUE if the value is text.
 *
 * Category: Information
 *
 * @param {*} value The value that you want tested. The value argument can be a blank (empty value), error, logical value, text, number, or reference value, or a name referring to any of these.
 * @returns
 */
export function ISTEXT(value: any): boolean

/**
 * Formula.js only
 *
 * @param {*} array
 * @param {*} separator
 * @returns
 */
export function JOIN(array: any, separator: any): any

/**
 * Returns the kurtosis of a data set.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number1 is required, subsequent numbers are optional. 1 to 255 arguments for which you want to calculate kurtosis. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
export function KURT(...args: any[]): number | Error

/**
 * Returns the k-th largest value in a data set.
 *
 * Category: Statistical
 *
 * @param {*} array The array or range of data for which you want to determine the k-th largest value.
 * @param {*} k The position (from the largest) in the array or value range of data to return.
 * @returns
 */
export function LARGE(array: any, k: any): any

/**
 * Returns the least common multiple.
 *
 * Category: Math and trigonometry
 *
 * @param {*} args number1, number2,... Number1 is required, subsequent numbers are optional. 1 to 255 values for which you want the least common multiple. If value is not an integer, it is truncated.
 * @returns
 */
export function LCM(...args: any[]): number | Error

/**
 * Returns the leftmost characters from a text value.
 *
 * Category: Text
 *
 * @param {*} text The text string that contains the characters you want to extract.
 * @param {*} num_chars Optional. Specifies the number of characters you want LEFT to extract.
 * @returns
 */
export function LEFT(text: any, num_chars: any): any

/**
 * Returns the number of characters in a text string
 *
 * Category: Text
 *
 * @param {*} text The text whose length you want to find. Spaces count as characters.
 * @returns
 */
export function LEN(text: any, ...args: any[]): any

/**
 * Returns the parameters of a linear trend.
 *
 * Category: Statistical
 *
 * @param {*} known_y The set of y-values that you already know in the relationship y = mx + b.
 - If the range of known_y's is in a single column, each column of known_x's is interpreted as a separate variable.
 - If the range of known_y's is contained in a single row, each row of known_x's is interpreted as a separate variable.
 * @param {*} known_x Optional. A set of x-values that you may already know in the relationship y = mx + b.
 - The range of known_x's can include one or more sets of variables. If only one variable is used, known_y's and known_x's can be ranges of any shape, as long as they have equal dimensions. If more than one variable is used, known_y's must be a vector (that is, a range with a height of one row or a width of one column).
 - If known_x's is omitted, it is assumed to be the array {1,2,3,...} that is the same size as known_y's.
 * @returns
 */
export function LINEST(known_y: any, known_x: any): number[] | Error

/**
 * Returns the natural logarithm of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The positive real number for which you want the natural logarithm.
 * @returns
 */
export function LN(number: any): number | Error

/**
 * Formula.js only
 *
 * @returns
 */
export function LN10(): number

/**
 * Formula.js only
 *
 * @returns
 */
export function LN2(): number

/**
 * Returns the logarithm of a number to a specified base.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The positive real number for which you want the logarithm.
 * @param {*} base Optional. The base of the logarithm. If base is omitted, it is assumed to be 10.
 * @returns
 */
export function LOG(number: any, base: any): any

/**
 * Returns the base-10 logarithm of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The positive real number for which you want the base-10 logarithm.
 * @returns
 */
export function LOG10(number: any): number | Error

/**
 * Formula.js only
 *
 * @returns
 */
export function LOG10E(): number

/**
 * Formula.js only
 *
 * @returns
 */
export function LOG2E(): number

/**
 * Returns the parameters of an exponential trend.
 *
 * Category: Statistical
 *
 * @param {*} known_y The set of y-values you already know in the relationship y = b*m^x.
 - If the array known_y's is in a single column, then each column of known_x's is interpreted as a separate variable.
 - If the array known_y's is in a single row, then each row of known_x's is interpreted as a separate variable.
 * @param {*} known_x Optional. An optional set of x-values that you may already know in the relationship y = b*m^x.
 - The array known_x's can include one or more sets of variables. If only one variable is used, known_y's and known_x's can be ranges of any shape, as long as they have equal dimensions. If more than one variable is used, known_y's must be a range of values with a height of one row or a width of one column (which is also known as a vector).
 - If known_x's is omitted, it is assumed to be the array {1,2,3,...} that is the same size as known_y's.
 * @returns
 */
export function LOGEST(known_y: any, known_x: any): number[] | Error

/**
 * Returns the inverse of the lognormal cumulative distribution.
 *
 * Category: Statistical
 *
 * @param {*} probability A probability associated with the lognormal distribution.
 * @param {*} mean The mean of ln(x).
 * @param {*} standard_dev The standard deviation of ln(x).
 * @returns
 */
export function LOGINV(probability: any, mean: any, standard_dev: any): any
export namespace LOGNORM {
  /**
   * Returns the cumulative lognormal distribution.
   *
   * Category: Statistical
   *
   * @param {*} x The value at which to evaluate the function.
   * @param {*} mean The mean of ln(x).
   * @param {*} standard_dev The standard deviation of ln(x).
   * @param {*} cumulative A logical value that determines the form of the function. If cumulative is TRUE, LOGNORM.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function.
   * @returns
   */
  function DIST(x: any, mean: any, standard_dev: any, cumulative: any): any

  /**
   * Returns the inverse of the lognormal cumulative distribution.
   *
   * Category: Statistical
   *
   * @param {*} probability A probability associated with the lognormal distribution.
   * @param {*} mean The mean of ln(x).
   * @param {*} standard_dev The standard deviation of ln(x).
   * @returns
   */
  function INV(probability: any, mean: any, standard_dev: any): any
}

/**
 * Returns the cumulative lognormal distribution.
 *
 * Category: Statistical
 *
 * @param {*} x The value at which to evaluate the function.
 * @param {*} mean The mean of ln(x).
 * @param {*} standard_dev The standard deviation of ln(x).
 * @param {*} cumulative A logical value that determines the form of the function. If cumulative is TRUE, LOGNORM.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function.
 * @returns
 */
export function LOGNORMDIST(x: any, mean: any, standard_dev: any, cumulative: any): any

/**
 * Returns the inverse of the lognormal cumulative distribution.
 *
 * Category: Statistical
 *
 * @param {*} probability A probability associated with the lognormal distribution.
 * @param {*} mean The mean of ln(x).
 * @param {*} standard_dev The standard deviation of ln(x).
 * @returns
 */
export function LOGNORMINV(probability: any, mean: any, standard_dev: any): any

/**
 * Looks up values in a vector or array.
 *
 * Category: Lookup and reference
 *
 * @param {*} lookup_value A value that LOOKUP searches for in an array. The lookup_value argument can be a number, text, a logical value, or a name or reference that refers to a value.
 - If LOOKUP can't find the value of lookup_value, it uses the largest value in the array that is less than or equal to lookup_value.
 - If the value of lookup_value is smaller than the smallest value in the first row or column (depending on the array dimensions), LOOKUP returns the #N/A error value.
 * @param {*} array A range of values that contains text, numbers, or logical values that you want to compare with lookup_value. The array form of LOOKUP is very similar to the HLOOKUP and VLOOKUP functions. The difference is that HLOOKUP searches for the value of lookup_value in the first row, VLOOKUP searches in the first column, and LOOKUP searches according to the dimensions of array.
* @param {*} result_array Optional. A range that contains only one row or column. The result_array argument must be the same size as lookup_value. It has to be the same size.
 * @returns
 */
export function LOOKUP(lookup_value: any, array: any, result_array: any): any

/**
 * Converts text to lowercase.
 *
 * Category: Text
 *
 * @param {*} text The text you want to convert to lowercase. LOWER does not change characters in text that are not letters.
 * @returns
 */
export function LOWER(text: any, ...args: any[]): any

/**
 * Formula.js only
 *
 * @param {*} num1
 * @param {*} num2
 * @returns
 */
export function LT(num1: any, num2: any, ...args: any[]): any

/**
 * Formula.js only
 *
 * @param {*} num1
 * @param {*} num2
 * @returns
 */
export function LTE(num1: any, num2: any, ...args: any[]): any

/**
 * Looks up values in a reference or array.
 *
 * Category: Lookup and reference
 *
 * @param {*} lookup_value The value that you want to match in lookup_array. For example, when you look up someone's number in a telephone book, you are using the person's name as the lookup value, but the telephone number is the value you want.The lookup_value argument can be a value (number, text, or logical value) or a value reference to a number, text, or logical value.
 * @param {*} lookup_array The range of values being searched.
 * @param {*} match_type Optional. The number -1, 0, or 1. The match_type argument specifies how Excel matches lookup_value with values in lookup_array. The default value for this argument is 1.
 * @returns
 */
export function MATCH(lookup_value: any, lookup_array: any, match_type: any, ...args: any[]): number | Error

/**
 * Returns the maximum value in a list of arguments.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number1 is required, subsequent numbers are optional. 1 to 255 numbers for which you want to find the maximum value.
 * @returns
 */
export function MAX(...args: any[]): any

/**
 * Returns the maximum value in a list of arguments, including numbers, text, and logical values.
 *
 * Category: Statistical
 *
 * @param {*} args value1, value2,... Number arguments 2 to 255 for which you want to find the largest value.
 * @returns
 */
export function MAXA(...args: any[]): any

/**
 * -- Not implemented --
 *
 * Returns the Macauley modified duration for a security with an assumed par value of $100.
 *
 * Category: Financial
 *
 * @param {*} settlement The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer.
 * @param {*} maturity The security's maturity date. The maturity date is the date when the security expires.
 * @param {*} coupon The security's annual coupon rate.
 * @param {*} yld The security's annual yield.
 * @param {*} frequency The number of coupon payments per year. For annual payments, frequency = 1; for semiannual, frequency = 2; for quarterly, frequency = 4.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function MDURATION(): void

/**
 * Returns the median of the given numbers.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number1 is required, subsequent numbers are optional. 1 to 255 numbers for which you want the median.
 * @returns
 */
export function MEDIAN(...args: any[]): any

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
export function MID(text: any, start_num: any, num_chars: any): any

/**
 * Returns the minimum value in a list of arguments.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number1 is optional, subsequent numbers are optional. 1 to 255 numbers for which you want to find the minimum value.
 * @returns
 */
export function MIN(...args: any[]): any

/**
 * Returns the smallest value in a list of arguments, including numbers, text, and logical values.
 *
 * Category: Statistical
 *
 * @param {*} args value1, value2, ... Value1 is required, subsequent values are optional. 1 to 255 values for which you want to find the smallest value.
 * @returns
 */
export function MINA(...args: any[]): any

/**
 * Formula.js only
 *
 * @param {*} num1
 * @param {*} num2
 * @returns
 */
export function MINUS(num1: any, num2: any, ...args: any[]): any

/**
 * Converts a serial number to a minute.
 *
 * Category: Date and time
 *
 * @param {*} serial_number The time that contains the minute you want to find. Times may be entered as text strings within quotation marks (for example, "6:45 PM"), as decimal numbers (for example, 0.78125, which represents 6:45 PM), or as results of other formulas or functions (for example, TIMEVALUE("6:45 PM")).
 * @returns
 */
export function MINUTE(serial_number: any): any

/**
 * Returns the internal rate of return where positive and negative cash flows are financed at different rates.
 *
 * Category: Financial
 *
 * @param {*} values An array or a reference to values that contain numbers. These numbers represent a series of payments (negative values) and income (positive values) occurring at regular periods.
 - Values must contain at least one positive value and one negative value to calculate the modified internal rate of return. Otherwise, MIRR returns the #DIV/0! error value.
 - If an array or reference argument contains text, logical values, or empty values, those values are ignored; however, values with the value zero are included.
 * @param {*} finance_rate The interest rate you pay on the money used in the cash flows.
 * @param {*} reinvest_rate The interest rate you receive on the cash flows as you reinvest them.
 * @returns
 */
export function MIRR(values: any, finance_rate: any, reinvest_rate: any): number | Error

/**
 * Returns the remainder from division.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The number for which you want to find the remainder.
 * @param {*} divisor The number by which you want to divide number.
 * @returns
 */
export function MOD(number: any, divisor: any): any
export namespace MODE {
  /**
   * Returns a vertical array of the most frequently occurring, or repetitive values in an array or range of data.
   *
   * Category: Statistical
   *
   * @param {*} args number1, number2, ... Number arguments 2 to 254 for which you want to calculate the mode. You can also use a single array or a reference to an array instead of arguments separated by commas.
   * @returns
   */
  function MULT(...args: any[]): any[] | Error

  /**
   * Returns the most common value in a data set.
   *
   * Category: Statistical
   *
   * @param {*} args number1, number2, ... Arguments 2 to 254 for which you want to calculate the mode. You can also use a single array or a reference to an array instead of arguments separated by commas.
   * @returns
   */
  function SNGL(...args: any[]): any
}

/**
 * Returns a vertical array of the most frequently occurring, or repetitive values in an array or range of data.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number arguments 2 to 254 for which you want to calculate the mode. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
export function MODEMULT(...args: any[]): any[] | Error

/**
 * Returns the most common value in a data set.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Arguments 2 to 254 for which you want to calculate the mode. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
export function MODESNGL(...args: any[]): any

/**
 * Converts a serial number to a month.
 *
 * Category: Date and time
 *
 * @param {*} serial_number The date of the month you are trying to find.
 * @returns
 */
export function MONTH(serial_number: any): any

/**
 * Returns a number rounded to the desired multiple.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The value to round.
 * @param {*} multiple The multiple to which you want to round number.
 * @returns
 */
export function MROUND(number: any, multiple: any): any

/**
 * Returns the multinomial of a set of numbers.
 *
 * Category: Math and trigonometry
 *
 * @param {*} args number1, number2, ... Number1 is required, subsequent numbers are optional. 1 to 255 values for which you want the multinomial.
 * @returns
 */
export function MULTINOMIAL(...args: any[]): number | Error

/**
 * Formula.js only
 *
 * @param {*} factor1
 * @param {*} factor2
 * @returns
 */
export function MULTIPLY(factor1: any, factor2: any, ...args: any[]): any

/**
 * Returns a value converted to a number.
 *
 * Category: Information
 *
 * @param {*} value The value you want converted. N converts values listed in the following table.
 * @returns
 */
export function N(value: any): any

/**
 * Returns the error value #N/A.
 *
 * Category: Information
 *
 * @returns
 */
export function NA(): Error

/**
 * Formula.js only
 *
 * @param {*} value1
 * @param {*} value2
 * @returns
 */
export function NE(value1: any, value2: any, ...args: any[]): boolean | Error
export namespace NEGBINOM {
  /**
   * Returns the negative binomial distribution.
   *
   * Category: Statistical
   *
   * @param {*} number_f The number of failures.
   * @param {*} number_s The threshold number of successes.
   * @param {*} probability_s The probability of a success.
   * @param {*} cumulative A logical value that determines the form of the function. If cumulative is TRUE, NEGBINOM.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function.
   * @returns
   */
  function DIST(number_f: any, number_s: any, probability_s: any, cumulative: any): any
}

/**
 * Returns the negative binomial distribution.
 *
 * Category: Statistical
 *
 * @param {*} number_f The number of failures.
 * @param {*} number_s The threshold number of successes.
 * @param {*} probability_s The probability of a success.
 * @param {*} cumulative A logical value that determines the form of the function. If cumulative is TRUE, NEGBINOM.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function.
 * @returns
 */
export function NEGBINOMDIST(number_f: any, number_s: any, probability_s: any, cumulative: any): any

/**
 * Returns the number of whole workdays between two dates.
 *
 * Category: Date and time
 *
 * @param {*} start_date A date that represents the start date.
 * @param {*} end_date A date that represents the end date.
 * @param {*} holidays Optional. An optional range of one or more dates to exclude from the working calendar, such as state and federal holidays and floating holidays. The list can be either a range of values that contains the dates or an array constant of the serial numbers that represent the dates.
 * @returns
 */
export function NETWORKDAYS(start_date: any, end_date: any, holidays: any): number | Error
export namespace NETWORKDAYS {
  /**
   * Returns the number of whole workdays between two dates using parameters to indicate which and how many days are weekend days.
   *
   * Category: Date and time
   *
   * @param {*} start_date The date for from which the difference is to be computed. The start_date can be earlier than, the same as, or later than the end_date.
   * @param {*} end_date The date for to which the difference is to be computed.
   * @param {*} weekend Optional. Indicates the days of the week that are weekend days and are not included in the number of whole working days between start_date and end_date. Weekend is a weekend number or string that specifies when weekends occur. Weekend number values indicate the following weekend days:
   * @param {*} holidays Optional. An optional set of one or more dates that are to be excluded from the working day calendar. holidays shall be a range of values that contain the dates, or an array constant of the serial values that represent those dates. The ordering of dates or serial values in holidays can be arbitrary.
   * @returns
   */
  function INTL(start_date: any, end_date: any, weekend: any, holidays: any): number | Error
}

/**
 * Returns the number of whole workdays between two dates using parameters to indicate which and how many days are weekend days.
 *
 * Category: Date and time
 *
 * @param {*} start_date The date for from which the difference is to be computed. The start_date can be earlier than, the same as, or later than the end_date.
 * @param {*} end_date The date for to which the difference is to be computed.
 * @param {*} weekend Optional. Indicates the days of the week that are weekend days and are not included in the number of whole working days between start_date and end_date. Weekend is a weekend number or string that specifies when weekends occur. Weekend number values indicate the following weekend days:
 * @param {*} holidays Optional. An optional set of one or more dates that are to be excluded from the working day calendar. holidays shall be a range of values that contain the dates, or an array constant of the serial values that represent those dates. The ordering of dates or serial values in holidays can be arbitrary.
 * @returns
 */
export function NETWORKDAYSINTL(start_date: any, end_date: any, weekend: any, holidays: any): number | Error

/**
 * Returns the annual nominal interest rate.
 *
 * Category: Financial
 *
 * @param {*} effect_rate The effective interest rate.
 * @param {*} npery The number of compounding periods per year.
 * @returns
 */
export function NOMINAL(effect_rate: any, npery: any): number | Error
export namespace NORM {
  /**
   * Returns the normal cumulative distribution.
   *
   * Category: Statistical
   *
   * @param {*} x The value for which you want the distribution.
   * @param {*} mean The arithmetic mean of the distribution.
   * @param {*} standard_dev The standard deviation of the distribution.
   * @param {*} cumulative A logical value that determines the form of the function. If cumulative is TRUE, NORM.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function.
   * @returns
   */
  function DIST(x: any, mean: any, standard_dev: any, cumulative: any): any

  /**
   * Returns the inverse of the normal cumulative distribution.
   *
   * Category: Compatibility
   *
   * @param {*} probability A probability corresponding to the normal distribution.
   * @param {*} mean The arithmetic mean of the distribution.
   * @param {*} standard_dev The standard deviation of the distribution.
   * @returns
   */
  function INV(probability: any, mean: any, standard_dev: any): any
  namespace S {
    /**
     * Returns the standard normal cumulative distribution.
     *
     * Category: Statistical
     *
     * @param {*} z The value for which you want the distribution.
     * @param {*} cumulative Cumulative is a logical value that determines the form of the function. If cumulative is TRUE, NORMS.DIST returns the cumulative distribution function; if FALSE, it returns the probability mass function.
     * @returns
     */
    function DIST(z: any, cumulative: any): any

    /**
     * Returns the inverse of the standard normal cumulative distribution.
     *
     * Category: Statistical
     *
     * @param {*} probability A probability corresponding to the normal distribution.
     * @returns
     */
    function INV(probability: any): any
  }
}

/**
 * Returns the normal cumulative distribution.
 *
 * Category: Statistical
 *
 * @param {*} x The value for which you want the distribution.
 * @param {*} mean The arithmetic mean of the distribution.
 * @param {*} standard_dev The standard deviation of the distribution.
 * @param {*} cumulative A logical value that determines the form of the function. If cumulative is TRUE, NORM.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function.
 * @returns
 */
export function NORMDIST(x: any, mean: any, standard_dev: any, cumulative: any): any

/**
 * Returns the inverse of the normal cumulative distribution.
 *
 * Category: Compatibility
 *
 * @param {*} probability A probability corresponding to the normal distribution.
 * @param {*} mean The arithmetic mean of the distribution.
 * @param {*} standard_dev The standard deviation of the distribution.
 * @returns
 */
export function NORMINV(probability: any, mean: any, standard_dev: any): any

/**
 * Returns the standard normal cumulative distribution.
 *
 * Category: Statistical
 *
 * @param {*} z The value for which you want the distribution.
 * @param {*} cumulative Cumulative is a logical value that determines the form of the function. If cumulative is TRUE, NORMS.DIST returns the cumulative distribution function; if FALSE, it returns the probability mass function.
 * @returns
 */
export function NORMSDIST(z: any, cumulative: any): any

/**
 * Returns the inverse of the standard normal cumulative distribution.
 *
 * Category: Statistical
 *
 * @param {*} probability A probability corresponding to the normal distribution.
 * @returns
 */
export function NORMSINV(probability: any): any

/**
 * Reverses the logic of its argument.
 *
 * Category: Logical
 *
 * @returns
 */
export function NOT(logical: any): boolean | Error

/**
 * Returns the serial number of the current date and time.
 *
 * Category: Date and time
 *
 * @returns
 */
export function NOW(): Date

/**
 * Returns the number of periods for an investment.
 *
 * Category: Financial
 *
 * @param {*} rate The interest rate per period.
 * @param {*} pmt The payment made each period; it cannot change over the life of the annuity. Typically, pmt contains principal and interest but no other fees or taxes.
 * @param {*} pv The present value, or the lump-sum amount that a series of future payments is worth right now.
 * @param {*} fv Optional. The future value, or a cash balance you want to attain after the last payment is made. If fv is omitted, it is assumed to be 0 (the future value of a loan, for example, is 0).
 * @param {*} type Optional. The number 0 or 1 and indicates when payments are due.
 * @returns
 */
export function NPER(rate: any, pmt: any, pv: any, fv: any, type: any): number | Error

/**
 * Returns the net present value of an investment based on a series of periodic cash flows and a discount rate.
 *
 * Category: Financial
 *
 * @param {*} rate The rate of discount over the length of one period.
 * @param {*} args value1, value2, ... Value1 is required, subsequent values are optional. 1 to 254 arguments representing the payments and income.
 - value1, value2, ... must be equally spaced in time and occur at the end of each period.
 - NPV uses the order of value1, value2, ... to interpret the order of cash flows. Be sure to enter your payment and income values in the correct sequence.
 - Arguments that are empty values, logical values, or text representations of numbers, error values, or text that cannot be translated into numbers are ignored.
 - If an argument is an array or reference, only numbers in that array or reference are counted. Empty values, logical values, text, or error values in the array or reference are ignored.
 * @returns
 */
export function NPV(...args: any[]): number | Error

/**
 * Formula.js only
 *
 * @returns
 */
export function NUMBERS(...args: any[]): any

/**
 * Converts text to number in a locale-independent manner.
 *
 * Category: Text
 *
 * @param {*} text The text to convert to a number.
 * @param {*} decimal_separator Optional. The character used to separate the integer and fractional part of the result.
 * @param {*} group_separator Optional. The character used to separate groupings of numbers, such as thousands from hundreds and millions from thousands.
 * @returns
 */
export function NUMBERVALUE(text: any, decimal_separator: any, group_separator: any): number

/**
 * Converts an octal number to binary.
 *
 * Category: Engineering
 *
 * @param {*} number The octal number you want to convert. Number may not contain more than 10 characters. The most significant bit of number is the sign bit. The remaining 29 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @param {*} places Optional. The number of characters to use. If places is omitted, OCT2BIN uses the minimum number of characters necessary. Places is useful for padding the return value with leading 0s (zeros).
 * @returns
 */
export function OCT2BIN(number: any, places: any): string | Error

/**
 * Converts an octal number to decimal.
 *
 * Category: Engineering
 *
 * @param {*} number The octal number you want to convert. Number may not contain more than 10 octal characters (30 bits). The most significant bit of number is the sign bit. The remaining 29 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @returns
 */
export function OCT2DEC(number: any): number | Error

/**
 * Converts an octal number to hexadecimal.
 *
 * Category: Engineering
 *
 * @param {*} number The octal number you want to convert. Number may not contain more than 10 octal characters (30 bits). The most significant bit of number is the sign bit. The remaining 29 bits are magnitude bits. Negative numbers are represented using two's-complement notation.
 * @param {*} places Optional. The number of characters to use. If places is omitted, OCT2HEX uses the minimum number of characters necessary. Places is useful for padding the return value with leading 0s (zeros).
 * @returns
 */
export function OCT2HEX(number: any, places: any): string | Error

/**
 * Rounds a number up to the nearest odd integer.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number: The value to round.
 * @returns
 */
export function ODD(number: any): number | Error

/**
 * -- Not implemented --
 *
 * Returns the price per $100 face value of a security with an odd first period.
 *
 * Category: Financial
 *
 * @param {*} settlement The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer.
 * @param {*} maturity The security's maturity date. The maturity date is the date when the security expires.
 * @param {*} issue The security's issue date.
 * @param {*} first_coupon The security's first coupon date.
 * @param {*} rate The security's interest rate.
 * @param {*} yld The security's annual yield.
 * @param {*} redemption The security's redemption value per $100 face value.
 * @param {*} frequency The number of coupon payments per year. For annual payments, frequency = 1; for semiannual, frequency = 2; for quarterly, frequency = 4.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function ODDFPRICE(): void

/**
 * -- Not implemented --
 *
 * Returns the yield of a security with an odd first period.
 *
 * Category: Financial
 *
 * @param {*} settlement The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer.
 * @param {*} maturity The security's maturity date. The maturity date is the date when the security expires.
 * @param {*} issue The security's issue date.
 * @param {*} first_coupon The security's first coupon date.
 * @param {*} rate The security's interest rate.
 * @param {*} pr The security's price.
 * @param {*} redemption The security's redemption value per $100 face value.
 * @param {*} frequency The number of coupon payments per year. For annual payments, frequency = 1; for semiannual, frequency = 2; for quarterly, frequency = 4.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function ODDFYIELD(): void

/**
 * -- Not implemented --
 *
 * Returns the price per $100 face value of a security with an odd last period.
 *
 * Category: Financial
 *
 * @param {*} settlement The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer.
 * @param {*} maturity The security's maturity date. The maturity date is the date when the security expires.
 * @param {*} last_interest The security's last coupon date.
 * @param {*} rate The security's interest rate.
 * @param {*} yld The security's annual yield.
 * @param {*} redemption The security's redemption value per $100 face value.
 * @param {*} frequency The number of coupon payments per year. For annual payments, frequency = 1; for semiannual, frequency = 2; for quarterly, frequency = 4.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function ODDLPRICE(): void

/**
 * -- Not implemented --
 *
 * Returns the yield of a security with an odd last period.
 *
 * Category: Financial
 *
 * @param {*} settlement The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer.
 * @param {*} maturity The security's maturity date. The maturity date is the date when the security expires.
 * @param {*} last_interest The security's last coupon date.
 * @param {*} rate The security's interest rate
 * @param {*} pr The security's price.
 * @param {*} redemption The security's redemption value per $100 face value.
 * @param {*} frequency The number of coupon payments per year. For annual payments, frequency = 1; for semiannual, frequency = 2; for quarterly, frequency = 4.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function ODDLYIELD(): void

/**
 * Returns TRUE if any argument is TRUE.
 *
 * Category: Logical
 *
 * @returns
 */
export function OR(...args: any[]): any

/**
 * Returns the number of periods required by an investment to reach a specified value.
 *
 * Category: Financial
 *
 * @param {*} rate Rate is the interest rate per period.
 * @param {*} pv Pv is the present value of the investment.
 * @param {*} fv Fv is the desired future value of the investment.
 * @returns
 */
export function PDURATION(rate: any, pv: any, fv: any): number | Error

/**
 * Returns the Pearson product moment correlation coefficient.
 *
 * Category: Statistical
 *
 * @param {*} array1 A set of independent values.
 * @param {*} array2 A set of dependent values.
 * @returns
 */
export function PEARSON(array1: any, array2: any): number | Error
export namespace PERCENTILE {
  /**
   * Returns the k-th percentile of values in a range, where k is in the range 0..1, exclusive.
   *
   * Category: Statistical
   *
   * @returns
   */
  function EXC(array: any, k: any): number | Error

  /**
   * Returns the k-th percentile of values in a range.
   *
   * Category: Statistical
   *
   * @param {*} array The array or range of data that defines relative standing.
   * @param {*} k The percentile value in the range 0..1, inclusive.
   * @returns
   */
  function INC(array: any, k: any): number | Error
}

/**
 * Returns the k-th percentile of values in a range, where k is in the range 0..1, exclusive.
 *
 * Category: Statistical
 *
 * @returns
 */
export function PERCENTILEEXC(array: any, k: any): number | Error

/**
 * Returns the k-th percentile of values in a range.
 *
 * Category: Statistical
 *
 * @param {*} array The array or range of data that defines relative standing.
 * @param {*} k The percentile value in the range 0..1, inclusive.
 * @returns
 */
export function PERCENTILEINC(array: any, k: any): number | Error
export namespace PERCENTRANK {
  /**
   * Returns the rank of a value in a data set as a percentage (0..1, exclusive) of the data set.
   *
   * Category: Statistical
   *
   * @param {*} array The array or range of data with numeric values that defines relative standing
   * @param {*} x The value for which you want to know the rank.
   * @param {*} significance Optional. A value that identifies the number of significant digits for the returned percentage value. If omitted, PERCENTRANK.EXC uses three digits (0.xxx).
   * @returns
   */
  function EXC(array: any, x: any, significance: any): number | Error

  /**
   * Returns the percentage rank of a value in a data set.
   *
   * Category: Statistical
   *
   * @param {*} array The array or range of data with numeric values that defines relative standing.
   * @param {*} x The value for which you want to know the rank.
   * @param {*} significance Optional. A value that identifies the number of significant digits for the returned percentage value. If omitted, PERCENTRANK.INC uses three digits (0.xxx).
   * @returns
   */
  function INC(array: any, x: any, significance: any): number | Error
}

/**
 * Returns the rank of a value in a data set as a percentage (0..1, exclusive) of the data set.
 *
 * Category: Statistical
 *
 * @param {*} array The array or range of data with numeric values that defines relative standing
 * @param {*} x The value for which you want to know the rank.
 * @param {*} significance Optional. A value that identifies the number of significant digits for the returned percentage value. If omitted, PERCENTRANK.EXC uses three digits (0.xxx).
 * @returns
 */
export function PERCENTRANKEXC(array: any, x: any, significance: any): number | Error

/**
 * Returns the percentage rank of a value in a data set.
 *
 * Category: Statistical
 *
 * @param {*} array The array or range of data with numeric values that defines relative standing.
 * @param {*} x The value for which you want to know the rank.
 * @param {*} significance Optional. A value that identifies the number of significant digits for the returned percentage value. If omitted, PERCENTRANK.INC uses three digits (0.xxx).
 * @returns
 */
export function PERCENTRANKINC(array: any, x: any, significance: any): number | Error

/**
 * Returns the number of permutations for a given number of objects.
 *
 * Category: Statistical
 *
 * @param {*} number An integer that describes the number of objects.
 * @param {*} number_chosen An integer that describes the number of objects in each permutation.
 * @returns
 */
export function PERMUT(number: any, number_chosen: any): number | Error

/**
 * Returns the number of permutations for a given number of objects (with repetitions) that can be selected from the total objects.
 *
 * Category: Statistical
 *
 * @param {*} number An integer that describes the total number of objects.
 * @param {*} number_chosen An integer that describes the number of objects in each permutation.
 * @returns
 */
export function PERMUTATIONA(number: any, number_chosen: any): number | Error

/**
 * Returns the value of the density function for a standard normal distribution.
 *
 * Category: Statistical
 *
 * @param {*} x X is the number for which you want the density of the standard normal distribution.
 * @returns
 */
export function PHI(x: any): number | Error

/**
 * Returns the value of pi.
 *
 * Category: Math and trigonometry
 *
 * @returns
 */
export function PI(): number

/**
 * Returns the periodic payment for an annuity.
 *
 * Category: Financial
 *
 * @param {*} rate The interest rate for the loan.
 * @param {*} nper The total number of payments for the loan.
 * @param {*} pv The present value, or the total amount that a series of future payments is worth now; also known as the principal.
 * @param {*} fv Optional. The future value, or a cash balance you want to attain after the last payment is made. If fv is omitted, it is assumed to be 0 (zero), that is, the future value of a loan is 0.
 * @param {*} type Optional. The number 0 (zero) or 1 and indicates when payments are due.
 * @returns
 */
export function PMT(rate: any, nper: any, pv: any, fv: any, type: any): number | Error
export namespace POISSON {
  /**
   * Returns the Poisson distribution.
   *
   * Category: Statistical
   *
   * @param {*} x The number of events.
   * @param {*} mean The expected numeric value.
   * @param {*} cumulative A logical value that determines the form of the probability distribution returned. If cumulative is TRUE, POISSON.DIST returns the cumulative Poisson probability that the number of random events occurring will be between zero and x inclusive; if FALSE, it returns the Poisson probability mass function that the number of events occurring will be exactly x.
   * @returns
   */
  function DIST(x: any, mean: any, cumulative: any): any
}

/**
 * Returns the Poisson distribution.
 *
 * Category: Statistical
 *
 * @param {*} x The number of events.
 * @param {*} mean The expected numeric value.
 * @param {*} cumulative A logical value that determines the form of the probability distribution returned. If cumulative is TRUE, POISSON.DIST returns the cumulative Poisson probability that the number of random events occurring will be between zero and x inclusive; if FALSE, it returns the Poisson probability mass function that the number of events occurring will be exactly x.
 * @returns
 */
export function POISSONDIST(x: any, mean: any, cumulative: any): any

/**
 * Formula.js only
 *
 * @param {*} base
 * @param {*} exponent
 * @returns
 */
export function POW(base: any, exponent: any, ...args: any[]): any

/**
 * Returns the result of a number raised to a power.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The base number. It can be any real number.
 * @param {*} power The exponent to which the base number is raised.
 * @returns
 */
export function POWER(number: any, power: any): any

/**
 * Returns the payment on the principal for an investment for a given period.
 *
 * Category: Financial
 *
 * @param {*} rate The interest rate per period.
 * @param {*} per Specifies the period and must be in the range 1 to nper.
 * @param {*} nper The total number of payment periods in an annuity.
 * @param {*} pv The present value — the total amount that a series of future payments is worth now.
 * @param {*} fv Optional. The future value, or a cash balance you want to attain after the last payment is made. If fv is omitted, it is assumed to be 0 (zero), that is, the future value of a loan is 0.
 * @param {*} type Optional. The number 0 or 1 and indicates when payments are due.
 * @returns
 */
export function PPMT(rate: any, per: any, nper: any, pv: any, fv: any, type: any): number | Error

/**
 * -- Not implemented --
 *
 * Returns the price per $100 face value of a security that pays periodic interest.
 *
 * Category: Financial
 *
 * @param {*} settlement The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer.
 * @param {*} maturity The security's maturity date. The maturity date is the date when the security expires.
 * @param {*} rate The security's annual coupon rate.
 * @param {*} yld The security's annual yield.
 * @param {*} redemption The security's redemption value per $100 face value.
 * @param {*} frequency The number of coupon payments per year. For annual payments, frequency = 1; for semiannual, frequency = 2; for quarterly, frequency = 4.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function PRICE(): void

/**
 * -- Not implemented --
 *
 * Returns the price per $100 face value of a discounted security.
 *
 * Category: Financial
 *
 * @param {*} settlement The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer.
 * @param {*} maturity The security's maturity date. The maturity date is the date when the security expires.
 * @param {*} discount The security's discount rate.
 * @param {*} redemption The security's redemption value per $100 face value.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function PRICEDISC(): void

/**
 * -- Not implemented --
 *
 * Returns the price per $100 face value of a security that pays interest at maturity.
 *
 * Category: Financial
 *
 * @param {*} settlement The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer.
 * @param {*} maturity The security's maturity date. The maturity date is the date when the security expires.
 * @param {*} issue The security's issue date, expressed as a serial date number.
 * @param {*} rate The security's interest rate at date of issue.
 * @param {*} yld The security's annual yield.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function PRICEMAT(): void

/**
 * Returns the probability that values in a range are between two limits.
 *
 * Category: Statistical
 *
 * @param {*} x_range The range of numeric values of x with which there are associated probabilities.
 * @param {*} prob_range A set of probabilities associated with values in x_range.
 * @param {*} lower_limit Optional. The lower bound on the value for which you want a probability.
 * @param {*} upper_limit Optional. The optional upper bound on the value for which you want a probability.
 * @returns
 */
export function PROB(x_range: any, prob_range: any, lower_limit: any, upper_limit: any): any

/**
 * Multiplies its arguments.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number1 The first number or range that you want to multiply.
 * @param {*} args number2, ... Optional. Additional numbers or ranges that you want to multiply, up to a maximum of 255 arguments.
 * @returns
 */
export function PRODUCT(...args: any[]): number | Error

/**
 * -- Not implemented --
 */
export function PRONETIC(): void

/**
 * Capitalizes the first letter in each word of a text value.
 *
 * Category: Text
 *
 * @param {*} text Text enclosed in quotation marks, a formula that returns text, or a reference to a value containing the text you want to partially capitalize.
 * @returns
 */
export function PROPER(text: any): any

/**
 * Returns the present value of an investment.
 *
 * Category: Financial
 *
 * @param {*} rate The interest rate per period. For example, if you obtain an automobile loan at a 10 percent annual interest rate and make monthly payments, your interest rate per month is 10%/12, or 0.83%. You would enter 10%/12, or 0.83%, or 0.0083, into the formula as the rate.
 * @param {*} nper The total number of payment periods in an annuity. For example, if you get a four-year car loan and make monthly payments, your loan has 4*12 (or 48) periods. You would enter 48 into the formula for nper.
 * @param {*} pmt The payment made each period and cannot change over the life of the annuity. Typically, pmt includes principal and interest but no other fees or taxes. For example, the monthly payments on a $10,000, four-year car loan at 12 percent are $263.33. You would enter -263.33 into the formula as the pmt. If pmt is omitted, you must include the fv argument.
 * @param {*} fv Optional. The future value, or a cash balance you want to attain after the last payment is made. If fv is omitted, it is assumed to be 0 (the future value of a loan, for example, is 0). For example, if you want to save $50,000 to pay for a special project in 18 years, then $50,000 is the future value. You could then make a conservative guess at an interest rate and determine how much you must save each month. If fv is omitted, you must include the pmt argument.
 * @param {*} type Optional. The number 0 or 1 and indicates when payments are due.
 * @returns
 */
export function PV(rate: any, per: any, pmt: any, fv: any, type: any): number | Error
export namespace QUARTILE {
  /**
   * Returns the quartile of the data set, based on percentile values from 0..1, exclusive.
   *
   * Category: Statistical
   *
   * @param {*} array The array or value range of numeric values for which you want the quartile value.
   * @param {*} quart Indicates which value to return.
   * @returns
   */
  function EXC(range: any, quart: any): number | Error

  /**
   * Returns the quartile of a data set.
   *
   * Category: Statistical
   *
   * @param {*} array The array or value range of numeric values for which you want the quartile value.
   * @param {*} quart Indicates which value to return.
   * @returns
   */
  function INC(range: any, quart: any): number | Error
}

/**
 * Returns the quartile of the data set, based on percentile values from 0..1, exclusive.
 *
 * Category: Statistical
 *
 * @param {*} array The array or value range of numeric values for which you want the quartile value.
 * @param {*} quart Indicates which value to return.
 * @returns
 */
export function QUARTILEEXC(range: any, quart: any): number | Error

/**
 * Returns the quartile of a data set.
 *
 * Category: Statistical
 *
 * @param {*} array The array or value range of numeric values for which you want the quartile value.
 * @param {*} quart Indicates which value to return.
 * @returns
 */
export function QUARTILEINC(range: any, quart: any): number | Error

/**
 * Returns the integer portion of a division.
 *
 * Category: Math and trigonometry
 *
 * @param {*} numerator The dividend.
 * @param {*} denominator The divisor.
 * @returns
 */
export function QUOTIENT(numerator: any, denominator: any): any

/**
 * Converts degrees to radians.
 *
 * Category: Math and trigonometry
 *
 * @param {*} angle An angle in degrees that you want to convert.
 * @returns
 */
export function RADIANS(angle: any): number | Error

/**
 * Returns a random number between 0 and 1.
 *
 * Category: Math and trigonometry
 *
 * @returns
 */
export function RAND(): number

/**
 * Returns a random number between the numbers you specify.
 *
 * Category: Math and trigonometry
 *
 * @param {*} bottom The smallest integer RANDBETWEEN will return.
 * @param {*} top The largest integer RANDBETWEEN will return.
 * @returns
 */
export function RANDBETWEEN(bottom: any, top: any): any
export namespace RANK {
  /**
   * Returns the rank of a number in a list of numbers.
   *
   * Category: Statistical
   *
   * @param {*} number The number whose rank you want to find.
   * @param {*} ref An array of, or a reference to, a list of numbers. Nonnumeric values in Ref are ignored.
   * @param {*} order Optional. A number specifying how to rank number.
   * @returns
   */
  function AVG(number: any, ref: any, order: any): any

  /**
   * Returns the rank of a number in a list of numbers.
   *
   * Category: Statistical
   *
   * @param {*} number The number whose rank you want to find.
   * @param {*} ref An array of, or a reference to, a list of numbers. Non-numeric values in Ref are ignored.
   * @param {*} order Optional. A number specifying how to rank number.
   * @returns
   */
  function EQ(number: any, ref: any, order: any): any
}

/**
 * Returns the rank of a number in a list of numbers.
 *
 * Category: Statistical
 *
 * @param {*} number The number whose rank you want to find.
 * @param {*} ref An array of, or a reference to, a list of numbers. Nonnumeric values in Ref are ignored.
 * @param {*} order Optional. A number specifying how to rank number.
 * @returns
 */
export function RANKAVG(number: any, ref: any, order: any): any

/**
 * Returns the rank of a number in a list of numbers.
 *
 * Category: Statistical
 *
 * @param {*} number The number whose rank you want to find.
 * @param {*} ref An array of, or a reference to, a list of numbers. Non-numeric values in Ref are ignored.
 * @param {*} order Optional. A number specifying how to rank number.
 * @returns
 */
export function RANKEQ(number: any, ref: any, order: any): any

/**
 * Returns the interest rate per period of an annuity.
 *
 * Category: Financial
 *
 * @param {*} nper The total number of payment periods in an annuity.
 * @param {*} pmt The payment made each period and cannot change over the life of the annuity. Typically, pmt includes principal and interest but no other fees or taxes. If pmt is omitted, you must include the fv argument.
 * @param {*} pv The present value — the total amount that a series of future payments is worth now.
 * @param {*} fv Optional. The future value, or a cash balance you want to attain after the last payment is made. If fv is omitted, it is assumed to be 0 (the future value of a loan, for example, is 0). If fv is omitted, you must include the pmt argument.
 * @param {*} type Optional. The number 0 or 1 and indicates when payments are due.
 * @param {*} guess Optional. Your guess for what the rate will be. If you omit guess, it is assumed to be 10 percent. If RATE does not converge, try different values for guess. RATE usually converges if guess is between 0 and 1.
 - If you omit guess, it is assumed to be 10 percent.
 - If RATE does not converge, try different values for guess. RATE usually converges if guess is between 0 and 1.
 * @returns
 */
export function RATE(nper: any, pmt: any, pv: any, fv: any, type: any, guess: any): any

/**
 * -- Not implemented --
 *
 * Returns the amount received at maturity for a fully invested security.
 *
 * Category: Financial
 *
 * @param {*} settlement The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer.
 * @param {*} maturity The security's maturity date. The maturity date is the date when the security expires.
 * @param {*} investment The amount invested in the security.
 * @param {*} discount The security's discount rate.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function RECEIVED(): void

/**
 * Formula.js only
 *
 * @param {*} context
 * @param {*} reference
 * @returns
 */
export function REFERENCE(context: any, reference: any, ...args: any[]): any

/**
 * Formula.js only
 *
 * @param {*} text
 * @param {*} regular_expression
 * @returns
 */
export function REGEXEXTRACT(text: any, regular_expression: any, ...args: any[]): any

/**
 * Formula.js only
 *
 * @param {*} text
 * @param {*} regular_expression
 * @param {*} full
 * @returns
 */
export function REGEXMATCH(text: any, regular_expression: any, full: any, ...args: any[]): any

/**
 * Formula.js only
 *
 * @param {*} text
 * @param {*} regular_expression
 * @param {*} replacement
 * @returns
 */
export function REGEXREPLACE(text: any, regular_expression: any, replacement: any, ...args: any[]): any

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
export function REPLACE(old_text: any, num_chars: any, length: any, new_text: any): string | Error

/**
 * Repeats text a given number of times.
 *
 * Category: Text
 *
 * @param {*} text The text you want to repeat.
 * @param {*} number_times A positive number specifying the number of times to repeat text.
 * @returns
 */
export function REPT(text: any, number_times: any): any

/**
 * Returns the rightmost characters from a text value
 *
 * Category: Text
 *
 * @param {*} text The text string containing the characters you want to extract.
 * @param {*} num_chars Optional. Specifies the number of characters you want RIGHT to extract.
 * @returns
 */
export function RIGHT(text: any, num_chars: any): any

/**
 * Converts an arabic numeral to roman, as text.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The Arabic numeral you want converted.
 * @returns
 */
export function ROMAN(number: any): string | Error

/**
 * Rounds a number to a specified number of digits.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The number that you want to round.
 * @param {*} num_digits The number of digits to which you want to round the number argument.
 * @returns
 */
export function ROUND(number: any, num_digits: any): any

/**
 * Rounds a number down, toward zero.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number Any real number that you want rounded down.
 * @param {*} num_digits The number of digits to which you want to round number.
 * @returns
 */
export function ROUNDDOWN(number: any, num_digits: any): any

/**
 * Rounds a number up, away from zero.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number Any real number that you want rounded up.
 * @param {*} num_digits The number of digits to which you want to round number.
 * @returns
 */
export function ROUNDUP(number: any, num_digits: any): any

/**
 * Returns the row number of a reference.
 *
 * Category: Lookup and reference
 *
 * @param {*} reference the value or range of values for which you want the row number.
 * @param {*} index
 * @returns
 */
export function ROW(reference: any, index: any, ...args: any[]): any

/**
 * Returns the number of rows in a reference.
 *
 * Category: Lookup and reference
 *
 * @param {*} array An array, an array formula, or a reference to a range of values for which you want the number of rows.
 * @returns
 */
export function ROWS(array: any, ...args: any[]): any

/**
 * Returns an equivalent interest rate for the growth of an investment.
 *
 * Category: Financial
 *
 * @param {*} nper Nper is the number of periods for the investment.
 * @param {*} pv Pv is the present value of the investment.
 * @param {*} fv Fv is the future value of the investment.
 * @returns
 */
export function RRI(nper: any, pv: any, fv: any): number | Error

/**
 * Returns the square of the Pearson product moment correlation coefficient.
 *
 * Category: Statistical
 *
 * @param {*} known_y An array or range of data points.
 * @param {*} known_x An array or range of data points.
 * @returns
 */
export function RSQ(known_y: any, known_x: any): number | Error

/**
 * Finds one text value within another (not case-sensitive)
 *
 * Category: Text
 *
 * @param {*} find_text The text that you want to find.
 * @param {*} within_text The text in which you want to search for the value of the find_text argument.
 * @param {*} start_num Optional. The character number in the within_text argument at which you want to start searching.
 * @returns
 */
export function SEARCH(find_text: any, within_text: any, start_num: any): number | Error

/**
 * Returns the secant of an angle.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The angle in radians for which you want the secant.
 * @returns
 */
export function SEC(number: any): number | Error

/**
 * Returns the hyperbolic secant of an angle.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The angle in radians for which you want the hyperbolic secant.
 * @returns
 */
export function SECH(number: any): number | Error

/**
 * Converts a serial number to a second.
 *
 * Category: Date and time
 *
 * @param {*} serial_number The time that contains the seconds you want to find. Times may be entered as text strings within quotation marks (for example, "6:45 PM"), as decimal numbers (for example, 0.78125, which represents 6:45 PM), or as results of other formulas or functions (for example, TIMEVALUE("6:45 PM")).
 * @returns
 */
export function SECOND(serial_number: any): any

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
export function SERIESSUM(x: any, n: any, m: any, coefficients: any): number | Error

/**
 * -- Not implemented --
 *
 * Returns the sheet number of the referenced sheet.
 *
 * Category: Information
 *
 * @param {*} value Optional. Value is the name of a sheet or a reference for which you want the sheet number. If value is omitted, SHEET returns the number of the sheet that contains the function.
 * @returns
 */
export function SHEET(): void

/**
 * -- Not implemented --
 *
 * Returns the number of sheets in a reference.
 *
 * Category: Information
 *
 * @param {*} reference Optional. Reference is a reference for which you want to know the number of sheets it contains. If Reference is omitted, SHEETS returns the number of sheets in the workbook that contains the function.
 * @returns
 */
export function SHEETS(): void

/**
 * Returns the sign of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number Any real number.
 * @returns
 */
export function SIGN(number: any): Error | 1 | -1 | 0

/**
 * Returns the sine of the given angle.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The angle in radians for which you want the sine.
 * @returns
 */
export function SIN(number: any): number | Error

/**
 * Returns the hyperbolic sine of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number Any real number.
 * @returns
 */
export function SINH(number: any): number | Error

/**
 * Returns the skewness of a distribution.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number1 is required, subsequent numbers are optional. 1 to 255 arguments for which you want to calculate skewness. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
export function SKEW(...args: any[]): number | Error
export namespace SKEW {
  /**
   * Returns the skewness of a distribution based on a population.
   *
   * Category: Statistical
   *
   * @returns
   */
  function P(...args: any[]): number | Error
}

/**
 * Returns the skewness of a distribution based on a population.
 *
 * Category: Statistical
 *
 * @returns
 */
export function SKEWP(...args: any[]): number | Error

/**
 * Returns the straight-line depreciation of an asset for one period.
 *
 * Category: Financial
 *
 * @param {*} cost The initial cost of the asset.
 * @param {*} salvage The value at the end of the depreciation (sometimes called the salvage value of the asset).
 * @param {*} life The number of periods over which the asset is depreciated (sometimes called the useful life of the asset).
 * @returns
 */
export function SLN(cost: any, salvage: any, life: any): number | Error

/**
 * Returns the slope of the linear regression line.
 *
 * Category: Statistical
 *
 * @param {*} known_y An array or value range of numeric dependent data points.
 * @param {*} known_x The set of independent data points.
 * @returns
 */
export function SLOPE(known_y: any, known_x: any): number | Error

/**
 * Returns the k-th smallest value in a data set.
 *
 * Category: Statistical
 *
 * @param {*} array An array or range of numerical data for which you want to determine the k-th smallest value.
 * @param {*} k The position (from the smallest) in the array or range of data to return.
 * @returns
 */
export function SMALL(array: any, k: any): any

/**
 * Formula.js only
 *
 * @param {*} text
 * @param {*} separator
 * @returns
 */
export function SPLIT(text: any, separator: any): any

/**
 * Returns a positive square root.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The number for which you want the square root.
 * @returns
 */
export function SQRT(number: any): number | Error

/**
 * Formula.js only
 *
 * @returns
 */
export function SQRT1_2(): number

/**
 * Formula.js only
 *
 * @returns
 */
export function SQRT2(): number

/**
 * Returns the square root of (number * pi).
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The number by which pi is multiplied.
 * @returns
 */
export function SQRTPI(number: any): number | Error

/**
 * Returns a normalized value.
 *
 * Category: Statistical
 *
 * @param {*} x The value you want to normalize.
 * @param {*} mean The arithmetic mean of the distribution.
 * @param {*} standard_dev The standard deviation of the distribution.
 * @returns
 */
export function STANDARDIZE(x: any, mean: any, standard_dev: any): number | Error
export namespace STDEV {
  /**
   * Calculates standard deviation based on the entire population.
   *
   * Category: Statistical
   *
   * @param {*} args number1, number2, ... Number arguments 2 to 254 corresponding to a population. You can also use a single array or a reference to an array instead of arguments separated by commas.
   * @returns
   */
  function P(...args: any[]): number

  /**
   * Estimates standard deviation based on a sample.
   *
   * Category: Statistical
   *
   * @param {*} args number1, number2, ... Number arguments 2 to 254 corresponding to a sample of a population. You can also use a single array or a reference to an array instead of arguments separated by commas.
   * @returns
   */
  function S(...args: any[]): number
}

/**
 * Estimates standard deviation based on a sample, including numbers, text, and logical values.
 *
 * Category: Statistical
 *
 * @param {*} args value1, value2, ... Value1 is required, subsequent values are optional. 1 to 255 values corresponding to a sample of a population. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
export function STDEVA(...args: any[]): number

/**
 * Calculates standard deviation based on the entire population.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number arguments 2 to 254 corresponding to a population. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
export function STDEVP(...args: any[]): number

/**
 * Calculates standard deviation based on the entire population, including numbers, text, and logical values.
 *
 * Category: Statistical
 *
 * @param {*} args value1, value2, ... Value1 is required, subsequent values are optional. 1 to 255 values corresponding to a population. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
export function STDEVPA(...args: any[]): number

/**
 * Estimates standard deviation based on a sample.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number arguments 2 to 254 corresponding to a sample of a population. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
export function STDEVS(...args: any[]): number

/**
 * Returns the standard error of the predicted y-value for each x in the regression.
 *
 * Category: Statistical
 *
 * @param {*} known_y An array or range of dependent data points.
 * @param {*} known_x An array or range of independent data points.
 * @returns
 */
export function STEYX(known_y: any, known_x: any): number | Error

/**
 * Substitutes new text for old text in a text string.
 *
 * Category: Text
 *
 * @param {*} text The text or the reference to a value containing text for which you want to substitute characters.
 * @param {*} old_text The text you want to replace.
 * @param {*} new_text The text you want to replace old_text with.
 * @param {*} instance_num Optional. Specifies which occurrence of old_text you want to replace with new_text. If you specify instance_num, only that instance of old_text is replaced. Otherwise, every occurrence of old_text in text is changed to new_text.
 * @returns
 */
export function SUBSTITUTE(text: any, old_text: any, new_text: any, instance_num: any, ...args: any[]): any

/**
 * Returns a subtotal in a list or database.
 *
 * Category: Math and trigonometry
 *
 * @param {*} function_num The number 1-11 or 101-111 that specifies the function to use for the subtotal. 1-11 includes manually-hidden rows, while 101-111 excludes them; filtered-out values are always excluded.
 * @param {*} ref1 The first named range or reference for which you want the subtotal.
 * @returns
 */
export function SUBTOTAL(function_num: any, ref1: any): any

/**
 * Adds its arguments.
 *
 * Category: Math and trigonometry
 *
 * @returns
 */
export function SUM(...args: any[]): number

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
export function SUMIF(range: any, criteria: any, sum_range: any): number | Error

/**
 * Adds the values in a range that meet multiple criteria.
 *
 * Category: Math and trigonometry
 *
 * @returns
 */
export function SUMIFS(...args: any[]): number | Error

/**
 * Returns the sum of the products of corresponding array components.
 *
 * Category: Math and trigonometry
 *
 * @returns
 */
export function SUMPRODUCT(...args: any[]): number | Error

/**
 * Returns the sum of the squares of the arguments.
 *
 * Category: Math and trigonometry
 *
 * @param {*} args number1, number2, ... Number1 is required, subsequent numbers are optional. 1 to 255 arguments for which you want the sum of the squares. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
export function SUMSQ(...args: any[]): number | Error

/**
 * Returns the sum of the difference of squares of corresponding values in two arrays.
 *
 * Category: Math and trigonometry
 *
 * @param {*} array_x The first array or range of values.
 * @param {*} array_y The second array or range of values.
 * @returns
 */
export function SUMX2MY2(array_x: any, array_y: any): number | Error

/**
 * Returns the sum of the sum of squares of corresponding values in two arrays.
 *
 * Category: Math and trigonometry
 *
 * @param {*} array_x The first array or range of values.
 * @param {*} array_y The second array or range of values.
 * @returns
 */
export function SUMX2PY2(array_x: any, array_y: any): number | Error

/**
 * Returns the sum of squares of differences of corresponding values in two arrays.
 *
 * Category: Math and trigonometry
 *
 * @param {*} array_x The first array or range of values.
 * @param {*} array_y The second array or range of values.
 * @returns
 */
export function SUMXMY2(array_x: any, array_y: any): number | Error

/**
 * Evaluates an expression against a list of values and returns the result corresponding to the first matching value. If there is no match, an optional default value may be returned.
 *
 * Category: Logical
 *
 * @returns
 */
export function SWITCH(...args: any[]): any

/**
 * Returns the sum-of-years' digits depreciation of an asset for a specified period.
 *
 * Category: Financial
 *
 * @param {*} cost The initial cost of the asset.
 * @param {*} salvage The value at the end of the depreciation (sometimes called the salvage value of the asset).
 * @param {*} life The number of periods over which the asset is depreciated (sometimes called the useful life of the asset).
 * @param {*} per The period and must use the same units as life.
 * @returns
 */
export function SYD(cost: any, salvage: any, life: any, per: any): number | Error

/**
 * Converts its arguments to text.
 *
 * Category: Text
 *
 * @param {*} value The value you want to test.
 * @returns
 */
declare function T$1(value: any): string | Error

/**
 * Returns the tangent of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The angle in radians for which you want the tangent.
 * @returns
 */
export function TAN(number: any): number | Error

/**
 * Returns the hyperbolic tangent of a number.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number Any real number.
 * @returns
 */
export function TANH(number: any): number | Error

/**
 * Returns the bond-equivalent yield for a Treasury bill.
 *
 * Category: Financial
 *
 * @param {*} settlement The Treasury bill's settlement date. The security settlement date is the date after the issue date when the Treasury bill is traded to the buyer.
 * @param {*} maturity The Treasury bill's maturity date. The maturity date is the date when the Treasury bill expires.
 * @param {*} discount The Treasury bill's discount rate.
 * @returns
 */
export function TBILLEQ(settlement: any, maturity: any, discount: any): number | Error

/**
 * Returns the price per $100 face value for a Treasury bill.
 *
 * Category: Financial
 *
 * @param {*} settlement The Treasury bill's settlement date. The security settlement date is the date after the issue date when the Treasury bill is traded to the buyer.
 * @param {*} maturity The Treasury bill's maturity date. The maturity date is the date when the Treasury bill expires.
 * @param {*} discount The Treasury bill's discount rate.
 * @returns
 */
export function TBILLPRICE(settlement: any, maturity: any, discount: any): number | Error

/**
 * Returns the yield for a Treasury bill.
 *
 * Category: Financial
 *
 * @param {*} settlement The Treasury bill's settlement date. The security settlement date is the date after the issue date when the Treasury bill is traded to the buyer.
 * @param {*} maturity The Treasury bill's maturity date. The maturity date is the date when the Treasury bill expires.
 * @param {*} pr The Treasury bill's price per $100 face value.
 * @returns
 */
export function TBILLYIELD(settlement: any, maturity: any, pr: any): number | Error
export const TDIST: {
  (x: any, deg_freedom: any, cumulative: any): number | Error

  /**
   * Returns the Percentage Points (probability) for the Student t-distribution
   *
   * Category: Statistical
   *
   * @param {*} x The numeric value at which to evaluate the distribution.
   * @param {*} deg_freedom An integer indicating the number of degrees of freedom.
   * @returns
   */
  '2T'(x: any, deg_freedom: any, ...args: any[]): number | Error

  /**
   * Returns the Student's t-distribution.
   *
   * Category: Statistical
   *
   * @param {*} x The numeric value at which to evaluate the distribution.
   * @param {*} deg_freedom An integer indicating the number of degrees of freedom.
   * @returns
   */
  RT(x: any, deg_freedom: any, ...args: any[]): number | Error
}

/**
 * Returns the Student's t-distribution.
 *
 * Category: Statistical
 *
 * @param {*} x The numeric value at which to evaluate the distribution.
 * @param {*} deg_freedom An integer indicating the number of degrees of freedom.
 * @returns
 */
export function TDISTRT(x: any, deg_freedom: any, ...args: any[]): number | Error

/**
 * -- Not implemented --
 *
 * Formats a number and converts it to text.
 *
 * Category: Text
 *
 * @returns
 */
export function TEXT(): void

/**
 * Combines the text from multiple ranges and/or strings.
 *
 * Category: Text
 * @param {*} delimiter A text string, either empty, or one or more characters enclosed by double quotes, or a reference to a valid text string. If a number is supplied, it will be treated as text.
 * @param {*} ignore_empty If TRUE, ignores empty values.
 * @param {*} args Text item to be joined. A text string, or array of strings, such as a range of values.
 * @returns
 */
export function TEXTJOIN(delimiter: any, ignore_empty: any, ...args: any): any

/**
 * Returns the serial number of a particular time.
 *
 * Category: Date and time
 *
 * @param {*} hour A number from 0 (zero) to 32767 representing the hour. Any value greater than 23 will be divided by 24 and the remainder will be treated as the hour value. For example, TIME(27,0,0) = TIME(3,0,0) = .125 or 3:00 AM.
 * @param {*} minute A number from 0 to 32767 representing the minute. Any value greater than 59 will be converted to hours and minutes. For example, TIME(0,750,0) = TIME(12,30,0) = .520833 or 12:30 PM.
 * @param {*} second A number from 0 to 32767 representing the second. Any value greater than 59 will be converted to hours, minutes, and seconds. For example, TIME(0,0,2000) = TIME(0,33,22) = .023148 or 12:33:20 AM
 * @returns
 */
export function TIME(hour: any, minute: any, second: any): number | Error

/**
 * Converts a time in the form of text to a serial number.
 *
 * Category: Date and time
 *
 * @param {*} time_text A text string that represents a time in any one of the Microsoft Excel time formats; for example, "6:45 PM" and "18:45" text strings within quotation marks that represent time.
 * @returns
 */
export function TIMEVALUE(time_text: any): number | Error
export const TINV: {
  (probability: any, deg_freedom: any): any

  /**
   * Returns the inverse of the Student's t-distribution
   *
   * Category: Statistical
   *
   * @param {*} probability The probability associated with the Student's t-distribution.
   * @param {*} deg_freedom The number of degrees of freedom with which to characterize the distribution.
   * @returns
   */
  '2T'(probability: any, deg_freedom: any): number | Error
}

/**
 * Returns the serial number of today's date.
 *
 * Category: Date and time
 *
 * @returns
 */
export function TODAY(): Date

/**
 * Returns the transpose of an array.
 *
 * Category: Lookup and reference
 *
 * @param {*} array An array or range of values on a worksheet that you want to transpose. The transpose of an array is created by using the first row of the array as the first column of the new array, the second row of the array as the second column of the new array, and so on. If you're not sure of how to enter an array formula, see Create an array formula.
 * @returns
 */
export function TRANSPOSE(array: any): any

/**
 * Returns values along a linear trend.
 *
 * Category: Statistical
 *
 * @param {*} known_ys The set of y-values you already know in the relationship y = mx + b
 * @param {*} known_xs An optional set of x-values that you may already know in the relationship y = mx + b
 * @param {*} new_xs Optional. New x-values for which you want TREND to return corresponding y-values.
 * @returns
 */
export function TREND(known_ys: any, known_xs: any, new_xs: any): any[] | Error

/**
 * Removes spaces from text.
 *
 * Category: Text
 *
 * @param {*} text The text from which you want spaces removed.
 * @returns
 */
export function TRIM(text: any): any

/**
 * Returns the mean of the interior of a data set.
 *
 * Category: Statistical
 *
 * @param {*} array The array or range of values to trim and average.
 * @param {*} percent The fractional number of data points to exclude from the calculation. For example, if percent = 0.2, 4 points are trimmed from a data set of 20 points (20 x 0.2): 2 from the top and 2 from the bottom of the set.
 * @returns
 */
export function TRIMMEAN(range: any, percent: any): any

/**
 * Returns the logical value TRUE.
 *
 * Category: Logical
 *
 * @returns
 */
export function TRUE(): boolean

/**
 * Truncates a number to an integer.
 *
 * Category: Math and trigonometry
 *
 * @param {*} number The number you want to truncate.
 * @param {*} num_digits Optional. A number specifying the precision of the truncation. The default value for num_digits is 0 (zero).
 * @returns
 */
export function TRUNC(number: any, num_digits: any): any

/**
 * Returns the probability associated with a Student's t-test.
 *
 * Category: Statistical
 *
 * @param {*} array1 The first data set.
 * @param {*} array2 The second data set.
 * @returns
 */
export function TTEST(array1: any, array2: any): number | Error

/**
 * Returns a number indicating the data type of a value.
 *
 * Category: Information
 *
 * @param {*} value Can be any Microsoft Excel value, such as a number, text, logical value, and so on.
 * @returns
 */
export function TYPE(value: any): 1 | 2 | 4 | 16 | 64

/**
 * Returns the character specified by the code number.
 *
 * Category: Text
 *
 * @param {*} number A number between 1 and 255 specifying which character you want. The character is from the character set used by your computer. Note: Excel for the web supports only CHAR(9), CHAR(10), CHAR(13), and CHAR(32) and above.
 * @returns
 */
export function UNICHAR(number: any): string | Error

/**
 * Returns a numeric code for the first character in a text string.
 *
 * Category: Text
 *
 * @param {*} text The text for which you want the code of the first character.
 * @returns
 */
export function UNICODE(text: any): any

/**
 * Returns a list of unique values in a list or range.
 *
 * Category: Lookup and reference
 *
 * @returns
 */
export function UNIQUE(...args: any[]): any[]

/**
 * Converts text to uppercase.
 *
 * Category: Text
 *
 * @param {*} text The text you want converted to uppercase. Text can be a reference or text string.
 * @returns
 */
export function UPPER(text: any): any

/**
 * Converts a text argument to a number.
 *
 * Category: Text
 *
 * @param {*} text The text enclosed in quotation marks or a reference to a value containing the text you want to convert.
 * @returns
 */
export function VALUE(text: any): any
export namespace VAR {
  /**
   * Calculates variance based on the entire population.
   *
   * Category: Statistical
   *
   * @param {*} args number1, number2, ... Number arguments 2 to 254 corresponding to a population.
   * @returns
   */
  function P(...args: any[]): number | Error

  /**
   * Estimates variance based on a sample.
   *
   * Category: Statistical
   *
   * @param {*} args number1, number2, ... Number arguments 2 to 254 corresponding to a sample of a population.
   * @returns
   */
  function S(...args: any[]): number
}

/**
 * Estimates variance based on a sample, including numbers, text, and logical values.
 *
 * Category: Statistical
 *
 * @param {*} args value1, value2, ... Value1 is required, subsequent values are optional. 1 to 255 value arguments corresponding to a sample of a population.
 * @returns
 */
export function VARA(...args: any[]): number

/**
 * Calculates variance based on the entire population.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number arguments 2 to 254 corresponding to a population.
 * @returns
 */
export function VARP(...args: any[]): number | Error

/**
 * Calculates variance based on the entire population, including numbers, text, and logical values.
 *
 * Category: Statistical
 *
 * @param {*} args value1, value2, ... Value1 is required, subsequent values are optional. 1 to 255 value arguments corresponding to a population.
 * @returns
 */
export function VARPA(...args: any[]): number | Error

/**
 * Estimates variance based on a sample.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number arguments 2 to 254 corresponding to a sample of a population.
 * @returns
 */
export function VARS(...args: any[]): number

/**
 * -- Not implemented --
 *
 * Returns the depreciation of an asset for a specified or partial period by using a declining balance method.
 *
 * Category: Financial
 *
 * @param {*} cost The initial cost of the asset.
 * @param {*} salvage The value at the end of the depreciation (sometimes called the salvage value of the asset). This value can be 0.
 * @param {*} life The number of periods over which the asset is depreciated (sometimes called the useful life of the asset).
 * @param {*} start_period The starting period for which you want to calculate the depreciation. Start_period must use the same units as life.
 * @param {*} end_period The ending period for which you want to calculate the depreciation. End_period must use the same units as life.
 * @param {*} factor Optional. The rate at which the balance declines. If factor is omitted, it is assumed to be 2 (the double-declining balance method). Change factor if you do not want to use the double-declining balance method. For a description of the double-declining balance method, see DDB.
 * @param {*} no_switch Optional. A logical value specifying whether to switch to straight-line depreciation when depreciation is greater than the declining balance calculation.
 - If no_switch is TRUE, Microsoft Excel does not switch to straight-line depreciation even when the depreciation is greater than the declining balance calculation.
 - If no_switch is FALSE or omitted, Excel switches to straight-line depreciation when depreciation is greater than the declining balance calculation.
 * @returns
 */
export function VDB(): void

/**
 * Looks in the first column of an array and moves across the row to return the value of a value.
 *
 * Category: Lookup and reference
 *
 * @param {*} lookup_value The value to be found in the first row of the table. Lookup_value can be a value, a reference, or a text string.
 * @param {*} table_array A table of information in which data is looked up. Use a reference to a range or a range name.
 * @param {*} col_index_num The row number in table_array from which the matching value will be returned. A row_index_num of 1 returns the first row value in table_array, a row_index_num of 2 returns the second row value in table_array, and so on. If row_index_num is less than 1, HLOOKUP returns the #VALUE! error value; if row_index_num is greater than the number of rows on table_array, HLOOKUP returns the #REF! error value.
 * @param {*} range_lookup Optional. A logical value that specifies whether you want HLOOKUP to find an exact match or an approximate match. If TRUE or omitted, an approximate match is returned. In other words, if an exact match is not found, the next largest value that is less than lookup_value is returned. If FALSE, HLOOKUP will find an exact match. If one is not found, the error value #N/A is returned.
 * @returns
 */
export function VLOOKUP(lookup_value: any, table_array: any, col_index_num: any, range_lookup: any): Error

/**
 * Converts a serial number to a day of the week.
 *
 * Category: Date and time
 *
 * @param {*} serial_number A sequential number that represents the date of the day you are trying to find.
 * @param {*} return_type Optional. A number that determines the type of return value.
 * @returns
 */
export function WEEKDAY(serial_number: any, return_type: any): number | Error

/**
 * Converts a serial number to a number representing where the week falls numerically with a year.
 *
 * Category: Date and time
 *
 * @param {*} serial_number A date within the week.
 * @param {*} return_type Optional. A number that determines on which day the week begins. The default is 1.
 * @returns
 */
export function WEEKNUM(serial_number: any, return_type: any): number | Error
export namespace WEIBULL {
  /**
   * Returns the Weibull distribution.
   *
   * Category: Statistical
   *
   * @param {*} x The value at which to evaluate the function.
   * @param {*} alpha A parameter to the distribution.
   * @param {*} beta A parameter to the distribution.
   * @param {*} cumulative Determines the form of the function.
   * @returns
   */
  function DIST(x: any, alpha: any, beta: any, cumulative: any): number | Error
}

/**
 * Returns the Weibull distribution.
 *
 * Category: Statistical
 *
 * @param {*} x The value at which to evaluate the function.
 * @param {*} alpha A parameter to the distribution.
 * @param {*} beta A parameter to the distribution.
 * @param {*} cumulative Determines the form of the function.
 * @returns
 */
export function WEIBULLDIST(x: any, alpha: any, beta: any, cumulative: any): number | Error

/**
 * Returns the serial number of the date before or after a specified number of workdays.
 *
 * Category: Date and time
 *
 * @param {*} start_date A date that represents the start date.
 * @param {*} days The number of nonweekend and nonholiday days before or after start_date. A positive value for days yields a future date; a negative value yields a past date.
 * @param {*} holidays Optional. An optional list of one or more dates to exclude from the working calendar, such as state and federal holidays and floating holidays. The list can be either a range of values that contain the dates or an array constant of the serial numbers that represent the dates.
 * @returns
 */
export function WORKDAY(start_date: any, days: any, holidays: any): any
export namespace WORKDAY {
  /**
   * Returns the serial number of the date before or after a specified number of workdays using parameters to indicate which and how many days are weekend days.
   *
   * Category: Date and time
   *
   * @param {*} start_date The start date, truncated to integer.
   * @param {*} days The number of workdays before or after the start_date. A positive value yields a future date; a negative value yields a past date; a zero value yields the start_date. Day-offset is truncated to an integer.
   * @param {*} weekend Optional. Indicates the days of the week that are weekend days and are not considered working days. Weekend is a weekend number or string that specifies when weekends occur. Weekend number values indicate the following weekend days:
   * @param {*} holidays Optional. An optional set of one or more dates that are to be excluded from the working day calendar. Holidays shall be a range of values that contain the dates, or an array constant of the serial values that represent those dates. The ordering of dates or serial values in holidays can be arbitrary.
   * @returns
   */
  function INTL(start_date: any, days: any, weekend: any, holidays: any): any
}

/**
 * Returns the serial number of the date before or after a specified number of workdays using parameters to indicate which and how many days are weekend days.
 *
 * Category: Date and time
 *
 * @param {*} start_date The start date, truncated to integer.
 * @param {*} days The number of workdays before or after the start_date. A positive value yields a future date; a negative value yields a past date; a zero value yields the start_date. Day-offset is truncated to an integer.
 * @param {*} weekend Optional. Indicates the days of the week that are weekend days and are not considered working days. Weekend is a weekend number or string that specifies when weekends occur. Weekend number values indicate the following weekend days:
 * @param {*} holidays Optional. An optional set of one or more dates that are to be excluded from the working day calendar. Holidays shall be a range of values that contain the dates, or an array constant of the serial values that represent those dates. The ordering of dates or serial values in holidays can be arbitrary.
 * @returns
 */
export function WORKDAYINTL(start_date: any, days: any, weekend: any, holidays: any): any

/**
 * Returns the internal rate of return for a schedule of cash flows that is not necessarily periodic.
 *
 * Category: Financial
 *
 * @param {*} values A series of cash flows that corresponds to a schedule of payments in dates. The first payment is optional and corresponds to a cost or payment that occurs at the beginning of the investment. If the first value is a cost or payment, it must be a negative value. All succeeding payments are discounted based on a 365-day year. The series of values must contain at least one positive and one negative value.
 * @param {*} dates A schedule of payment dates that corresponds to the cash flow payments. Dates may occur in any order. Dates should be entered by using the DATE function, or as results of other formulas or functions. For example, use DATE(2008,5,23) for the 23rd day of May, 2008. Problems can occur if dates are entered as text. .
 * @param {*} guess Optional. A number that you guess is close to the result of XIRR.
 * @returns
 */
export function XIRR(values: any, dates: any, guess: any): any

/**
 * Returns the net present value for a schedule of cash flows that is not necessarily periodic.
 *
 * Category: Financial
 *
 * @param {*} rate The discount rate to apply to the cash flows.
 * @param {*} values A series of cash flows that corresponds to a schedule of payments in dates. The first payment is optional and corresponds to a cost or payment that occurs at the beginning of the investment. If the first value is a cost or payment, it must be a negative value. All succeeding payments are discounted based on a 365-day year. The series of values must contain at least one positive value and one negative value.
 * @param {*} dates A schedule of payment dates that corresponds to the cash flow payments. The first payment date indicates the beginning of the schedule of payments. All other dates must be later than this date, but they may occur in any order.
 * @returns
 */
export function XNPV(rate: any, values: any, dates: any): number | Error

/**
 * Returns a logical exclusive OR of all arguments.
 *
 * Category: Logical
 *
 * @param {*} args logical1, logical2,… Logical 1 is required, subsequent logical values are optional. 1 to 254 conditions you want to test that can be either TRUE or FALSE, and can be logical values, arrays, or references.
 * @returns
 */
export function XOR(...args: any[]): any

/**
 * Converts a serial number to a year.
 *
 * Category: Date and time
 *
 * @param {*} serial_number The date of the year you want to find.
 * @returns
 */
export function YEAR(serial_number: any): any

/**
 * Returns the year fraction representing the number of whole days between start_date and end_date.
 *
 * Category: Date and time
 *
 * @param {*} start_date A date that represents the start date.
 * @param {*} end_date A date that represents the end date.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function YEARFRAC(start_date: any, end_date: any, basis: any): number | Error

/**
 * -- Not implemented --
 *
 * Returns the yield on a security that pays periodic interest.
 *
 * Category: Financial
 *
 * @param {*} settlement The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer.
 * @param {*} maturity The security's maturity date. The maturity date is the date when the security expires.
 * @param {*} rate The security's annual coupon rate.
 * @param {*} pr The security's price per $100 face value.
 * @param {*} redemption The security's redemption value per $100 face value.
 * @param {*} frequency The number of coupon payments per year. For annual payments, frequency = 1; for semiannual, frequency = 2; for quarterly, frequency = 4.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function YIELD(): void

/**
 * -- Not implemented --
 *
 * Returns the annual yield for a discounted security; for example, a Treasury bill.
 *
 * Category: Financial
 *
 * @param {*} settlement The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer.
 * @param {*} maturity The security's maturity date. The maturity date is the date when the security expires.
 * @param {*} pr The security's price per $100 face value.
 * @param {*} redemption The security's redemption value per $100 face value.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function YIELDDISC(): void

/**
 * -- Not implemented --
 *
 * Returns the annual yield of a security that pays interest at maturity.
 *
 * Category: Financial
 *
 * @param {*} settlement The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer.
 * @param {*} maturity The security's maturity date. The maturity date is the date when the security expires.
 * @param {*} issue The security's issue date, expressed as a serial date number.
 * @param {*} rate The security's interest rate at date of issue.
 * @param {*} pr The security's price per $100 face value.
 * @param {*} basis Optional. The type of day count basis to use.
 * @returns
 */
export function YIELDMAT(): void
export namespace Z {
  /**
   * Returns the one-tailed probability-value of a z-test.
   *
   * Category: Statistical
   *
   * @param {*} array The array or range of data against which to test x.
   * @param {*} x The value to test.
   * @param {*} sigma Optional. The population (known) standard deviation. If omitted, the sample standard deviation is used.
   * @returns
   */
  function TEST(array: any, x: any, sigma: any): number | Error
}

/**
 * Returns the one-tailed probability-value of a z-test.
 *
 * Category: Statistical
 *
 * @param {*} array The array or range of data against which to test x.
 * @param {*} x The value to test.
 * @param {*} sigma Optional. The population (known) standard deviation. If omitted, the sample standard deviation is used.
 * @returns
 */
export function ZTEST(array: any, x: any, sigma: any): number | Error
export { T$1 as T }
