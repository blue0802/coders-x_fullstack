const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

const app = express();

const port = process.env.port || 3000;

db.defaults({ items: []})
  .write()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', './views');
app.set('view engine', 'pug');


app.get('/', (req, res) => {
    res.send('<h1>I love CodersX</h1>');
    console.log(db.get('items').value())
})

app.get('/todos', (req, res) => {
    let q = req.query.q;
    if(!q) {
        res.render('todos', {
            items: db.get('items').value()
        });
    } else {
        let matchesItems = db.get('items').value().filter(item => {
            return item.todo.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        })
        res.render('todos', {
            items: matchesItems,
            q: q
        })
    }
})

app.get('/todos/create', (req, res) => {
    res.render('create');
})

app.post('/todos/create', (req, res) => {
    db.get('items').push(req.body).write();
    res.redirect('/todos');
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})