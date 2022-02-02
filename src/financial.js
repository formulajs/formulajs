import * as error from './utils/error.js'
import * as dateTime from './date-time.js'
import * as utils from './utils/common.js'

function validDate(d) {
  return d && d.getTime && !isNaN(d.getTime())
}

function ensureDate(d) {
  return d instanceof Date ? d : new Date(d)
}

export function ACCRINT(issue, first, settlement, rate, par, frequency, basis) {
  // Return error if either date is invalid
  issue = ensureDate(issue)
  first = ensureDate(first)
  settlement = ensureDate(settlement)

  if (!validDate(issue) || !validDate(first) || !validDate(settlement)) {
    return error.value
  }

  // Return error if either rate or par are lower than or equal to zero
  if (rate <= 0 || par <= 0) {
    return error.num
  }

  // Return error if frequency is neither 1, 2, or 4
  if ([1, 2, 4].indexOf(frequency) === -1) {
    return error.num
  }

  // Return error if basis is neither 0, 1, 2, 3, or 4
  if ([0, 1, 2, 3, 4].indexOf(basis) === -1) {
    return error.num
  }

  // Return error if settlement is before or equal to issue
  if (settlement <= issue) {
    return error.num
  }

  // Set default values
  par = par || 0
  basis = basis || 0

  // Compute accrued interest

  return par * rate * dateTime.YEARFRAC(issue, settlement, basis)
}

// TODO
export function ACCRINTM() {
  throw new Error('ACCRINTM is not implemented')
}

// TODO
export function AMORDEGRC() {
  throw new Error('AMORDEGRC is not implemented')
}

// TODO
export function AMORLINC() {
  throw new Error('AMORLINC is not implemented')
}

// TODO
export function COUPDAYBS() {
  throw new Error('COUPDAYBS is not implemented')
}

// TODO
export function COUPDAYS() {
  throw new Error('COUPDAYS is not implemented')
}

// TODO
export function COUPDAYSNC() {
  throw new Error('COUPDAYSNC is not implemented')
}

// TODO
export function COUPNCD() {
  throw new Error('COUPNCD is not implemented')
}

// TODO
export function COUPNUM() {
  throw new Error('COUPNUM is not implemented')
}

// TODO
export function COUPPCD() {
  throw new Error('COUPPCD is not implemented')
}

export function CUMIPMT(rate, periods, value, start, end, type) {
  rate = utils.parseNumber(rate)
  periods = utils.parseNumber(periods)
  value = utils.parseNumber(value)

  if (utils.anyIsError(rate, periods, value)) {
    return error.value
  }

  if (rate <= 0 || periods <= 0 || value <= 0) {
    return error.num
  }

  if (start < 1 || end < 1 || start > end) {
    return error.num
  }

  if (type !== 0 && type !== 1) {
    return error.num
  }

  const payment = PMT(rate, periods, value, 0, type)
  let interest = 0

  if (start === 1) {
    if (type === 0) {
      interest = -value
    }

    start++
  }

  for (let i = start; i <= end; i++) {
    if (type === 1) {
      interest += FV(rate, i - 2, payment, value, 1) - payment
    } else {
      interest += FV(rate, i - 1, payment, value, 0)
    }
  }

  interest *= rate

  return interest
}

export function CUMPRINC(rate, periods, value, start, end, type) {
  // Credits: algorithm inspired by Apache OpenOffice
  // Credits: Hannes Stiebitzhofer for the translations of function and variable names
  rate = utils.parseNumber(rate)
  periods = utils.parseNumber(periods)
  value = utils.parseNumber(value)

  if (utils.anyIsError(rate, periods, value)) {
    return error.value
  }

  // Return error if either rate, periods, or value are lower than or equal to zero
  if (rate <= 0 || periods <= 0 || value <= 0) {
    return error.num
  }

  // Return error if start < 1, end < 1, or start > end
  if (start < 1 || end < 1 || start > end) {
    return error.num
  }

  // Return error if type is neither 0 nor 1
  if (type !== 0 && type !== 1) {
    return error.num
  }

  // Compute cumulative principal
  const payment = PMT(rate, periods, value, 0, type)
  let principal = 0

  if (start === 1) {
    if (type === 0) {
      principal = payment + value * rate
    } else {
      principal = payment
    }

    start++
  }

  for (let i = start; i <= end; i++) {
    if (type > 0) {
      principal += payment - (FV(rate, i - 2, payment, value, 1) - payment) * rate
    } else {
      principal += payment - FV(rate, i - 1, payment, value, 0) * rate
    }
  }

  // Return cumulative principal

  return principal
}

