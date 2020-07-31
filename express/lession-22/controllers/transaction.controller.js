const db = require('../common/db')
const shortid = require('shortid')

module.exports = {
    list: (req, res) => {
        res.render('transactions/list', {
            transactions: db.get('transactions')
                           .value()
        })
    },
    rent: (req, res) => {
        let account = db.get('users')
                       .find({ "id": req.signedCookies.userId })
                       .value()
        let book = db.get('books')
                     .find({ "id": req.params.id })
                     .value()

        let transaction = {
            id: shortid.generate(),
            account: account.username,
            book: book.title,
            isComplete: false
        }
        db.get('transactions')
          .push(transaction)
          .write()

        res.redirect('/transactions')
    },
    complete: (req, res) => {
        db.get('transactions')
          .find({ "id": req.params.id })
          .assign({ "isComplete": true })
          .write()

          res.redirect('/transactions')
    },
    incomplete: (req, res) => {
        db.get('transactions')
          .find({ "id": req.params.id })
          .assign({ "isComplete": false })
          .write()

          res.redirect('/transactions')
    },
    rentAll: (req, res) => {
        if(req.signedCookies.userId) {
            let session = db.get('session')
                            .find({ id: req.signedCookies.sessionId })
                            .value()

            let account = db.get('users')
                            .find({ id: req.signedCookies.userId })
                            .value()

            for (const bookId in session.cart) {
                let book = db.get('books')
                                 .find({ id: bookId })
                                 .value()

                let transaction = {
                    id: shortid.generate(),
                    account: account.username,
                    book: book.title,
                    isComplete: false
                }
                
                db.get('transactions')
                  .push(transaction)
                  .write()
            }
    
            res.redirect('/transactions')
        }
    }
}