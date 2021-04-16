const Promise = require('./promise')

/**
 * The Promise Resolution Procedure
 * Promise 处理过程
 */
function resolvePromise(promise, x, resolve, reject) {
  // 2.3.1 -If promise and x refer to the same object, reject promise with a TypeError as the reason.
  // 避免死循环
  if (promise === x) {
    return reject(new TypeError('The promise and the returned value should not be the same'))
  }

  // 2.3.1 If x is a promise, adopt its status [3.4]:
  // - 2.3.2.1 If x is pending, promise must remain pending until x is fulfilled or rejected.
  // - 2.3.2.2 If/when x is fulfilled, fulfill promise with the same value.
  // - 2.3.2.3 If/when x is rejected, reject promise with the same reason.
  // 说白了就是调用 then
  if (x instanceof Promise) {
    // 如果 value 是个 promise，还要继续处理
    x.then(y => {resolvePromise(promise, y, resolve, reject)}, reject)
  } 
  // 2.3.3 Otherwise, if x is an object or function,
  else if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    // 2.3.3.1 Let then be x.then. [3.5]
    // 2.3.3.2 If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason.
    // 尝试读取 x.then，读取失败则抛出错误
    // （这样做的原因是x.then可能被多次调用，作为属性有被篡改的可能性，因此提取出来，再通过 call 绑定 this 的方式确保多次调用都是同一个 then）
    let then
    try {
      then = x.then
    } catch (e) {
      return reject(e)
    }

    // 2.3.3.3 If then is a function, call it with x as this, first argument resolvePromise, and second argument rejectPromise, where:
    if (typeof x.then === 'function') {
      // 2.3.3.3.3 If both resolvePromise and rejectPromise are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored.
      let called = false
      try {
        then.call(x, (y) => {
          if (called) return
          called = true

          // 2.3.3.3.1 If/when resolvePromise is called with a value y, run [[Resolve]](promise, y)
          resolvePromise(x, y, resolve, reject)
        }, (e) => {
          if (called) return
          called = true

          // 2.3.3.3.2 If/when resolvePromise is called with a value y, run [[Resolve]](promise, y)
          return reject(e)
        })
      } catch (e) {
        // 2.3.3.3.4 If calling then throws an exception e,
        //   2.3.3.3.4.1 If resolvePromise or rejectPromise have been called, ignore it.
        // 2.3.3.3.4.2 Otherwise, reject promise with e as the reason.
        if (called) return
        return reject(e)
      }
    }

    // 2.3.3.4 If then is not a function, fulfill promise with x.
    else {
      return resolve(x)
    }
  }

  // 2.3.4 If x is not an object or function, fulfill promise with x.
  return resolve(x)
}

module.exports = resolvePromise