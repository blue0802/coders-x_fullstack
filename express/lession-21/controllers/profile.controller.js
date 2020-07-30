const db = require('../common/db')
const cloudinary = require('cloudinary').v2

module.exports = {
    profile: (req, res) => {
        res.render('profile/profile', {
            user: db.get('users')
                       .find({ "id": req.signedCookies.userId })
                       .value()
        })
    },
    update: (req, res) => {
        res.render('profile/update', {
            user: db.get('users')
                       .find({ "id": req.signedCookies.userId })
                       .value()
        })
    },
    updatePost: (req, res) => {
        cloudinary.uploader.upload(req.file.path, (error, result) => {
            req.body.avatarUrl = result.url

            db.get('users')
              .find({ "email": req.body.email})
              .assign(req.body)
              .write()
            
              res.redirect('/profile')
        })
    }
}