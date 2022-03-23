/**
 * 1. 创建一个空对象
 * 2. 为这个对象添加proto属性，将该属性链接至构造函数的原型对象
 * 3. 将这个对象作为this的上下文执行该函数
 * 4. 如果该函数没有返回对象，则返回this
 */
const myNew = (func, ...args) => {
  let obj = Object.create(func.prototype)
  let result = func.apply(obj, args)
  if (typeof result === 'object' && result !== null || typeof result === 'function') {
    return result
  } else {
    return obj
  }
}