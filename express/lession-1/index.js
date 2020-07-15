const express = require('express');

const app = express();

const port = process.env.port || 3000;

app.get('/', (req, res) => {
    res.send("<h1>Hello World!</h1>");
})

app.get('/todos', (req, res) => {
    res.send(`
        <ul>
            <li>Di cho</li>
            <li>Nau com</li>
            <li>Rua bat</li>
            <li>Hoc code tai CodersX</li>
        </ul>
    `)
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})