const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

require('dotenv').config()

const authRoute = require('./routes/auth.route')
const usersRoute = require('./routes/user.route')
const booksRoute = require('./routes/book.route')
const transactionsRoute = require('./routes/transaction.route')
const profileRoute = require('./routes/profile.route')

const requireAuth = require('./middlewares/requireAuth.middleware')
const db = require('./common/db')

const app = express()

const port = process.env.port || 3000

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 

app.use(express.static('public'))
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use('/auth', authRoute)
app.use('/users', requireAuth.login, usersRoute)
app.use('/books', requireAuth.login, booksRoute)
app.use('/transactions', requireAuth.login, transactionsRoute)
app.use('/profile', profileRoute)

app.get('/', (req, res) => {
    res.render('index', {
        user: db.get('users')
                .find({ "id": req.signedCookies.userId})
                .value()
    });
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})