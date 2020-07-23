module.exports = {
    requireAuth: (req, res, next) => {
        if(!req.cookies.userId) {
            res.redirect("/auth/login");
        } else {
            next();  
        }
    }
}