const shortid = require('shortid')
const User = require('../../model/user.model')
const Book = require('../../model/book.model')
const Transaction = require('../../model/transaction.model')
const Session = require('../../model/session.model')

module.exports = {
    list: async (req, res) => {
        let transactions = await Transaction.find()
        res.json(transactions)
    },
    rent: async (req, res) => {
        let account = User.findById({ _id: req.signedCookies.userId })
        let book = Book.findById({ _id: req.params.id })

        let transaction = new Transaction({
            account: account.username,
            book: book.title,
            isComplete: false
        })
        const transactionSave = await transaction.save()

        res.json(transactionSave)
    },
    complete: async (req, res) => {
        const transaction = await Transaction.updateOne({ _id: req.params.id }, { isComplete: true })
        res.json(transaction)
    },
    incomplete: async (req, res) => {
        const transaction = await Transaction.updateOne({ _id: req.params.id }, { isComplete: false })

        res.json(transaction)
    },
    rentAll: async (req, res) => {
        if(req.signedCookies.userId) {
            let session = await Session.findById(req.signedCookies.sessionId)
            let account = await User.findById(req.signedCookies.userId)

            for (const bookId in session.cart) {
                let book = await Book.findById(bookId)

                let transaction = new Transaction({
                    account: account.username,
                    book: book.title,
                    isComplete: false
                })
                
                await transaction.save()
            }
    
            res.json()
        }
    }
}