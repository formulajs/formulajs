import jStat from 'jstat'

import * as error from './utils/error.js'
import * as evalExpression from './utils/criteria-eval.js'
import * as mathTrig from './math-trig.js'
import * as misc from './miscellaneous.js'
import * as utils from './utils/common.js'

const SQRT2PI = 2.5066282746310002

/**
 * Returns the average of the absolute deviations of data points from their mean.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number1 is required, subsequent numbers are optional. 1 to 255 arguments for which you want the average of the absolute deviations. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
export function AVEDEV() {
  const flatArguments = utils.flatten(arguments)
  const flatArgumentsDefined = flatArguments.filter(utils.isDefined)

  if (flatArgumentsDefined.length === 0) {
    return error.num
  }

  const range = utils.parseNumberArray(flatArgumentsDefined)

  if (range instanceof Error) {
    return range
  }

  return jStat.sum(jStat(range).subtract(jStat.mean(range)).abs()[0]) / range.length
}

/**
 * Returns the average of its arguments.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ...Numbers, value references or ranges for which you want the average.
 * @returns
 */
export function AVERAGE() {
  const flatArguments = utils.flatten(arguments)
  const flatArgumentsDefined = flatArguments.filter(utils.isDefined)

  if (flatArgumentsDefined.length === 0) {
    return error.div0
  }

  const someError = utils.anyError.apply(undefined, flatArgumentsDefined)

  if (someError) {
    return someError
  }

  const range = utils.numbers(flatArgumentsDefined)
  const n = range.length
  let sum = 0
  let count = 0
  let result

  for (let i = 0; i < n; i++) {
    sum += range[i]
    count += 1
  }

  result = sum / count

  if (isNaN(result)) {
    result = error.num
  }

  return result
}

/**
 * Returns the average of its arguments, including numbers, text, and logical values.
 *
 * Category: Statistical
 *
 * @param {*} args value1, value2, ... Value1 is required, subsequent values are optional. 1 to 255 values, ranges of values, or values for which you want the average.
 * @returns
 */
export function AVERAGEA() {
  const flatArguments = utils.flatten(arguments)
  const flatArgumentsDefined = flatArguments.filter(utils.isDefined)

  if (flatArgumentsDefined.length === 0) {
    return error.div0
  }

  const someError = utils.anyError.apply(undefined, flatArgumentsDefined)

  if (someError) {
    return someError
  }

  const range = flatArgumentsDefined
  const n = range.length
  let sum = 0
  let count = 0
  let result

  for (let i = 0; i < n; i++) {
    const el = range[i]

    if (typeof el === 'number') {
      sum += el
    }

    if (el === true) {
      sum++
    }

    if (el !== null) {
      count++
    }
  }

  result = sum / count

  if (isNaN(result)) {
    result = error.num
  }

  return result
}

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
export function AVERAGEIF(range, criteria, average_range) {
  if (arguments.length <= 1) {
    return error.na
  }

  average_range = average_range || range
  const flatAverageRange = utils.flatten(average_range)
  const flatAverageRangeDefined = flatAverageRange.filter(utils.isDefined)
  average_range = utils.parseNumberArray(flatAverageRangeDefined)

  range = utils.flatten(range)

  if (average_range instanceof Error) {
    return average_range
  }

  let average_count = 0
  let result = 0
  const isWildcard = criteria === void 0 || criteria === '*'
  const tokenizedCriteria = isWildcard ? null : evalExpression.parse(criteria + '')

  for (let i = 0; i < range.length; i++) {
    const value = range[i]

    if (isWildcard) {
      result += average_range[i]
      average_count++
    } else {
      const tokens = [evalExpression.createToken(value, evalExpression.TOKEN_TYPE_LITERAL)].concat(tokenizedCriteria)

      if (evalExpression.compute(tokens)) {
        result += average_range[i]
        average_count++
      }
    }
  }

  return result / average_count
}

/**
 * Returns the average (arithmetic mean) of all values that meet multiple criteria.
 *
 * Category: Statistical
 *
 * @param {*} args One or more values to average, including numbers or names, arrays, or references that contain numbers.
 * @returns
 */
