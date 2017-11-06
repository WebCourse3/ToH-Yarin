const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let heroes = [
    { id: 0, name: 'Yarin'},
    { id: 1, name: 'Superman'},
    { id: 2, name: 'Spiderman'},
];

app.get('/heroes', (req, res) => {
    res.send(heroes);
});

app.get('/heroes/:id', (req, res) => {
    res.send(heroes.find( hero => hero.id == req.params.id ));
});

app.put('/heroes/:id', (req, res) => {
    if (req.params.id != req.body.id) { res.send(heroes); }

    let hero = heroes.find( hero => hero.id == req.params.id );
    if (hero) {
        hero.name = req.body.name;
    } else {
        heroes.push(req.body);
    }

    res.send(heroes);
});

app.post('/heroes', (req, res) => {
    let hero = heroes.find( hero => hero.id == req.body.id );

    if (hero) {
        hero.name = req.body.name;
    } else {
        heroes.push(req.body);
    }

    res.end();
});

app.delete('/heroes/:id', (req, res) => {
    heroes = heroes.filter( hero => hero.id != req.params.id );
    res.send(heroes);
});

app.delete('/heroes', (req, res) => {
    heroes = heroes.filter( hero => hero.name != req.query.name );
    res.send(heroes);
});

app.listen(3000, () => console.log('ToH app listening on port 3000!'))

module.exports = {app, heroes};