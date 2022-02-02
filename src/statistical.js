import jStat from 'jstat'

import * as error from './utils/error.js'
import * as evalExpression from './utils/criteria-eval.js'
import * as mathTrig from './math-trig.js'
import * as misc from './miscellaneous.js'
import * as utils from './utils/common.js'

const SQRT2PI = 2.5066282746310002

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

  if (isNaN(average)) {
    return 0
  } else {
    return average
  }
}

export const BETA = {}

BETA.DIST = function (x, alpha, beta, cumulative, A, B) {
  if (arguments.length < 4) {
    return error.value
  }

  A = A === undefined ? 0 : A
  B = B === undefined ? 1 : B

  x = utils.parseNumber(x)
  alpha = utils.parseNumber(alpha)
  beta = utils.parseNumber(beta)
  A = utils.parseNumber(A)
  B = utils.parseNumber(B)

  if (utils.anyIsError(x, alpha, beta, A, B)) {
    return error.value
  }

  x = (x - A) / (B - A)

  return cumulative ? jStat.beta.cdf(x, alpha, beta) : jStat.beta.pdf(x, alpha, beta)
}

BETA.INV = (probability, alpha, beta, A, B) => {
  A = A === undefined ? 0 : A
  B = B === undefined ? 1 : B

  probability = utils.parseNumber(probability)
  alpha = utils.parseNumber(alpha)
  beta = utils.parseNumber(beta)
  A = utils.parseNumber(A)
  B = utils.parseNumber(B)

  if (utils.anyIsError(probability, alpha, beta, A, B)) {
    return error.value
  }

  return jStat.beta.inv(probability, alpha, beta) * (B - A) + A
}

export const BINOM = {}

BINOM.DIST = (successes, trials, probability, cumulative) => {
  successes = utils.parseNumber(successes)
  trials = utils.parseNumber(trials)
  probability = utils.parseNumber(probability)
  cumulative = utils.parseNumber(cumulative)

  if (utils.anyIsError(successes, trials, probability, cumulative)) {
    return error.value
  }

  return cumulative
    ? jStat.binomial.cdf(successes, trials, probability)
    : jStat.binomial.pdf(successes, trials, probability)
}

BINOM.DIST.RANGE = (trials, probability, successes, successes2) => {
  successes2 = successes2 === undefined ? successes : successes2

  trials = utils.parseNumber(trials)
  probability = utils.parseNumber(probability)
  successes = utils.parseNumber(successes)
  successes2 = utils.parseNumber(successes2)

  if (utils.anyIsError(trials, probability, successes, successes2)) {
    return error.value
  }

  let result = 0

  for (let i = successes; i <= successes2; i++) {
    result += mathTrig.COMBIN(trials, i) * Math.pow(probability, i) * Math.pow(1 - probability, trials - i)
  }

  return result
}

BINOM.INV = (trials, probability, alpha) => {
  trials = utils.parseNumber(trials)
  probability = utils.parseNumber(probability)
  alpha = utils.parseNumber(alpha)

  if (utils.anyIsError(trials, probability, alpha)) {
    return error.value
  }

  let x = 0

  while (x <= trials) {
    if (jStat.binomial.cdf(x, trials, probability) >= alpha) {
      return x
    }

    x++
  }
}

export const CHISQ = {}

CHISQ.DIST = (x, k, cumulative) => {
  x = utils.parseNumber(x)
  k = utils.parseNumber(k)

  if (utils.anyIsError(x, k)) {
    return error.value
  }

  return cumulative ? jStat.chisquare.cdf(x, k) : jStat.chisquare.pdf(x, k)
}

CHISQ.DIST.RT = (x, k) => {
  if (!x | !k) {
    return error.na
  }

  if (x < 1 || k > Math.pow(10, 10)) {
    return error.num
  }

  if (typeof x !== 'number' || typeof k !== 'number') {
    return error.value
  }

  return 1 - jStat.chisquare.cdf(x, k)
}

CHISQ.INV = (probability, k) => {
  probability = utils.parseNumber(probability)
  k = utils.parseNumber(k)

  if (utils.anyIsError(probability, k)) {
    return error.value
  }

  return jStat.chisquare.inv(probability, k)
}

