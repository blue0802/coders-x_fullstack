//const db = require('../common/db')
const shortid = require('shortid')
const cloudinary = require('cloudinary').v2
const Book = require('../../model/book.model')
const User = require('../../model/user.model')

module.exports = {
    list: async (req, res) => {
        let books = await Book.find()        
        res.json(books)
    },
    info: async (req, res) => {
        let book = await Book.findById(req.params.id)

        res.json(book)
    },
    delete: async (req, res) => {
        const book = await Book.deleteOne({ _id: req.params.id })        
        res.json(book)
    },
    createPost: async (req, res) => {
        req.body.coverUrl = '/uploads/cover-default.png'
        
        let book = new Book(req.body)
        book.save()
        res.json(book)
    },
    updatePost: (req, res) => {
        cloudinary.uploader.upload(req.file.path, async (error, result) => {
            req.body.coverUrl = result.url

            const book = await Book.updateOne({ _id: req.params.id }, req.body)
            res.json(book)  
        })
    }
}