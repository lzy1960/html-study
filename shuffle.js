function shuffle (arr, size) {
  let index = -1, len = arr.length, lastIndex = len - 1
  size = size || len
  while (++index < size) {
    let rand = index + Math.floor(Math.random() * lastIndex - index + 1)
    let value = arr[rand]
    arr[rand] = arr[index]
    arr[index] = value
  }
  arr.length = size
  return arr
}
console.log(shuffle([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]));