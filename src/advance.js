export function getColumnName(i) {
  var letter = ''
  if (i > 701) {
    letter += String.fromCharCode(64 + parseInt(i / 676))
    letter += String.fromCharCode(64 + parseInt((i % 676) / 26))
  } else if (i > 25) {
    letter += String.fromCharCode(64 + parseInt(i / 26))
  }
  letter += String.fromCharCode(65 + (i % 26))

  return letter
}
