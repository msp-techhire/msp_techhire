const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNonAdmins } = require('../modules/authorization-middleware');

// To avoid doing extra unnecessary work, and to avoid malicious SQL
// injection, the following string runs the 'field' query through a quick
// string cleaner to be sure that only lower-case characters and
// underscores are allowed in the string. No spaces. This allows us to
// insert the field name directly into the queryText declaration.
// -Shely
const cleanStr = str => str.split(/[^a-z_]/).filter(String).join('');

// GET

router.get('/', rejectNonAdmins, (req, res) => {
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
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('Error completing GET Search query first', err);
        res.sendStatus(500);
      });
});

router.get('/field/:name', rejectNonAdmins, (req, res) => {
  if (req.isAuthenticated()) {
    const field = cleanStr(req.params.name); // Avoid malicious SQL injection
    // have a checker to verify that only the columns 
    const search = `${req.query.search}`;

    let queryText = `SELECT * FROM "person" WHERE "${field}"::text ILIKE $1::text;`;

    pool.query(queryText, [search]).then(result => {
      res.send(result.rows);
    }).catch(error => {
      console.error(`ERROR trying to GET /api/admin/:name: ${error}`);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});

router.get('/full/:name', (req, res) => {
  if (req.isAuthenticated()) {
    const field = cleanStr(req.params.name); // Avoid malicious SQL injection
    const search = `${req.query.search}`;

    let personQueryText = `SELECT * FROM "person" WHERE "${field}"::text ILIKE $1::text;`
  }
})

module.exports = router;