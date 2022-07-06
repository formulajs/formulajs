import * as error from './utils/error.js'
import * as dateTime from './date-time.js'
import * as utils from './utils/common.js'

function validDate(d) {
  return d && d.getTime && !isNaN(d.getTime())
}

function ensureDate(d) {
  return d instanceof Date ? d : new Date(d)
}

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
export function ACCRINT(issue, first_interest, settlement, rate, par, frequency, basis) {
  // Return error if either date is invalid
  issue = ensureDate(issue)
  first_interest = ensureDate(first_interest)
  settlement = ensureDate(settlement)

  if (!validDate(issue) || !validDate(first_interest) || !validDate(settlement)) {
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
export function ACCRINTM() {
  throw new Error('ACCRINTM is not implemented')
}

// TODO
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
export function AMORDEGRC() {
  throw new Error('AMORDEGRC is not implemented')
}

// TODO
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
export function AMORLINC() {
  throw new Error('AMORLINC is not implemented')
}

// TODO
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
export function COUPDAYBS() {
  throw new Error('COUPDAYBS is not implemented')
}

// TODO
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
export function COUPDAYS() {
  throw new Error('COUPDAYS is not implemented')
}

// TODO
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
export function COUPDAYSNC() {
  throw new Error('COUPDAYSNC is not implemented')
}

// TODO
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
export function COUPNCD() {
  throw new Error('COUPNCD is not implemented')
}

// TODO
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
export function COUPNUM() {
  throw new Error('COUPNUM is not implemented')
}

// TODO
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
export function COUPPCD() {
  throw new Error('COUPPCD is not implemented')
}

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
export function CUMIPMT(rate, nper, pv, start_period, end_period, type) {
  rate = utils.parseNumber(rate)
  nper = utils.parseNumber(nper)
  pv = utils.parseNumber(pv)

  if (utils.anyIsError(rate, nper, pv)) {
    return error.value
  }

  if (rate <= 0 || nper <= 0 || pv <= 0) {
    return error.num
  }

  if (start_period < 1 || end_period < 1 || start_period > end_period) {
    return error.num
  }

  if (type !== 0 && type !== 1) {
    return error.num
  }

  const payment = PMT(rate, nper, pv, 0, type)
  let interest = 0

  if (start_period === 1) {
    if (type === 0) {
      interest = -pv
    }

    start_period++
  }

  for (let i = start_period; i <= end_period; i++) {
    interest += type === 1 ? FV(rate, i - 2, payment, pv, 1) - payment : FV(rate, i - 1, payment, pv, 0)
  }

  interest *= rate

  return interest
}

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
export function CUMPRINC(rate, nper, pv, start_period, end, type) {
  // Credits: algorithm inspired by Apache OpenOffice
  // Credits: Hannes Stiebitzhofer for the translations of function and variable names
  rate = utils.parseNumber(rate)
  nper = utils.parseNumber(nper)
  pv = utils.parseNumber(pv)

  if (utils.anyIsError(rate, nper, pv)) {
    return error.value
  }

  // Return error if either rate, nper, or value are lower than or equal to zero
  if (rate <= 0 || nper <= 0 || pv <= 0) {
    return error.num
  }

  // Return error if start < 1, end < 1, or start > end
  if (start_period < 1 || end < 1 || start_period > end) {
    return error.num
  }

  // Return error if type is neither 0 nor 1
  if (type !== 0 && type !== 1) {
    return error.num
  }

  // Compute cumulative principal
  const payment = PMT(rate, nper, pv, 0, type)
  let principal = 0

  if (start_period === 1) {
    principal = type === 0 ? payment + pv * rate : payment

    start_period++
  }

  for (let i = start_period; i <= end; i++) {
    principal +=
      type > 0
        ? payment - (FV(rate, i - 2, payment, pv, 1) - payment) * rate
        : payment - FV(rate, i - 1, payment, pv, 0) * rate
  }

  // Return cumulative principal
  return principal
}

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
export function DISC() {
  throw new Error('DISC is not implemented')
}

/**
 * Converts a dollar price, expressed as a fraction, into a dollar price, expressed as a decimal number.
 *
 * Category: Financial
 *
 * @param {*} fractional_dollar A number expressed as an integer part and a fraction part, separated by a decimal symbol.
 * @param {*} fraction The integer to use in the denominator of the fraction.
 * @returns
 */
export function DOLLARDE(fractional_dollar, fraction) {
  // Credits: algorithm inspired by Apache OpenOffice
  fractional_dollar = utils.parseNumber(fractional_dollar)
  fraction = utils.parseNumber(fraction)

  if (utils.anyIsError(fractional_dollar, fraction)) {
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
  let result = parseInt(fractional_dollar, 10)

  // Add decimal part
  result += ((fractional_dollar % 1) * Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN10))) / fraction

  // Round result
  const power = Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN2) + 1)
  result = Math.round(result * power) / power

  // Return converted dollar price
  return result
}

