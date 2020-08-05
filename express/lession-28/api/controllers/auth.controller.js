const shortid = require('shortid')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../../model/user.model')

const saltRound = 10;

module.exports = {
    login: async (req, res) => {
        let user = await User.findById(req.signedCookies.userId)
        res.render('auth/login', {
            user: user
        })
    },
    loginPost: async (req, res) => {
        let user = await User.findOne({ "username": req.body.username})
        res.cookie('userId', user._id, {
            signed: true
        })        
        res.json(user)
    }, 
    signupPost: async (req, res) => {
        req.body.avatarUrl = '/uploads/avatar-default.png'
        let hash = await bcrypt.hash(req.body.password, saltRound);
        req.body.password = hash
        let user = new User(req.body)
        const userSave = await user.save()         
        res.json(userSave)
            
    },
    logoutPost: (req, res) => {
        res.clearCookie('userId')
        res.clearCookie('sessionId')
        res.json()
    }
}