const express = require('express')
const route = express.Router()
const controller = require('../controllers/auth.controller')

route.get('/login', controller.login)

route.post('/login', controller.loginPost)

route.post('/signup', controller.signupPost)

route.post('/logout', controller.logoutPost)

module.exports = route