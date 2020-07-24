const db = require('../db');

module.exports = {
    createPost: (req, res, next) => {
        if(req.body.name.length <= 30) {
            next();
        } else {
            res.send("Input invalid")
        }
    },
    isRoute: (req, res, next) => {
        let id = req.params.id;
        if(db.get('users').find({id: id}).value()) {
            next();
        } else {
            res.send("Not found!");
        }
    },
    idRouteUpdate: (req, res, next) => {
        let id = req.params.id;
        if(db.get('users').find({id: id}).value()) {
            next();
        } else {
            res.send("Not found!");
        }
    },
    idRouteUpdatePost: (req, res, next) => {
        if(req.body.name.length <= 30) {
            next();
        } else {
            res.send("Input invalid")
        }
    }
}