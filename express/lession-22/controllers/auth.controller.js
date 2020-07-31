const db = require('../common/db')
const shortid = require('shortid')
const bcrypt = require('bcrypt')

const saltRound = 10;

module.exports = {
    login: (req, res) => {
        res.render('auth/login', {
            user: db.get('users')
                    .find({ "id": req.signedCookies.userId})
                    .value()
        });
    },
    loginPost: (req, res) => {
        let user = db.get('users')
                     .find({ "username": req.body.username})
                     .value()
        res.cookie('userId', user.id, {
            signed: true
        })        
        res.redirect('/')
    }, 
    signup: (req, res) => {
        res.render('auth/signup')
    },
    signupPost: (req, res) => {
        req.body.id = shortid.generate()
        req.body.avatarUrl = '/uploads/avatar-default.png'
        bcrypt.hash(req.body.password, saltRound)
            .then(hash => {
                req.body.password = hash
                db.get('users')
                .push(req.body)
                .write()
            
                res.redirect('/auth/login')
            })
    },
    logout: (req, res) => {
        res.send()
    },
    logoutPost: (req, res) => {
        res.clearCookie('userId')
        res.clearCookie('sessionId')
        res.redirect('/auth/login')
    }
}