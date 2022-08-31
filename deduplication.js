function fn (arr) {
  // 先给基本数据类型去重
  arr = [...new Set(arr)]
  let objSet = new Set()
  let arrSet = new Set()
  for (let i = arr.length; i >= 0; i--) {
    const item = arr[i]
    if (Object.prototype.toString.call(item) === '[object Array]') {
      arr.splice(i, 1)
      arrSet.add(JSON.stringify(item))
    } else if (Object.prototype.toString.call(item) === '[object Object]') {
      let temp = {}
      Object.keys(item).sort().forEach(key => {
        temp[key] = item[key]
      })
      arr.splice(i, 1)
      objSet.add(JSON.stringify(temp))
    }
  }
  objSet.forEach(item => arr.push(JSON.parse(item)))
  arrSet.forEach(item => arr.push(JSON.parse(item)))
  return arr
}

console.log(fn([
  1, '1', 1, '1',
  { a: 1, b: 2, c: { name: 'zs' } },
  { a: 1, c: { name: 'zs' }, b: 2 },
  [2, '2'],
  ['2', 2],
  null,
  undefined
]))