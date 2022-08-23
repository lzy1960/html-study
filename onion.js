function onion (middleware) {
  return async function () {
    let args = arguments
    await dispatch(0)
    async function dispatch (i) {
      const fn = middleware[i]
      if (!fn) {
        return null
      }
      await fn(function next () {
        dispatch(i + 1)
      }, ...args)
    }
  }
}
let middleware = [
  (next) => {
    console.log(0);
    next()
    console.log(4);
  },
  (next) => {
    console.log(1);
    next()
    console.log(3);
  },
  (next) => {
    console.log(2);
  }
]

let fn = onion(middleware)
fn(1, 2, 3)
