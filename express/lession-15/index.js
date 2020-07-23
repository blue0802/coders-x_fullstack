const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/user.route')
const bookRoute = require('./routes/book.route')
const authRoute = require('./routes/auth.route')
const transactionRoute = require('./routes/transaction.route')

const middleware = require('./middleware/login.middleware')

const app = express();

const port = process.env.port || 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/users', middleware.requireAuth, userRoute);
app.use('/books', middleware.requireAuth, bookRoute);
app.use('/auth', authRoute);
app.use('/transactions', middleware.requireAuth, transactionRoute);
app.use(express.static('public'));

//initial home page
app.get('/', (req, res) => {
    res.render('index');
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})