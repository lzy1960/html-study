let obj = {
  name: 'zs',
  age: 17,
  children: {
    name: 'zs1',
    age: 3
  }
}

class Dep {
  constructor () {
    this.subs = []
  }
  static target = null
  depend () {
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }
  notify () {
    const subs = [...this.subs]
    subs.forEach(s => s.update())
  }
  addSub (sub) {
    this.subs.push(sub)
  }
}

// ===================================================
// 1. 数据劫持
function observe (data) {
  if (typeof data !== 'object') return
  new Observer(data)
}

function defineReactive (data, key, value = data[key]) {
  const dep = new Dep()
  observe(value)
  Object.defineProperty(data, key, {
    get () {
      console.log('获取了', value)
      dep.depend()
      return value
    },
    set (newVal) {
      if (newVal === value) return
      console.log('更新了', newVal)
      value = newVal
      observe(newVal)
      dep.notify()
    }
  })
}

class Observer {
  constructor (value) {
    this.value = value
    this.work()
  }
  work () {
    Object.keys(this.value).forEach(key => defineReactive(this.value, key))
  }
}
// ===================================================

// 2. 依赖收集与派发更新
const targetStack = []
class Watcher {
  constructor (data, prop, callback) {
    this.data = data
    this.prop = prop
    this.callback = callback
    this.value = this.get()
  }

  get () {
    targetStack.push(Dep.target)
    Dep.target = this
    const value = this.data[this.prop]
    Dep.target = targetStack.pop()
    return value
  }

  update () {
    const oldVal = this.value
    this.value = this.data[this.prop]
    this.callback.call(this.data, this.value, oldVal)
  }
}

observe(obj)
new Watcher(obj, 'name', (val, oldVal) => {
  console.log(`监听${obj}, ${oldVal} -> ${val}`)
})
