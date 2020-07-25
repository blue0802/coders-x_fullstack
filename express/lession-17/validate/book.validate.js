const db = require('../db');

module.exports = {
    idRoute: (req, res, next) => {
        let id = req.params.id;
        if(db.get('books').find({id: id}).value()) {
            next();
        } else {
            res.send("Not found!");
        }
    },
    isRouteUpdate: (req, res, next) => {
        let id = req.params.id;
        if(db.get('books').find({id: id}).value()) {
            next();
        } else {
            res.send("Not found!");
        } 
    }
}