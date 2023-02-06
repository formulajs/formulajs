import * as error from './utils/error.js'
import * as utils from './utils/common.js'

const WEEK_STARTS = {
  1: 0,
  2: 1,
  11: 1,
  12: 2,
  13: 3,
  14: 4,
  15: 5,
  16: 6,
  17: 0
}
const WEEK_TYPES = {
  1: [1, 2, 3, 4, 5, 6, 7],
  2: [7, 1, 2, 3, 4, 5, 6],
  3: [6, 0, 1, 2, 3, 4, 5],
  11: [7, 1, 2, 3, 4, 5, 6],
  12: [6, 7, 1, 2, 3, 4, 5],
  13: [5, 6, 7, 1, 2, 3, 4],
  14: [4, 5, 6, 7, 1, 2, 3],
  15: [3, 4, 5, 6, 7, 1, 2],
  16: [2, 3, 4, 5, 6, 7, 1],
  17: [1, 2, 3, 4, 5, 6, 7]
}

const weekendPerCode = {
  1: [6, 0],
  2: [0, 1],
  3: [1, 2],
  4: [2, 3],
  5: [3, 4],
  6: [4, 5],
  7: [5, 6],
  11: [0],
  12: [1],
  13: [2],
  14: [3],
  15: [4],
  16: [5],
  17: [6]
}

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
  if (arguments.length !== 3) {
    return error.na
  }

  year = utils.getNumber(year)
  if (year instanceof Error) {
    return year
  }
  if (typeof year === 'string') {
    return error.value
  }

  month = utils.getNumber(month)
  if (month instanceof Error) {
    return month
  }
  if (typeof month === 'string') {
    return error.value
  }

  day = utils.getNumber(day)
  if (day instanceof Error) {
    return day
  }
  if (typeof day === 'string') {
    return error.value
  }

  if (year < 1900) {
    year += 1900
  }

  let result = new Date(Date.UTC(year, month - 1, day))

  result = utils.dateToSerialNumber(result)

  if (result < 0) {
    return error.num
  }

  return result
}

