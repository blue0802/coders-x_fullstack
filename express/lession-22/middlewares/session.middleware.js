const shortid = require('shortid')
const db = require('../common/db')

module.exports = function(req, res, next) {
    if(!req.signedCookies.sessionId) {
        let sessionId = shortid.generate()
        res.cookie('sessionId', sessionId, {
            signed: true
        })

        db.get('session')
          .push({ id: sessionId })
          .write()     
    }
    res.locals.cart = db.get('session')
                        .find({ 'id': req.signedCookies.sessionId })
                        .value()
    
    next()
}