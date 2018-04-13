const moment = require('moment')

const logs = (text, type = 'log') => {
  const now = moment().format('DD/MM/YYYY HH:mm:ss')
  let string = typeof text === 'object' ? JSON.stringify(text) : text
  console[type](`[${now}]: ${string}`)
} 

module.exports = logs
