const express = require('express');
const router = express.Router();
const controller = require('../controllers/book.controller')
const validate = require('../validate/book.validate')

//initial and show list book page
router.get('/', controller.list)

//initial create book page and make add book feature
router.get('/create', controller.create)

router.post('/create', controller.createPost)

//show detail the book
router.get('/:id', validate.idRoute, controller.idRoute)

//update title book
router.get('/:id/update', validate.isRouteUpdate, controller.idRouteUpdate)

router.post('/:id/update', controller.idRouteUpdatePost)

//delete book
router.get('/:id/delete', controller.idRouteDelete)

module.exports = router;