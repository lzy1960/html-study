// 递归方式
function flatArr (arr) {
  console.log('执行数组扁平化')
  let result = []
  for (const item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flatArr(item))
    } else {
      result.push(item)
    }
  }
  return result
}

// reduce方式
function reduceFlatArr (arr) {
  return arr.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? reduceFlatArr(cur) : cur)
  }, [])
}

// es6
function es6FlatArr1 (arr) {
  return arr.flat(Infinity)
}
function es6FlatArr2 (arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

let arr = [1, [2, 3], 4, [5, 6, [7, 8]], 9, [10]]
console.log(flatArr(arr))
console.log(reduceFlatArr(arr))
console.log(es6FlatArr1(arr))
console.log(es6FlatArr2(arr))