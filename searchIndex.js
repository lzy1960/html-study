function searchIndex (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) return i
  }
  return -1
}
function searchIndex1 (nums, target) {
  return nums.indexOf(target)
}

console.time('123123')
console.log(searchIndex([3, 124, 123, 41, 234, 12, 3, 2, 51, 23, 2 ** 32], 2 ** 32))
console.timeEnd('123123')

console.time('3333333')
console.log(searchIndex1([3, 124, 123, 41, 234, 12, 3, 2, 51, 23, 2 ** 32], 2 ** 32))
console.timeEnd('3333333')