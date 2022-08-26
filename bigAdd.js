function bigAdd (a, b) {
  let result = ''
  let flat = 0
  let maxLen = Math.max(a.length, b.length)
  a = a.padStart(maxLen, '0')
  b = b.padStart(maxLen, '0')
  for (let i = maxLen - 1; i >= 0; i--) {
    let sum = parseInt(a[i]) + parseInt(b[i]) + flat
    flat = parseInt(sum / 10)
    console.log(flat);
    result = sum % 10 + result
  }
  if (flat === 1) {
    result = '1' + result
  }
  return result
}