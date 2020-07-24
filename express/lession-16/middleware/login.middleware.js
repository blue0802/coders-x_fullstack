const db = require('../db')

module.exports = {
    requireAuth: (req, res, next) => {
        if(!req.cookies.userId) {
            res.redirect("/auth/login");
        } else {
            next();  
        }
    },
    isAdmin: (req, res, next) => {
        let isAdmin = db.get('users')
                        .find({ "id": req.cookies.userId})
                        .value().isAdmin
        if(!isAdmin) {
            next();
        }
        res.redirect('/')
    }
}