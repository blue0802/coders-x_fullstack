const express = require('express');

const app = express();

const port = process.env.port || 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.send('<h1>I love CodersX</h1>');
})

app.get('/todos', (req, res) => {
    res.render('todos');
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})