const quickSort = (array) => {
  if (array.length <= 1) {
    return array
  }
  const middle = array.pop()
  const left = []
  const right = []
  for (let item of array) {
    if (item <= middle) {
      left.push(item)
    } else {
      right.push(item)
    }
  }
  return [...quickSort(left), middle, ...quickSort(right)]
}

console.log(quickSort([1, 2, 3, 6, 6, 3562, 6, 355, 123, 51, 2, 14, 624, 562]))