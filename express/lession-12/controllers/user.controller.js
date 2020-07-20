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
        if(req.body.name.length <= 30) {
            db.get('users').push(req.body).write();
            res.redirect('/users');
        } else {
            res.send("Input invalid")
        }
    },
    idRoute: (req, res) => {
        let id = req.params.id;
        let data = db.get('users').find({id: id}).value();
        if(data) {
            res.render('users/info', {
                user: data
            })
        } else {
            res.send("Not found!");
        }
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
        if(data) {
            res.render('users/update', {
                user: data
            })
        } else {
            res.send("Not found!");
        }
        res.redirect('/users');
    },
    idRouteUpdatePost: (req, res) => {
        let id = req.params.id;
        if(req.body.name.length <= 30) {
            let data = db.get('users').find({id: id}).value();
            if(data) {
                db.get('users')
                  .find({ id: id })
                  .assign({ name: req.body.name })
                  .write()
            } else {
                res.send("Not found!");
            }
            res.redirect('/users');
        } else {
            res.send("Input invalid")
        }
    }
}