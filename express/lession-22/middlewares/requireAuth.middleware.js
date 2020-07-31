const db = require('../common/db')


module.exports = {
    login: (req, res, next) => {
        let userId = req.signedCookies.userId
        if(userId) {
            res.locals.user = db.get('users')
                                .find({ "id": userId })
                                .value()
            res.locals.userId = true

            next()
        } else {
            res.redirect('/auth/login')
        }
        
    }
}