export function DB(cost, salvage, life, period, month) {
  // Initialize month
  month = month === undefined ? 12 : month

  cost = utils.parseNumber(cost)
  salvage = utils.parseNumber(salvage)
  life = utils.parseNumber(life)
  period = utils.parseNumber(period)
  month = utils.parseNumber(month)

  if (utils.anyIsError(cost, salvage, life, period, month)) {
    return error.value
  }

  // Return error if any of the parameters is negative
  if (cost < 0 || salvage < 0 || life < 0 || period < 0) {
    return error.num
  }

  // Return error if month is not an integer between 1 and 12
  if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].indexOf(month) === -1) {
    return error.num
  }

  // Return error if period is greater than life
  if (period > life) {
    return error.num
  }

  // Return 0 (zero) if salvage is greater than or equal to cost
  if (salvage >= cost) {
    return 0
  }

  // Rate is rounded to three decimals places
  const rate = (1 - Math.pow(salvage / cost, 1 / life)).toFixed(3)

  // Compute initial depreciation
  const initial = (cost * rate * month) / 12

  // Compute total depreciation
  let total = initial
  let current = 0
  const ceiling = period === life ? life - 1 : period

  for (let i = 2; i <= ceiling; i++) {
    current = (cost - total) * rate
    total += current
  }

  // Depreciation for the first and last periods are special cases
  if (period === 1) {
    // First period
    return initial
  } else if (period === life) {
    // Last period

    return (cost - total) * rate
  } else {
    return current
  }
}

export function DDB(cost, salvage, life, period, factor) {
  // Initialize factor
  factor = factor === undefined ? 2 : factor

  cost = utils.parseNumber(cost)
  salvage = utils.parseNumber(salvage)
  life = utils.parseNumber(life)
  period = utils.parseNumber(period)
  factor = utils.parseNumber(factor)

  if (utils.anyIsError(cost, salvage, life, period, factor)) {
    return error.value
  }

  // Return error if any of the parameters is negative or if factor is null
  if (cost < 0 || salvage < 0 || life < 0 || period < 0 || factor <= 0) {
    return error.num
  }

  // Return error if period is greater than life
  if (period > life) {
    return error.num
  }

  // Return 0 (zero) if salvage is greater than or equal to cost
  if (salvage >= cost) {
    return 0
  }

  // Compute depreciation
  let total = 0
  let current = 0

  for (let i = 1; i <= period; i++) {
    current = Math.min((cost - total) * (factor / life), cost - salvage - total)
    total += current
  }

  // Return depreciation
  return current
}

// TODO
export function DISC() {
  throw new Error('DISC is not implemented')
}

export function DOLLARDE(dollar, fraction) {
  // Credits: algorithm inspired by Apache OpenOffice
  dollar = utils.parseNumber(dollar)
  fraction = utils.parseNumber(fraction)

  if (utils.anyIsError(dollar, fraction)) {
    return error.value
  }

  // Return error if fraction is negative
  if (fraction < 0) {
    return error.num
  }

  // Return error if fraction is greater than or equal to 0 and less than 1
  if (fraction >= 0 && fraction < 1) {
    return error.div0
  }

  // Truncate fraction if it is not an integer
  fraction = parseInt(fraction, 10)

  // Compute integer part
  let result = parseInt(dollar, 10)

  // Add decimal part
  result += ((dollar % 1) * Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN10))) / fraction

  // Round result
  const power = Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN2) + 1)
  result = Math.round(result * power) / power

  // Return converted dollar price
  return result
}

