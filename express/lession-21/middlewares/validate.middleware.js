const db = require('../common/db')
const bcrypt = require('bcrypt')

const saltRound = 10;

let count = 0;

module.exports = {
    login: async (req, res, next) => {
        let account = db.get('users')
                            .find({ "username": req.body.username })
                            .value()

        if(!account) {
            res.render('auth/login', {
                err: "Account does not exist!",
                value: req.body
            })
            return;
        }

        let match = await bcrypt.compare(req.body.password, account.password)

        if (!match) {
            res.render('auth/login', {
                err: "Password wrong!",
                value: req.body
            })
        } else {
            next()
        }
    },
    signup: (req, res, next) => {
        let hasEmail = db.get('users')
                         .find({ "email": req.body.email })
                         .value()

        let hasUsername = db.get('users')
                            .find({ "username": req.body.username })
                            .value()
    
        if(hasEmail) {
            res.render('auth/signup', {
                err: "Email da duoc su dung!",
                value: req.body
            })
        } else if (hasUsername) {
            res.render('auth/signup', {
                err: "Username da duoc su dung!",
                value: req.body
            })
        } else {
            next()
        }
    },
    checkBook: (req, res, next) => {
        let hasBook = db.get('books')
                        .find({ "title": req.body.title })
                        .value()
        if(hasBook) {
            res.render('books/create', {
                err: "The book's title is exist!",
                value: req.body
            })
        } else {
            next()
        }
    }
}