const db = require('../db');

module.exports = {
    list: (req, res) => {
        let page = parseInt(req.query.page || 1);
        let perPage = 10;
        let start = perPage * (page - 1);
        let end = perPage * page;

        res.render('users/list', {
            users: db.get('users').value().slice(start, end),
            page: {
                prev: page - 1,
                current: page,
                next: page + 1,
                nextDouble: page + 2
            }
        });
    },
    idRoute: (req, res) => {
        let id = req.params.id;
        res.render('users/info', {
            user: db.get('users').find({id: id}).value()
        })
    },
    idRouteDelete: (req, res) => {
        let id = req.params.id;
        db.get('users')
          .remove({ id: id })
          .write()
        res.redirect('/users');
    },
    idRouteUpdate: (req, res) => {
        let id = req.params.id;
        let data = db.get('users').find({id: id}).value();
        res.render('users/update', {
            user: db.get('users').find({id: id}).value()
        })
        res.redirect('/users');
    },
    idRouteUpdatePost: (req, res) => {
        let id = req.params.id;
        let data = db.get('users').find({id: id}).value();
        db.get('users')
            .find({ id: id })
            .assign({ name: req.body.name })
            .write()
        res.redirect('/users');
    }
}