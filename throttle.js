// 节流
export const throttle = (() => {
  var prev = Date.now()
  return (callback, delay = 1000) => {
    var now = Date.now()
    if (now - prev > delay) {
      callback()
      prev = Date.now()
    }
  }
})()