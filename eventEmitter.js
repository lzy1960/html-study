let state = {
  obj: {
    name: 'zs',
    age: 18
  }
}


class EventEmitter {
  constructor () {
    this._events = {}
  }

  // 订阅方法
  on (eventName, callback) {
    const callbacks = this._events[eventName] || []
    callbacks.push(callback)
    this._events[eventName] = callbacks
  }

  // 发布方法
  emit (eventName, ...args) {
    const callbacks = this._events[eventName] || []
    callbacks.forEach(cb => {
      cb(...args)
    });
    console.log(this._events);
    console.log(callbacks);
  }

  // 取消订阅方法
  off (eventName, callback) {
    const callbacks = this._events[eventName] || []
    const newCallbacks = callbacks.filter(fn => fn != callback)
    this._events[eventName] = newCallbacks;
  }
}

// 测试
const events = new EventEmitter()
events.on('hello', (eventName) => {
  console.log(eventName);
  console.log('Hello world!')
})
events.emit('hello', 'haha')
events.emit('hello', '123')
events.off('hello', (eventName) => {
  console.log('是哈哈哈', eventName);
  console.log('取消了hello事件')
  console.log(this._events)
})
