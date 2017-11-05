const express = require('express')
const app = express()

let heroes = [];

app.get('/heroes', (req, res) => {});

app.get('/heroes/:id', (req, res) => {});

app.put('/heroes/:id', (req, res) => {});

app.post('/heroes', (req, res) => {});

app.delete('/heroes/:id', (req, res) => {});

app.delete('/heroes?name=term', (req, res) => {});

app.listen(3000, () => console.log('ToH app listening on port 3000!'))