export function DOLLARFR(dollar, fraction) {
  // Credits: algorithm inspired by Apache OpenOffice
  dollar = utils.parseNumber(dollar)
  fraction = utils.parseNumber(fraction)

  if (utils.anyIsError(dollar, fraction)) {
    return error.value
  }

  // Return error if fraction is negative
  if (fraction < 0) {
    return error.num
  }

  // Return error if fraction is greater than or equal to 0 and less than 1
  if (fraction >= 0 && fraction < 1) {
    return error.div0
  }

  // Truncate fraction if it is not an integer
  fraction = parseInt(fraction, 10)

  // Compute integer part
  let result = parseInt(dollar, 10)

  // Add decimal part
  result += (dollar % 1) * Math.pow(10, -Math.ceil(Math.log(fraction) / Math.LN10)) * fraction

  // Return converted dollar price
  return result
}

// TODO
export function DURATION() {
  throw new Error('DURATION is not implemented')
}

export function EFFECT(rate, periods) {
  rate = utils.parseNumber(rate)
  periods = utils.parseNumber(periods)

  if (utils.anyIsError(rate, periods)) {
    return error.value
  }

  // Return error if rate <=0 or periods < 1
  if (rate <= 0 || periods < 1) {
    return error.num
  }

  // Truncate periods if it is not an integer
  periods = parseInt(periods, 10)

  // Return effective annual interest rate
  return Math.pow(1 + rate / periods, periods) - 1
}

export function FV(rate, periods, payment, value, type) {
  // Credits: algorithm inspired by Apache OpenOffice
  value = value || 0
  type = type || 0

  rate = utils.parseNumber(rate)
  periods = utils.parseNumber(periods)
  payment = utils.parseNumber(payment)
  value = utils.parseNumber(value)
  type = utils.parseNumber(type)

  if (utils.anyIsError(rate, periods, payment, value, type)) {
    return error.value
  }

  // Return future value
  let result

  if (rate === 0) {
    result = value + payment * periods
  } else {
    const term = Math.pow(1 + rate, periods)

    if (type === 1) {
      result = value * term + (payment * (1 + rate) * (term - 1)) / rate
    } else {
      result = value * term + (payment * (term - 1)) / rate
    }
  }

  return -result
}

export function FVSCHEDULE(principal, schedule) {
  principal = utils.parseNumber(principal)
  schedule = utils.parseNumberArray(utils.flatten(schedule))

  if (utils.anyIsError(principal, schedule)) {
    return error.value
  }

  const n = schedule.length
  let future = principal

  // Apply all interests in schedule

  for (let i = 0; i < n; i++) {
    // Apply scheduled interest
    future *= 1 + schedule[i]
  }

  // Return future value
  return future
}

// TODO
export function INTRATE() {
  throw new Error('INTRATE is not implemented')
}

export function IPMT(rate, period, periods, present, future, type) {
  // Credits: algorithm inspired by Apache OpenOffice
  future = future || 0
  type = type || 0

  rate = utils.parseNumber(rate)
  period = utils.parseNumber(period)
  periods = utils.parseNumber(periods)
  present = utils.parseNumber(present)
  future = utils.parseNumber(future)
  type = utils.parseNumber(type)

  if (utils.anyIsError(rate, period, periods, present, future, type)) {
    return error.value
  }

  // Compute payment
  const payment = PMT(rate, periods, present, future, type)

  // Compute interest
  let interest

  if (period === 1) {
    if (type === 1) {
      interest = 0
    } else {
      interest = -present
    }
  } else {
    if (type === 1) {
      interest = FV(rate, period - 2, payment, present, 1) - payment
    } else {
      interest = FV(rate, period - 1, payment, present, 0)
    }
  }

  // Return interest
  return interest * rate
}

