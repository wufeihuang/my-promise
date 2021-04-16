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
}).then(() => {
  console.log('3')
})

console.log('4')

p.then(() => {
  console.log('5')
  throw new Error('error 6')
}).catch((e) => {
  console.log(e && e.message)
})