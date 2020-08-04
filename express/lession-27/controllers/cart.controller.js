const db = require("../common/db")
const Session = require('../model/session.model')
const Book = require('../model/book.model')

module.exports = {
    addToCart: async (req, res) => {
        let sessionId = req.signedCookies.sessionId
        let bookId = req.params.id
        
        if(!sessionId) {
            res.redirect('/books')
            return
        }

        // let amount = db.get('session')
        //               .find({ 'id': sessionId })
        //               .get('cart.' + bookId, 0)
        //               .value()
        let amount = await Session.findById(sessionId)

        if(!amount.cart) {
          if(!amount.cart[bookId]) {
            
          }
        }

        db.get('session')
          .find({ 'id': sessionId })
          .set('cart.' + bookId, amount + 1)
          .write()

        let cart = db.get('session')
                     .find({ 'id': sessionId })
                     .value()
                     .cart
        let total = 0;
        for(item in cart) {
            total += cart[item]
        }
        db.get('session')
          .find({ 'id': sessionId })
          .set('total', total)
          .write()
        
        res.redirect('/books')
    }
}