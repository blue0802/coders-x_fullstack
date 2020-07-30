const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ 
    users: [
        { 
            id: "0f0-vSqDv",
            username: "admin82",
            email: "admin82@gmail.com",
            password: "000000",
            isAdmin: true
        }
    ], 
    books: [], 
    transactions: [] 
}).write()

module.exports = db;