CHISQ.INV.RT = (p, k) => {
  if (!p | !k) {
    return error.na
  }

  if (p < 0 || p > 1 || k < 1 || k > Math.pow(10, 10)) {
    return error.num
  }

  if (typeof p !== 'number' || typeof k !== 'number') {
    return error.value
  }

  return jStat.chisquare.inv(1.0 - p, k)
}

CHISQ.TEST = function (observed, expected) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (!(observed instanceof Array) || !(expected instanceof Array)) {
    return error.value
  }

  if (observed.length !== expected.length) {
    return error.value
  }

  if (observed[0] && expected[0] && observed[0].length !== expected[0].length) {
    return error.value
  }

  const row = observed.length
  let tmp, i, j

  // Convert single-dimension array into two-dimension array

  for (i = 0; i < row; i++) {
    if (!(observed[i] instanceof Array)) {
      tmp = observed[i]
      observed[i] = []
      observed[i].push(tmp)
    }

    if (!(expected[i] instanceof Array)) {
      tmp = expected[i]
      expected[i] = []
      expected[i].push(tmp)
    }
  }

  const col = observed[0].length
  const dof = col === 1 ? row - 1 : (row - 1) * (col - 1)
  let xsqr = 0
  const Pi = Math.PI

  for (i = 0; i < row; i++) {
    for (j = 0; j < col; j++) {
      xsqr += Math.pow(observed[i][j] - expected[i][j], 2) / expected[i][j]
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

export function COLUMN(matrix, index) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (index < 0) {
    return error.num
  }

  if (!(matrix instanceof Array) || typeof index !== 'number') {
    return error.value
  }

  if (matrix.length === 0) {
    return undefined
  }

  return jStat.col(matrix, index)
}

export function COLUMNS(matrix) {
  if (arguments.length !== 1) {
    return error.na
  }

  if (!(matrix instanceof Array)) {
    return error.value
  }

  if (matrix.length === 0) {
    return 0
  }

  return jStat.cols(matrix)
}

export const CONFIDENCE = {}

CONFIDENCE.NORM = (alpha, sd, n) => {
  alpha = utils.parseNumber(alpha)
  sd = utils.parseNumber(sd)
  n = utils.parseNumber(n)

  if (utils.anyIsError(alpha, sd, n)) {
    return error.value
  }

  return jStat.normalci(1, alpha, sd, n)[1] - 1
}

CONFIDENCE.T = (alpha, sd, n) => {
  alpha = utils.parseNumber(alpha)
  sd = utils.parseNumber(sd)
  n = utils.parseNumber(n)

  if (utils.anyIsError(alpha, sd, n)) {
    return error.value
  }

  return jStat.tci(1, alpha, sd, n)[1] - 1
}

export function CORREL(array1, array2) {
  array1 = utils.parseNumberArray(utils.flatten(array1))
  array2 = utils.parseNumberArray(utils.flatten(array2))

  if (utils.anyIsError(array1, array2)) {
    return error.value
  }

  return jStat.corrcoeff(array1, array2)
}

export function COUNT() {
  const flatArguments = utils.flatten(arguments)

  return utils.numbers(flatArguments).length
}

export function COUNTA() {
  const flatArguments = utils.flatten(arguments)

  return flatArguments.length - COUNTBLANK(flatArguments)
}

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

export function COUNTUNIQUE() {
  return misc.UNIQUE.apply(null, utils.flatten(arguments)).length
}

export const COVARIANCE = {}

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

COVARIANCE.S = (array1, array2) => {
  array1 = utils.parseNumberArray(utils.flatten(array1))
  array2 = utils.parseNumberArray(utils.flatten(array2))

  if (utils.anyIsError(array1, array2)) {
    return error.value
  }

  return jStat.covariance(array1, array2)
}

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

EXPON.DIST = (x, lambda, cumulative) => {
  x = utils.parseNumber(x)
  lambda = utils.parseNumber(lambda)

  if (utils.anyIsError(x, lambda)) {
    return error.value
  }

  return cumulative ? jStat.exponential.cdf(x, lambda) : jStat.exponential.pdf(x, lambda)
}

export const F = {}

F.DIST = (x, d1, d2, cumulative) => {
  x = utils.parseNumber(x)
  d1 = utils.parseNumber(d1)
  d2 = utils.parseNumber(d2)

  if (utils.anyIsError(x, d1, d2)) {
    return error.value
  }

  return cumulative ? jStat.centralF.cdf(x, d1, d2) : jStat.centralF.pdf(x, d1, d2)
}

F.DIST.RT = function (x, d1, d2) {
  if (arguments.length !== 3) {
    return error.na
  }

  if (x < 0 || d1 < 1 || d2 < 1) {
    return error.num
  }

  if (typeof x !== 'number' || typeof d1 !== 'number' || typeof d2 !== 'number') {
    return error.value
  }

  return 1 - jStat.centralF.cdf(x, d1, d2)
}

F.INV = (probability, d1, d2) => {
  probability = utils.parseNumber(probability)
  d1 = utils.parseNumber(d1)
  d2 = utils.parseNumber(d2)

  if (utils.anyIsError(probability, d1, d2)) {
    return error.value
  }

  if (probability <= 0.0 || probability > 1.0) {
    return error.num
  }

  return jStat.centralF.inv(probability, d1, d2)
}

F.INV.RT = function (p, d1, d2) {
  if (arguments.length !== 3) {
    return error.na
  }

  if (p < 0 || p > 1 || d1 < 1 || d1 > Math.pow(10, 10) || d2 < 1 || d2 > Math.pow(10, 10)) {
    return error.num
  }

  if (typeof p !== 'number' || typeof d1 !== 'number' || typeof d2 !== 'number') {
    return error.value
  }

  return jStat.centralF.inv(1.0 - p, d1, d2)
}

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

export function FISHER(x) {
  x = utils.parseNumber(x)

  if (x instanceof Error) {
    return x
  }

  return Math.log((1 + x) / (1 - x)) / 2
}

export function FISHERINV(y) {
  y = utils.parseNumber(y)

  if (y instanceof Error) {
    return y
  }

  const e2y = Math.exp(2 * y)

  return (e2y - 1) / (e2y + 1)
}

export function FORECAST(x, data_y, data_x) {
  x = utils.parseNumber(x)
  data_y = utils.parseNumberArray(utils.flatten(data_y))
  data_x = utils.parseNumberArray(utils.flatten(data_x))

  if (utils.anyIsError(x, data_y, data_x)) {
    return error.value
  }

  const xmean = jStat.mean(data_x)
  const ymean = jStat.mean(data_y)
  const n = data_x.length
  let num = 0
  let den = 0

  for (let i = 0; i < n; i++) {
    num += (data_x[i] - xmean) * (data_y[i] - ymean)
    den += Math.pow(data_x[i] - xmean, 2)
  }

  const b = num / den
  const a = ymean - b * xmean

  return a + b * x
}

export function FREQUENCY(data, bins) {
  data = utils.parseNumberArray(utils.flatten(data))
  bins = utils.parseNumberArray(utils.flatten(bins))

  if (utils.anyIsError(data, bins)) {
    return error.value
  }

  const n = data.length
  const b = bins.length
  const r = []

  for (let i = 0; i <= b; i++) {
    r[i] = 0

    for (let j = 0; j < n; j++) {
      if (i === 0) {
        if (data[j] <= bins[0]) {
          r[0] += 1
        }
      } else if (i < b) {
        if (data[j] > bins[i - 1] && data[j] <= bins[i]) {
          r[i] += 1
        }
      } else if (i === b) {
        if (data[j] > bins[b - 1]) {
          r[b] += 1
        }
      }
    }
  }

  return r
}

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

export function GAMMALN(number) {
  number = utils.parseNumber(number)

  if (number instanceof Error) {
    return number
  }

  return jStat.gammaln(number)
}

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

export function GAUSS(z) {
  z = utils.parseNumber(z)

  if (z instanceof Error) {
    return z
  }

  return jStat.normal.cdf(z, 0, 1) - 0.5
}

export function GEOMEAN() {
  const args = utils.parseNumberArray(utils.flatten(arguments))

  if (args instanceof Error) {
    return args
  }

  return jStat.geomean(args)
}

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

HYPGEOM.DIST = (x, n, M, N, cumulative) => {
  x = utils.parseNumber(x)
  n = utils.parseNumber(n)
  M = utils.parseNumber(M)
  N = utils.parseNumber(N)

  if (utils.anyIsError(x, n, M, N)) {
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

  return cumulative ? cdf(x, n, M, N) : pdf(x, n, M, N)
}

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

export function LARGE(range, k) {
  range = utils.parseNumberArray(utils.flatten(range))
  k = utils.parseNumber(k)

  if (utils.anyIsError(range, k)) {
    return range
  }

  if (k < 0 || range.length < k) {
    return error.value
  }

  return range.sort((a, b) => b - a)[k - 1]
}

export function LINEST(data_y, data_x) {
  data_y = utils.parseNumberArray(utils.flatten(data_y))
  data_x = utils.parseNumberArray(utils.flatten(data_x))

  if (utils.anyIsError(data_y, data_x)) {
    return error.value
  }

  const ymean = jStat.mean(data_y)
  const xmean = jStat.mean(data_x)
  const n = data_x.length
  let num = 0
  let den = 0

  for (let i = 0; i < n; i++) {
    num += (data_x[i] - xmean) * (data_y[i] - ymean)
    den += Math.pow(data_x[i] - xmean, 2)
  }

  const m = num / den
  const b = ymean - m * xmean

  return [m, b]
}

// According to Microsoft:
// http://office.microsoft.com/en-us/starter-help/logest-function-HP010342665.aspx
// LOGEST returns are based on the following linear model:
// ln y = x1 ln m1 + ... + xn ln mn + ln b
export function LOGEST(data_y, data_x) {
  data_y = utils.parseNumberArray(utils.flatten(data_y))
  data_x = utils.parseNumberArray(utils.flatten(data_x))

  if (utils.anyIsError(data_y, data_x)) {
    return error.value
  }

  for (let i = 0; i < data_y.length; i++) {
    data_y[i] = Math.log(data_y[i])
  }

  const result = LINEST(data_y, data_x)
  result[0] = Math.round(Math.exp(result[0]) * 1000000) / 1000000
  result[1] = Math.round(Math.exp(result[1]) * 1000000) / 1000000

  return result
}

export const LOGNORM = {}

LOGNORM.DIST = (x, mean, sd, cumulative) => {
  x = utils.parseNumber(x)
  mean = utils.parseNumber(mean)
  sd = utils.parseNumber(sd)

  if (utils.anyIsError(x, mean, sd)) {
    return error.value
  }

  return cumulative ? jStat.lognormal.cdf(x, mean, sd) : jStat.lognormal.pdf(x, mean, sd)
}

LOGNORM.INV = (probability, mean, sd) => {
  probability = utils.parseNumber(probability)
  mean = utils.parseNumber(mean)
  sd = utils.parseNumber(sd)

  if (utils.anyIsError(probability, mean, sd)) {
    return error.value
  }

  return jStat.lognormal.inv(probability, mean, sd)
}

export function MAX() {
  const flatArguments = utils.flatten(arguments)
  const someError = utils.anyError.apply(undefined, flatArguments)

  if (someError) {
    return someError
  }

  const range = utils.numbers(flatArguments)

  return range.length === 0 ? 0 : Math.max.apply(Math, range)
}

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

export function MIN() {
  const flatArguments = utils.flatten(arguments)
  const someError = utils.anyError.apply(undefined, flatArguments)

  if (someError) {
    return someError
  }

  const range = utils.numbers(flatArguments)

  return range.length === 0 ? 0 : Math.min.apply(Math, range)
}

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

MODE.SNGL = function () {
  const range = utils.parseNumberArray(utils.flatten(arguments))

  if (range instanceof Error) {
    return range
  }

  return MODE.MULT(range).sort((a, b) => a - b)[0]
}

export const NEGBINOM = {}

NEGBINOM.DIST = (k, r, p, cumulative) => {
  k = utils.parseNumber(k)
  r = utils.parseNumber(r)
  p = utils.parseNumber(p)

  if (utils.anyIsError(k, r, p)) {
    return error.value
  }

  return cumulative ? jStat.negbin.cdf(k, r, p) : jStat.negbin.pdf(k, r, p)
}

export const NORM = {}

NORM.DIST = (x, mean, sd, cumulative) => {
  x = utils.parseNumber(x)
  mean = utils.parseNumber(mean)
  sd = utils.parseNumber(sd)

  if (utils.anyIsError(x, mean, sd)) {
    return error.value
  }

  if (sd <= 0) {
    return error.num
  }

  // Return normal distribution computed by jStat [http://jstat.org]
  return cumulative ? jStat.normal.cdf(x, mean, sd) : jStat.normal.pdf(x, mean, sd)
}

NORM.INV = (probability, mean, sd) => {
  probability = utils.parseNumber(probability)
  mean = utils.parseNumber(mean)
  sd = utils.parseNumber(sd)

  if (utils.anyIsError(probability, mean, sd)) {
    return error.value
  }

  return jStat.normal.inv(probability, mean, sd)
}

NORM.S = {}

NORM.S.DIST = (z, cumulative) => {
  z = utils.parseNumber(z)

  if (z instanceof Error) {
    return error.value
  }

  return cumulative ? jStat.normal.cdf(z, 0, 1) : jStat.normal.pdf(z, 0, 1)
}

NORM.S.INV = (probability) => {
  probability = utils.parseNumber(probability)

  if (probability instanceof Error) {
    return error.value
  }

  return jStat.normal.inv(probability, 0, 1)
}

export function PEARSON(data_x, data_y) {
  data_y = utils.parseNumberArray(utils.flatten(data_y))
  data_x = utils.parseNumberArray(utils.flatten(data_x))

  if (utils.anyIsError(data_y, data_x)) {
    return error.value
  }

  const xmean = jStat.mean(data_x)
  const ymean = jStat.mean(data_y)
  const n = data_x.length
  let num = 0
  let den1 = 0
  let den2 = 0

  for (let i = 0; i < n; i++) {
    num += (data_x[i] - xmean) * (data_y[i] - ymean)
    den1 += Math.pow(data_x[i] - xmean, 2)
    den2 += Math.pow(data_y[i] - ymean, 2)
  }

  return num / Math.sqrt(den1 * den2)
}

export const PERCENTILE = {}

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

export function PERMUT(number, number_chosen) {
  number = utils.parseNumber(number)
  number_chosen = utils.parseNumber(number_chosen)

  if (utils.anyIsError(number, number_chosen)) {
    return error.value
  }

  return mathTrig.FACT(number) / mathTrig.FACT(number - number_chosen)
}

export function PERMUTATIONA(number, number_chosen) {
  number = utils.parseNumber(number)
  number_chosen = utils.parseNumber(number_chosen)

  if (utils.anyIsError(number, number_chosen)) {
    return error.value
  }

  return Math.pow(number, number_chosen)
}

export function PHI(x) {
  x = utils.parseNumber(x)

  if (x instanceof Error) {
    return error.value
  }

  return Math.exp(-0.5 * x * x) / SQRT2PI
}

export const POISSON = {}

POISSON.DIST = (x, mean, cumulative) => {
  x = utils.parseNumber(x)
  mean = utils.parseNumber(mean)

  if (utils.anyIsError(x, mean)) {
    return error.value
  }

  return cumulative ? jStat.poisson.cdf(x, mean) : jStat.poisson.pdf(x, mean)
}

export function PROB(range, probability, lower, upper) {
  if (lower === undefined) {
    return 0
  }

  upper = upper === undefined ? lower : upper

  range = utils.parseNumberArray(utils.flatten(range))
  probability = utils.parseNumberArray(utils.flatten(probability))
  lower = utils.parseNumber(lower)
  upper = utils.parseNumber(upper)

  if (utils.anyIsError(range, probability, lower, upper)) {
    return error.value
  }

  if (lower === upper) {
    return range.indexOf(lower) >= 0 ? probability[range.indexOf(lower)] : 0
  }

  const sorted = range.sort((a, b) => a - b)
  const n = sorted.length
  let result = 0

  for (let i = 0; i < n; i++) {
    if (sorted[i] >= lower && sorted[i] <= upper) {
      result += probability[range.indexOf(sorted[i])]
    }
  }

  return result
}

export const QUARTILE = {}

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

RANK.AVG = (number, range, order) => {
  number = utils.parseNumber(number)
  range = utils.parseNumberArray(utils.flatten(range))

  if (utils.anyIsError(number, range)) {
    return error.value
  }

  range = utils.flatten(range)
  order = order || false
  const sort = order ? (a, b) => a - b : (a, b) => b - a
  range = range.sort(sort)

  const length = range.length
  let count = 0

  for (let i = 0; i < length; i++) {
    if (range[i] === number) {
      count++
    }
  }

  return count > 1 ? (2 * range.indexOf(number) + count + 1) / 2 : range.indexOf(number) + 1
}

RANK.EQ = (number, range, order) => {
  number = utils.parseNumber(number)
  range = utils.parseNumberArray(utils.flatten(range))

  if (utils.anyIsError(number, range)) {
    return error.value
  }

  order = order || false
  const sort = order ? (a, b) => a - b : (a, b) => b - a
  range = range.sort(sort)

  return range.indexOf(number) + 1
}

export function ROW(matrix, index) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (index < 0) {
    return error.num
  }

  if (!(matrix instanceof Array) || typeof index !== 'number') {
    return error.value
  }

  if (matrix.length === 0) {
    return undefined
  }

  return jStat.row(matrix, index)
}

export function ROWS(matrix) {
  if (arguments.length !== 1) {
    return error.na
  }

  if (!(matrix instanceof Array)) {
    return error.value
  }

  if (matrix.length === 0) {
    return 0
  }

  return jStat.rows(matrix)
}

export function RSQ(data_x, data_y) {
  // no need to flatten here, PEARSON will take care of that
  data_x = utils.parseNumberArray(utils.flatten(data_x))
  data_y = utils.parseNumberArray(utils.flatten(data_y))

  if (utils.anyIsError(data_x, data_y)) {
    return error.value
  }

  return Math.pow(PEARSON(data_x, data_y), 2)
}

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

export function SLOPE(data_y, data_x) {
  data_y = utils.parseNumberArray(utils.flatten(data_y))
  data_x = utils.parseNumberArray(utils.flatten(data_x))

  if (utils.anyIsError(data_y, data_x)) {
    return error.value
  }

  const xmean = jStat.mean(data_x)
  const ymean = jStat.mean(data_y)
  const n = data_x.length
  let num = 0
  let den = 0

  for (let i = 0; i < n; i++) {
    num += (data_x[i] - xmean) * (data_y[i] - ymean)
    den += Math.pow(data_x[i] - xmean, 2)
  }

  return num / den
}

export function SMALL(range, k) {
  range = utils.parseNumberArray(utils.flatten(range))
  k = utils.parseNumber(k)

  if (utils.anyIsError(range, k)) {
    return range
  }

  return range.sort((a, b) => a - b)[k - 1]
}

export function STANDARDIZE(x, mean, sd) {
  x = utils.parseNumber(x)
  mean = utils.parseNumber(mean)
  sd = utils.parseNumber(sd)

  if (utils.anyIsError(x, mean, sd)) {
    return error.value
  }

  return (x - mean) / sd
}

export const STDEV = {}

STDEV.P = function () {
  const v = VAR.P.apply(this, arguments)
  let result = Math.sqrt(v)

  if (isNaN(result)) {
    result = error.num
  }

  return result
}

STDEV.S = function () {
  const v = VAR.S.apply(this, arguments)
  const result = Math.sqrt(v)

  return result
}

export function STDEVA() {
  const v = VARA.apply(this, arguments)
  const result = Math.sqrt(v)

  return result
}

export function STDEVPA() {
  const v = VARPA.apply(this, arguments)
  let result = Math.sqrt(v)

  if (isNaN(result)) {
    result = error.num
  }

  return result
}

export function STEYX(data_y, data_x) {
  data_y = utils.parseNumberArray(utils.flatten(data_y))
  data_x = utils.parseNumberArray(utils.flatten(data_x))

  if (utils.anyIsError(data_y, data_x)) {
    return error.value
  }

  const xmean = jStat.mean(data_x)
  const ymean = jStat.mean(data_y)
  const n = data_x.length
  let lft = 0
  let num = 0
  let den = 0

  for (let i = 0; i < n; i++) {
    lft += Math.pow(data_y[i] - ymean, 2)
    num += (data_x[i] - xmean) * (data_y[i] - ymean)
    den += Math.pow(data_x[i] - xmean, 2)
  }

  return Math.sqrt((lft - (num * num) / den) / (n - 2))
}

export function TRANSPOSE(matrix) {
  if (!matrix) {
    return error.na
  }

  return jStat.transpose(matrix)
}

export const T = {}

T.DIST = (x, df, tails) => {
  if (tails !== 1 && tails !== 2) {
    return error.num
  }

  return tails === 1 ? T.DIST.RT(x, df) : T.DIST['2T'](x, df)
}

T.DIST['2T'] = function (x, df) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (x < 0 || df < 1) {
    return error.num
  }

  if (typeof x !== 'number' || typeof df !== 'number') {
    return error.value
  }

  return (1 - jStat.studentt.cdf(x, df)) * 2
}

