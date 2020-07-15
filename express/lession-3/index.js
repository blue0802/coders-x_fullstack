const express = require('express');

const app = express();

const port = process.env.port || 3000;

app.set('views', './views');
app.set('view engine', 'pug');

var items = [
    {id: 1, todo: 'Di cho'},
    {id: 2, todo: 'Nau com'},
    {id: 3, todo: 'Rua bat'},
    {id: 4, todo: 'Hoc code tai CodersX'},
]

app.get('/', (req, res) => {
    res.send('<h1>I love CodersX</h1>');
})

app.get('/todos', (req, res) => {
    let q = req.query.q;
    if(!q) {
        res.render('todos', {
            items: items
        });
    } else {
        let matchesItems = items.filter(item => {
            return item.todo.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        })
        res.render('todos', {
            items: matchesItems,
            q: q
        })
    }
})

app.get('/todos/search', (req, res) => {
    
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})