import * as error from './utils/error.js'
import * as utils from './utils/common.js'

const d1900 = new Date(Date.UTC(1900, 0, 1))
const WEEK_STARTS = [
  undefined,
  0,
  1,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  1,
  2,
  3,
  4,
  5,
  6,
  0
]
const WEEK_TYPES = [
  [],
  [1, 2, 3, 4, 5, 6, 7],
  [7, 1, 2, 3, 4, 5, 6],
  [6, 0, 1, 2, 3, 4, 5],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [7, 1, 2, 3, 4, 5, 6],
  [6, 7, 1, 2, 3, 4, 5],
  [5, 6, 7, 1, 2, 3, 4],
  [4, 5, 6, 7, 1, 2, 3],
  [3, 4, 5, 6, 7, 1, 2],
  [2, 3, 4, 5, 6, 7, 1],
  [1, 2, 3, 4, 5, 6, 7]
]
const WEEKEND_TYPES = [
  [],
  [6, 0],
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  undefined,
  undefined,
  undefined,
  [0, 0],
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [5, 5],
  [6, 6]
]

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
export function DATE(year, month, day) {
  let result

  year = utils.parseNumber(year)
  month = utils.parseNumber(month)
  day = utils.parseNumber(day)

  if (utils.anyIsError(year, month, day)) {
    result = error.value
  } else {
    result = new Date(year, month - 1, day)

    if (result.getFullYear() < 0) {
      result = error.num
    }
  }

  return result
}

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
export function DATEDIF(start_date, end_date, unit) {
  unit = unit.toUpperCase()
  start_date = utils.parseDate(start_date)
  end_date = utils.parseDate(end_date)

  const start_date_year = start_date.getFullYear()
  const start_date_month = start_date.getMonth()
  const start_date_day = start_date.getDate()
  const end_date_year = end_date.getFullYear()
  const end_date_month = end_date.getMonth()
  const end_date_day = end_date.getDate()

  let result

  switch (unit) {
    case 'Y':
      result = Math.floor(YEARFRAC(start_date, end_date))
      break
    case 'D':
      result = DAYS(end_date, start_date)
      break
    case 'M':
      result = end_date_month - start_date_month + 12 * (end_date_year - start_date_year)

      if (end_date_day < start_date_day) {
        result--
      }

      break
    case 'MD':
      if (start_date_day <= end_date_day) {
        result = end_date_day - start_date_day
      } else {
        if (end_date_month === 0) {
          start_date.setFullYear(end_date_year - 1)
          start_date.setMonth(12)
        } else {
          start_date.setFullYear(end_date_year)
          start_date.setMonth(end_date_month - 1)
        }

        result = DAYS(end_date, start_date)
      }

      break
    case 'YM':
      result = end_date_month - start_date_month + 12 * (end_date_year - start_date_year)

      if (end_date_day < start_date_day) {
        result--
      }

      result = result % 12
      break
    case 'YD':
      if (end_date_month > start_date_month || (end_date_month === start_date_month && end_date_day < start_date_day)) {
        start_date.setFullYear(end_date_year)
      } else {
        start_date.setFullYear(end_date_year - 1)
      }

      result = DAYS(end_date, start_date)
      break
  }

  return result
}

/**
 * Converts a date in the form of text to a serial number.
 *
 * Category: Date and time
 *
 * @param {*} date_text Text that represents a date in an Excel date format, or a reference to a value that contains text that represents a date in an Excel date format.
 * @returns
 */
export function DATEVALUE(date_text) {
  if (typeof date_text !== 'string') {
    return error.value
  }

  const date = Date.parse(date_text)

  if (isNaN(date)) {
    return error.value
  }

  return new Date(date_text)
}

/**
 * Converts a serial number to a day of the month.
 *
 * Category: Date and time
 *
 * @param {*} serial_number The date of the day you are trying to find.
 * @returns
 */
export function DAY(serial_number) {
  const date = utils.parseDate(serial_number)

  if (date instanceof Error) {
    return date
  }

  return date.getDate()
}

function startOfDay(date) {
  const newDate = new Date(date)
  newDate.setHours(0, 0, 0, 0)

  return newDate
}

