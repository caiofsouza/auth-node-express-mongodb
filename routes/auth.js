const { Router } = require('express')
const AuthController = require('../controllers/Auth')
const router = Router()

router.post('/', AuthController.login)

module.exports = router
