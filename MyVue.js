class MyVue {
  constructor (options, prop) {
    this.data = options?.data()
    this.prop = prop
    this.el = document.querySelector(options.el)
    this.init()
  }
  init () {
    this.el.innerHTML = this.data[this.prop]
    observer(this.data)
    new Watcher(this, this.prop, val => {
      this.el.innerHTML = val
    })
  }
}

class Watcher {
  constructor (vm, prop, callback) {
    this.vm = vm
    this.data = vm.data
    this.prop = prop
    this.callback = callback
    this.value = this.getVal()
  }
  update () {
    const newVal = this.data[this.prop]
    this.value = newVal
    this.callback(newVal)
    console.log('watcher更新');
  }
  getVal () {
    Dep.target = this
    const newVal = this.vm.data[this.prop]
    Dep.target = null
    return newVal
  }
}

function observer (data) {
  if (Object.prototype.toString.call(data) !== '[object Object]') return
  for (const key in data) {
    defineReactive(data, key, data[key])
  }
}

function defineReactive (data, key) {
  const dep = new Dep()
  let value = data[key]
  console.log(Dep.target)
  Object.defineProperty(data, key, {
    get: () => {
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return value
    },
    set: (newVal) => {
      if (value !== newVal) {
        value = newVal
        dep.notify()
      }
    }
  })
}

class Dep {
  constructor () {
    this.subs = []
  }
  static target = null
  addSub (sub) {
    this.subs.push(sub)
  }
  notify () {
    console.log('改变了值，通知监听器')
    this.subs.forEach(sub => sub.update())
  }
}

const vm = new MyVue({
  el: '#app',
  data () {
    return {
      name: 'zs',
      age: 18
    }
  }
}, 'name')