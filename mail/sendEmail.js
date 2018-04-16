const smtp = require('./config')
const logs = require('../helpers/logs')

const sendEmail = (template) => {
  return new Promise((resolve, reject) => {
    const options = {
      subject: 'Email subject',
      html: template || 'Test Email'
    }
    smtp.sendMail(mailOpts(options), (err, response) => {
      if(err) {
        logs(`Error on send message: ${err}`)
        reject()
      } else {
        logs(`Message sent ${response}`)
        resolve()
      }
    })
  })
}
module.exports = sendEmail
