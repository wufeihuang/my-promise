const Promise = require('./index')

const p = new Promise((resolve, reject) => {
  console.log('0')

  setTimeout(() => {
    console.log('1')
    resolve()
  }, 200)
})

p.then(() => {
  console.log('2')
  return 2
})
.then()
.then((v) => {
  console.log('3', v)
})

console.log('4')

p.then(() => {
  console.log('5')
  return 3
})
.then((v) => {
  console.log('6', v)
  throw new Error('7')
})
.finally(() => {
  console.log('finally a')
  return 100
})
.then(console.log)
.catch((e) => {
  console.log('error', e.message)
})