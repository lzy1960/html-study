const people = {
  name: 'zs',
  age: 18,
}
console.log(people.age)
people.age = 20

// =================================================

const people1 = {}
let age
Object.defineProperty(people1, 'age', {
  get: function () {
    console.log('获取年龄')
    return age
  },
  set: function (value) {
    console.log('设置年龄')
    console.log(value)
    age = value
  }
})
people1.age = 18
console.log(people1.age)

// =================================================

// 监听对象的所有属性
function defineReactive (data, key, value) {
  const dep = new Dep()
  Object.defineProperty(data, key, {
    get: function () {
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return value
    },
    set: function (newVal) {
      if (value !== newVal) {
        value = newVal
        dep.notify() // 通知订阅器
      }
    }
  })
}

function observer (data) {
  if (!data || typeof data !== 'object') return
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key])
  })
}

// 监听器Observer相关
class Dep {
  constructor () {
    this.subs = []
  }
  static target = null
  addSub (sub) {
    this.subs.push(sub)
  }
  notify () {
    console.log('属性变化通知 Watcher 执行更新视图函数');
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

// -------------------------------------

// 订阅者Watcher相关
class Watcher {
  constructor (vm, prop, callback) {
    this.vm = vm
    this.prop = prop
    this.callback = callback
    this.value = this.get()
  }
  update () {
    const newVal = this.vm.$data[this.prop]
    const oldVal = this.value
    if (newVal !== oldVal) {
      this.value = newVal
      this.callback(newVal)
    }
  }
  get () {
    Dep.target = this
    const newVal = this.vm.$data[this.prop]
    Dep.target = null
    return newVal
  }
}

// 创建一个伪vue
class Mvue {
  constructor (options, prop) {
    this.$options = options
    this.$data = options.data()
    this.$prop = prop
    this.$el = document.querySelector(options.el)
    this.init()
  }
  init () {
    observer(this.$data)
    this.$el.textContent = this.$data[this.$prop]
    new Watcher(this, this.$prop, value => {
      this.$el.textContent = value
    })
  }
}

// Compile解析器
// 主要作用是用来解析指令初始化模板，用来添加订阅者，绑定更新函数
// class Compile {
//   constructor () {
//     this.vm = vm
//     this.el = vm.$el
//     this.fragment = null
//     this.init()
//   }
//   init () {
//     this.fragment = this.nodeFragment(this.el)
//   }
//   nodeFragment (el) {
//     const fragment = document.createDocumentFragment()
//     let child = el.firstChild
//     while (child) {
//       fragment.appendChild(child)
//       child = el.firstChild
//     }
//     return fragment
//   }
//   compile (node) {
//     let nodeAttrs = node.attributes
//     [...nodeAttrs].forEach(attr => {
//       let name = attr.name
//       if (this.isDirective(name)) {
//         let value = attr.value
//         if (name === 'v-model') {
//           this.compileModel(node, value)
//         }
//         node.removeAttribute(name)
//       }
//     })
//   }
// }

// 测试
const people2 = {
  name: 'zs',
  age: 20
}
observer(people2)
people2.age = 30
people2.age = 31
console.log(people2.age)

const vm = new Mvue({
  el: '#app',
  data () {
    return {
      name: '这是名字'
    }
  }
}, 'name')