/**
 * Returns the number of days between two dates.
 *
 * Category: Date and time
 *
 * @param {*} end_date Start_date and End_date are the two dates between which you want to know the number of days.
 * @param {*} start_date Start_date and End_date are the two dates between which you want to know the number of days.
 * @returns
 */
export function DAYS(end_date, start_date) {
  end_date = utils.parseDate(end_date)
  start_date = utils.parseDate(start_date)

  if (end_date instanceof Error) {
    return end_date
  }

  if (start_date instanceof Error) {
    return start_date
  }

  return serial(startOfDay(end_date)) - serial(startOfDay(start_date))
}

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
export function DAYS360(start_date, end_date, method) {
  method = utils.parseBool(method || 'false')
  start_date = utils.parseDate(start_date)
  end_date = utils.parseDate(end_date)

  if (start_date instanceof Error) {
    return start_date
  }

  if (end_date instanceof Error) {
    return end_date
  }

  if (method instanceof Error) {
    return method
  }

  const sm = start_date.getMonth()
  let em = end_date.getMonth()
  let sd, ed

  if (method) {
    sd = start_date.getDate() === 31 ? 30 : start_date.getDate()
    ed = end_date.getDate() === 31 ? 30 : end_date.getDate()
  } else {
    const smd = new Date(start_date.getFullYear(), sm + 1, 0).getDate()
    const emd = new Date(end_date.getFullYear(), em + 1, 0).getDate()
    sd = start_date.getDate() === smd ? 30 : start_date.getDate()

    if (end_date.getDate() === emd) {
      if (sd < 30) {
        em++
        ed = 1
      } else {
        ed = 30
      }
    } else {
      ed = end_date.getDate()
    }
  }

  return 360 * (end_date.getFullYear() - start_date.getFullYear()) + 30 * (em - sm) + (ed - sd)
}

/**
 * Returns the serial number of the date that is the indicated number of months before or after the start date.
 *
 * Category: Date and time
 *
 * @param {*} start_date A date that represents the start date.
 * @param {*} months The number of months before or after start_date. A positive value for months yields a future date; a negative value yields a past date.
 * @returns
 */
export function EDATE(start_date, months) {
  start_date = utils.parseDate(start_date)

  if (start_date instanceof Error) {
    return start_date
  }

  if (isNaN(months)) {
    return error.value
  }

  months = parseInt(months, 10)
  start_date.setMonth(start_date.getMonth() + months)

  return start_date
}

/**
 * Returns the serial number of the last day of the month before or after a specified number of months.
 *
 * Category: Date and time
 *
 * @param {*} start_date A date that represents the starting date.
 * @param {*} months The number of months before or after start_date. A positive value for months yields a future date; a negative value yields a past date.
 * @returns
 */
export function EOMONTH(start_date, months) {
  start_date = utils.parseDate(start_date)

  if (start_date instanceof Error) {
    return start_date
  }

  if (isNaN(months)) {
    return error.value
  }

  months = parseInt(months, 10)

  return new Date(start_date.getFullYear(), start_date.getMonth() + months + 1, 0)
}

/**
 * Converts a serial number to an hour.
 *
 * Category: Date and time
 *
 * @param {*} serial_number The time that contains the hour you want to find. Times may be entered as text strings within quotation marks (for example, "6:45 PM"), as decimal numbers (for example, 0.78125, which represents 6:45 PM), or as results of other formulas or functions (for example, TIMEVALUE("6:45 PM")).
 * @returns
 */
export function HOUR(serial_number) {
  serial_number = utils.parseDate(serial_number)

  if (serial_number instanceof Error) {
    return serial_number
  }

  return serial_number.getHours()
}

/**
 * Formula.js only
 *
 * @param {*} second
 * @returns
 */