/**
 * Converts a dollar price, expressed as a decimal number, into a dollar price, expressed as a fraction.
 *
 * Category: Financial
 *
 * @param {*} decimal_dollar A decimal number.
 * @param {*} fraction The integer to use in the denominator of a fraction.
 * @returns
 */
export function DOLLARFR(decimal_dollar, fraction) {
  // Credits: algorithm inspired by Apache OpenOffice
  decimal_dollar = utils.parseNumber(decimal_dollar)
  fraction = utils.parseNumber(fraction)

  if (utils.anyIsError(decimal_dollar, fraction)) {
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
  let result = parseInt(decimal_dollar, 10)

  // Add decimal part
  result += (decimal_dollar % 1) * Math.pow(10, -Math.ceil(Math.log(fraction) / Math.LN10)) * fraction

  // Return converted dollar price
  return result
}

// TODO
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
export function DURATION() {
  throw new Error('DURATION is not implemented')
}

/**
 * Returns the effective annual interest rate.
 *
 * Category: Financial
 *
 * @param {*} nominal_rate The nominal interest rate.
 * @param {*} npery The number of compounding periods per year.
 * @returns
 */
export function EFFECT(nominal_rate, npery) {
  nominal_rate = utils.parseNumber(nominal_rate)
  npery = utils.parseNumber(npery)

  if (utils.anyIsError(nominal_rate, npery)) {
    return error.value
  }

  // Return error if rate <=0 or periods < 1
  if (nominal_rate <= 0 || npery < 1) {
    return error.num
  }

  // Truncate periods if it is not an integer
  npery = parseInt(npery, 10)

  // Return effective annual interest rate
  return Math.pow(1 + nominal_rate / npery, npery) - 1
}

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
export function FV(rate, nper, payment, value, type) {
  // Credits: algorithm inspired by Apache OpenOffice
  value = value || 0
  type = type || 0

  rate = utils.parseNumber(rate)
  nper = utils.parseNumber(nper)
  payment = utils.parseNumber(payment)
  value = utils.parseNumber(value)
  type = utils.parseNumber(type)

  if (utils.anyIsError(rate, nper, payment, value, type)) {
    return error.value
  }

  // Return future value
  let result

  if (rate === 0) {
    result = value + payment * nper
  } else {
    const term = Math.pow(1 + rate, nper)

    result =
      type === 1
        ? value * term + (payment * (1 + rate) * (term - 1)) / rate
        : value * term + (payment * (term - 1)) / rate
  }

  return -result
}

/**
 * Returns the future value of an initial principal after applying a series of compound interest rates.
 *
 * Category: Financial
 *
 * @param {*} principal The present value.
 * @param {*} schedule An array of interest rates to apply.
 * @returns
 */
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
export function INTRATE() {
  throw new Error('INTRATE is not implemented')
}

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
export function IPMT(rate, per, nper, pv, fv, type) {
  // Credits: algorithm inspired by Apache OpenOffice
  fv = fv || 0
  type = type || 0

  rate = utils.parseNumber(rate)
  per = utils.parseNumber(per)
  nper = utils.parseNumber(nper)
  pv = utils.parseNumber(pv)
  fv = utils.parseNumber(fv)
  type = utils.parseNumber(type)

  if (utils.anyIsError(rate, per, nper, pv, fv, type)) {
    return error.value
  }

  // Compute payment
  const payment = PMT(rate, nper, pv, fv, type)

  // Compute interest
  let interest =
    per === 1
      ? type === 1
        ? 0
        : -pv
      : type === 1
      ? FV(rate, per - 2, payment, pv, 1) - payment
      : FV(rate, per - 1, payment, pv, 0)

  // Return interest
  return interest * rate
}

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
export function ISPMT(rate, per, nper, pv) {
  rate = utils.parseNumber(rate)
  per = utils.parseNumber(per)
  nper = utils.parseNumber(nper)
  pv = utils.parseNumber(pv)

  if (utils.anyIsError(rate, per, nper, pv)) {
    return error.value
  }

  // Return interest
  return pv * rate * (per / nper - 1)
}

// TODO
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
export function MDURATION() {
  throw new Error('MDURATION is not implemented')
}

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

/**
 * Returns the annual nominal interest rate.
 *
 * Category: Financial
 *
 * @param {*} effect_rate The effective interest rate.
 * @param {*} npery The number of compounding periods per year.
 * @returns
 */
export function NOMINAL(effect_rate, npery) {
  effect_rate = utils.parseNumber(effect_rate)
  npery = utils.parseNumber(npery)

  if (utils.anyIsError(effect_rate, npery)) {
    return error.value
  }

  // Return error if rate <=0 or periods < 1
  if (effect_rate <= 0 || npery < 1) {
    return error.num
  }

  // Truncate periods if it is not an integer
  npery = parseInt(npery, 10)

  // Return nominal annual interest rate
  return (Math.pow(effect_rate + 1, 1 / npery) - 1) * npery
}

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
export function NPER(rate, pmt, pv, fv, type) {
  type = type === undefined ? 0 : type
  fv = fv === undefined ? 0 : fv

  rate = utils.parseNumber(rate)
  pmt = utils.parseNumber(pmt)
  pv = utils.parseNumber(pv)
  fv = utils.parseNumber(fv)
  type = utils.parseNumber(type)

  if (utils.anyIsError(rate, pmt, pv, fv, type)) {
    return error.value
  }

  if (rate === 0) {
    return -(pv + fv) / pmt
  } else {
    const num = pmt * (1 + rate * type) - fv * rate
    const den = pv * rate + pmt * (1 + rate * type)

    return Math.log(num / den) / Math.log(1 + rate)
  }
}

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
export function ODDFPRICE() {
  throw new Error('ODDFPRICE is not implemented')
}

// TODO
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
export function ODDFYIELD() {
  throw new Error('ODDFYIELD is not implemented')
}

// TODO
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
export function ODDLPRICE() {
  throw new Error('ODDLPRICE is not implemented')
}

// TODO
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
export function ODDLYIELD() {
  throw new Error('ODDLYIELD is not implemented')
}

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
export function PDURATION(rate, pv, fv) {
  rate = utils.parseNumber(rate)
  pv = utils.parseNumber(pv)
  fv = utils.parseNumber(fv)

  if (utils.anyIsError(rate, pv, fv)) {
    return error.value
  }

  // Return error if rate <=0
  if (rate <= 0) {
    return error.num
  }

  // Return number of periods
  return (Math.log(fv) - Math.log(pv)) / Math.log(1 + rate)
}

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
export function PMT(rate, nper, pv, fv, type) {
  // Credits: algorithm inspired by Apache OpenOffice
  fv = fv || 0
  type = type || 0

  rate = utils.parseNumber(rate)
  nper = utils.parseNumber(nper)
  pv = utils.parseNumber(pv)
  fv = utils.parseNumber(fv)
  type = utils.parseNumber(type)

  if (utils.anyIsError(rate, nper, pv, fv, type)) {
    return error.value
  }

  // Return payment
  let result

  if (rate === 0) {
    result = (pv + fv) / nper
  } else {
    const term = Math.pow(1 + rate, nper)

    result =
      type === 1
        ? ((fv * rate) / (term - 1) + (pv * rate) / (1 - 1 / term)) / (1 + rate)
        : (fv * rate) / (term - 1) + (pv * rate) / (1 - 1 / term)
  }

  return -result
}

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
export function PPMT(rate, per, nper, pv, fv, type) {
  fv = fv || 0
  type = type || 0

  rate = utils.parseNumber(rate)
  nper = utils.parseNumber(nper)
  pv = utils.parseNumber(pv)
  fv = utils.parseNumber(fv)
  type = utils.parseNumber(type)

  if (utils.anyIsError(rate, nper, pv, fv, type)) {
    return error.value
  }

  return PMT(rate, nper, pv, fv, type) - IPMT(rate, per, nper, pv, fv, type)
}

// TODO
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
export function PRICE() {
  throw new Error('PRICE is not implemented')
}

// TODO
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
export function PRICEDISC() {
  throw new Error('PRICEDISC is not implemented')
}

// TODO
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
export function PRICEMAT() {
  throw new Error('PRICEMAT is not implemented')
}

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
export function PV(rate, per, pmt, fv, type) {
  fv = fv || 0
  type = type || 0

  rate = utils.parseNumber(rate)
  per = utils.parseNumber(per)
  pmt = utils.parseNumber(pmt)
  fv = utils.parseNumber(fv)
  type = utils.parseNumber(type)

  if (utils.anyIsError(rate, per, pmt, fv, type)) {
    return error.value
  }

  // Return present value
  return rate === 0
    ? -pmt * per - fv
    : (((1 - Math.pow(1 + rate, per)) / rate) * pmt * (1 + rate * type) - fv) / Math.pow(1 + rate, per)
}

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
export function RATE(nper, pmt, pv, fv, type, guess) {
  guess = guess === undefined ? 0.01 : guess
  fv = fv === undefined ? 0 : fv
  type = type === undefined ? 0 : type

  nper = utils.parseNumber(nper)
  pmt = utils.parseNumber(pmt)
  pv = utils.parseNumber(pv)
  fv = utils.parseNumber(fv)
  type = utils.parseNumber(type)
  guess = utils.parseNumber(guess)

  if (utils.anyIsError(nper, pmt, pv, fv, type, guess)) {
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
      y = pv * (1 + nper * rate) + pmt * (1 + rate * type) * nper + fv
    } else {
      f = Math.pow(1 + rate, nper)
      y = pv * f + pmt * (1 / rate + type) * (f - 1) + fv
    }

    if (Math.abs(y) < epsMax) {
      return rate
    }

    let dy

    if (Math.abs(rate) < epsMax) {
      dy = pv * nper + pmt * type * nper
    } else {
      f = Math.pow(1 + rate, nper)
      const df = nper * Math.pow(1 + rate, nper - 1)
      dy = pv * df + pmt * (1 / rate + type) * df + pmt * (-1 / (rate * rate)) * (f - 1)
    }

    rate -= y / dy
  }

  return rate
}