export function IRR(values, guess) {
  // Credits: algorithm inspired by Apache OpenOffice
  guess = guess || 0

  values = utils.parseNumberArray(utils.flatten(values))
  guess = utils.parseNumber(guess)

  if (utils.anyIsError(values, guess)) {
    return error.value
  }

  // Calculates the resulting amount
  const irrResult = (values, dates, rate) => {
    const r = rate + 1
    let result = values[0]

    for (let i = 1; i < values.length; i++) {
      result += values[i] / Math.pow(r, (dates[i] - dates[0]) / 365)
    }

    return result
  }

  // Calculates the first derivation
  const irrResultDeriv = (values, dates, rate) => {
    const r = rate + 1
    let result = 0

    for (let i = 1; i < values.length; i++) {
      const frac = (dates[i] - dates[0]) / 365
      result -= (frac * values[i]) / Math.pow(r, frac + 1)
    }

    return result
  }

  // Initialize dates and check that values contains at least one positive value and one negative value
  const dates = []
  let positive = false
  let negative = false

  for (let i = 0; i < values.length; i++) {
    dates[i] = i === 0 ? 0 : dates[i - 1] + 365

    if (values[i] > 0) {
      positive = true
    }

    if (values[i] < 0) {
      negative = true
    }
  }

  // Return error if values does not contain at least one positive value and one negative value
  if (!positive || !negative) {
    return error.num
  }

  // Initialize guess and resultRate
  guess = guess === undefined ? 0.1 : guess
  let resultRate = guess

  // Set maximum epsilon for end of iteration
  const epsMax = 1e-10

  // Implement Newton's method
  let newRate, epsRate, resultValue
  let contLoop = true
  do {
    resultValue = irrResult(values, dates, resultRate)
    newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate)
    epsRate = Math.abs(newRate - resultRate)
    resultRate = newRate
    contLoop = epsRate > epsMax && Math.abs(resultValue) > epsMax
  } while (contLoop)

  // Return internal rate of return
  return resultRate
}

export function ISPMT(rate, period, periods, value) {
  rate = utils.parseNumber(rate)
  period = utils.parseNumber(period)
  periods = utils.parseNumber(periods)
  value = utils.parseNumber(value)

  if (utils.anyIsError(rate, period, periods, value)) {
    return error.value
  }

  // Return interest
  return value * rate * (period / periods - 1)
}

// TODO
export function MDURATION() {
  throw new Error('MDURATION is not implemented')
}

export function MIRR(values, finance_rate, reinvest_rate) {
  values = utils.parseNumberArray(utils.flatten(values))
  finance_rate = utils.parseNumber(finance_rate)
  reinvest_rate = utils.parseNumber(reinvest_rate)

  if (utils.anyIsError(values, finance_rate, reinvest_rate)) {
    return error.value
  }

  // Initialize number of values
  const n = values.length

  // Lookup payments (negative values) and incomes (positive values)
  const payments = []
  const incomes = []

  for (let i = 0; i < n; i++) {
    if (values[i] < 0) {
      payments.push(values[i])
    } else {
      incomes.push(values[i])
    }
  }

  // Return modified internal rate of return
  const num = -NPV(reinvest_rate, incomes) * Math.pow(1 + reinvest_rate, n - 1)
  const den = NPV(finance_rate, payments) * (1 + finance_rate)

  return Math.pow(num / den, 1 / (n - 1)) - 1
}

export function NOMINAL(rate, periods) {
  rate = utils.parseNumber(rate)
  periods = utils.parseNumber(periods)

  if (utils.anyIsError(rate, periods)) {
    return error.value
  }

  // Return error if rate <=0 or periods < 1
  if (rate <= 0 || periods < 1) {
    return error.num
  }

  // Truncate periods if it is not an integer
  periods = parseInt(periods, 10)

  // Return nominal annual interest rate
  return (Math.pow(rate + 1, 1 / periods) - 1) * periods
}

export function NPER(rate, payment, present, future, type) {
  type = type === undefined ? 0 : type
  future = future === undefined ? 0 : future

  rate = utils.parseNumber(rate)
  payment = utils.parseNumber(payment)
  present = utils.parseNumber(present)
  future = utils.parseNumber(future)
  type = utils.parseNumber(type)

  if (utils.anyIsError(rate, payment, present, future, type)) {
    return error.value
  }

  if (rate === 0) {
    return -(present + future) / payment
  } else {
    const num = payment * (1 + rate * type) - future * rate
    const den = present * rate + payment * (1 + rate * type)

    return Math.log(num / den) / Math.log(1 + rate)
  }
}

