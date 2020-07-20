const express = require('express');
const router = express.Router();
const controller = require('../controllers/transaction.controller');

router.get('/', controller.list)

router.get('/create', controller.create)

router.post('/create', controller.createPost)

router.get('/:id/is-complete', controller.idIsComplete)

router.post('/:id/is-complete', controller.save)

module.exports = router;