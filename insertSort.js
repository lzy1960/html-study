function insertSort (arr) {
  let preIndex, current
  for (let i = 1; i < arr.length; i++) {
    preIndex = i - 1
    current = arr[i]

    while (arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex]
      preIndex--
    }
    arr[preIndex + 1] = current
  }
  return arr
}

console.log(insertSort([1234, 1, 34, 13, 5, 143, 62, 55, 51, 34, 8328, 1234]))