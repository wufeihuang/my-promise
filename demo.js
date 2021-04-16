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
}).then((v) => {
  console.log('3', v)
})

console.log('4')

p.then(() => {
  console.log('5')
  return 3
  // throw new Error('error 6')
}).then((v) => {
  // console.log(e && e.message)
  console.log('6', v)
})