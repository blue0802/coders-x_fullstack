const express = require('express')
const route = express.Router()

const controller = require('../controllers/transaction.controller')

route.get('/', controller.list)
route.post('/:id/rent', controller.rent)
route.post('/rents', controller.rentAll)

route.patch('/:id/complete', controller.complete)
route.patch('/:id/incomplete', controller.incomplete)

module.exports = route  