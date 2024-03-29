Promise.myResolve = (val) => {
  if (val && typeof val === 'object' && val instanceof Promise) {
    return val
  }
  return new Promise((resolve) => resolve(val))
}
Promise.myResolve(123123).then(res => console.log(res))

Promise.myReject = (val) => {
  return new Promise((_, reject) => reject(val))
}
Promise.myReject(new Error('hahaha')).then(
  res => {
    console.log(res)
  },
  err => {
    console.log('错误', err)
  }
)

Promise.myAll = (promises) => {
  return new Promise((resolve, reject) => {
    const result = []
    let count = 0

    if (!promises.length) return resolve([])
    promises.forEach((p, i) => {
      Promise.resolve(p).then(res => {
        console.log('执行了')
        count++
        result.push(res)
        if (count === promises.length) {
          console.log(result)
          resolve(result)
        }
      }).catch(err => {
        reject(err)
      })
    })
  })
}
const p1 = Promise.resolve(11)
const p2 = Promise.reject(22)
const p3 = Promise.resolve(33)
Promise.all([
  p1,
  p2,
  p3
])
Promise.myAll([
  p1,
  p2,
  p3
]).then(res => console.log('myAll', res)).catch(err => console.log('myAll错误', err))

Promise.myAllSettled = (promises) => {
  const result = []
  let count = 0

  if (!promises.length) return resolve([])
  return new Promise((resolve, reject) => {
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(res => {
          count++
          result[i] = { status: 'fulfilled', value: res }
          if (count === promises.length) {
            resolve(result)
          }
        })
        .catch(err => {
          count++
          result[i] = { status: 'rejected', reason: err }
          if (count === promises.length) {
            resolve(result)
          }
        })
    })
  })
}
Promise.allSettled([
  p1,
  p2,
  p3
]).then(res => console.log('allSettled', res)).catch(err => console.log('allSettled错误', err))
Promise.myAllSettled([
  p1,
  p2,
  p3
]).then(res => console.log('myAllSettled', res)).catch(err => console.log('myAllSettled错误', err))

Promise.myRace = (promises) => {
  return new Promise((resolve, reject) => {
    promises.forEach((p, i) => {
      return Promise.resolve(p)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  })
}
Promise.race([
  p1,
  p2,
  p3
]).then(res => console.log('race', res)).catch(err => console.log('race错误', err))
Promise.myRace([
  p1,
  p2,
  p3
]).then(res => console.log('myRace', res)).catch(err => console.log('myRace错误', err))

class MyPromise {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  constructor (func) {
    this.PromiseState = MyPromise.PENDING
    this.PromiseResult = null
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
    try {
      func(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }
  resolve (result) {
    if (this.PromiseState === MyPromise.PENDING) {
      setTimeout(() => {
        this.PromiseState = MyPromise.FULFILLED
        this.PromiseResult = result
        this.onFulfilledCallbacks.forEach(cb => {
          cb(result)
        })
      })
    }
  }
  reject (reason) {
    if (this.PromiseState === MyPromise.PENDING) {
      setTimeout(() => {
        this.PromiseState = MyPromise.REJECTED
        this.PromiseResult = reason
        this.onRejectedCallbacks.forEach(cb => {
          cb(reason)
        })
      })
    }
  }
  then (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onReject === 'function' ? onRejected : reason => {
      throw reason
    }
    if (this.PromiseState === MyPromise.PENDING) {
      this.onFulfilledCallbacks.push(onFulfilled)
      this.onRejectedCallbacks.push(onRejected)
    }
    if (this.PromiseState === MyPromise.FULFILLED) {
      setTimeout(() => {
        onFulfilled(this.PromiseResult)
      })
    }
    if (this.PromiseState === MyPromise.REJECTED) {
      setTimeout(() => {
        onRejected(this.PromiseResult)
      })
    }
    return new MyPromise((resolve, reject) => {
      if (this.PromiseState === MyPromise.PENDING) {
        this.onFulfilledCallbacks.push(onFulfilled)
        this.onRejectedCallbacks.push(onRejected)
      }
      if (this.PromiseState === MyPromise.FULFILLED) {
        setTimeout(() => {
          onFulfilled(this.PromiseResult)
        })
      }
      if (this.PromiseState === MyPromise.REJECTED) {
        setTimeout(() => {
          onRejected(this.PromiseResult)
        })
      }
    })
  }
}

// const pTest = new MyPromise((resolve, reject) => {
//   // resolve('pass')
//   throw new Error('error')
// })
//   .then(
//     res => {
//       console.log(res)
//     },
//     reason => {
//       console.log(reason);
//     }
//   )

// 测试代码
console.log(1);
let promise1 = new MyPromise((resolve, reject) => {
  console.log(2);
  setTimeout(() => {
    resolve('haha');
    console.log(4);
  })
})
promise1.then(
  result => {
    console.log('fulfilled:', result);
  },
  reason => {
    console.log('rejected:', reason)
  }
).then((res) => {
  console.log('then2', res);
})
console.log(3);
