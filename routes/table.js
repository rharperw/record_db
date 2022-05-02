const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const pool = require('../helpers/database');
let DB_TABLE = process.env.DB_TABLE;

router.get('/:id', async function (req, res) {
  try {
    const sqlQuery = `SELECT * FROM ${DB_TABLE} WHERE id=?`;
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/add', async function (req, res) {
  try {
    const { release_year, album, artist, genre, subgenre } = req.body;

    const sqlQuery = `INSERT INTO ${DB_TABLE} (release_year, album, artist, genre, subgenre) VALUES (?,?,?,?,?)`;
    const result = await pool.query(sqlQuery, [
      release_year,
      album,
      artist,
      genre,
      subgenre,
    ]);

    res.status(200).send(`Added to DB`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/amend', async function (req, res) {
  try {
    const { release_year, album, artist, genre, subgenre, id } = req.body;

    const updateQuery = `UPDATE ${DB_TABLE} SET release_year = ?, album = ?, artist = ?, genre = ?, subgenre = ? WHERE id=?`;
    const result = await pool.query(updateQuery, [
      release_year,
      album,
      artist,
      genre,
      subgenre,
      id,
    ]);

    res.status(200).send(`Updated DB`);
    console.log(req.body);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/:id', async function (req, res) {
  try {
    const delQuery = `DELETE FROM ${DB_TABLE} WHERE id = ?`;
    const rows = await pool.query(delQuery, req.params.id);
    res.status(200).send('Entry deleted from DB');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