export function NPV() {
  const args = utils.parseNumberArray(utils.flatten(arguments))

  if (args instanceof Error) {
    return args
  }

  // Lookup rate
  const rate = args[0]

  // Initialize net present value
  let value = 0

  // Loop on all values

  for (let j = 1; j < args.length; j++) {
    value += args[j] / Math.pow(1 + rate, j)
  }

  // Return net present value
  return value
}

// TODO
export function ODDFPRICE() {
  throw new Error('ODDFPRICE is not implemented')
}

// TODO
export function ODDFYIELD() {
  throw new Error('ODDFYIELD is not implemented')
}

// TODO
export function ODDLPRICE() {
  throw new Error('ODDLPRICE is not implemented')
}

// TODO
export function ODDLYIELD() {
  throw new Error('ODDLYIELD is not implemented')
}

export function PDURATION(rate, present, future) {
  rate = utils.parseNumber(rate)
  present = utils.parseNumber(present)
  future = utils.parseNumber(future)

  if (utils.anyIsError(rate, present, future)) {
    return error.value
  }

  // Return error if rate <=0
  if (rate <= 0) {
    return error.num
  }

  // Return number of periods
  return (Math.log(future) - Math.log(present)) / Math.log(1 + rate)
}

export function PMT(rate, periods, present, future, type) {
  // Credits: algorithm inspired by Apache OpenOffice
  future = future || 0
  type = type || 0

  rate = utils.parseNumber(rate)
  periods = utils.parseNumber(periods)
  present = utils.parseNumber(present)
  future = utils.parseNumber(future)
  type = utils.parseNumber(type)

  if (utils.anyIsError(rate, periods, present, future, type)) {
    return error.value
  }

  // Return payment
  let result

  if (rate === 0) {
    result = (present + future) / periods
  } else {
    const term = Math.pow(1 + rate, periods)

    if (type === 1) {
      result = ((future * rate) / (term - 1) + (present * rate) / (1 - 1 / term)) / (1 + rate)
    } else {
      result = (future * rate) / (term - 1) + (present * rate) / (1 - 1 / term)
    }
  }

  return -result
}

export function PPMT(rate, period, periods, present, future, type) {
  future = future || 0
  type = type || 0

  rate = utils.parseNumber(rate)
  periods = utils.parseNumber(periods)
  present = utils.parseNumber(present)
  future = utils.parseNumber(future)
  type = utils.parseNumber(type)

  if (utils.anyIsError(rate, periods, present, future, type)) {
    return error.value
  }

  return PMT(rate, periods, present, future, type) - IPMT(rate, period, periods, present, future, type)
}

// TODO
export function PRICE() {
  throw new Error('PRICE is not implemented')
}

// TODO
export function PRICEDISC() {
  throw new Error('PRICEDISC is not implemented')
}

// TODO
export function PRICEMAT() {
  throw new Error('PRICEMAT is not implemented')
}

export function PV(rate, periods, payment, future, type) {
  future = future || 0
  type = type || 0

  rate = utils.parseNumber(rate)
  periods = utils.parseNumber(periods)
  payment = utils.parseNumber(payment)
  future = utils.parseNumber(future)
  type = utils.parseNumber(type)

  if (utils.anyIsError(rate, periods, payment, future, type)) {
    return error.value
  }

  // Return present value
  if (rate === 0) {
    return -payment * periods - future
  } else {
    return (
      (((1 - Math.pow(1 + rate, periods)) / rate) * payment * (1 + rate * type) - future) / Math.pow(1 + rate, periods)
    )
  }
}