T.DIST.RT = function (x, df) {
  if (arguments.length !== 2) {
    return error.na
  }

  if (x < 0 || df < 1) {
    return error.num
  }

  if (typeof x !== 'number' || typeof df !== 'number') {
    return error.value
  }

  return 1 - jStat.studentt.cdf(x, df)
}

T.INV = (probability, df) => {
  probability = utils.parseNumber(probability)
  df = utils.parseNumber(df)

  if (utils.anyIsError(probability, df)) {
    return error.value
  }

  return jStat.studentt.inv(probability, df)
}

T.INV['2T'] = (probability, df) => {
  probability = utils.parseNumber(probability)
  df = utils.parseNumber(df)

  if (probability <= 0 || probability > 1 || df < 1) {
    return error.num
  }

  if (utils.anyIsError(probability, df)) {
    return error.value
  }

  return Math.abs(jStat.studentt.inv(probability / 2, df))
}

// The algorithm can be found here:
// http://www.chem.uoa.gr/applets/AppletTtest/Appl_Ttest2.html
T.TEST = (data_x, data_y) => {
  data_x = utils.parseNumberArray(utils.flatten(data_x))
  data_y = utils.parseNumberArray(utils.flatten(data_y))

  if (utils.anyIsError(data_x, data_y)) {
    return error.value
  }

  const mean_x = jStat.mean(data_x)
  const mean_y = jStat.mean(data_y)
  let s_x = 0
  let s_y = 0
  let i

  for (i = 0; i < data_x.length; i++) {
    s_x += Math.pow(data_x[i] - mean_x, 2)
  }

  for (i = 0; i < data_y.length; i++) {
    s_y += Math.pow(data_y[i] - mean_y, 2)
  }

  s_x = s_x / (data_x.length - 1)
  s_y = s_y / (data_y.length - 1)

  const t = Math.abs(mean_x - mean_y) / Math.sqrt(s_x / data_x.length + s_y / data_y.length)

  return T.DIST['2T'](t, data_x.length + data_y.length - 2)
}

export function TREND(data_y, data_x, new_data_x) {
  data_y = utils.parseNumberArray(utils.flatten(data_y))
  data_x = utils.parseNumberArray(utils.flatten(data_x))
  new_data_x = utils.parseNumberArray(utils.flatten(new_data_x))

  if (utils.anyIsError(data_y, data_x, new_data_x)) {
    return error.value
  }

  const linest = LINEST(data_y, data_x)
  const m = linest[0]
  const b = linest[1]
  const result = []

  new_data_x.forEach((x) => {
    result.push(m * x + b)
  })

  return result
}

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

Z.TEST = (range, x, sd) => {
  range = utils.parseNumberArray(utils.flatten(range))
  x = utils.parseNumber(x)

  if (utils.anyIsError(range, x)) {
    return error.value
  }

  sd = sd || STDEV.S(range)
  const n = range.length

  return 1 - NORM.S.DIST((AVERAGE(range) - x) / (sd / Math.sqrt(n)), true)
}
