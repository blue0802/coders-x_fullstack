const express = require('express')
const routeCookie = require('./route/cookie.route')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser())
app.use('/cookie', routeCookie)

const port = process.env.port || 3000

app.get('/', (req, res) => {
    res.send("I love CodersX");
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})