export function INTERVAL(second) {
  if (typeof second !== 'number' && typeof second !== 'string') {
    return error.value
  } else {
    second = parseInt(second, 10)
  }

  let year = Math.floor(second / 946080000)
  second = second % 946080000
  let month = Math.floor(second / 2592000)
  second = second % 2592000
  let day = Math.floor(second / 86400)
  second = second % 86400

  let hour = Math.floor(second / 3600)
  second = second % 3600
  let min = Math.floor(second / 60)
  second = second % 60
  let sec = second

  year = year > 0 ? year + 'Y' : ''
  month = month > 0 ? month + 'M' : ''
  day = day > 0 ? day + 'D' : ''
  hour = hour > 0 ? hour + 'H' : ''
  min = min > 0 ? min + 'M' : ''
  sec = sec > 0 ? sec + 'S' : ''

  return 'P' + year + month + day + 'T' + hour + min + sec
}

/**
 * Returns the number of the ISO week number of the year for a given date.
 *
 * Category: Date and time
 *
 * @param {*} date Date is the date-time code used by Excel for date and time calculation.
 * @returns
 */
export function ISOWEEKNUM(date) {
  date = utils.parseDate(date)

  if (date instanceof Error) {
    return date
  }

  date = startOfDay(date)
  date.setDate(date.getDate() + 4 - (date.getDay() || 7))
  const yearStart = new Date(date.getFullYear(), 0, 1)

  return Math.ceil(((date - yearStart) / 86400000 + 1) / 7)
}

/**
 * Converts a serial number to a minute.
 *
 * Category: Date and time
 *
 * @param {*} serial_number The time that contains the minute you want to find. Times may be entered as text strings within quotation marks (for example, "6:45 PM"), as decimal numbers (for example, 0.78125, which represents 6:45 PM), or as results of other formulas or functions (for example, TIMEVALUE("6:45 PM")).
 * @returns
 */
export function MINUTE(serial_number) {
  serial_number = utils.parseDate(serial_number)

  if (serial_number instanceof Error) {
    return serial_number
  }

  return serial_number.getMinutes()
}

/**
 * Converts a serial number to a month.
 *
 * Category: Date and time
 *
 * @param {*} serial_number The date of the month you are trying to find.
 * @returns
 */
