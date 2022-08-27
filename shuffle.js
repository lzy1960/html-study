function shuffle (arr) {
  let index = -1, len = arr.length, lastIndex = len - 1
  while (++index < len) {
    let rand = index + Math.floor(Math.random() * lastIndex - index + 1)
    let value = arr[rand]
    arr[rand] = arr[index]
    arr[index] = value
  }
  return arr
}
function shuffle2 (arr) {
  return arr.sort(() => Math.random() - 0.5)
}
console.log(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));