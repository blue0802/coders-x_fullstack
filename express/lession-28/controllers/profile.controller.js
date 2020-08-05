const db = require('../common/db')
const cloudinary = require('cloudinary').v2
const User = require('../model/user.model')

module.exports = {
    profile: async (req, res) => {
        res.render('profile/profile', {
            user: await User.findById(req.signedCookies.userId)
        })
    },
    update: async (req, res) => {
        res.render('profile/update', {
            user: await User.findById(req.signedCookies.userId)
        })
    },
    updatePost: (req, res) => {
        cloudinary.uploader.upload(req.file.path, async (error, result) => {
            req.body.avatarUrl = result.url

            await User.updateOne({ _id: req.signedCookies.userId }, req.body)
            
            res.redirect('/profile')
        })
    }
}