var dateDifFunctions = {
  Y: function (start, end) {
    const startYear = start.getUTCFullYear()
    const endYear = end.getUTCFullYear()

    let yearDifference = endYear - startYear

    if (end.getUTCMonth() < start.getUTCMonth() || end.getUTCDate() < start.getUTCDate()) {
      yearDifference--
    }

    return yearDifference
  },
  M: function (start, end) {
    const startYear = start.getUTCFullYear()
    const endYear = end.getUTCFullYear()

    const startMonth = start.getUTCMonth()
    const endMonth = end.getUTCMonth()

    const startDay = start.getUTCDate()
    const endDay = end.getUTCDate()

    let monthsDif = endMonth - startMonth
    let daysDif = endDay - startDay

    let result = (endYear - startYear) * 12 + monthsDif

    if (daysDif < 0) {
      result--
    }

    return result
  },
  D: function (start, end) {
    const startDay = utils.dateToSerialNumber(start)
    const endDay = utils.dateToSerialNumber(end)

    return endDay - startDay
  },
  MD: function (start, end) {
    const startDay = start.getUTCDate()
    const endDay = end.getUTCDate()

    if (endDay >= startDay) {
      return endDay - startDay
    }
    return 31 - (startDay - endDay)
  },
  YM: function (start, end) {
    const startMonth = start.getUTCMonth()
    const endMonth = end.getUTCMonth()

    let monthDifference = endMonth >= startMonth ? endMonth - startMonth : 12 - (startMonth - endMonth)

    if (end.getUTCDate() < start.getUTCDate()) {
      monthDifference--
    }

    return monthDifference
  },
  YD: function (start, end) {
    const startDay = start.getUTCDate()
    const startMonth = start.getUTCMonth()

    const endDay = end.getUTCDate()
    const endMonth = end.getUTCMonth()

    if (endMonth > startMonth || (endMonth === startMonth && endDay >= startDay)) {
      const year = start.getUTCFullYear()

      const tempStart = utils.dateToSerialNumber(new Date(Date.UTC(year, startMonth, startDay)))
      const tempEnd = utils.dateToSerialNumber(new Date(Date.UTC(year, endMonth, endDay)))

      return tempEnd - tempStart
    } else {
      const year = end.getUTCFullYear()

      const tempStart = utils.dateToSerialNumber(new Date(Date.UTC(year - 1, startMonth, startDay)))
      const tempEnd = utils.dateToSerialNumber(new Date(Date.UTC(year, endMonth, endDay)))

      return tempEnd - tempStart
    }
  }
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
  if (arguments.length !== 3) {
    return error.na
  }

  const someError = utils.anyError(start_date, end_date, unit)
  if (someError) {
    return someError
  }

  start_date = utils.getNumber(start_date)
  if (typeof start_date !== 'number') {
    return error.value
  }
  if (start_date < 0) {
    return error.num
  }

  end_date = utils.getNumber(end_date)
  if (typeof end_date !== 'number') {
    return error.value
  }
  if (end_date < 0 || start_date > end_date) {
    return error.num
  }

  if (typeof unit !== 'string') {
    return error.num
  }

  unit = unit.toUpperCase()

  const chosenOperation = dateDifFunctions[unit]
  if (chosenOperation === undefined) {
    return error.num
  }

  const start = utils.serialNumberToDate(start_date)
  const end = utils.serialNumberToDate(end_date)

  return chosenOperation(start, end)
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
  if (arguments.length !== 1) {
    return error.na
  }

  if (date_text instanceof Error) {
    return date_text
  }

  if (typeof date_text === 'string') {
    const date = new Date(date_text)

    if (!Number.isNaN(date.getTime())) {
      return utils.dateToSerialNumber(date)
    }
  }

  return error.value
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
  if (arguments.length !== 1) {
    return error.na
  }

  if (serial_number instanceof Error) {
    return serial_number
  }

  serial_number = utils.getNumber(serial_number)

  if (typeof serial_number === 'string') {
    return error.value
  }

  if (serial_number < 0) {
    return error.num
  }
  if (serial_number === 0) {
    return 0
  }

  const date = utils.serialNumberToDate(serial_number)

  return date.getUTCDate()
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
  if (arguments.length !== 2) {
    return error.na
  }

  const someError = utils.anyError(start_date, end_date)
  if (someError) {
    return someError
  }

  start_date = utils.getNumber(start_date)
  end_date = utils.getNumber(end_date)

  if (typeof start_date === 'string' || typeof end_date === 'string') {
    return error.value
  }

  start_date = Math.trunc(start_date)
  end_date = Math.trunc(end_date)

  return end_date - start_date
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
export function DAYS360(start_date, end_date, method = false) {
  if (arguments.length < 2 || arguments.length > 3) {
    return error.na
  }

  const someError = utils.anyError(start_date, end_date, method)
  if (someError) {
    return someError
  }

  start_date = utils.getNumber(start_date)
  if (typeof start_date !== 'number') {
    return error.value
  }
  if (start_date < 0) {
    return error.num
  }

  end_date = utils.getNumber(end_date)
  if (typeof end_date !== 'number') {
    return error.value
  }
  if (end_date < 0) {
    return error.num
  }

  method = utils.parseBool(method)
  if (typeof method !== 'boolean') {
    return error.value
  }

  start_date = utils.serialNumberToDate(start_date)
  end_date = utils.serialNumberToDate(end_date)

  const sm = start_date.getUTCMonth()
  let em = end_date.getUTCMonth()
  let sd, ed

  if (method) {
    sd = start_date.getUTCDate() === 31 ? 30 : start_date.getUTCDate()
    ed = end_date.getUTCDate() === 31 ? 30 : end_date.getUTCDate()
  } else {
    const nextStartDay = new Date(start_date.getTime())
    nextStartDay.setDate(nextStartDay.getDate() + 1)

    sd = sm !== nextStartDay.getUTCMonth() ? 30 : start_date.getUTCDate()

    const nextEndDay = new Date(end_date.getTime())
    nextEndDay.setDate(nextEndDay.getDate() + 1)

    if (end_date.getUTCDate() >= 30 && end_date.getUTCMonth() !== nextEndDay.getUTCMonth()) {
      if (sd < 30) {
        em++
        ed = 1
      } else {
        ed = 30
      }
    } else {
      ed = end_date.getUTCDate()
    }
  }

  return 360 * (end_date.getUTCFullYear() - start_date.getUTCFullYear()) + 30 * (em - sm) + (ed - sd)
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
  if (arguments.length !== 2) {
    return error.na
  }

  const someError = utils.anyError(start_date, months)
  if (someError) {
    return someError
  }

  const someBoolean = [start_date, months].some((argument) => typeof argument === 'boolean')
  if (someBoolean) {
    return error.value
  }

  start_date = utils.getNumber(start_date)
  if (typeof start_date === 'string') {
    return error.value
  }
  if (start_date < 0) {
    return error.num
  }

  months = utils.getNumber(months)
  if (typeof months === 'string') {
    return error.value
  }

  start_date = Math.trunc(start_date)
  months = Math.trunc(months)

  start_date = utils.serialNumberToDate(start_date)

  const resultMonth = start_date.getUTCMonth() + months
  start_date.setUTCMonth(resultMonth)

  if (start_date.getUTCMonth() !== resultMonth % 12) {
    start_date.setDate(-1)
  }

  return utils.dateToSerialNumber(start_date)
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
export function EOMONTH() {
  const result = EDATE(...arguments)

  if (result instanceof Error) {
    return result
  }

  const date = utils.serialNumberToDate(result)

  date.setUTCMonth(date.getUTCMonth() + 1)
  date.setUTCDate(0)

  return utils.dateToSerialNumber(date)
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
  if (arguments.length !== 1) {
    return error.na
  }

  if (serial_number instanceof Error) {
    return serial_number
  }

  serial_number = utils.getHour(serial_number)
  if (typeof serial_number !== 'number') {
    return error.value
  }
  if (serial_number < 0) {
    return error.num
  }

  return Math.trunc(Math.round(serial_number * 24 * 1e8) / 1e8)
}

const weeksPerYear = (year) => {
  const p = (y) => {
    return Math.round(y + y / 4 - y / 100 + y / 400) % 7
  }

  if (p(year) === 4 || p(year - 1) === 3) {
    return 53
  }
  return 52
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
  if (arguments.length !== 1) {
    return error.na
  }

  if (date instanceof Error) {
    return date
  }

  date = utils.getNumber(date)
  if (typeof date !== 'number') {
    return error.value
  }
  if (date < 0) {
    return error.num
  }

  const jsDate = utils.serialNumberToDate(date)

  var yearStart = new Date(Date.UTC(jsDate.getUTCFullYear(), 0, 1))

  const milliseconds = jsDate.getTime() - yearStart.getTime() + utils.millisecondsPerDay
  const dayOfYear = milliseconds / utils.millisecondsPerDay

  let dayOfWeek = jsDate.getUTCDay()
  dayOfWeek--
  if (dayOfWeek < 0) {
    dayOfWeek += 7
  }
  dayOfWeek++

  let temp = Math.trunc((10 + dayOfYear - dayOfWeek) / 7)

  if (temp === 0) {
    return weeksPerYear(jsDate.getUTCFullYear() - 1)
  } else if (temp > weeksPerYear(jsDate.getUTCFullYear())) {
    return 1
  }
  return temp
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
  if (arguments.length !== 1) {
    return error.na
  }

  if (serial_number instanceof Error) {
    return serial_number
  }

  serial_number = utils.getHour(serial_number)
  if (typeof serial_number !== 'number') {
    return error.value
  }
  if (serial_number < 0) {
    return error.num
  }

  const minutes = (serial_number * 24 * 60) % 60

  return Math.trunc(minutes)
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
  if (arguments.length !== 1) {
    return error.na
  }

  if (serial_number instanceof Error) {
    return serial_number
  }

  serial_number = utils.getNumber(serial_number)
  if (typeof serial_number !== 'number') {
    return error.value
  }
  if (serial_number < 0) {
    return error.num
  }
  if (serial_number === 0) {
    return 1
  }

  serial_number = utils.serialNumberToDate(serial_number)

  return serial_number.getUTCMonth() + 1
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
  if (arguments.length < 2 || arguments.length > 3) {
    return error.na
  }

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
NETWORKDAYS.INTL = function (start_date, end_date, weekend, holidays) {
  if (arguments.length < 2 || arguments.length > 4) {
    return error.na
  }

  const someError = utils.anyError(start_date, end_date)
  if (someError) {
    return someError
  }

  start_date = utils.getNumber(start_date)
  end_date = utils.getNumber(end_date)

  if (typeof start_date !== 'number' || typeof end_date !== 'number') {
    return error.value
  }
  if (start_date < 0 || end_date < 0) {
    return error.num
  }

  if (weekend instanceof Error) {
    return error.value
  }
  if (weekend === null) {
    return error.num
  }
  if (weekend === undefined) {
    weekend = 1
  } else if (typeof weekend === 'boolean') {
    if (weekend === false) {
      return error.num
    }

    weekend = 1
  }

  const weekendType = typeof weekend

  let ignoredWeekdays
  if (weekendType === 'number') {
    ignoredWeekdays = weekendPerCode[weekend]

    if (ignoredWeekdays === undefined) {
      return error.num
    }
  } else if (weekendType === 'string') {
    if (weekend.length !== 7) {
      return error.value
    }

    weekend = weekend.split('')

    const invalid = weekend.some((day) => day !== '0' && day !== '1')
    if (invalid) {
      return error.value
    }

    ignoredWeekdays = []
    for (let i = 0; i < weekend.length; i++) {
      if (weekend[i] === '1') {
        ignoredWeekdays.push(i)
      }
    }

    ignoredWeekdays = ignoredWeekdays.map((ignoredWeekday) => {
      let result = ignoredWeekday + 1
      if (result > 6) {
        result -= 7
      }

      return result
    })
  }

  let inverted = false
  if (end_date < start_date) {
    let temp = start_date

    start_date = end_date
    end_date = temp

    inverted = true
  }

  let totalDays = 0

  const jsStartDay = utils.serialNumberToDate(start_date)
  const jsEndDay = utils.serialNumberToDate(end_date)

  let tempStartDate = start_date
  const startDay = jsStartDay.getUTCDay()
  if (startDay !== 0) {
    const numberOfDaysSkipped = ignoredWeekdays.filter((day) => day >= startDay)

    totalDays = 7 - startDay - numberOfDaysSkipped.length

    tempStartDate = tempStartDate + 7 - startDay
  }

  let tempEndDate = end_date
  const endDay = jsEndDay.getUTCDay()
  if (endDay !== 6) {
    const numberOfDaysSkipped = ignoredWeekdays.filter((day) => day <= endDay)

    totalDays += endDay + 1 - numberOfDaysSkipped.length

    tempEndDate = tempEndDate - endDay - 1
  }

  const numberOfCompleteWeeks = (tempEndDate - tempStartDate + 1) / 7
  totalDays += numberOfCompleteWeeks * (7 - ignoredWeekdays.length)

  if (holidays !== undefined) {
    if (!Array.isArray(holidays)) {
      holidays = [holidays]
    }
    holidays = holidays.flat(2)

    for (let i = 0; i < holidays.length; i++) {
      if (holidays[i] instanceof Error) {
        return holidays[i]
      }

      let holiday = utils.getNumber(holidays[i])
      if (typeof holiday !== 'number') {
        return error.value
      }
      if (holiday < 0) {
        return error.num
      }

      if (holiday >= start_date && holiday <= end_date) {
        const jsHoliday = utils.serialNumberToDate(holiday)

        const alreadyIgnored = ignoredWeekdays.includes(jsHoliday.getUTCDay())
        if (!alreadyIgnored) {
          totalDays--
        }
      }
    }
  }

  if (inverted) {
    totalDays *= -1
  }

  return totalDays
}

/**
 * Returns the serial number of the current date and time.
 *
 * Category: Date and time
 *
 * @returns
 */
export function NOW() {
  if (arguments.length !== 0) {
    return error.na
  }

  const now = new Date()
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset())

  return utils.dateToSerialNumber(now)
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
  if (arguments.length !== 1) {
    return error.na
  }

  if (serial_number instanceof Error) {
    return serial_number
  }

  serial_number = utils.getHour(serial_number)
  if (typeof serial_number !== 'number') {
    return error.value
  }
  if (serial_number < 0) {
    return error.num
  }

  const seconds = (serial_number * 24 * 60 * 60) % 60

  return Math.round(seconds)
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
  if (arguments.length !== 3) {
    return error.na
  }

  const someError = utils.anyError(hour, minute, second)
  if (someError) {
    return someError
  }

  hour = utils.getNumber(hour)
  if (typeof hour !== 'number') {
    return error.value
  }

  minute = utils.getNumber(minute)
  if (typeof minute !== 'number') {
    return error.value
  }

  second = utils.getNumber(second)
  if (typeof second !== 'number') {
    return error.value
  }

  const result = (3600 * hour + 60 * minute + second) / 86400

  if (result < 0) {
    return error.num
  }

  return result % 1
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
  if (arguments.length !== 1) {
    return error.na
  }

  if (time_text instanceof Error) {
    return time_text
  }
  if (typeof time_text !== 'string') {
    return error.value
  }

  time_text = utils.getHour(time_text)
  if (typeof time_text !== 'number') {
    return error.value
  }

  return time_text % 1
}

/**
 * Returns the serial number of today's date.
 *
 * Category: Date and time
 *
 * @returns
 */
export function TODAY() {
  if (arguments.length > 0) {
    return error.na
  }

  const today = new Date()
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset())

  today.setUTCHours(0, 0, 0, 0)

  return utils.dateToSerialNumber(today)
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
  if (arguments.length < 1 || arguments.length > 2) {
    return error.na
  }

  const someError = utils.anyError(serial_number, return_type)
  if (someError) {
    return someError
  }

  serial_number = utils.getNumber(serial_number)
  if (typeof serial_number !== 'number') {
    return error.value
  }
  if (serial_number < 0) {
    return error.num
  }

  if (return_type === null) {
    return error.num
  }
  if (return_type === undefined) {
    return_type = 1
  }

  return_type = utils.getNumber(return_type)
  if (typeof return_type !== 'number') {
    return error.value
  }

  if (!WEEK_TYPES[return_type]) {
    return error.num
  }

  const day = utils.serialNumberToDate(serial_number).getUTCDay()

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
  if (arguments.length < 1 || arguments.length > 2) {
    return error.na
  }

  const someError = utils.anyError(serial_number, return_type)
  if (someError) {
    return someError
  }

  serial_number = utils.getNumber(serial_number)
  if (typeof serial_number !== 'number') {
    return error.value
  }
  if (serial_number < 0) {
    return error.num
  }

  if (return_type === undefined) {
    return_type = 1
  }

  return_type = utils.getNumber(return_type)
  if (typeof return_type !== 'number') {
    return error.value
  }
  if (return_type === 21) {
    return ISOWEEKNUM(serial_number)
  }

  const weekStart = WEEK_STARTS[return_type]
  if (weekStart === undefined) {
    return error.num
  }

  const jsDate = utils.serialNumberToDate(serial_number)

  const jsFirstDayOfTheYear = new Date(Date.UTC(jsDate.getUTCFullYear(), 0, 1))
  const firstDayOfTheYear = utils.dateToSerialNumber(jsFirstDayOfTheYear)

  let daysDif = jsFirstDayOfTheYear.getUTCDay() - weekStart
  if (daysDif < 0) {
    daysDif += 7
  }

  const dayOfTheYear = serial_number - firstDayOfTheYear + 1

  const week = Math.trunc((dayOfTheYear - 1 + daysDif) / 7) + 1

  return week
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
  if (arguments.length < 2 || arguments.length > 3) {
    return error.na
  }

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
WORKDAY.INTL = function (start_date, days, weekend, holidays) {
  if (arguments.length < 2 || arguments.length > 4) {
    return error.na
  }

  const someError = utils.anyError(start_date, days, weekend)
  if (someError) {
    return someError
  }

  if (typeof start_date === 'boolean') {
    return error.value
  }

  start_date = utils.getNumber(start_date)
  if (typeof start_date !== 'number') {
    return error.value
  }
  if (start_date < 0) {
    return error.num
  }

  if (typeof days === 'boolean') {
    return error.value
  }
  days = utils.getNumber(days)
  if (typeof days !== 'number') {
    return error.value
  }

  const jsStartDate = utils.serialNumberToDate(start_date)

  if (weekend === undefined || weekend === true) {
    weekend = 1
  }

  let ignoredWeekdays

  const weekendType = typeof weekend
  if (weekendType === 'string') {
    if (weekend.length !== 7) {
      return error.value
    }

    weekend = weekend.split('')

    const invalid = weekend.some((day) => day !== '0' && day !== '1') || weekend.every((day) => day === '1')
    if (invalid) {
      return error.value
    }

    ignoredWeekdays = []
    for (let i = 0; i < weekend.length; i++) {
      if (weekend[i] === '1') {
        ignoredWeekdays.push(i)
      }
    }

    ignoredWeekdays = ignoredWeekdays.map((ignoredWeekday) => {
      let result = ignoredWeekday + 1
      if (result > 6) {
        result -= 7
      }

      return result
    })
  } else {
    ignoredWeekdays = weekendPerCode[weekend]
  }

  if (ignoredWeekdays === undefined) {
    return error.num
  }

  let result = start_date

  const workingDaysAWeek = 7 - ignoredWeekdays.length

  const signal = days < 0 ? -1 : 1

  let wholeWeeks = Math.trunc(days / workingDaysAWeek)

  let daysRemaining = days % workingDaysAWeek
  if (!daysRemaining) {
    wholeWeeks -= signal
    daysRemaining = days - wholeWeeks * workingDaysAWeek
  }

  if (wholeWeeks) {
    result += 7 * wholeWeeks
  }

  const tempDate = new Date(jsStartDate.getTime())

  while (daysRemaining !== 0) {
    tempDate.setUTCDate(tempDate.getUTCDate() + signal)
    result += signal

    if (!ignoredWeekdays.includes(tempDate.getUTCDay())) {
      daysRemaining -= signal
    }
  }

  if (holidays) {
    if (!Array.isArray(holidays)) {
      holidays = [holidays]
    }

    holidays = holidays.flat(2)

    const someError = utils.anyError(...holidays)
    if (someError) {
      return someError
    }

    try {
      holidays = holidays.map((holiday) => {
        if (holiday instanceof Error) {
          throw holiday
        }
        const result = utils.getNumber(holiday)
        if (typeof result !== 'number') {
          throw error.value
        }
        if (result < 0) {
          throw error.num
        }

        return result
      })
    } catch (err) {
      return err
    }

    let relevantDate = holidays.find((holiday) => {
      return (holiday >= start_date && holiday <= result) || (holiday >= result && holiday <= start_date)
    })
    while (relevantDate) {
      const jsRelevantDate = utils.serialNumberToDate(relevantDate)
      if (!ignoredWeekdays.includes(jsRelevantDate.getUTCDay())) {
        var accounted = false
        while (!accounted) {
          tempDate.setUTCDate(tempDate.getUTCDate() + signal)
          result += signal

          if (!ignoredWeekdays.includes(tempDate.getUTCDay())) {
            accounted = true
          }
        }
      }

      holidays = holidays.filter((holiday) => holiday !== relevantDate)

      relevantDate = holidays.find((holiday) => {
        return (holiday >= start_date && holiday <= result) || (holiday >= result && holiday <= start_date)
      })
    }
  }

  if (result < 0) {
    return error.num
  }

  return result
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
  if (arguments.length !== 1) {
    return error.na
  }

  if (serial_number instanceof Error) {
    return serial_number
  }

  serial_number = utils.getNumber(serial_number)
  if (typeof serial_number !== 'number') {
    return error.value
  }
  if (serial_number < 0) {
    return error.num
  }

  const date = utils.serialNumberToDate(serial_number)

  return date.getUTCFullYear()
}

function isLeapYear(year) {
  return new Date(year, 1, 29).getMonth() === 1
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
  if (arguments.length < 2 || arguments.length > 3) {
    return error.na
  }

  const someError = utils.anyError(start_date, end_date, basis)
  if (someError) {
    return someError
  }

  if (typeof start_date === 'boolean' || typeof end_date === 'boolean' || typeof basis === 'boolean') {
    return error.value
  }

  start_date = utils.getNumber(start_date)
  if (typeof start_date !== 'number') {
    return error.value
  }
  if (start_date < 0) {
    return error.num
  }

  end_date = utils.getNumber(end_date)
  if (typeof end_date !== 'number') {
    return error.value
  }
  if (end_date < 0) {
    return error.num
  }

  if (start_date > end_date) {
    const temp = end_date
    end_date = start_date
    start_date = temp
  }

  const jsStartDate = utils.serialNumberToDate(start_date)
  const jsEndDate = utils.serialNumberToDate(end_date)
  if (basis == undefined || basis == null) {
    basis = 0
  }
  basis = utils.getNumber(basis)
  if (typeof basis !== 'number') {
    return error.value
  }

  switch (basis) {
    case 0:
      // US (NASD) 30/360

      return DAYS360(start_date, end_date) / 360
    case 1: {
      // Actual/actual
      let sd = jsStartDate.getUTCDate()
      const sm = jsStartDate.getUTCMonth() + 1
      const sy = jsStartDate.getUTCFullYear()
      let ed = jsEndDate.getUTCDate()
      const em = jsEndDate.getUTCMonth() + 1
      const ey = jsEndDate.getUTCFullYear()

      const feb29Between = (date1, date2) => {
        const year1 = date1.getUTCFullYear()
        const mar1year1 = new Date(year1, 2, 1)

        if (isLeapYear(year1) && date1 < mar1year1 && date2 >= mar1year1) {
          return true
        }

        const year2 = date2.getFullYear()
        const mar1year2 = new Date(year2, 2, 1)

        return isLeapYear(year2) && date2 >= mar1year2 && date1 < mar1year2
      }

      if (sy === ey || (sy + 1 === ey && (sm > em || (sm === em && sd >= ed)))) {
        let ylength = 365
        if ((sy === ey && isLeapYear(sy)) || feb29Between(jsStartDate, jsEndDate) || (em === 1 && ed === 29)) {
          ylength = 366
        }

        return (end_date - start_date) / ylength
      }

      const years = ey - sy + 1
      const days =
        utils.dateToSerialNumber(new Date(Date.UTC(ey + 1, 0, 1))) -
        utils.dateToSerialNumber(new Date(Date.UTC(sy, 0, 1)))
      const average = days / years

      return (end_date - start_date) / average
    }

    case 2:
      // Actual/360

      return (end_date - start_date) / 360
    case 3:
      // Actual/365

      return (end_date - start_date) / 365
    case 4:
      // European 30/360

      return DAYS360(start_date, end_date, true) / 360
  }
}
