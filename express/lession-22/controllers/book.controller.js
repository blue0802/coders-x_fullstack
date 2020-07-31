const db = require('../common/db')
const shortid = require('shortid')
const cloudinary = require('cloudinary').v2

module.exports = {
    list: (req, res) => {
        res.render('books/list', {
            books: db.get('books').value()
        })
    },
    create: (req, res) => {
        res.render('books/create')
    },
    info: (req, res) => {
        res.render('books/info', {
            book: db.get('books')
                    .find({ "id": req.params.id})
                    .value()
        })
    },
    update: (req, res) => {
        res.render('books/update', {
            value: db.get('books')
                     .find({ "id": req.params.id })
                     .value()
        })
    },
    delete: (req, res) => {
        db.get('books')
        .remove({ "id": req.params.id })
        .write()
        
        res.redirect('/books')
    },
    createPost: (req, res) => {
        req.body.id = shortid.generate()
        req.body.coverUrl = '/uploads/cover-default.png'
        
        db.get('books')
            .push(req.body)
            .write()
        res.redirect('/books')
    },
    updatePost: (req, res) => {
        cloudinary.uploader.upload(req.file.path, (error, result) => {
            req.body.coverUrl = result.url

            db.get('books')
              .find({ "id": req.params.id })
              .assign(req.body)
              .write()
            res.redirect('/books/' + req.params.id)  
        })
            
    }
}