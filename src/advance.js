export function getColumnName(num) {
  let letter = ''
  let quotient = num + 1
  while (quotient > 0) {
    const remainder = (quotient - 1) % 26
    letter = String.fromCharCode(65 + remainder) + letter
    quotient = ((quotient - remainder) / 26) | 0
  }
  return letter
}
