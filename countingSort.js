function countingSort (arr) {
  let bucket = []
  let sortedIndex = 0
  for (let i = 0; i < arr.length; i++) {
    if (!bucket[arr[i]]) {
      bucket[arr[i]] = 0
    }
    bucket[arr[i]]++
  }

  for (let i = 0; i < bucket.length; i++) {
    while (bucket[i] > 0) {
      arr[sortedIndex++] = i
      bucket[i]--
    }
  }
  return arr
}

console.time('sort')
console.log(countingSort([1, 2, 3, 6, 6, 3562, 6, 355, 123, 51, 2, 14, 624, 562]))
console.timeEnd('sort')