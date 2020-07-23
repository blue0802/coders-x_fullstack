const express = require('express')
const controller = require('../controllers/auth.controller')

const route = express.Router();

route.get('/login', controller.login);
route.post('/login', controller.postLogin);

module.exports = route;