export function MONTH(serial_number) {
  serial_number = utils.parseDate(serial_number)

  if (serial_number instanceof Error) {
    return serial_number
  }

  return serial_number.getMonth() + 1
}

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
export function NETWORKDAYS(start_date, end_date, holidays) {
  return NETWORKDAYS.INTL(start_date, end_date, 1, holidays)
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
NETWORKDAYS.INTL = (start_date, end_date, weekend, holidays) => {
  start_date = utils.parseDate(start_date)

  if (start_date instanceof Error) {
    return start_date
  }

  end_date = utils.parseDate(end_date)

  if (end_date instanceof Error) {
    return end_date
  }

  let isMask = false
  const maskDays = []
  const maskIndex = [1, 2, 3, 4, 5, 6, 0]
  const maskRegex = new RegExp('^[0|1]{7}$')

  if (weekend === undefined) {
    weekend = WEEKEND_TYPES[1]
  } else if (typeof weekend === 'string' && maskRegex.test(weekend)) {
    isMask = true
    weekend = weekend.split('')

    for (let i = 0; i < weekend.length; i++) {
      if (weekend[i] === '1') {
        maskDays.push(maskIndex[i])
      }
    }
  } else {
    weekend = WEEKEND_TYPES[weekend]
  }

  if (!(weekend instanceof Array)) {
    return error.value
  }

  if (holidays === undefined) {
    holidays = []
  } else if (!(holidays instanceof Array)) {
    holidays = [holidays]
  }

  for (let i = 0; i < holidays.length; i++) {
    const h = utils.parseDate(holidays[i])

    if (h instanceof Error) {
      return h
    }

    holidays[i] = h
  }

  const days = Math.round((end_date - start_date) / (1000 * 60 * 60 * 24)) + 1
  let total = days
  const day = start_date

  for (let i = 0; i < days; i++) {
    const d = new Date().getTimezoneOffset() > 0 ? day.getUTCDay() : day.getDay()
    let dec = isMask ? maskDays.includes(d) : d === weekend[0] || d === weekend[1]

    for (let j = 0; j < holidays.length; j++) {
      const holiday = holidays[j]

      if (
        holiday.getDate() === day.getDate() &&
        holiday.getMonth() === day.getMonth() &&
        holiday.getFullYear() === day.getFullYear()
      ) {
        dec = true
        break
      }
    }

    if (dec) {
      total--
    }

    day.setDate(day.getDate() + 1)
  }

  return total
}

/**
 * Returns the serial number of the current date and time.
 *
 * Category: Date and time
 *
 * @returns
 */
export function NOW() {
  return new Date()
}

/**
 * Converts a serial number to a second.
 *
 * Category: Date and time
 *
 * @param {*} serial_number The time that contains the seconds you want to find. Times may be entered as text strings within quotation marks (for example, "6:45 PM"), as decimal numbers (for example, 0.78125, which represents 6:45 PM), or as results of other formulas or functions (for example, TIMEVALUE("6:45 PM")).
 * @returns
 */
export function SECOND(serial_number) {
  serial_number = utils.parseDate(serial_number)

  if (serial_number instanceof Error) {
    return serial_number
  }

  return serial_number.getSeconds()
}

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
export function TIME(hour, minute, second) {
  hour = utils.parseNumber(hour)
  minute = utils.parseNumber(minute)
  second = utils.parseNumber(second)

  if (utils.anyIsError(hour, minute, second)) {
    return error.value
  }

  if (hour < 0 || minute < 0 || second < 0) {
    return error.num
  }

  return (3600 * hour + 60 * minute + second) / 86400
}

/**
 * Converts a time in the form of text to a serial number.
 *
 * Category: Date and time
 *
 * @param {*} time_text A text string that represents a time in any one of the Microsoft Excel time formats; for example, "6:45 PM" and "18:45" text strings within quotation marks that represent time.
 * @returns
 */
export function TIMEVALUE(time_text) {
  time_text = utils.parseDate(time_text)

  if (time_text instanceof Error) {
    return time_text
  }

  return (3600 * time_text.getHours() + 60 * time_text.getMinutes() + time_text.getSeconds()) / 86400
}

/**
 * Returns the serial number of today's date.
 *
 * Category: Date and time
 *
 * @returns
 */
export function TODAY() {
  return startOfDay(new Date())
}

/**
 * Converts a serial number to a day of the week.
 *
 * Category: Date and time
 *
 * @param {*} serial_number A sequential number that represents the date of the day you are trying to find.
 * @param {*} return_type Optional. A number that determines the type of return value.
 * @returns
 */
export function WEEKDAY(serial_number, return_type) {
  serial_number = utils.parseDate(serial_number)

  if (serial_number instanceof Error) {
    return serial_number
  }

  if (return_type === undefined) {
    return_type = 1
  }

  const day = serial_number.getDay()

  return WEEK_TYPES[return_type][day]
}

/**
 * Converts a serial number to a number representing where the week falls numerically with a year.
 *
 * Category: Date and time
 *
 * @param {*} serial_number A date within the week.
 * @param {*} return_type Optional. A number that determines on which day the week begins. The default is 1.
 * @returns
 */
export function WEEKNUM(serial_number, return_type) {
  serial_number = utils.parseDate(serial_number)

  if (serial_number instanceof Error) {
    return serial_number
  }

  if (return_type === undefined) {
    return_type = 1
  }

  if (return_type === 21) {
    return ISOWEEKNUM(serial_number)
  }

  const week_start = WEEK_STARTS[return_type]
  let jan = new Date(serial_number.getFullYear(), 0, 1)
  const inc = jan.getDay() < week_start ? 1 : 0
  jan -= Math.abs(jan.getDay() - week_start) * 24 * 60 * 60 * 1000

  return Math.floor((serial_number - jan) / (1000 * 60 * 60 * 24) / 7 + 1) + inc
}

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
export function WORKDAY(start_date, days, holidays) {
  return WORKDAY.INTL(start_date, days, 1, holidays)
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
WORKDAY.INTL = (start_date, days, weekend, holidays) => {
  start_date = utils.parseDate(start_date)

  if (start_date instanceof Error) {
    return start_date
  }

  days = utils.parseNumber(days)

  if (days instanceof Error) {
    return days
  }

  if (days < 0) {
    return error.num
  }

  if (weekend === undefined) {
    weekend = WEEKEND_TYPES[1]
  } else {
    weekend = WEEKEND_TYPES[weekend]
  }

  if (!(weekend instanceof Array)) {
    return error.value
  }

  if (holidays === undefined) {
    holidays = []
  } else if (!(holidays instanceof Array)) {
    holidays = [holidays]
  }

  for (let i = 0; i < holidays.length; i++) {
    const h = utils.parseDate(holidays[i])

    if (h instanceof Error) {
      return h
    }

    holidays[i] = h
  }

  let d = 0

  while (d < days) {
    start_date.setDate(start_date.getDate() + 1)
    const day = start_date.getDay()

    if (day === weekend[0] || day === weekend[1]) {
      continue
    }

    for (let j = 0; j < holidays.length; j++) {
      const holiday = holidays[j]

      if (
        holiday.getDate() === start_date.getDate() &&
        holiday.getMonth() === start_date.getMonth() &&
        holiday.getFullYear() === start_date.getFullYear()
      ) {
        d--
        break
      }
    }

    d++
  }

  return start_date
}

/**
 * Converts a serial number to a year.
 *
 * Category: Date and time
 *
 * @param {*} serial_number The date of the year you want to find.
 * @returns
 */
export function YEAR(serial_number) {
  serial_number = utils.parseDate(serial_number)

  if (serial_number instanceof Error) {
    return serial_number
  }

  return serial_number.getFullYear()
}

function isLeapYear(year) {
  return new Date(year, 1, 29).getMonth() === 1
}

// TODO : Use DAYS ?
function daysBetween(start_date, end_date) {
  return Math.ceil((end_date - start_date) / 1000 / 60 / 60 / 24)
}

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
export function YEARFRAC(start_date, end_date, basis) {
  start_date = utils.parseDate(start_date)

  if (start_date instanceof Error) {
    return start_date
  }

  end_date = utils.parseDate(end_date)

  if (end_date instanceof Error) {
    return end_date
  }

  basis = basis || 0
  let sd = start_date.getDate()
  const sm = start_date.getMonth() + 1
  const sy = start_date.getFullYear()
  let ed = end_date.getDate()
  const em = end_date.getMonth() + 1
  const ey = end_date.getFullYear()

  switch (basis) {
    case 0:
      // US (NASD) 30/360
      if (sd === 31 && ed === 31) {
        sd = 30
        ed = 30
      } else if (sd === 31) {
        sd = 30
      } else if (sd === 30 && ed === 31) {
        ed = 30
      }

      return (ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360)) / 360
    case 1: {
      // Actual/actual
      const feb29Between = (date1, date2) => {
        const year1 = date1.getFullYear()
        const mar1year1 = new Date(year1, 2, 1)

        if (isLeapYear(year1) && date1 < mar1year1 && date2 >= mar1year1) {
          return true
        }

        const year2 = date2.getFullYear()
        const mar1year2 = new Date(year2, 2, 1)

        return isLeapYear(year2) && date2 >= mar1year2 && date1 < mar1year2
      }

      let ylength = 365

      if (sy === ey || (sy + 1 === ey && (sm > em || (sm === em && sd >= ed)))) {
        if ((sy === ey && isLeapYear(sy)) || feb29Between(start_date, end_date) || (em === 1 && ed === 29)) {
          ylength = 366
        }

        return daysBetween(start_date, end_date) / ylength
      }

      const years = ey - sy + 1
      const days = (new Date(ey + 1, 0, 1) - new Date(sy, 0, 1)) / 1000 / 60 / 60 / 24
      const average = days / years

      return daysBetween(start_date, end_date) / average
    }

    case 2:
      // Actual/360

      return daysBetween(start_date, end_date) / 360
    case 3:
      // Actual/365

      return daysBetween(start_date, end_date) / 365
    case 4:
      // European 30/360

      return (ed + em * 30 + ey * 360 - (sd + sm * 30 + sy * 360)) / 360
  }
}

function serial(date) {
  const addOn = date > -2203891200000 ? 2 : 1

  return Math.ceil((date - d1900) / 86400000) + addOn
}
