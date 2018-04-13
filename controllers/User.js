const mongoose = require('mongoose')
const UserModel = mongoose.model('User')
const logs = require('../helpers/logs')
const httpStatus = require('../helpers/httpStatus')

class User {
  async create (req, res) {
    if (!req.body) {
      return res.status(httpStatus.NO_CONTENT).send()
    } 
    const user = { ...req.body }
    try {
      let created = await UserModel.create(user)
      logs(`Created user ${created.email}`)
      res.status(httpStatus.CREATED).json(created)
    } catch (e) {
      logs(`Error on create user ${user.email}. Error: ..:: ${e.message} ::..`, 'error')
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        error: e.message
      })
    }
  }
  async update (req, res) {
    const user = { ...req.user }
    const newData = { ...req.body }
    logs('User token ' + JSON.stringify(user))
    logs('New data ' + JSON.stringify(newData))
    res.send()
  }
}

module.exports = new User()
