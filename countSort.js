function countSort (nums) {
  // 先找最大值和最小值
  const max = Math.max(...nums)
  const min = Math.min(...nums)
  // 构建一个新的数组，把原数组的值当做下标存入，每个都+1
  let bucketArr = []
  for (let i = 0; i < nums.length; i++) {
    let temp = nums[i]
    bucketArr[temp] = bucketArr[temp] + 1 || 1
  }
  // 然后做最后的加法
  let finalIndex = 0
  for (let i = min; i <= max; i++) {
    while (bucketArr[i] > 0) {
      nums[finalIndex++] = i
      bucketArr[i]--
    }
  }
  return nums
}
const arr = [1, 2, 6, 7, 342, 6, 34, 523, 46, 2346, 23, 45]
countSort(arr)
console.log(countSort(arr))