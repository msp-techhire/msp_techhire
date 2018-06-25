// TO DO
// work in progress for search
// need dummy data to test


const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// POST
router.post('/', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `INSERT INTO "person" ( "training_id", "gender", "person_of_color", "education_level", "city_of_residence", "scholarship_recipient", "previous_job_experience", "pre_training_wage", "training_start_date", "training_status", "training_end_date", "training_type", "exit_status")
                      VALUES ($1, $2, $3, $4, $5, $6. $7, $8, $9, $10, $11, $12, $13, $14) RETURNING "gender";`;
    pool.query(queryText, [req.body.training_id, req.body.gender, req.body.year_of_birth, req.body.person_of_color, req.body.education_level, req.body.ity_of_residence, req.body.scholarship_recipient, req.body.previous_job_experience, req.body.pre_training_wage, req.body.training_start_date, req.body.raining_status, req.body.training_end_date, req.body.training_type, req.body.exit_status])
      .then(() => { res.sendStatus(201); })
      .catch((err) => {
        console.log('Error completing POST gender query', err);
        res.sendStatus(500);
      })
  } else { 
    res.sendStatus(403);
  }
});

// GET

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = 'SELECT * FROM "person"';
    pool.query(queryText)
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing GET person query', err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  } 
});

router.get('/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = 'SELECT * FROM "person" WHERE "id"=$1;'
    pool.query(queryText, [req.params.id])
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing GET person query', err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

// DELETE

router.delete('/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const deleteInfo = req.params.id;
    pool.query('DELETE FROM "person" WHERE "id"=$1 AND "gender" = $2;', [deleteInfo, req.user.id])
      .then((result) => {
        res.sendStatus(200);
      }).catch((error) => {
        console.log('error delete SQL INSERT', error)
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});
 
// PUT

router.put('/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const newInfo = req.body; 
    const queryText = `UPDATE "person"
                      SET "gender" = $1 
                      WHERE "id" = $2`;
    const queryValues = [
      newInfo.gender,
      req.params.id,
      req.user.id,
    ];
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error completing PUT person query', err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;