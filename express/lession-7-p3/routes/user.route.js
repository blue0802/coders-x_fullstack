const express = require('express');
const router = express.Router();
const db = require('../db');
const shortid = require('shortid');

router.get('/', (req, res) => {
    res.render('users/list', {
        users: db.get('users').value()
    });
})

router.get('/create', (req, res) => {
    res.render('users/create');
})

router.post('/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
})

router.get('/:id', (req, res) => {
    let id = req.params.id;
    res.render('users/info', {
        user: db.get('users').find({id: id}).value()
    })
})

router.get('/:id/delete', (req, res) => {
    let id = req.params.id;
    db.get('users')
      .remove({ id: id })
      .write()
    res.redirect('/users');
})

router.get('/:id/update', (req, res) => {
    let id = req.params.id;
    res.render('users/update', {
        user: db.get('users').find({id: id}).value()
    })
})

router.post('/:id/update', (req, res) => {
    let id = req.params.id;
    db.get('users')
      .find({ id: id })
      .assign({ name: req.body.name })
      .write()
    res.redirect('/users');
})

module.exports = router;