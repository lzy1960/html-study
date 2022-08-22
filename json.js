// 1. 转换值如果有 toJSON() 方法，该方法定义什么值将被序列化。
// 2. 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
// 3. 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
// 4. undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。函数、undefined 被单独转换时，会返回 undefined，如JSON.stringify(function(){}) or JSON.stringify(undefined).
// 5. 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
// 6. 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。
// 7. Date 日期调用了 toJSON() 将其转换为了 string 字符串（同 Date.toISOString()），因此会被当做字符串处理。
// 8. NaN 和 Infinity 格式的数值及 null 都会被当做 null。
// 9. 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。

function myStringify (data) {
  let result = ''
  const type = typeof data
  if (type !== 'object') {
    // 基本数据类型
    if (type === 'number' && (Number.isNaN() || Number.isFinite())) {
      // 8
      result = 'null'
    } else if (type === 'function' || type === 'symbol' || type === 'undefined') {
      // 4
      result = 'undefined'
    } else if (type === 'string') {
      result = `"${data}"`
    } else {
      result = data
    }
    result += ''
  } else {
    // 引用数据类型
    // 1
    if (data.toJSON && typeof data.toJSON === 'function') {
      result += myStringify(data.toJSON())
    } else if (data instanceof Array) {
      // 4 这三种类型在数组中会转换为null
      data.forEach((item, index) => {
        let res = []
        const _type = typeof item
        if (_type === 'undefined' || _type === 'symbol' || _type === 'function') {
          res[index] = 'null'
        } else {
          res[index] = myStringify(item)
        }
      })
      result = `[${res}]`
    } else {
      let res = []
      Object.keys(data).forEach((item, index) => {
        const valueType = typeof data[item]
        if (valueType === 'undefined' || valueType === 'symbol' || valueType === 'function') {
          // 不做处理
          console.log('不做处理');
        } else if (data[item] === data) {
          throw new Error('cycling')
        } else {
          res.push(`"${item}":${myStringify(data[item])}`)
        }
      })
      result = `{${res}}`
    }
  }
  return result
}
