const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user.route')
const bookRoute = require('./routes/book.route')
const transactionRoute = require('./routes/transaction.route')

const app = express();

const port = process.env.port || 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', userRoute);
app.use('/books', bookRoute);
app.use('/transactions', transactionRoute);

//initial home page
app.get('/', (req, res) => {
    res.render('index');
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})