export function RATE(periods, payment, present, future, type, guess) {
  guess = guess === undefined ? 0.01 : guess
  future = future === undefined ? 0 : future
  type = type === undefined ? 0 : type

  periods = utils.parseNumber(periods)
  payment = utils.parseNumber(payment)
  present = utils.parseNumber(present)
  future = utils.parseNumber(future)
  type = utils.parseNumber(type)
  guess = utils.parseNumber(guess)

  if (utils.anyIsError(periods, payment, present, future, type, guess)) {
    return error.value
  }

  const epsMax = 1e-10
  const iterMax = 20
  let rate = guess

  type = type ? 1 : 0

  for (let i = 0; i < iterMax; i++) {
    if (rate <= -1) {
      return error.num
    }

    let y, f

    if (Math.abs(rate) < epsMax) {
      y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future
    } else {
      f = Math.pow(1 + rate, periods)
      y = present * f + payment * (1 / rate + type) * (f - 1) + future
    }

    if (Math.abs(y) < epsMax) {
      return rate
    }

    let dy

    if (Math.abs(rate) < epsMax) {
      dy = present * periods + payment * type * periods
    } else {
      f = Math.pow(1 + rate, periods)
      const df = periods * Math.pow(1 + rate, periods - 1)
      dy = present * df + payment * (1 / rate + type) * df + payment * (-1 / (rate * rate)) * (f - 1)
    }

    rate -= y / dy
  }

  return rate
}

// TODO
export function RECEIVED() {
  throw new Error('RECEIVED is not implemented')
}

export function RRI(periods, present, future) {
  periods = utils.parseNumber(periods)
  present = utils.parseNumber(present)
  future = utils.parseNumber(future)

  if (utils.anyIsError(periods, present, future)) {
    return error.value
  }

  // Return error if periods or present is equal to 0 (zero)
  if (periods === 0 || present === 0) {
    return error.num
  }

  // Return equivalent interest rate
  return Math.pow(future / present, 1 / periods) - 1
}

export function SLN(cost, salvage, life) {
  cost = utils.parseNumber(cost)
  salvage = utils.parseNumber(salvage)
  life = utils.parseNumber(life)

  if (utils.anyIsError(cost, salvage, life)) {
    return error.value
  }

  // Return error if life equal to 0 (zero)
  if (life === 0) {
    return error.num
  }

  // Return straight-line depreciation
  return (cost - salvage) / life
}

export function SYD(cost, salvage, life, period) {
  // Return error if any of the parameters is not a number
  cost = utils.parseNumber(cost)
  salvage = utils.parseNumber(salvage)
  life = utils.parseNumber(life)
  period = utils.parseNumber(period)

  if (utils.anyIsError(cost, salvage, life, period)) {
    return error.value
  }

  // Return error if life equal to 0 (zero)
  if (life === 0) {
    return error.num
  }

  // Return error if period is lower than 1 or greater than life
  if (period < 1 || period > life) {
    return error.num
  }

  // Truncate period if it is not an integer
  period = parseInt(period, 10)

  // Return straight-line depreciation
  return ((cost - salvage) * (life - period + 1) * 2) / (life * (life + 1))
}

export function TBILLEQ(settlement, maturity, discount) {
  settlement = utils.parseDate(settlement)
  maturity = utils.parseDate(maturity)
  discount = utils.parseNumber(discount)

  if (utils.anyIsError(settlement, maturity, discount)) {
    return error.value
  }

  // Return error if discount is lower than or equal to zero
  if (discount <= 0) {
    return error.num
  }

  // Return error if settlement is greater than maturity
  if (settlement > maturity) {
    return error.num
  }

  // Return error if maturity is more than one year after settlement
  if (maturity - settlement > 365 * 24 * 60 * 60 * 1000) {
    return error.num
  }

  // Return bond-equivalent yield
  return (365 * discount) / (360 - discount * dateTime.DAYS360(settlement, maturity, false))
}

