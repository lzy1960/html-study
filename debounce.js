// 防抖
export const debounce = (() => {
  let timer = null
  return (callback, ms = 200) => {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
})()