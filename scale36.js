function scale36 (num) {
  const getNums36 = () => {
    const nums36 = []
    for (let i = 0; i < 36; i++) {
      if (i >= 0 && i <= 9) {
        nums36.push(i)
      } else {
        nums36.push(String.fromCharCode(i + 87))
      }
    }
    return nums36
  }

  const nums36 = getNums36()
  let result = []
  while (num) {
    let res = num % 36
    result.unshift(nums36[res])
    num = parseInt(num / 36)
  }
  return result.join('')
}