const mongoose = require('mongoose')
const moment = require('moment')
const UserModel = mongoose.model('User')
const httpStatus = require('../helpers/httpStatus')
const logs = require('../helpers/logs')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || 'devmode'

class Auth {
  async login (req, res) {
    if (!req.body) {
      return res.status(httpStatus.NO_CONTENT).send()
    }
    try {
      let user = await UserModel.findByCredentials(req.body.email, req.body.password)
      if (user && user._id) {
        logs(`Logged user [${user.email}]`)
        let token = jwt.sign({ 
          _id: user._id,
          expires: moment().add(7, 'days').valueOf()
        }, secret)
        res.json({ token })
      }
    } catch (e) {
      logs(`Error on login [${e.message}]`)
      res.status(httpStatus.UNAUTHORIZED).json({
        message: e.message,
        status: httpStatus.UNAUTHORIZED
      })
    }
  }
}

module.exports = new Auth()
