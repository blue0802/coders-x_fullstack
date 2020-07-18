const express = require('express');
const router = express.Router();
const controller = require('../controllers/transaction.controller');

router.get('/', controller.list)

router.get('/create', controller.create)

router.post('/create', controller.createPost)

module.exports = router;