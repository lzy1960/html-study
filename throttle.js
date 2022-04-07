function throttle (fn, delay = 1000) {
  let curTime = Date.now()
  return () => {
    nowTime = Date.now()
    if (nowTime - curTime >= delay) {
      curTime = Date.now()
      return fn
    }
  }
}