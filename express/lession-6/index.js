const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const bodyParser = require('body-parser');
const shortid = require('shortid');

const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({items: []})
  .write()

const app = express();

const port = process.env.port || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/todos', (req, res) =>{
    res.render('todos/list', {
        items: db.get('items').value()
    });
})

app.get('/todos/create', (req, res) => {
    res.render('todos/create');
})

app.post('/todos/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('items').push(req.body).write();
    res.redirect('/todos');
})

app.get('/todos/:id/delete', (req, res)=> {
    let id = req.params.id;
    let items = db.get('items').value();
    for (let i = 0; i < items.length; i++) {
        if(items[i].id === id) {
            db.get('items').remove(items[i]).write();
            break; 
         }
    }
    res.redirect('/todos');
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})