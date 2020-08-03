const shortid = require('shortid')
const db = require('../common/db')
const Session = require('../model/session.model')

module.exports = async function(req, res, next) {
    if(!req.signedCookies.sessionId) {
        let session = new Session();
        session.save()
        //let sessionId = shortid.generate()
        res.cookie('sessionId', session._id, {
            signed: true
        })

        // db.get('session')
        //   .push({ id: sessionId })
        //   .write()     
    }
    // res.locals.cart = db.get('session')
    //                     .find({ 'id': req.signedCookies.sessionId })
    //                     .value()
    res.locals.cart = await Session.findById(req.signedCookies.sessionId)
    
    next()
}