export function AVERAGEIFS() {
  // Does not work with multi dimensional ranges yet!
  // http://office.microsoft.com/en-001/excel-help/averageifs-function-HA010047493.aspx
  const args = utils.argsToArray(arguments)
  const criteriaLength = (args.length - 1) / 2
  const range = utils.flatten(args[0])
  let count = 0
  let result = 0

  for (let i = 0; i < range.length; i++) {
    let isMeetCondition = false

    for (let j = 0; j < criteriaLength; j++) {
      const value = args[2 * j + 1][i]
      const criteria = args[2 * j + 2]
      const isWildcard = criteria === void 0 || criteria === '*'
      let computedResult = false

      if (isWildcard) {
        computedResult = true
      } else {
        const tokenizedCriteria = evalExpression.parse(criteria + '')
        const tokens = [evalExpression.createToken(value, evalExpression.TOKEN_TYPE_LITERAL)].concat(tokenizedCriteria)

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
      count++
    }
  }

  const average = result / count

  return isNaN(average) ? 0 : average
}

export const BETA = {}

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
BETA.DIST = function (x, alpha, beta, cumulative, a, b) {
  if (arguments.length < 4) {
    return error.value
  }

  a = a === undefined ? 0 : a
  b = b === undefined ? 1 : b

  x = utils.parseNumber(x)
  alpha = utils.parseNumber(alpha)
  beta = utils.parseNumber(beta)
  a = utils.parseNumber(a)
  b = utils.parseNumber(b)

  if (utils.anyIsError(x, alpha, beta, a, b)) {
    return error.value
  }

  x = (x - a) / (b - a)

  return cumulative ? jStat.beta.cdf(x, alpha, beta) : jStat.beta.pdf(x, alpha, beta)
}

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
BETA.INV = (probability, alpha, beta, a, b) => {
  a = a === undefined ? 0 : a
  b = b === undefined ? 1 : b
  probability = utils.parseNumber(probability)
  alpha = utils.parseNumber(alpha)
  beta = utils.parseNumber(beta)
  a = utils.parseNumber(a)
  b = utils.parseNumber(b)

  if (utils.anyIsError(probability, alpha, beta, a, b)) {
    return error.value
  }

  return jStat.beta.inv(probability, alpha, beta) * (b - a) + a
}

export const BINOM = {}

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
BINOM.DIST = (number_s, trials, probability_s, cumulative) => {
  number_s = utils.parseNumber(number_s)
  trials = utils.parseNumber(trials)
  probability_s = utils.parseNumber(probability_s)
  cumulative = utils.parseNumber(cumulative)

  if (utils.anyIsError(number_s, trials, probability_s, cumulative)) {
    return error.value
  }

  return cumulative
    ? jStat.binomial.cdf(number_s, trials, probability_s)
    : jStat.binomial.pdf(number_s, trials, probability_s)
}

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
BINOM.DIST.RANGE = (trials, probability_s, number_s, number_s2) => {
  number_s2 = number_s2 === undefined ? number_s : number_s2

  trials = utils.parseNumber(trials)
  probability_s = utils.parseNumber(probability_s)
  number_s = utils.parseNumber(number_s)
  number_s2 = utils.parseNumber(number_s2)

  if (utils.anyIsError(trials, probability_s, number_s, number_s2)) {
    return error.value
  }

  let result = 0

  for (let i = number_s; i <= number_s2; i++) {
    result += mathTrig.COMBIN(trials, i) * Math.pow(probability_s, i) * Math.pow(1 - probability_s, trials - i)
  }

  return result
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
BINOM.INV = (trials, probability_s, alpha) => {
  trials = utils.parseNumber(trials)
  probability_s = utils.parseNumber(probability_s)
  alpha = utils.parseNumber(alpha)

  if (utils.anyIsError(trials, probability_s, alpha)) {
    return error.value
  }

  let x = 0

  while (x <= trials) {
    if (jStat.binomial.cdf(x, trials, probability_s) >= alpha) {
      return x
    }

    x++
  }
}

export const CHISQ = {}

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
CHISQ.DIST = (x, deg_freedom, cumulative) => {
  x = utils.parseNumber(x)
  deg_freedom = utils.parseNumber(deg_freedom)

  if (utils.anyIsError(x, deg_freedom)) {
    return error.value
  }

  return cumulative ? jStat.chisquare.cdf(x, deg_freedom) : jStat.chisquare.pdf(x, deg_freedom)
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
CHISQ.DIST.RT = (x, deg_freedom) => {
  if (!x | !deg_freedom) {
    return error.na
  }

  if (x < 1 || deg_freedom > Math.pow(10, 10)) {
    return error.num
  }

  if (typeof x !== 'number' || typeof deg_freedom !== 'number') {
    return error.value
  }

  return 1 - jStat.chisquare.cdf(x, deg_freedom)
}

/**
 * Returns the cumulative beta probability density function.
 *
 * Category: Statistical
 *
 * @param {*} probability A probability associated with the chi-squared distribution.
 * @param {*} deg_freedom The number of degrees of freedom.
 * @returns
 */
CHISQ.INV = (probability, deg_freedom) => {
  probability = utils.parseNumber(probability)
  deg_freedom = utils.parseNumber(deg_freedom)

  if (utils.anyIsError(probability, deg_freedom)) {
    return error.value
  }

  return jStat.chisquare.inv(probability, deg_freedom)
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
CHISQ.INV.RT = (probability, deg_freedom) => {
  if (!probability | !deg_freedom) {
    return error.na
  }

  if (probability < 0 || probability > 1 || deg_freedom < 1 || deg_freedom > Math.pow(10, 10)) {
    return error.num
  }

  if (typeof probability !== 'number' || typeof deg_freedom !== 'number') {
    return error.value
  }

  return jStat.chisquare.inv(1.0 - probability, deg_freedom)
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
CHISQ.TEST = function (actual_range, expected_range) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (!(actual_range instanceof Array) || !(expected_range instanceof Array)) {
    return error.value
  }

  if (actual_range.length !== expected_range.length) {
    return error.value
  }

  if (actual_range[0] && expected_range[0] && actual_range[0].length !== expected_range[0].length) {
    return error.value
  }

  const row = actual_range.length
  let tmp, i, j

  // Convert single-dimension array into two-dimension array

  for (i = 0; i < row; i++) {
    if (!(actual_range[i] instanceof Array)) {
      tmp = actual_range[i]
      actual_range[i] = []
      actual_range[i].push(tmp)
    }

    if (!(expected_range[i] instanceof Array)) {
      tmp = expected_range[i]
      expected_range[i] = []
      expected_range[i].push(tmp)
    }
  }

  const col = actual_range[0].length
  const dof = col === 1 ? row - 1 : (row - 1) * (col - 1)
  let xsqr = 0
  const Pi = Math.PI

  for (i = 0; i < row; i++) {
    for (j = 0; j < col; j++) {
      xsqr += Math.pow(actual_range[i][j] - expected_range[i][j], 2) / expected_range[i][j]
    }
  }

  // Get independency by X square and its degree of freedom
  function ChiSq(xsqr, dof) {
    let p = Math.exp(-0.5 * xsqr)

    if (dof % 2 === 1) {
      p = p * Math.sqrt((2 * xsqr) / Pi)
    }

    let k = dof

    while (k >= 2) {
      p = (p * xsqr) / k
      k = k - 2
    }

    let t = p
    let a = dof

    while (t > 0.0000000001 * p) {
      a = a + 2
      t = (t * xsqr) / a
      p = p + t
    }

    return 1 - p
  }

  return Math.round(ChiSq(xsqr, dof) * 1000000) / 1000000
}

/**
 * Returns the column number of a reference.
 *
 * Category: Lookup and reference
 *
 * @param {*} reference the value or range of values for which you want to return the column number.
 * @param {*} index
 * @returns
 */
export function COLUMN(reference, index) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (index < 0) {
    return error.num
  }

  if (!(reference instanceof Array) || typeof index !== 'number') {
    return error.value
  }

  if (reference.length === 0) {
    return undefined
  }

  return jStat.col(reference, index)
}

/**
 * Returns the number of columns in a reference.
 *
 * Category: Lookup and reference
 *
 * @param {*} array An array or array formula, or a reference to a range of values for which you want the number of columns.
 * @returns
 */
export function COLUMNS(array) {
  if (arguments.length !== 1) {
    return error.na
  }

  if (!(array instanceof Array)) {
    return error.value
  }

  if (array.length === 0) {
    return 0
  }

  return jStat.cols(array)
}

export const CONFIDENCE = {}

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
CONFIDENCE.NORM = (alpha, standard_dev, size) => {
  alpha = utils.parseNumber(alpha)
  standard_dev = utils.parseNumber(standard_dev)
  size = utils.parseNumber(size)

  if (utils.anyIsError(alpha, standard_dev, size)) {
    return error.value
  }

  return jStat.normalci(1, alpha, standard_dev, size)[1] - 1
}

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
CONFIDENCE.T = (alpha, standard_dev, size) => {
  alpha = utils.parseNumber(alpha)
  standard_dev = utils.parseNumber(standard_dev)
  size = utils.parseNumber(size)

  if (utils.anyIsError(alpha, standard_dev, size)) {
    return error.value
  }

  return jStat.tci(1, alpha, standard_dev, size)[1] - 1
}

/**
 * Returns the correlation coefficient between two data sets.
 *
 * Category: Statistical
 *
 * @param {*} array1 A range of value values.
 * @param {*} array2 A second range of value values.
 * @returns
 */
export function CORREL(array1, array2) {
  array1 = utils.parseNumberArray(utils.flatten(array1))
  array2 = utils.parseNumberArray(utils.flatten(array2))

  if (utils.anyIsError(array1, array2)) {
    return error.value
  }

  return jStat.corrcoeff(array1, array2)
}

/**
 * Counts how many numbers are in the list of arguments.
 *
 * Category: Statistical
 *
 * @param {*} args Cell reference, or range within which you want to count numbers.count numbers.
 * @returns
 */
export function COUNT() {
  const flatArguments = utils.flatten(arguments)

  return utils.numbers(flatArguments).length
}

/**
 * Counts how many values are in the list of arguments.
 *
 * Category: Statistical
 *
 * @param {*} args Arguments representing the values that you want to count.
 * @returns
 */
export function COUNTA() {
  const flatArguments = utils.flatten(arguments)

  return flatArguments.length - COUNTBLANK(flatArguments)
}

/**
 * Formula.js only
 *
 * @param {*} range
 * @param {*} value
 * @returns
 */
export function COUNTIN(range, value) {
  let result = 0

  range = utils.flatten(range)

  for (let i = 0; i < range.length; i++) {
    if (range[i] === value) {
      result++
    }
  }

  return result
}

/**
 * Counts the number of blank values within a range.
 *
 * Category: Statistical
 *
 * @param {*} args The range from which you want to count the blank values.
 * @returns
 */
export function COUNTBLANK() {
  const range = utils.flatten(arguments)
  let blanks = 0
  let element

  for (let i = 0; i < range.length; i++) {
    element = range[i]

    if (element === undefined || element === null || element === '') {
      blanks++
    }
  }

  return blanks
}

/**
 * Counts the number of values within a range that meet the given criteria.
 *
 * Category: Statistical
 *
 * @returns
 */
export function COUNTIF(range, criteria) {
  range = utils.flatten(range)

  const isWildcard = criteria === void 0 || criteria === '*'

  if (isWildcard) {
    return range.length
  }

  let matches = 0
  const tokenizedCriteria = evalExpression.parse(criteria + '')

  for (let i = 0; i < range.length; i++) {
    const value = range[i]
    const tokens = [evalExpression.createToken(value, evalExpression.TOKEN_TYPE_LITERAL)].concat(tokenizedCriteria)

    if (evalExpression.compute(tokens)) {
      matches++
    }
  }

  return matches
}

/**
 * Counts the number of values within a range that meet multiple criteria.
 *
 * Category: Statistical
 *
 * @param {*} args Range in which to evaluate the associated criteria.
 * @returns
 */
export function COUNTIFS() {
  const args = utils.argsToArray(arguments)
  const results = new Array(utils.flatten(args[0]).length)

  for (let i = 0; i < results.length; i++) {
    results[i] = true
  }

  for (let i = 0; i < args.length; i += 2) {
    const range = utils.flatten(args[i])
    const criteria = args[i + 1]
    const isWildcard = criteria === void 0 || criteria === '*'

    if (!isWildcard) {
      const tokenizedCriteria = evalExpression.parse(criteria + '')

      for (let j = 0; j < range.length; j++) {
        const value = range[j]
        const tokens = [evalExpression.createToken(value, evalExpression.TOKEN_TYPE_LITERAL)].concat(tokenizedCriteria)

        results[j] = results[j] && evalExpression.compute(tokens)
      }
    }
  }

  let result = 0

  for (let i = 0; i < results.length; i++) {
    if (results[i]) {
      result++
    }
  }

  return result
}

/**
 * Formula.js only
 *
 * @returns
 */
export function COUNTUNIQUE() {
  return misc.UNIQUE.apply(null, utils.flatten(arguments)).length
}

export const COVARIANCE = {}

/**
 * Returns covariance, the average of the products of paired deviations.
 *
 * Category: Statistical
 *
 * @param {*} array1 The first value range of integers.
 * @param {*} array2 The second value range of integers.
 * @returns
 */
COVARIANCE.P = (array1, array2) => {
  array1 = utils.parseNumberArray(utils.flatten(array1))
  array2 = utils.parseNumberArray(utils.flatten(array2))

  if (utils.anyIsError(array1, array2)) {
    return error.value
  }

  const mean1 = jStat.mean(array1)
  const mean2 = jStat.mean(array2)
  let result = 0
  const n = array1.length

  for (let i = 0; i < n; i++) {
    result += (array1[i] - mean1) * (array2[i] - mean2)
  }

  return result / n
}

/**
 * Returns the sample covariance, the average of the products deviations for each data point pair in two data sets.
 *
 * Category: Statistical
 *
 * @param {*} array1 The first value range of integers.
 * @param {*} array2 The second value range of integers.
 * @returns
 */
COVARIANCE.S = (array1, array2) => {
  array1 = utils.parseNumberArray(utils.flatten(array1))
  array2 = utils.parseNumberArray(utils.flatten(array2))

  if (utils.anyIsError(array1, array2)) {
    return error.value
  }

  return jStat.covariance(array1, array2)
}

/**
 * Returns the sum of squares of deviations.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number1 is required, subsequent numbers are optional. 1 to 255 arguments for which you want to calculate the sum of squared deviations. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
export function DEVSQ() {
  const range = utils.parseNumberArray(utils.flatten(arguments))

  if (range instanceof Error) {
    return range
  }

  const mean = jStat.mean(range)
  let result = 0

  for (let i = 0; i < range.length; i++) {
    result += Math.pow(range[i] - mean, 2)
  }

  return result
}

export const EXPON = {}

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
EXPON.DIST = (x, lambda, cumulative) => {
  x = utils.parseNumber(x)
  lambda = utils.parseNumber(lambda)

  if (utils.anyIsError(x, lambda)) {
    return error.value
  }

  return cumulative ? jStat.exponential.cdf(x, lambda) : jStat.exponential.pdf(x, lambda)
}

export const F = {}

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
F.DIST = (x, deg_freedom1, deg_freedom2, cumulative) => {
  x = utils.parseNumber(x)
  deg_freedom1 = utils.parseNumber(deg_freedom1)
  deg_freedom2 = utils.parseNumber(deg_freedom2)

  if (utils.anyIsError(x, deg_freedom1, deg_freedom2)) {
    return error.value
  }

  return cumulative
    ? jStat.centralF.cdf(x, deg_freedom1, deg_freedom2)
    : jStat.centralF.pdf(x, deg_freedom1, deg_freedom2)
}

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
F.DIST.RT = function (x, deg_freedom1, deg_freedom2) {
  if (arguments.length !== 3) {
    return error.na
  }

  if (x < 0 || deg_freedom1 < 1 || deg_freedom2 < 1) {
    return error.num
  }

  if (typeof x !== 'number' || typeof deg_freedom1 !== 'number' || typeof deg_freedom2 !== 'number') {
    return error.value
  }

  return 1 - jStat.centralF.cdf(x, deg_freedom1, deg_freedom2)
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
F.INV = (probability, deg_freedom1, deg_freedom2) => {
  probability = utils.parseNumber(probability)
  deg_freedom1 = utils.parseNumber(deg_freedom1)
  deg_freedom2 = utils.parseNumber(deg_freedom2)

  if (utils.anyIsError(probability, deg_freedom1, deg_freedom2)) {
    return error.value
  }

  if (probability <= 0.0 || probability > 1.0) {
    return error.num
  }

  return jStat.centralF.inv(probability, deg_freedom1, deg_freedom2)
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
F.INV.RT = function (probability, deg_freedom1, deg_freedom2) {
  if (arguments.length !== 3) {
    return error.na
  }

  if (
    probability < 0 ||
    probability > 1 ||
    deg_freedom1 < 1 ||
    deg_freedom1 > Math.pow(10, 10) ||
    deg_freedom2 < 1 ||
    deg_freedom2 > Math.pow(10, 10)
  ) {
    return error.num
  }

  if (typeof probability !== 'number' || typeof deg_freedom1 !== 'number' || typeof deg_freedom2 !== 'number') {
    return error.value
  }

  return jStat.centralF.inv(1.0 - probability, deg_freedom1, deg_freedom2)
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
F.TEST = (array1, array2) => {
  if (!array1 || !array2) {
    return error.na
  }

  if (!(array1 instanceof Array) || !(array2 instanceof Array)) {
    return error.na
  }

  if (array1.length < 2 || array2.length < 2) {
    return error.div0
  }

  const sumOfSquares = (values, x1) => {
    let sum = 0

    for (let i = 0; i < values.length; i++) {
      sum += Math.pow(values[i] - x1, 2)
    }

    return sum
  }

  const x1 = mathTrig.SUM(array1) / array1.length
  const x2 = mathTrig.SUM(array2) / array2.length
  const sum1 = sumOfSquares(array1, x1) / (array1.length - 1)
  const sum2 = sumOfSquares(array2, x2) / (array2.length - 1)

  return sum1 / sum2
}

/**
 * Returns the Fisher transformation.
 *
 * Category: Statistical
 *
 * @param {*} x A numeric value for which you want the transformation.
 * @returns
 */
export function FISHER(x) {
  x = utils.parseNumber(x)

  if (x instanceof Error) {
    return x
  }

  return Math.log((1 + x) / (1 - x)) / 2
}

/**
 * Returns the inverse of the Fisher transformation.
 *
 * Category: Statistical
 *
 * @param {*} y The value for which you want to perform the inverse of the transformation.
 * @returns
 */
export function FISHERINV(y) {
  y = utils.parseNumber(y)

  if (y instanceof Error) {
    return y
  }

  const e2y = Math.exp(2 * y)

  return (e2y - 1) / (e2y + 1)
}

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
export function FORECAST(x, known_ys, known_xs) {
  x = utils.parseNumber(x)
  known_ys = utils.parseNumberArray(utils.flatten(known_ys))
  known_xs = utils.parseNumberArray(utils.flatten(known_xs))

  if (utils.anyIsError(x, known_ys, known_xs)) {
    return error.value
  }

  const xmean = jStat.mean(known_xs)
  const ymean = jStat.mean(known_ys)
  const n = known_xs.length
  let num = 0
  let den = 0

  for (let i = 0; i < n; i++) {
    num += (known_xs[i] - xmean) * (known_ys[i] - ymean)
    den += Math.pow(known_xs[i] - xmean, 2)
  }

  const b = num / den
  const a = ymean - b * xmean

  return a + b * x
}

/**
 * Returns a frequency distribution as a vertical array.
 *
 * Category: Statistical
 *
 * @param {*} data_array An array of or reference to a set of values for which you want to count frequencies. If data_array contains no values, FREQUENCY returns an array of zeros.
 * @param {*} bins_array An array of or reference to intervals into which you want to group the values in data_array. If bins_array contains no values, FREQUENCY returns the number of elements in data_array.
 * @returns
 */
export function FREQUENCY(data_array, bins_array) {
  data_array = utils.parseNumberArray(utils.flatten(data_array))
  bins_array = utils.parseNumberArray(utils.flatten(bins_array))

  if (utils.anyIsError(data_array, bins_array)) {
    return error.value
  }

  const n = data_array.length
  const b = bins_array.length
  const r = []

  for (let i = 0; i <= b; i++) {
    r[i] = 0

    for (let j = 0; j < n; j++) {
      if (i === 0) {
        if (data_array[j] <= bins_array[0]) {
          r[0] += 1
        }
      } else if (i < b) {
        if (data_array[j] > bins_array[i - 1] && data_array[j] <= bins_array[i]) {
          r[i] += 1
        }
      } else if (i === b) {
        if (data_array[j] > bins_array[b - 1]) {
          r[b] += 1
        }
      }
    }
  }

  return r
}

/**
 * Returns the Gamma function value.
 *
 * Category: Statistical
 *
 * @param {*} number Returns a number.
 * @returns
 */
export function GAMMA(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  if (number === 0) {
    return error.num
  }

  if (parseInt(number, 10) === number && number < 0) {
    return error.num
  }

  return jStat.gammafn(number)
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
GAMMA.DIST = function (value, alpha, beta, cumulative) {
  if (arguments.length !== 4) {
    return error.na
  }

  if (value < 0 || alpha <= 0 || beta <= 0) {
    return error.value
  }

  if (typeof value !== 'number' || typeof alpha !== 'number' || typeof beta !== 'number') {
    return error.value
  }

  return cumulative ? jStat.gamma.cdf(value, alpha, beta, true) : jStat.gamma.pdf(value, alpha, beta, false)
}

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
GAMMA.INV = function (probability, alpha, beta) {
  if (arguments.length !== 3) {
    return error.na
  }

  if (probability < 0 || probability > 1 || alpha <= 0 || beta <= 0) {
    return error.num
  }

  if (typeof probability !== 'number' || typeof alpha !== 'number' || typeof beta !== 'number') {
    return error.value
  }

  return jStat.gamma.inv(probability, alpha, beta)
}

/**
 * Returns the natural logarithm of the gamma function, Γ(x).
 *
 * Category: Statistical
 *
 * @param {*} x The value for which you want to calculate GAMMALN.
 * @returns
 */
export function GAMMALN(x) {
  x = utils.parseNumber(x)

  if (x instanceof Error) {
    return x
  }

  return jStat.gammaln(x)
}

/**
 * Returns the natural logarithm of the gamma function, Γ(x).
 *
 * Category: Statistical
 *
 * @param {*} x The value for which you want to calculate GAMMALN.PRECISE.
 * @returns
 */
GAMMALN.PRECISE = function (x) {
  if (arguments.length !== 1) {
    return error.na
  }

  if (x <= 0) {
    return error.num
  }

  if (typeof x !== 'number') {
    return error.value
  }

  return jStat.gammaln(x)
}

/**
 * Returns 0.5 less than the standard normal cumulative distribution.
 *
 * Category: Statistical
 *
 * @param {*} z Returns a number.
 * @returns
 */
export function GAUSS(z) {
  z = utils.parseNumber(z)

  if (z instanceof Error) {
    return z
  }

  return jStat.normal.cdf(z, 0, 1) - 0.5
}

/**
 * Returns the geometric mean.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number1 is required, subsequent numbers are optional. 1 to 255 arguments for which you want to calculate the mean. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
export function GEOMEAN() {
  const args = utils.parseNumberArray(utils.flatten(arguments))

  if (args instanceof Error) {
    return args
  }

  return jStat.geomean(args)
}

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
export function GROWTH(known_y, known_x, new_x, use_const) {
  // Credits: Ilmari Karonen (http://stackoverflow.com/questions/14161990/how-to-implement-growth-function-in-javascript)
  known_y = utils.parseNumberArray(known_y)

  if (known_y instanceof Error) {
    return known_y
  }

  // Default values for optional parameters:
  let i

  if (known_x === undefined) {
    known_x = []

    for (i = 1; i <= known_y.length; i++) {
      known_x.push(i)
    }
  }

  if (new_x === undefined) {
    new_x = []

    for (i = 1; i <= known_y.length; i++) {
      new_x.push(i)
    }
  }

  known_x = utils.parseNumberArray(known_x)
  new_x = utils.parseNumberArray(new_x)

  if (utils.anyIsError(known_x, new_x)) {
    return error.value
  }

  if (use_const === undefined) {
    use_const = true
  }

  // Calculate sums over the data:
  const n = known_y.length
  let avg_x = 0
  let avg_y = 0
  let avg_xy = 0
  let avg_xx = 0

  for (i = 0; i < n; i++) {
    const x = known_x[i]
    const y = Math.log(known_y[i])
    avg_x += x
    avg_y += y
    avg_xy += x * y
    avg_xx += x * x
  }

  avg_x /= n
  avg_y /= n
  avg_xy /= n
  avg_xx /= n

  // Compute linear regression coefficients:
  let beta
  let alpha

  if (use_const) {
    beta = (avg_xy - avg_x * avg_y) / (avg_xx - avg_x * avg_x)
    alpha = avg_y - beta * avg_x
  } else {
    beta = avg_xy / avg_xx
    alpha = 0
  }

  // Compute and return result array:
  const new_y = []

  for (i = 0; i < new_x.length; i++) {
    new_y.push(Math.exp(alpha + beta * new_x[i]))
  }

  return new_y
}

/**
 * Returns the harmonic mean.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number1 is required, subsequent numbers are optional. 1 to 255 arguments for which you want to calculate the mean. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
export function HARMEAN() {
  const range = utils.parseNumberArray(utils.flatten(arguments))

  if (range instanceof Error) {
    return range
  }

  const n = range.length
  let den = 0

  for (let i = 0; i < n; i++) {
    den += 1 / range[i]
  }

  return n / den
}

export const HYPGEOM = {}

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
HYPGEOM.DIST = (sample_s, number_sample, population_s, number_pop, cumulative) => {
  sample_s = utils.parseNumber(sample_s)
  number_sample = utils.parseNumber(number_sample)
  population_s = utils.parseNumber(population_s)
  number_pop = utils.parseNumber(number_pop)

  if (utils.anyIsError(sample_s, number_sample, population_s, number_pop)) {
    return error.value
  }

  function pdf(x, n, M, N) {
    return (mathTrig.COMBIN(M, x) * mathTrig.COMBIN(N - M, n - x)) / mathTrig.COMBIN(N, n)
  }

  function cdf(x, n, M, N) {
    let result = 0

    for (let i = 0; i <= x; i++) {
      result += pdf(i, n, M, N)
    }

    return result
  }

  return cumulative
    ? cdf(sample_s, number_sample, population_s, number_pop)
    : pdf(sample_s, number_sample, population_s, number_pop)
}

/**
 * Returns the intercept of the linear regression line.
 *
 * Category: Statistical
 *
 * @param {*} known_y The dependent set of observations or data.
 * @param {*} known_x The independent set of observations or data.
 * @returns
 */
export function INTERCEPT(known_y, known_x) {
  known_y = utils.parseNumberArray(known_y)
  known_x = utils.parseNumberArray(known_x)

  if (utils.anyIsError(known_y, known_x)) {
    return error.value
  }

  if (known_y.length !== known_x.length) {
    return error.na
  }

  return FORECAST(0, known_y, known_x)
}

/**
 * Returns the kurtosis of a data set.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number1 is required, subsequent numbers are optional. 1 to 255 arguments for which you want to calculate kurtosis. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
export function KURT() {
  const range = utils.parseNumberArray(utils.flatten(arguments))

  if (range instanceof Error) {
    return range
  }

  const mean = jStat.mean(range)
  const n = range.length
  let sigma = 0

  for (let i = 0; i < n; i++) {
    sigma += Math.pow(range[i] - mean, 4)
  }

  sigma = sigma / Math.pow(jStat.stdev(range, true), 4)

  return ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * sigma - (3 * (n - 1) * (n - 1)) / ((n - 2) * (n - 3))
}

/**
 * Returns the k-th largest value in a data set.
 *
 * Category: Statistical
 *
 * @param {*} array The array or range of data for which you want to determine the k-th largest value.
 * @param {*} k The position (from the largest) in the array or value range of data to return.
 * @returns
 */
export function LARGE(array, k) {
  array = utils.parseNumberArray(utils.flatten(array))
  k = utils.parseNumber(k)

  if (utils.anyIsError(array, k)) {
    return array
  }

  if (k < 0 || array.length < k) {
    return error.value
  }

  return array.sort((a, b) => b - a)[k - 1]
}

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
export function LINEST(known_y, known_x) {
  known_y = utils.parseNumberArray(utils.flatten(known_y))
  known_x = utils.parseNumberArray(utils.flatten(known_x))

  if (utils.anyIsError(known_y, known_x)) {
    return error.value
  }

  const ymean = jStat.mean(known_y)
  const xmean = jStat.mean(known_x)
  const n = known_x.length
  let num = 0
  let den = 0

  for (let i = 0; i < n; i++) {
    num += (known_x[i] - xmean) * (known_y[i] - ymean)
    den += Math.pow(known_x[i] - xmean, 2)
  }

  const m = num / den
  const b = ymean - m * xmean

  return [m, b]
}

// According to Microsoft:
// http://office.microsoft.com/en-us/starter-help/logest-function-HP010342665.aspx
// LOGEST returns are based on the following linear model:
// ln y = x1 ln m1 + ... + xn ln mn + ln b
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
export function LOGEST(known_y, known_x) {
  known_y = utils.parseNumberArray(utils.flatten(known_y))
  known_x = utils.parseNumberArray(utils.flatten(known_x))

  if (utils.anyIsError(known_y, known_x)) {
    return error.value
  }

  for (let i = 0; i < known_y.length; i++) {
    known_y[i] = Math.log(known_y[i])
  }

  const result = LINEST(known_y, known_x)
  result[0] = Math.round(Math.exp(result[0]) * 1000000) / 1000000
  result[1] = Math.round(Math.exp(result[1]) * 1000000) / 1000000

  return result
}

export const LOGNORM = {}

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
LOGNORM.DIST = (x, mean, standard_dev, cumulative) => {
  x = utils.parseNumber(x)
  mean = utils.parseNumber(mean)
  standard_dev = utils.parseNumber(standard_dev)

  if (utils.anyIsError(x, mean, standard_dev)) {
    return error.value
  }

  return cumulative ? jStat.lognormal.cdf(x, mean, standard_dev) : jStat.lognormal.pdf(x, mean, standard_dev)
}

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
LOGNORM.INV = (probability, mean, standard_dev) => {
  probability = utils.parseNumber(probability)
  mean = utils.parseNumber(mean)
  standard_dev = utils.parseNumber(standard_dev)

  if (utils.anyIsError(probability, mean, standard_dev)) {
    return error.value
  }

  return jStat.lognormal.inv(probability, mean, standard_dev)
}

/**
 * Returns the maximum value in a list of arguments.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number1 is required, subsequent numbers are optional. 1 to 255 numbers for which you want to find the maximum value.
 * @returns
 */
export function MAX() {
  const flatArguments = utils.flatten(arguments)
  const someError = utils.anyError.apply(undefined, flatArguments)

  if (someError) {
    return someError
  }

  const range = utils.numbers(flatArguments)

  return range.length === 0 ? 0 : Math.max.apply(Math, range)
}

/**
 * Returns the maximum value in a list of arguments, including numbers, text, and logical values.
 *
 * Category: Statistical
 *
 * @param {*} args value1, value2,... Number arguments 2 to 255 for which you want to find the largest value.
 * @returns
 */
export function MAXA() {
  const flatArguments = utils.flatten(arguments)
  const someError = utils.anyError.apply(undefined, flatArguments)

  if (someError) {
    return someError
  }

  let range = utils.arrayValuesToNumbers(flatArguments)
  range = range.map((value) => (value === undefined || value === null ? 0 : value))

  return range.length === 0 ? 0 : Math.max.apply(Math, range)
}

/**
 * Returns the median of the given numbers.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number1 is required, subsequent numbers are optional. 1 to 255 numbers for which you want the median.
 * @returns
 */
export function MEDIAN() {
  const flatArguments = utils.flatten(arguments)
  const someError = utils.anyError.apply(undefined, flatArguments)

  if (someError) {
    return someError
  }

  const range = utils.arrayValuesToNumbers(flatArguments)
  let result = jStat.median(range)

  if (isNaN(result)) {
    result = error.num
  }

  return result
}

/**
 * Returns the minimum value in a list of arguments.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number1 is optional, subsequent numbers are optional. 1 to 255 numbers for which you want to find the minimum value.
 * @returns
 */
export function MIN() {
  const flatArguments = utils.flatten(arguments)
  const someError = utils.anyError.apply(undefined, flatArguments)

  if (someError) {
    return someError
  }

  const range = utils.numbers(flatArguments)

  return range.length === 0 ? 0 : Math.min.apply(Math, range)
}

/**
 * Returns the smallest value in a list of arguments, including numbers, text, and logical values.
 *
 * Category: Statistical
 *
 * @param {*} args value1, value2, ... Value1 is required, subsequent values are optional. 1 to 255 values for which you want to find the smallest value.
 * @returns
 */
export function MINA() {
  const flatArguments = utils.flatten(arguments)
  const someError = utils.anyError.apply(undefined, flatArguments)

  if (someError) {
    return someError
  }

  let range = utils.arrayValuesToNumbers(flatArguments)
  range = range.map((value) => (value === undefined || value === null ? 0 : value))

  return range.length === 0 ? 0 : Math.min.apply(Math, range)
}

export const MODE = {}

/**
 * Returns a vertical array of the most frequently occurring, or repetitive values in an array or range of data.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number arguments 2 to 254 for which you want to calculate the mode. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
MODE.MULT = function () {
  // Credits: Roönaän
  const range = utils.parseNumberArray(utils.flatten(arguments))

  if (range instanceof Error) {
    return range
  }

  const n = range.length
  const count = {}
  let maxItems = []
  let max = 0
  let currentItem

  for (let i = 0; i < n; i++) {
    currentItem = range[i]
    count[currentItem] = count[currentItem] ? count[currentItem] + 1 : 1

    if (count[currentItem] > max) {
      max = count[currentItem]
      maxItems = []
    }

    if (count[currentItem] === max) {
      maxItems[maxItems.length] = currentItem
    }
  }

  return maxItems
}

/**
 * Returns the most common value in a data set.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Arguments 2 to 254 for which you want to calculate the mode. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
MODE.SNGL = function () {
  const range = utils.parseNumberArray(utils.flatten(arguments))

  if (range instanceof Error) {
    return range
  }

  return MODE.MULT(range).sort((a, b) => a - b)[0]
}

export const NEGBINOM = {}

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
NEGBINOM.DIST = (number_f, number_s, probability_s, cumulative) => {
  number_f = utils.parseNumber(number_f)
  number_s = utils.parseNumber(number_s)
  probability_s = utils.parseNumber(probability_s)

  if (utils.anyIsError(number_f, number_s, probability_s)) {
    return error.value
  }

  return cumulative
    ? jStat.negbin.cdf(number_f, number_s, probability_s)
    : jStat.negbin.pdf(number_f, number_s, probability_s)
}

export const NORM = {}

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
NORM.DIST = (x, mean, standard_dev, cumulative) => {
  x = utils.parseNumber(x)
  mean = utils.parseNumber(mean)
  standard_dev = utils.parseNumber(standard_dev)

  if (utils.anyIsError(x, mean, standard_dev)) {
    return error.value
  }

  if (standard_dev <= 0) {
    return error.num
  }

  // Return normal distribution computed by jStat [http://jstat.org]
  return cumulative ? jStat.normal.cdf(x, mean, standard_dev) : jStat.normal.pdf(x, mean, standard_dev)
}

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
NORM.INV = (probability, mean, standard_dev) => {
  probability = utils.parseNumber(probability)
  mean = utils.parseNumber(mean)
  standard_dev = utils.parseNumber(standard_dev)

  if (utils.anyIsError(probability, mean, standard_dev)) {
    return error.value
  }

  return jStat.normal.inv(probability, mean, standard_dev)
}

NORM.S = {}

/**
 * Returns the standard normal cumulative distribution.
 *
 * Category: Statistical
 *
 * @param {*} z The value for which you want the distribution.
 * @param {*} cumulative Cumulative is a logical value that determines the form of the function. If cumulative is TRUE, NORMS.DIST returns the cumulative distribution function; if FALSE, it returns the probability mass function.
 * @returns
 */
NORM.S.DIST = (z, cumulative) => {
  z = utils.parseNumber(z)

  if (z instanceof Error) {
    return error.value
  }

  return cumulative ? jStat.normal.cdf(z, 0, 1) : jStat.normal.pdf(z, 0, 1)
}

/**
 * Returns the inverse of the standard normal cumulative distribution.
 *
 * Category: Statistical
 *
 * @param {*} probability A probability corresponding to the normal distribution.
 * @returns
 */
NORM.S.INV = (probability) => {
  probability = utils.parseNumber(probability)

  if (probability instanceof Error) {
    return error.value
  }

  return jStat.normal.inv(probability, 0, 1)
}

/**
 * Returns the Pearson product moment correlation coefficient.
 *
 * Category: Statistical
 *
 * @param {*} array1 A set of independent values.
 * @param {*} array2 A set of dependent values.
 * @returns
 */
export function PEARSON(array1, array2) {
  array2 = utils.parseNumberArray(utils.flatten(array2))
  array1 = utils.parseNumberArray(utils.flatten(array1))

  if (utils.anyIsError(array2, array1)) {
    return error.value
  }

  const xmean = jStat.mean(array1)
  const ymean = jStat.mean(array2)
  const n = array1.length
  let num = 0
  let den1 = 0
  let den2 = 0

  for (let i = 0; i < n; i++) {
    num += (array1[i] - xmean) * (array2[i] - ymean)
    den1 += Math.pow(array1[i] - xmean, 2)
    den2 += Math.pow(array2[i] - ymean, 2)
  }

  return num / Math.sqrt(den1 * den2)
}

export const PERCENTILE = {}

/**
 * Returns the k-th percentile of values in a range, where k is in the range 0..1, exclusive.
 *
 * Category: Statistical
 *
 * @returns
 */
PERCENTILE.EXC = (array, k) => {
  array = utils.parseNumberArray(utils.flatten(array))
  k = utils.parseNumber(k)

  if (utils.anyIsError(array, k)) {
    return error.value
  }

  array = array.sort((a, b) => a - b)
  const n = array.length

  if (k < 1 / (n + 1) || k > 1 - 1 / (n + 1)) {
    return error.num
  }

  const l = k * (n + 1) - 1
  const fl = Math.floor(l)

  return utils.cleanFloat(l === fl ? array[l] : array[fl] + (l - fl) * (array[fl + 1] - array[fl]))
}

/**
 * Returns the k-th percentile of values in a range.
 *
 * Category: Statistical
 *
 * @param {*} array The array or range of data that defines relative standing.
 * @param {*} k The percentile value in the range 0..1, inclusive.
 * @returns
 */
PERCENTILE.INC = (array, k) => {
  array = utils.parseNumberArray(utils.flatten(array))
  k = utils.parseNumber(k)

  if (utils.anyIsError(array, k)) {
    return error.value
  }

  array = array.sort((a, b) => a - b)
  const n = array.length
  const l = k * (n - 1)
  const fl = Math.floor(l)

  return utils.cleanFloat(l === fl ? array[l] : array[fl] + (l - fl) * (array[fl + 1] - array[fl]))
}

export const PERCENTRANK = {}

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
PERCENTRANK.EXC = (array, x, significance) => {
  significance = significance === undefined ? 3 : significance
  array = utils.parseNumberArray(utils.flatten(array))
  x = utils.parseNumber(x)
  significance = utils.parseNumber(significance)

  if (utils.anyIsError(array, x, significance)) {
    return error.value
  }

  array = array.sort((a, b) => a - b)
  const uniques = misc.UNIQUE.apply(null, array)
  const n = array.length
  const m = uniques.length
  const power = Math.pow(10, significance)
  let result = 0
  let match = false
  let i = 0

  while (!match && i < m) {
    if (x === uniques[i]) {
      result = (array.indexOf(uniques[i]) + 1) / (n + 1)
      match = true
    } else if (x >= uniques[i] && (x < uniques[i + 1] || i === m - 1)) {
      result = (array.indexOf(uniques[i]) + 1 + (x - uniques[i]) / (uniques[i + 1] - uniques[i])) / (n + 1)
      match = true
    }

    i++
  }

  return Math.floor(result * power) / power
}

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
PERCENTRANK.INC = (array, x, significance) => {
  significance = significance === undefined ? 3 : significance
  array = utils.parseNumberArray(utils.flatten(array))
  x = utils.parseNumber(x)
  significance = utils.parseNumber(significance)

  if (utils.anyIsError(array, x, significance)) {
    return error.value
  }

  array = array.sort((a, b) => a - b)
  const uniques = misc.UNIQUE.apply(null, array)
  const n = array.length
  const m = uniques.length
  const power = Math.pow(10, significance)
  let result = 0
  let match = false
  let i = 0

  while (!match && i < m) {
    if (x === uniques[i]) {
      result = array.indexOf(uniques[i]) / (n - 1)
      match = true
    } else if (x >= uniques[i] && (x < uniques[i + 1] || i === m - 1)) {
      result = (array.indexOf(uniques[i]) + (x - uniques[i]) / (uniques[i + 1] - uniques[i])) / (n - 1)
      match = true
    }

    i++
  }

  return Math.floor(result * power) / power
}

/**
 * Returns the number of permutations for a given number of objects.
 *
 * Category: Statistical
 *
 * @param {*} number An integer that describes the number of objects.
 * @param {*} number_chosen An integer that describes the number of objects in each permutation.
 * @returns
 */
export function PERMUT(number, number_chosen) {
  number = utils.parseNumber(number)
  number_chosen = utils.parseNumber(number_chosen)

  if (utils.anyIsError(number, number_chosen)) {
    return error.value
  }

  return mathTrig.FACT(number) / mathTrig.FACT(number - number_chosen)
}

/**
 * Returns the number of permutations for a given number of objects (with repetitions) that can be selected from the total objects.
 *
 * Category: Statistical
 *
 * @param {*} number An integer that describes the total number of objects.
 * @param {*} number_chosen An integer that describes the number of objects in each permutation.
 * @returns
 */
export function PERMUTATIONA(number, number_chosen) {
  number = utils.parseNumber(number)
  number_chosen = utils.parseNumber(number_chosen)

  if (utils.anyIsError(number, number_chosen)) {
    return error.value
  }

  return Math.pow(number, number_chosen)
}

/**
 * Returns the value of the density function for a standard normal distribution.
 *
 * Category: Statistical
 *
 * @param {*} x X is the number for which you want the density of the standard normal distribution.
 * @returns
 */
export function PHI(x) {
  x = utils.parseNumber(x)

  if (x instanceof Error) {
    return error.value
  }

  return Math.exp(-0.5 * x * x) / SQRT2PI
}

export const POISSON = {}

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
POISSON.DIST = (x, mean, cumulative) => {
  x = utils.parseNumber(x)
  mean = utils.parseNumber(mean)

  if (utils.anyIsError(x, mean)) {
    return error.value
  }

  return cumulative ? jStat.poisson.cdf(x, mean) : jStat.poisson.pdf(x, mean)
}

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
export function PROB(x_range, prob_range, lower_limit, upper_limit) {
  if (lower_limit === undefined) {
    return 0
  }

  upper_limit = upper_limit === undefined ? lower_limit : upper_limit

  x_range = utils.parseNumberArray(utils.flatten(x_range))
  prob_range = utils.parseNumberArray(utils.flatten(prob_range))
  lower_limit = utils.parseNumber(lower_limit)
  upper_limit = utils.parseNumber(upper_limit)

  if (utils.anyIsError(x_range, prob_range, lower_limit, upper_limit)) {
    return error.value
  }

  if (lower_limit === upper_limit) {
    return x_range.indexOf(lower_limit) >= 0 ? prob_range[x_range.indexOf(lower_limit)] : 0
  }

  const sorted = x_range.sort((a, b) => a - b)
  const n = sorted.length
  let result = 0

  for (let i = 0; i < n; i++) {
    if (sorted[i] >= lower_limit && sorted[i] <= upper_limit) {
      result += prob_range[x_range.indexOf(sorted[i])]
    }
  }

  return result
}

export const QUARTILE = {}

/**
 * Returns the quartile of the data set, based on percentile values from 0..1, exclusive.
 *
 * Category: Statistical
 *
 * @param {*} array The array or value range of numeric values for which you want the quartile value.
 * @param {*} quart Indicates which value to return.
 * @returns
 */
QUARTILE.EXC = (range, quart) => {
  range = utils.parseNumberArray(utils.flatten(range))
  quart = utils.parseNumber(quart)

  if (utils.anyIsError(range, quart)) {
    return error.value
  }

  switch (quart) {
    case 1:
      return PERCENTILE.EXC(range, 0.25)
    case 2:
      return PERCENTILE.EXC(range, 0.5)
    case 3:
      return PERCENTILE.EXC(range, 0.75)
    default:
      return error.num
  }
}

/**
 * Returns the quartile of a data set.
 *
 * Category: Statistical
 *
 * @param {*} array The array or value range of numeric values for which you want the quartile value.
 * @param {*} quart Indicates which value to return.
 * @returns
 */
QUARTILE.INC = (range, quart) => {
  range = utils.parseNumberArray(utils.flatten(range))
  quart = utils.parseNumber(quart)

  if (utils.anyIsError(range, quart)) {
    return error.value
  }

  switch (quart) {
    case 1:
      return PERCENTILE.INC(range, 0.25)
    case 2:
      return PERCENTILE.INC(range, 0.5)
    case 3:
      return PERCENTILE.INC(range, 0.75)
    default:
      return error.num
  }
}

export const RANK = {}

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
RANK.AVG = (number, ref, order) => {
  number = utils.parseNumber(number)
  ref = utils.parseNumberArray(utils.flatten(ref))

  if (utils.anyIsError(number, ref)) {
    return error.value
  }

  ref = utils.flatten(ref)
  order = order || false
  const sort = order ? (a, b) => a - b : (a, b) => b - a
  ref = ref.sort(sort)

  const length = ref.length
  let count = 0

  for (let i = 0; i < length; i++) {
    if (ref[i] === number) {
      count++
    }
  }

  return count > 1 ? (2 * ref.indexOf(number) + count + 1) / 2 : ref.indexOf(number) + 1
}

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
RANK.EQ = (number, ref, order) => {
  number = utils.parseNumber(number)
  ref = utils.parseNumberArray(utils.flatten(ref))

  if (utils.anyIsError(number, ref)) {
    return error.value
  }

  order = order || false
  const sort = order ? (a, b) => a - b : (a, b) => b - a
  ref = ref.sort(sort)

  return ref.indexOf(number) + 1
}

/**
 * Returns the row number of a reference.
 *
 * Category: Lookup and reference
 *
 * @param {*} reference the value or range of values for which you want the row number.
 * @param {*} index
 * @returns
 */
export function ROW(reference, index) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (index < 0) {
    return error.num
  }

  if (!(reference instanceof Array) || typeof index !== 'number') {
    return error.value
  }

  if (reference.length === 0) {
    return undefined
  }

  return jStat.row(reference, index)
}

/**
 * Returns the number of rows in a reference.
 *
 * Category: Lookup and reference
 *
 * @param {*} array An array, an array formula, or a reference to a range of values for which you want the number of rows.
 * @returns
 */
export function ROWS(array) {
  if (arguments.length !== 1) {
    return error.na
  }

  if (!(array instanceof Array)) {
    return error.value
  }

  if (array.length === 0) {
    return 0
  }

  return jStat.rows(array)
}

/**
 * Returns the square of the Pearson product moment correlation coefficient.
 *
 * Category: Statistical
 *
 * @param {*} known_y An array or range of data points.
 * @param {*} known_x An array or range of data points.
 * @returns
 */
export function RSQ(known_y, known_x) {
  // no need to flatten here, PEARSON will take care of that
  known_y = utils.parseNumberArray(utils.flatten(known_y))
  known_x = utils.parseNumberArray(utils.flatten(known_x))

  if (utils.anyIsError(known_y, known_x)) {
    return error.value
  }

  return Math.pow(PEARSON(known_y, known_x), 2)
}

/**
 * Returns the skewness of a distribution.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number1 is required, subsequent numbers are optional. 1 to 255 arguments for which you want to calculate skewness. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
export function SKEW() {
  const range = utils.parseNumberArray(utils.flatten(arguments))

  if (range instanceof Error) {
    return range
  }

  const mean = jStat.mean(range)
  const n = range.length
  let sigma = 0

  for (let i = 0; i < n; i++) {
    sigma += Math.pow(range[i] - mean, 3)
  }

  return (n * sigma) / ((n - 1) * (n - 2) * Math.pow(jStat.stdev(range, true), 3))
}

/**
 * Returns the skewness of a distribution based on a population.
 *
 * Category: Statistical
 *
 * @returns
 */
SKEW.P = function () {
  const range = utils.parseNumberArray(utils.flatten(arguments))

  if (range instanceof Error) {
    return range
  }

  const mean = jStat.mean(range)
  const n = range.length
  let m2 = 0
  let m3 = 0

  for (let i = 0; i < n; i++) {
    m3 += Math.pow(range[i] - mean, 3)
    m2 += Math.pow(range[i] - mean, 2)
  }

  m3 = m3 / n
  m2 = m2 / n

  return m3 / Math.pow(m2, 3 / 2)
}

/**
 * Returns the slope of the linear regression line.
 *
 * Category: Statistical
 *
 * @param {*} known_y An array or value range of numeric dependent data points.
 * @param {*} known_x The set of independent data points.
 * @returns
 */
export function SLOPE(known_y, known_x) {
  known_y = utils.parseNumberArray(utils.flatten(known_y))
  known_x = utils.parseNumberArray(utils.flatten(known_x))

  if (utils.anyIsError(known_y, known_x)) {
    return error.value
  }

  const xmean = jStat.mean(known_x)
  const ymean = jStat.mean(known_y)
  const n = known_x.length
  let num = 0
  let den = 0

  for (let i = 0; i < n; i++) {
    num += (known_x[i] - xmean) * (known_y[i] - ymean)
    den += Math.pow(known_x[i] - xmean, 2)
  }

  return num / den
}

/**
 * Returns the k-th smallest value in a data set.
 *
 * Category: Statistical
 *
 * @param {*} array An array or range of numerical data for which you want to determine the k-th smallest value.
 * @param {*} k The position (from the smallest) in the array or range of data to return.
 * @returns
 */
export function SMALL(array, k) {
  array = utils.parseNumberArray(utils.flatten(array))
  k = utils.parseNumber(k)

  if (utils.anyIsError(array, k)) {
    return array
  }

  return array.sort((a, b) => a - b)[k - 1]
}

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
export function STANDARDIZE(x, mean, standard_dev) {
  x = utils.parseNumber(x)
  mean = utils.parseNumber(mean)
  standard_dev = utils.parseNumber(standard_dev)

  if (utils.anyIsError(x, mean, standard_dev)) {
    return error.value
  }

  return (x - mean) / standard_dev
}

export const STDEV = {}

/**
 * Calculates standard deviation based on the entire population.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number arguments 2 to 254 corresponding to a population. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
STDEV.P = function () {
  const v = VAR.P.apply(this, arguments)
  let result = Math.sqrt(v)

  if (isNaN(result)) {
    result = error.num
  }

  return result
}

/**
 * Estimates standard deviation based on a sample.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number arguments 2 to 254 corresponding to a sample of a population. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
STDEV.S = function () {
  const v = VAR.S.apply(this, arguments)
  const result = Math.sqrt(v)

  return result
}

/**
 * Estimates standard deviation based on a sample, including numbers, text, and logical values.
 *
 * Category: Statistical
 *
 * @param {*} args value1, value2, ... Value1 is required, subsequent values are optional. 1 to 255 values corresponding to a sample of a population. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
export function STDEVA() {
  const v = VARA.apply(this, arguments)
  const result = Math.sqrt(v)

  return result
}

/**
 * Calculates standard deviation based on the entire population, including numbers, text, and logical values.
 *
 * Category: Statistical
 *
 * @param {*} args value1, value2, ... Value1 is required, subsequent values are optional. 1 to 255 values corresponding to a population. You can also use a single array or a reference to an array instead of arguments separated by commas.
 * @returns
 */
export function STDEVPA() {
  const v = VARPA.apply(this, arguments)
  let result = Math.sqrt(v)

  if (isNaN(result)) {
    result = error.num
  }

  return result
}

/**
 * Returns the standard error of the predicted y-value for each x in the regression.
 *
 * Category: Statistical
 *
 * @param {*} known_y An array or range of dependent data points.
 * @param {*} known_x An array or range of independent data points.
 * @returns
 */
export function STEYX(known_y, known_x) {
  known_y = utils.parseNumberArray(utils.flatten(known_y))
  known_x = utils.parseNumberArray(utils.flatten(known_x))

  if (utils.anyIsError(known_y, known_x)) {
    return error.value
  }

  const xmean = jStat.mean(known_x)
  const ymean = jStat.mean(known_y)
  const n = known_x.length
  let lft = 0
  let num = 0
  let den = 0

  for (let i = 0; i < n; i++) {
    lft += Math.pow(known_y[i] - ymean, 2)
    num += (known_x[i] - xmean) * (known_y[i] - ymean)
    den += Math.pow(known_x[i] - xmean, 2)
  }

  return Math.sqrt((lft - (num * num) / den) / (n - 2))
}

/**
 * Returns the transpose of an array.
 *
 * Category: Lookup and reference
 *
 * @param {*} array An array or range of values on a worksheet that you want to transpose. The transpose of an array is created by using the first row of the array as the first column of the new array, the second row of the array as the second column of the new array, and so on. If you're not sure of how to enter an array formula, see Create an array formula.
 * @returns
 */
export function TRANSPOSE(array) {
  if (!array) {
    return error.na
  }

  return jStat.transpose(array)
}

export const T = {}

/**
 * Returns the Percentage Points (probability) for the Student t-distribution.
 *
 * Category: Statistical
 *
 * @param {*} x The numeric value at which to evaluate the distribution
 * @param {*} deg_freedom An integer indicating the number of degrees of freedom.
 * @param {*} cumulative A logical value that determines the form of the function. If cumulative is TRUE, T.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function.
 * @returns
 */
T.DIST = (x, deg_freedom, cumulative) => {
  if (cumulative !== 1 && cumulative !== 2) {
    return error.num
  }

  return cumulative === 1 ? T.DIST.RT(x, deg_freedom) : T.DIST['2T'](x, deg_freedom)
}

/**
 * Returns the Percentage Points (probability) for the Student t-distribution
 *
 * Category: Statistical
 *
 * @param {*} x The numeric value at which to evaluate the distribution.
 * @param {*} deg_freedom An integer indicating the number of degrees of freedom.
 * @returns
 */
T.DIST['2T'] = function (x, deg_freedom) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (x < 0 || deg_freedom < 1) {
    return error.num
  }

  if (typeof x !== 'number' || typeof deg_freedom !== 'number') {
    return error.value
  }

  return (1 - jStat.studentt.cdf(x, deg_freedom)) * 2
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
T.DIST.RT = function (x, deg_freedom) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (x < 0 || deg_freedom < 1) {
    return error.num
  }

  if (typeof x !== 'number' || typeof deg_freedom !== 'number') {
    return error.value
  }

  return 1 - jStat.studentt.cdf(x, deg_freedom)
}

/**
 * Returns the t-value of the Student's t-distribution as a function of the probability and the degrees of freedom.
 *
 * Category: Statistical
 *
 * @param {*} probability The probability associated with the Student's t-distribution.
 * @param {*} deg_freedom The number of degrees of freedom with which to characterize the distribution.
 * @returns
 */
T.INV = (probability, deg_freedom) => {
  probability = utils.parseNumber(probability)
  deg_freedom = utils.parseNumber(deg_freedom)

  if (utils.anyIsError(probability, deg_freedom)) {
    return error.value
  }

  return jStat.studentt.inv(probability, deg_freedom)
}

/**
 * Returns the inverse of the Student's t-distribution
 *
 * Category: Statistical
 *
 * @param {*} probability The probability associated with the Student's t-distribution.
 * @param {*} deg_freedom The number of degrees of freedom with which to characterize the distribution.
 * @returns
 */
T.INV['2T'] = (probability, deg_freedom) => {
  probability = utils.parseNumber(probability)
  deg_freedom = utils.parseNumber(deg_freedom)

  if (probability <= 0 || probability > 1 || deg_freedom < 1) {
    return error.num
  }

  if (utils.anyIsError(probability, deg_freedom)) {
    return error.value
  }

  return Math.abs(jStat.studentt.inv(probability / 2, deg_freedom))
}

// The algorithm can be found here:
// http://www.chem.uoa.gr/applets/AppletTtest/Appl_Ttest2.html
/**
 * Returns the probability associated with a Student's t-test.
 *
 * Category: Statistical
 *
 * @param {*} array1 The first data set.
 * @param {*} array2 The second data set.
 * @returns
 */
T.TEST = (array1, array2) => {
  array1 = utils.parseNumberArray(utils.flatten(array1))
  array2 = utils.parseNumberArray(utils.flatten(array2))

  if (utils.anyIsError(array1, array2)) {
    return error.value
  }

  const mean_x = jStat.mean(array1)
  const mean_y = jStat.mean(array2)
  let s_x = 0
  let s_y = 0
  let i

  for (i = 0; i < array1.length; i++) {
    s_x += Math.pow(array1[i] - mean_x, 2)
  }

  for (i = 0; i < array2.length; i++) {
    s_y += Math.pow(array2[i] - mean_y, 2)
  }

  s_x = s_x / (array1.length - 1)
  s_y = s_y / (array2.length - 1)

  const t = Math.abs(mean_x - mean_y) / Math.sqrt(s_x / array1.length + s_y / array2.length)

  return T.DIST['2T'](t, array1.length + array2.length - 2)
}

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
export function TREND(known_ys, known_xs, new_xs) {
  known_ys = utils.parseNumberArray(utils.flatten(known_ys))
  known_xs = utils.parseNumberArray(utils.flatten(known_xs))
  new_xs = utils.parseNumberArray(utils.flatten(new_xs))

  if (utils.anyIsError(known_ys, known_xs, new_xs)) {
    return error.value
  }

  const linest = LINEST(known_ys, known_xs)
  const m = linest[0]
  const b = linest[1]
  const result = []

  new_xs.forEach((x) => {
    result.push(m * x + b)
  })

  return result
}

/**
 * Returns the mean of the interior of a data set.
 *
 * Category: Statistical
 *
 * @param {*} array The array or range of values to trim and average.
 * @param {*} percent The fractional number of data points to exclude from the calculation. For example, if percent = 0.2, 4 points are trimmed from a data set of 20 points (20 x 0.2): 2 from the top and 2 from the bottom of the set.
 * @returns
 */
export function TRIMMEAN(range, percent) {
  range = utils.parseNumberArray(utils.flatten(range))
  percent = utils.parseNumber(percent)

  if (utils.anyIsError(range, percent)) {
    return error.value
  }

  const trim = mathTrig.FLOOR(range.length * percent, 2) / 2

  return jStat.mean(
    utils.initial(
      utils.rest(
        range.sort((a, b) => a - b),
        trim
      ),
      trim
    )
  )
}

export const VAR = {}

/**
 * Calculates variance based on the entire population.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number arguments 2 to 254 corresponding to a population.
 * @returns
 */
VAR.P = function () {
  const range = utils.numbers(utils.flatten(arguments))
  const n = range.length
  let sigma = 0
  const mean = AVERAGE(range)
  let result

  for (let i = 0; i < n; i++) {
    sigma += Math.pow(range[i] - mean, 2)
  }

  result = sigma / n

  if (isNaN(result)) {
    result = error.num
  }

  return result
}

/**
 * Estimates variance based on a sample.
 *
 * Category: Statistical
 *
 * @param {*} args number1, number2, ... Number arguments 2 to 254 corresponding to a sample of a population.
 * @returns
 */
VAR.S = function () {
  const range = utils.numbers(utils.flatten(arguments))
  const n = range.length
  let sigma = 0
  const mean = AVERAGE(range)

  for (let i = 0; i < n; i++) {
    sigma += Math.pow(range[i] - mean, 2)
  }

  return sigma / (n - 1)
}

/**
 * Estimates variance based on a sample, including numbers, text, and logical values.
 *
 * Category: Statistical
 *
 * @param {*} args value1, value2, ... Value1 is required, subsequent values are optional. 1 to 255 value arguments corresponding to a sample of a population.
 * @returns
 */
export function VARA() {
  const range = utils.flatten(arguments)
  const n = range.length
  let sigma = 0
  let count = 0
  const mean = AVERAGEA(range)

  for (let i = 0; i < n; i++) {
    const el = range[i]

    if (typeof el === 'number') {
      sigma += Math.pow(el - mean, 2)
    } else if (el === true) {
      sigma += Math.pow(1 - mean, 2)
    } else {
      sigma += Math.pow(0 - mean, 2)
    }

    if (el !== null) {
      count++
    }
  }

  return sigma / (count - 1)
}

/**
 * Calculates variance based on the entire population, including numbers, text, and logical values.
 *
 * Category: Statistical
 *
 * @param {*} args value1, value2, ... Value1 is required, subsequent values are optional. 1 to 255 value arguments corresponding to a population.
 * @returns
 */
export function VARPA() {
  const range = utils.flatten(arguments)
  const n = range.length
  let sigma = 0
  let count = 0
  const mean = AVERAGEA(range)
  let result

  for (let i = 0; i < n; i++) {
    const el = range[i]

    if (typeof el === 'number') {
      sigma += Math.pow(el - mean, 2)
    } else if (el === true) {
      sigma += Math.pow(1 - mean, 2)
    } else {
      sigma += Math.pow(0 - mean, 2)
    }

    if (el !== null) {
      count++
    }
  }

  result = sigma / count

  if (isNaN(result)) {
    result = error.num
  }

  return result
}

export const WEIBULL = {}

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
WEIBULL.DIST = (x, alpha, beta, cumulative) => {
  x = utils.parseNumber(x)
  alpha = utils.parseNumber(alpha)
  beta = utils.parseNumber(beta)

  if (utils.anyIsError(x, alpha, beta)) {
    return error.value
  }

  return cumulative
    ? 1 - Math.exp(-Math.pow(x / beta, alpha))
    : (Math.pow(x, alpha - 1) * Math.exp(-Math.pow(x / beta, alpha)) * alpha) / Math.pow(beta, alpha)
}

export const Z = {}

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
Z.TEST = (array, x, sigma) => {
  array = utils.parseNumberArray(utils.flatten(array))
  x = utils.parseNumber(x)

  if (utils.anyIsError(array, x)) {
    return error.value
  }

  sigma = sigma || STDEV.S(array)
  const n = array.length

  return 1 - NORM.S.DIST((AVERAGE(array) - x) / (sigma / Math.sqrt(n)), true)
}