export function TBILLPRICE(settlement, maturity, discount) {
  settlement = utils.parseDate(settlement)
  maturity = utils.parseDate(maturity)
  discount = utils.parseNumber(discount)

  if (utils.anyIsError(settlement, maturity, discount)) {
    return error.value
  }

  // Return error if discount is lower than or equal to zero
  if (discount <= 0) {
    return error.num
  }

  // Return error if settlement is greater than maturity
  if (settlement > maturity) {
    return error.num
  }

  // Return error if maturity is more than one year after settlement
  if (maturity - settlement > 365 * 24 * 60 * 60 * 1000) {
    return error.num
  }

  // Return bond-equivalent yield
  return 100 * (1 - (discount * dateTime.DAYS360(settlement, maturity, false)) / 360)
}

export function TBILLYIELD(settlement, maturity, price) {
  settlement = utils.parseDate(settlement)
  maturity = utils.parseDate(maturity)
  price = utils.parseNumber(price)

  if (utils.anyIsError(settlement, maturity, price)) {
    return error.value
  }

  // Return error if price is lower than or equal to zero
  if (price <= 0) {
    return error.num
  }

  // Return error if settlement is greater than maturity
  if (settlement > maturity) {
    return error.num
  }

  // Return error if maturity is more than one year after settlement
  if (maturity - settlement > 365 * 24 * 60 * 60 * 1000) {
    return error.num
  }

  // Return bond-equivalent yield
  return ((100 - price) * 360) / (price * dateTime.DAYS360(settlement, maturity, false))
}

// TODO
export function VDB() {
  throw new Error('VDB is not implemented')
}

export function XIRR(values, dates, guess) {
  // Credits: algorithm inspired by Apache OpenOffice
  values = utils.parseNumberArray(utils.flatten(values))
  dates = utils.parseDateArray(utils.flatten(dates))
  guess = utils.parseNumber(guess)

  if (utils.anyIsError(values, dates, guess)) {
    return error.value
  }

  // Calculates the resulting amount
  const irrResult = (values, dates, rate) => {
    const r = rate + 1
    let result = values[0]

    for (let i = 1; i < values.length; i++) {
      result += values[i] / Math.pow(r, dateTime.DAYS(dates[i], dates[0]) / 365)
    }

    return result
  }

  // Calculates the first derivation
  const irrResultDeriv = (values, dates, rate) => {
    const r = rate + 1
    let result = 0

    for (let i = 1; i < values.length; i++) {
      const frac = dateTime.DAYS(dates[i], dates[0]) / 365
      result -= (frac * values[i]) / Math.pow(r, frac + 1)
    }

    return result
  }

  // Check that values contains at least one positive value and one negative value
  let positive = false
  let negative = false

  for (let i = 0; i < values.length; i++) {
    if (values[i] > 0) {
      positive = true
    }

    if (values[i] < 0) {
      negative = true
    }
  }

  // Return error if values does not contain at least one positive value and one negative value
  if (!positive || !negative) {
    return error.num
  }

  // Initialize guess and resultRate
  guess = guess || 0.1
  let resultRate = guess

  // Set maximum epsilon for end of iteration
  const epsMax = 1e-10

  // Implement Newton's method
  let newRate, epsRate, resultValue
  let contLoop = true

  do {
    resultValue = irrResult(values, dates, resultRate)
    newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate)
    epsRate = Math.abs(newRate - resultRate)
    resultRate = newRate
    contLoop = epsRate > epsMax && Math.abs(resultValue) > epsMax
  } while (contLoop)

  // Return internal rate of return
  return resultRate
}

export function XNPV(rate, values, dates) {
  rate = utils.parseNumber(rate)
  values = utils.parseNumberArray(utils.flatten(values))
  dates = utils.parseDateArray(utils.flatten(dates))

  if (utils.anyIsError(rate, values, dates)) {
    return error.value
  }

  let result = 0

  for (let i = 0; i < values.length; i++) {
    result += values[i] / Math.pow(1 + rate, dateTime.DAYS(dates[i], dates[0]) / 365)
  }

  return result
}

// TODO
export function YIELD() {
  throw new Error('YIELD is not implemented')
}

// TODO
export function YIELDDISC() {
  throw new Error('YIELDDISC is not implemented')
}

// TODO
export function YIELDMAT() {
  throw new Error('YIELDMAT is not implemented')
}
