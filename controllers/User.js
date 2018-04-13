const mongoose = require('mongoose')
const UserModel = mongoose.model('User')
const logs = require('../helpers/logs')
const httpStatus = require('../helpers/httpStatus')

class User {
  create (req, res) {
    if (!req.body) {
      return res.status(httpStatus.NO_CONTENT).send()
    } 
    const user = { ...req.body }
    try {
      UserModel.create(user, (err, created) => {
        if (err) {
          logs(`Error on create user ${user.email}. Error: ..:: ${err.message} ::..`, 'error')
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            error: err.message
          })
        }
        logs(`Created user ${created}`)
        res.status(httpStatus.CREATED).send(created)
      })
    } catch (e) {
      logs(`Error on create user ${user.email}. Error: ..:: ${e.message} ::..`, 'error')
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        error: e.message
      })
    }
  }
  async update (req, res) {
    const userData = { ...req.user }
    const newData = { ...req.body }
    try {
      const updateObj = {
        name: newData.name || userData.name,
        age: newData.age || userData.age,
      }
      if (newData.password) {
        updateObj.password = newData.password
      }
      UserModel.findByIdAndUpdate(userData._id, updateObj, { lean: true }, function (err, updated) {
        if (err) {
          logs(`Error on findAndupdate user ${userData.email}. Error: ..:: ${err} ::..`, 'error')
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            error: err
          })
        }
        logs(`Updated user ${updated.email}`)
        return res.json(updated)
      })
    } catch (e) {
      logs(`Error on update user ${userData.email}. Error: ..:: ${e.message} ::..`, 'error')
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        error: e.message
      })
    }
  }
}

module.exports = new User()
