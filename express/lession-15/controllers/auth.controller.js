const db = require('../db')

module.exports = {
    login: (req, res) => {
        res.render('login');
    },
    postLogin: (req, res) => {  
        let acc = db.get('users')
                    .find({"name": req.body.name})
                    .value()
        if(!acc) {
            res.render('login', {
                err: "Username does not exist!",
                value: req.body
            })
            return;
        } 
        
        if (acc.password !== req.body.password) {
            res.render('login', {
                err: "Wrong password!",
                value: req.body
            })
            return;
        }
        
        res.cookie('userId', acc.id);
        res.redirect('/users');
    }
}
