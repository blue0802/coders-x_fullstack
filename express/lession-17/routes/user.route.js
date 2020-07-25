const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate')


router.get('/', controller.list);

router.get('/:id', validate.isRoute, controller.idRoute);

router.get('/:id/delete', controller.idRouteDelete)

router.get('/:id/update', validate.idRouteUpdate, controller.idRouteUpdate)

router.post('/:id/update', validate.idRouteUpdatePost, controller.idRouteUpdatePost)

module.exports = router;