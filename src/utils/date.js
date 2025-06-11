export let returnSerial = false

const d1900 = new Date(Date.UTC(1900, 0, 1))

export function useSerial() {
  returnSerial = true
}

export function useDate() {
  returnSerial = false
}

export function serialToDate(serial) {
  if (serial < 60) {
    serial += 1
  }

  const utc_days = Math.floor(serial - 25569)
  const utc_value = utc_days * 86400
  const date_info = new Date(utc_value * 1000)
  const fractional_day = serial - Math.floor(serial) + 0.0000001

  let total_seconds = Math.floor(86400 * fractional_day)

  const seconds = total_seconds % 60

  total_seconds -= seconds

  const hours = Math.floor(total_seconds / (60 * 60))
  const minutes = Math.floor(total_seconds / 60) % 60
  let days = date_info.getUTCDate()
  let month = date_info.getUTCMonth()

  if (serial >= 60 && serial < 61) {
    days = 29
    month = 1
  }

  return new Date(date_info.getUTCFullYear(), month, days, hours, minutes, seconds)
}

export function dateToSerial(date) {
  const addOn = date > -2203891200000 ? 2 : 1

  return Math.ceil((date - d1900) / 86400000) + addOn
}

export function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}
