const express = require('express');
const router = express.Router();
const db = require('../db');
const shortid = require('shortid');

router.get('/', (req, res) => {
    res.render('transactions/list', {
        id: db.get('id').value()
    })
})

router.get('/create', (req, res) => {
    res.render('transactions/create', {
        users: db.get('users').value(),
        books: db.get('books').value()
    });
})

router.post('/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('id')
      .push(req.body)
      .write();
    res.redirect('/transactions');
})

module.exports = router;