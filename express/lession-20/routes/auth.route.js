const express = require('express')
const controller = require('../controllers/auth.controller')

const route = express.Router();

route.get('/login', controller.login);
route.get('/create', controller.create);
route.post('/login', controller.postLogin);
route.post('/create', controller.postCreate);
route.get('/logout', controller.logout);
route.post('/logout', controller.postLogout);

module.exports = route;