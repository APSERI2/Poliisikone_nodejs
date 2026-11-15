const express = require('express');
const path = require('path');
const cors = require('cors');
const sqlite = require('better-sqlite3');

const app = express();

app.use(cors());

app.get('/kansalaiset/hetu', (req, res) => {
    const tietokanta = new sqlite('BACKEND/tietokanta.db');
    const hetu = req.query.hetu;
    const data = tietokanta.prepare('SELECT * FROM kansalaiset WHERE hetu = ?').all(hetu);
    res.json(data);

});

app.get('/kansalaiset/both', (req, res) => {
    const tietokanta = new sqlite('BACKEND/tietokanta.db');
    const etunimi = req.query.etunimi;
    const sukunimi = req.query.sukunimi;
    const data = tietokanta.prepare('SELECT * FROM kansalaiset WHERE etunimi = ? AND sukunimi = ?').all(etunimi, sukunimi);
    res.json(data);

});

app.listen(3000, () => {
    console.log('Serveri pystyssä!');
});
