const express = require('express');
const path = require('path');
const cors = require('cors');
const sqlite = require('better-sqlite3');

const app = express();

app.use(cors());

app.get('/kansalaiset', (req, res) => {
    const tietokanta = new sqlite('BACKEND/tietokanta.db');
    const hetu = req.query.hetu;
    const data = tietokanta.prepare('SELECT * FROM kansalaiset WHERE hetu = ?').all(hetu);
    res.json(data);

});

app.listen(3000, () => {
    console.log('Serveri pystyssä!');
});
