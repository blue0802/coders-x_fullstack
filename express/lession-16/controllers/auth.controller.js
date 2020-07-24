const db = require('../db')
const shortid = require('shortid')
const md5 = require('md5')

module.exports = {
    login: (req, res) => {
        res.render('login');
    },
    create: (req, res) => {
        res.render('signup');
    },
    postLogin: (req, res) => {  
        let acc = db.get('users')
                    .find({"email": req.body.email})
                    .value()
        if(!acc) {
            res.render('login', {
                err: "Account does not exist!",
                value: req.body
            })
            return;
        } 
        if (acc.password !== md5(req.body.password)) {
            res.render('login', {
                err: "Wrong password!",
                value: req.body
            })
            return;
        }
        
        res.cookie('userId', acc.id);
        res.redirect('/users');
    },
    postCreate: (req, res) => {  
        let userEmail = db.get('users')
                          .find({"email": req.body.email})
                          .value()
        let username = db.get('users')
                          .find({"username": req.body.username})
                          .value()
        if(userEmail) {
            res.render('signup', {
                err: "Account is taken!",
                value: req.body
            })
            return;
        } 
        
        if(username) {
            res.render('signup', {
                err: "Username is exist!",
                value: req.body
            })
            return;
        }

        req.body.id = shortid.generate();
        req.body.isAdmin = false;
        req.body.password = md5(req.body.password);
        db.get('users').push(req.body).write();
        res.redirect('/auth/login');
    },
    logout: (req, res) => {
        res.render('logout');
    },
    postLogout: (req, res) => {
        res.clearCookie("userId");
        res.redirect('/auth/login')
    }
}
