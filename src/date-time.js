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

export function HOUR(serial_number) {
  serial_number = utils.parseDate(serial_number)

  if (serial_number instanceof Error) {
    return serial_number
  }

  return serial_number.getHours()
}

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

export function MINUTE(serial_number) {
  serial_number = utils.parseDate(serial_number)

  if (serial_number instanceof Error) {
    return serial_number
  }

  return serial_number.getMinutes()
}

export function MONTH(serial_number) {
  serial_number = utils.parseDate(serial_number)

  if (serial_number instanceof Error) {
    return serial_number
  }

  return serial_number.getMonth() + 1
}

export function NETWORKDAYS(start_date, end_date, holidays) {
  return NETWORKDAYS.INTL(start_date, end_date, 1, holidays)
}

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

export function NOW() {
  return new Date()
}

export function SECOND(serial_number) {
  serial_number = utils.parseDate(serial_number)

  if (serial_number instanceof Error) {
    return serial_number
  }

  return serial_number.getSeconds()
}

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

export function TIMEVALUE(time_text) {
  time_text = utils.parseDate(time_text)

  if (time_text instanceof Error) {
    return time_text
  }

  return (3600 * time_text.getHours() + 60 * time_text.getMinutes() + time_text.getSeconds()) / 86400
}

export function TODAY() {
  return startOfDay(new Date())
}

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

export function WORKDAY(start_date, days, holidays) {
  return WORKDAY.INTL(start_date, days, 1, holidays)
}

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
