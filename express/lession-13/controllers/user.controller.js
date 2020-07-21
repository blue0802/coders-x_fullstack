const db = require('../db');
const shortid = require('shortid');

module.exports = {
    list: (req, res) => {
        res.render('users/list', {
            users: db.get('users').value()
        });
    },
    create: (req, res) => {
        res.render('users/create');
    },
    createPost: (req, res) => {
        req.body.id = shortid.generate();
        db.get('users').push(req.body).write();
        res.redirect('/users');
    },
    idRoute: (req, res) => {
        let id = req.params.id;
        res.render('users/info', {
            user: db.get('users').find({id: id}).value()
        })
    },
    idRouteDelete: (req, res) => {
        let id = req.params.id;
        db.get('users')
          .remove({ id: id })
          .write()
        res.redirect('/users');
    },
    idRouteUpdate: (req, res) => {
        let id = req.params.id;
        let data = db.get('users').find({id: id}).value();
        res.render('users/update', {
            user: db.get('users').find({id: id}).value()
        })
        res.redirect('/users');
    },
    idRouteUpdatePost: (req, res) => {
        let id = req.params.id;
        let data = db.get('users').find({id: id}).value();
        db.get('users')
            .find({ id: id })
            .assign({ name: req.body.name })
            .write()
        res.redirect('/users');
    }
}