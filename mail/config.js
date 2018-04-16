const nodemailer = require('nodemailer')

const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.google.com',
  auth: {
    user: 'myemail@email.com.br',
    pass: 'mypassword'
  }
})
module.exports = smtpTransport
