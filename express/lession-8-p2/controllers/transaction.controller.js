const db = require('../db');
const shortid = require('shortid');

module.exports = {
    list: (req, res) => {
        res.render('transactions/list', {
            id: db.get('id').value()
        })
    },
    create: (req, res) => {
        res.render('transactions/create', {
            users: db.get('users').value(),
            books: db.get('books').value()
        });
    },
    createPost: (req, res) => {
        req.body.id = shortid.generate();
        req.body.isComplete = false;
        db.get('id')
          .push(req.body)
          .write();
        res.redirect('/transactions');
    },
    idIsComplete: (req, res) => {
        let id = req.params.id;
        res.render('transactions/check', {
            id: db.get('id').find({id: id}).value()
        })
    },
    save: (req, res) => {
        let id = req.params.id;
        if(req.body.isComplete) {
            req.body.isComplete = true;
        } else {
            req.body.isComplete = false;
        }
        console.log(req.body)
        db.get('id')
          .find({ id: id })
          .assign(req.body)
          .write()
        res.redirect("/transactions")
    }
}