const db = require('../db');
const shortid = require('shortid');

module.exports = {
    list: (req, res) => {
        res.render('books/list', {
            books: db.get('books').value()
        });
    },
    create: (req, res) => {
        res.render('books/create');
    },
    createPost: (req, res) => {
        req.body.id = shortid.generate();
        db.get('books').push(req.body).write();
        res.redirect('/books');
    },
    idRoute: (req, res) => {
        let id = req.params.id;
        res.render('books/info', {
            book: db.get('books').find({id: id}).value()
        })
    },
    idRouteUpdate: (req, res) => {
        let id = req.params.id;
        res.render('books/update', {
            book: db.get('books').find({id: id}).value()
        })  
    },
    idRouteUpdatePost: (req, res) => {
        let id = req.params.id;
        db.get('books')
          .find({ id: id })
          .assign({ title: req.body.title })
          .write();
        res.redirect('/books');
    },
    idRouteDelete: (req, res) => {
        let id = req.params.id;
        db.get('books').remove({id: id}).write();
        res.redirect('/books');
    } 
}