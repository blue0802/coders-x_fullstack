const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');

const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ books: []})
  .write()

const app = express();

const port = process.env.port || 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//initial home page
app.get('/', (req, res) => {
    res.render('index');
})

//initial and show list book page
app.get('/books', (req, res) => {
    res.render('books/list', {
        books: db.get('books').value()
    });
})

//initial create book page and make add book feature
app.get('/books/create', (req, res) => {
    res.render('books/create');
})

app.post('/books/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect('/books');
})

//show detail the book
app.get('/books/:id', (req, res) => {
    let id = req.params.id;
    res.render('books/info', {
        book: db.get('books').find({id: id}).value()
    })
})

//update title book
app.get('/books/:id/update', (req, res) => {
    let id = req.params.id;
    res.render('books/update', {
        book: db.get('books').find({id: id}).value()
    })
})

app.post('/books/:id/update', (req, res) => {
    let id = req.params.id;
    db.get('books')
      .find({ id: id })
      .assign({ title: req.body.title })
      .write();
    res.redirect('/books');
})

//delete book
app.get('/books/:id/delete', (req, res) => {
    let id = req.params.id;
    db.get('books').remove({id: id}).write();
    res.redirect('/books');
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})