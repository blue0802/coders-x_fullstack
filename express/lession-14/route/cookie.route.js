const express = require('express');
const route = express.Router();


route.get('/', (req, res) => {
    if(res.cookies) {
        res.cookie('count', 0)
    } else {
        let count = parseInt(req.cookies.count);
        count++;
        res.cookie('count', count);
        console.log(count);
    }
    res.send("Ok")
})

module.exports = route;