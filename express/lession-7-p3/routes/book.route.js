const express = require('express');
const router = express.Router();
const db = require('../db');
const shortid = require('shortid');

//initial and show list book page
router.get('/', (req, res) => {
    res.render('books/list', {
        books: db.get('books').value()
    });
})

//initial create book page and make add book feature
router.get('/create', (req, res) => {
    res.render('books/create');
})

router.post('/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect('/books');
})

//show detail the book
router.get('/:id', (req, res) => {
    let id = req.params.id;
    res.render('books/info', {
        book: db.get('books').find({id: id}).value()
    })
})

//update title book
router.get('/:id/update', (req, res) => {
    let id = req.params.id;
    res.render('books/update', {
        book: db.get('books').find({id: id}).value()
    })
})

router.post('/:id/update', (req, res) => {
    let id = req.params.id;
    db.get('books')
      .find({ id: id })
      .assign({ title: req.body.title })
      .write();
    res.redirect('/books');
})

//delete book
router.get('/:id/delete', (req, res) => {
    let id = req.params.id;
    db.get('books').remove({id: id}).write();
    res.redirect('/books');
})

module.exports = router;