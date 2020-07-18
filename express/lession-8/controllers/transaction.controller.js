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
        db.get('id')
          .push(req.body)
          .write();
        res.redirect('/transactions');
    }
}