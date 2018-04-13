const mongoose = require('mongoose')
const UserModel = mongoose.model('User')
const httpStatus = require('../helpers/httpStatus')
const logs = require('../helpers/logs')

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: httpStatus.UNAUTHORIZED,
      message: 'Not authorized'
    })
  }
  let token = req.headers.authorization
  try {
    let user = await UserModel.findByToken(token)
    if (user) {
      req.user = user.toJSON()
      next()
    } else {
      return res.status(httpStatus.NO_CONTENT).json({
        status: httpStatus.NO_CONTENT,
        message: 'Not found'
      })
    }
  } catch (e) {
    logs(`Error [${e}]`)
    return res.status(httpStatus.NO_CONTENT).json({
      status: httpStatus.NO_CONTENT,
      message: e
    })
  }
}

module.exports = auth
