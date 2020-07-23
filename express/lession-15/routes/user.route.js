const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate')
const middleware = require('../middleware/login.middleware')


router.get('/', controller.list);

router.get('/create', controller.create);

router.post('/create', validate.createPost, controller.createPost);

router.get('/:id', validate.isRoute, controller.idRoute);

router.get('/:id/delete', controller.idRouteDelete)

router.get('/:id/update', validate.idRouteUpdate, controller.idRouteUpdate)

router.post('/:id/update', validate.idRouteUpdatePost, controller.idRouteUpdatePost)

module.exports = router;