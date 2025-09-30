const express = require('express')
const router = express.Router()
const usersController = require('../Controllres/users')


router.post ('/api/users/rigster', usersController.register )
router.post ('/api/users/login', usersController.login)

module.exports = router