const obj = {
  name: 'zs',
  age: 18
}

function reactive (target) {
  const handler = {
    get (target, key, receiver) {
      track(receiver, key) // 访问时收集依赖
      console.log(`访问了${key}属性`)
      return Reflect.get(target, key, receiver)
    },
    set (target, key, value, receiver) {
      console.log(`将${key} ${target[key]} -> ${value}`)
      Reflect.set(target, key, value, receiver)
      trigger(receiver, key) // 设值时自动通知更新
    }
  }
  return new Proxy(target, handler)
}

// 收集依赖
const targetMap = new WeakMap()
function track (target, key) {
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (depsMap) {
    targetMap.set(target, depsMap = new Map())
  }

  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, dep = new Set())
  }
  dep.add(activeEffect)
}

// 通知更新
function trigger (target, key) {
  let depsMap = targetMap.get(target)
  if (depsMap) {
    const dep = depsMap.get(key)
    console.log(dep)
    if (dep) {
      dep.forEach(effect => effect())
    }
  }
}

let activeEffect = null
function effect (fn) {
  console.log(fn)
  activeEffect = fn
  activeEffect()
  activeEffect = null
}
function ref (initValue) {
  return reactive({
    value: initValue
  })
}
function computed (fn) {
  const result = ref()
  effect(() => result.value = fn())
  return result
}