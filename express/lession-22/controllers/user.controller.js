const db = require('../common/db')

module.exports = {
    list: (req, res) => {
        res.render('users/list', {
            users: db.get('users').value()
        });
    },
    idRoute: (req, res) => {
        let user = db.get('users')
                     .find({ "id": req.params.id })
                     .value()

        res.render('users/info', {
            acc: user
        })
    },
    removeUser: (req, res) => {
        db.get('users')
          .remove({ "id":  req.params.id})
          .write()
        
        res.redirect('/users')
    }
}