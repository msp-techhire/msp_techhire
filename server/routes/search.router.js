const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `SELECT * FROM "person"
                      WHERE "partner_id"::text ILIKE $1::text
                      OR "formatted_id"::text ILIKE $1::text
                      OR "gender"::text ILIKE $1::text
                      OR "year_of_birth"::text ILIKE $1::text
                      OR "person_of_color"::text ILIKE $1::text
                      OR "education_level"::text ILIKE $1::text
                      OR "city_of_residence"::text ILIKE $1::text
                      OR "scholarship_recipient"::text ILIKE $1::text
                      OR "previous_job_experience"::text ILIKE $1::text
                      OR "pre_training_wage"::text ILIKE $1::text
                      OR "training_start_date"::text ILIKE $1::text
                      OR "training_status"::text ILIKE $1::text
                      OR "training_end_date"::text ILIKE $1::text
                      OR "training_type"::text ILIKE $1::text
                      OR "classroom_or_online"::text ILIKE $1::text
                      OR "exit_status"::text ILIKE $1::text`; // TO DO only return first 50, next step is pagination
    pool.query(queryText, [req.query.search])
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing GET Search query first', err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  } 
});

module.exports = router;