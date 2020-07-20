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
        let data = db.get('books').find({id: id}).value()
        if(data) {
            res.render('books/info', {
                book: db.get('books').find({id: id}).value()
            })
        } else {
            res.send("Not found!");
        }
    },
    idRouteUpdate: (req, res) => {
        let id = req.params.id;
        let data = db.get('books').find({id: id}).value()
        if(data) {
            res.render('books/update', {
                book: db.get('books').find({id: id}).value()
            })
        } else {
            res.send("Not found!");
        }  
    },
    idRouteUpdatePost: (req, res) => {
        let id = req.params.id;
        let data = db.get('books').find({id: id}).value()
        if(data) {
            db.get('books')
              .find({ id: id })
              .assign({ title: req.body.title })
              .write();
            res.redirect('/books');
        } else {
            res.send("Not found!");
        } 
    },
    idRouteDelete: (req, res) => {
        let id = req.params.id;
        db.get('books').remove({id: id}).write();
        res.redirect('/books');
    } 
}