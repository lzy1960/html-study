function mergeSort (arr) {
  const len = arr.length
  if (len === 1) {
    return arr
  }
  const mid = len / 2
  let left = arr.slice(0, mid)
  let right = arr.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}

// 归并
function merge (left, right) {
  if (left.length === 0) return right
  if (right.length === 0) return left

  if (left[0] < right[0]) {
    return [left[0]].concat(merge(left.slice(1), right))
  } else {
    return [right[0]].concat(merge(left, right.slice(1)))
  }
}

console.log(mergeSort([1234, 1, 34, 13, 5, 143, 62, 55, 51, 34, 8328, 1234]))