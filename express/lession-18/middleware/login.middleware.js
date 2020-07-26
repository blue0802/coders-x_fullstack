const db = require('../db')

module.exports = {
    requireAuth: (req, res, next) => {
        if(!req.signedCookies.userId) {
            res.redirect("/auth/login");
        } else {
            res.locals.user = db.get('users')
                                .find({ "id": req.signedCookies.userId })
                                .value()
            next();  
        }
    },
    isAdmin: (req, res, next) => {
        let isAdmin = db.get('users')
                        .find({ "id": req.signedCookies.userId})
                        .value().isAdmin
        if(!isAdmin) {
            next();
            return;
        }
        res.redirect('/')
    }
}