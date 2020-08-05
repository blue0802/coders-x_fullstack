const db = require('../common/db')
const shortid = require('shortid')
const cloudinary = require('cloudinary').v2
const Book = require('../model/book.model')
const User = require('../model/user.model')

module.exports = {
    list: async (req, res) => {
        // res.render('books/list', {
        //     books: db.get('books').value()
        // })
        let books = await Book.find()
        let user = await User.findById(req.signedCookies.userId)
        
        res.render('books/list', {
            books: books,
            user: user
        })
    },
    create: async (req, res) => {
        let user = await User.findById(req.signedCookies.userId)
        res.render('books/create', {
            user: user
        })
    },
    info: async (req, res) => {
        // res.render('books/info', {
        //     book: db.get('books')
        //             .find({ "id": req.params.id})
        //             .value()
        // })
        let book = await Book.findById(req.params.id)
        let user = await User.findById(req.signedCookies.userId)

        res.render('books/info', {
            book: book,
            user: user
        })
    },
    update: async (req, res) => {
        // res.render('books/update', {
        //     value: db.get('books')
        //              .find({ "id": req.params.id })
        //              .value()
        // })
        let book = await Book.findById(req.params.id)
        let user = await User.findById(req.signedCookies.userId)

        res.render('books/update', {
            value: book,
            user: user
        })
    },
    delete: async (req, res) => {
        // db.get('books')
        // .remove({ "id": req.params.id })
        // .write()

        await Book.deleteOne({ _id: req.params.id })
        
        res.redirect('/books')
    },
    createPost: async (req, res) => {
        // req.body.id = shortid.generate()
        req.body.coverUrl = '/uploads/cover-default.png'
        
        // db.get('books')
        //   .push(req.body)
        //   .write()
        
        let book = new Book(req.body)
        book.save()
        console.log(await Book.find())
        res.redirect('/books')
    },
    updatePost: (req, res) => {
        cloudinary.uploader.upload(req.file.path, async (error, result) => {
            req.body.coverUrl = result.url

            // db.get('books')
            //   .find({ "id": req.params.id })
            //   .assign(req.body)
            //   .write()
            
            await Book.updateOne({ _id: req.params.id }, req.body)
            res.redirect('/books/' + req.params.id)  
        })
    }
}