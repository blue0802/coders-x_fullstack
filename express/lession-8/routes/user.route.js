const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');


router.get('/', controller.list);

router.get('/create', controller.create);

router.post('/create', controller.createPost);

router.get('/:id', controller.idRoute);

router.get('/:id/delete', controller.idRouteDelete)

router.get('/:id/update', controller.idRouteUpdate)

router.post('/:id/update', controller.idRouteUpdatePost)

module.exports = router;