// TODO
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
export function RECEIVED() {
  throw new Error('RECEIVED is not implemented')
}

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
export function RRI(nper, pv, fv) {
  nper = utils.parseNumber(nper)
  pv = utils.parseNumber(pv)
  fv = utils.parseNumber(fv)

  if (utils.anyIsError(nper, pv, fv)) {
    return error.value
  }

  // Return error if nper or present is equal to 0 (zero)
  if (nper === 0 || pv === 0) {
    return error.num
  }

  // Return equivalent interest rate
  return Math.pow(fv / pv, 1 / nper) - 1
}

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
export function SYD(cost, salvage, life, per) {
  // Return error if any of the parameters is not a number
  cost = utils.parseNumber(cost)
  salvage = utils.parseNumber(salvage)
  life = utils.parseNumber(life)
  per = utils.parseNumber(per)

  if (utils.anyIsError(cost, salvage, life, per)) {
    return error.value
  }

  // Return error if life equal to 0 (zero)
  if (life === 0) {
    return error.num
  }

  // Return error if period is lower than 1 or greater than life
  if (per < 1 || per > life) {
    return error.num
  }

  // Truncate period if it is not an integer
  per = parseInt(per, 10)

  // Return straight-line depreciation
  return ((cost - salvage) * (life - per + 1) * 2) / (life * (life + 1))
}

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
export function TBILLYIELD(settlement, maturity, pr) {
  settlement = utils.parseDate(settlement)
  maturity = utils.parseDate(maturity)
  pr = utils.parseNumber(pr)

  if (utils.anyIsError(settlement, maturity, pr)) {
    return error.value
  }

  // Return error if price is lower than or equal to zero
  if (pr <= 0) {
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
  return ((100 - pr) * 360) / (pr * dateTime.DAYS360(settlement, maturity, false))
}

// TODO
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
export function VDB() {
  throw new Error('VDB is not implemented')
}

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
export function YIELD() {
  throw new Error('YIELD is not implemented')
}

// TODO
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
export function YIELDDISC() {
  throw new Error('YIELDDISC is not implemented')
}

// TODO
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
export function YIELDMAT() {
  throw new Error('YIELDMAT is not implemented')
}
