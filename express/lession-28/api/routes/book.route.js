const express = require('express')
const route = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'public/uploads/' })

const controller = require('../controllers/book.controller')

route.get('/', controller.list)
route.get('/:id', controller.info)
route.delete('/:id/delete', controller.delete)
route.post('/create', controller.createPost)
route.patch('/:id/update', upload.single('cover'), controller.updatePost)


module.exports = route