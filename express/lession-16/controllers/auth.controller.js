const db = require('../db')
const shortid = require('shortid')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var wrongLoginCount = 0;

module.exports = {
    login: (req, res) => {
        res.render('login');
    },
    create: (req, res) => {
        res.render('signup');
    },
    postLogin: async (req, res) => {  
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

        const match = await bcrypt.compare(req.body.password, acc.password);
        if (!match) {
            wrongLoginCount++;
            console.log(wrongLoginCount);
            if(wrongLoginCount === 4) {
                res.render('login', {
                    err: "You can not login!",
                    wrongLogin: true
                })
            } else {
                res.render('login', {
                    err: "Wrong password!",
                    value: req.body
                })
            }
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

        bcrypt.hash(req.body.password, saltRounds)
        .then(hash => {
            req.body.password = hash;
            req.body.id = shortid.generate();
            req.body.isAdmin = false;
            db.get('users').push(req.body).write();
            res.redirect('/auth/login');
        })
        
    },
    logout: (req, res) => {
        res.render('logout');
    },
    postLogout: (req, res) => {
        res.clearCookie("userId");
        res.redirect('/auth/login')
    }
}
