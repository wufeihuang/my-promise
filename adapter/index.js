const Promise = require('../index')

function deferred() {
  const obj = {}

  obj.promise = new Promise((resolve, reject) => {
    obj.resolve = resolve
    obj.reject = reject
  })

  return obj
}

function resolved(value) {
  return Promise.resolve(value)
}

function rejected(reason) {
  return Promise.reject(reason)
}

module.exports = {
  deferred,
  resolved,
  rejected,
}