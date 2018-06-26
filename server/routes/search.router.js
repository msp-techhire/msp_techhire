// TO DO
// work in progress for search

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// POST
// router.post('/', (req, res) => {
//   if (req.isAuthenticated()) {
//     const queryText = `INSERT INTO "person" ( "partner_id", "formatted_id", "gender", "year_of_birth", "person_of_color", "education_level", "city_of_residence", "scholarship_recipient", "previous_job_experience", "pre_training_wage", "training_start_date", "training_status", "training_end_date", "training_type", "classroom_or_online", "exit_status")
//                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING "partner_id", "formatted_id", "gender", "year_of_birth", "person_of_color", "education_level", "city_of_residence", "scholarship_recipient", "previous_job_experience", "pre_training_wage", "training_start_date", "training_status", "training_end_date", "training_type", "classroom_or_online", "exit_status";`;
//     pool.query(queryText, [ req.body.partner_id, req.body.formatted_id, req.body.gender, req.body.year_of_birth, req.body.person_of_color, req.body.education_level, req.body.ity_of_residence, req.body.scholarship_recipient, req.body.previous_job_experience, req.body.pre_training_wage, req.body.training_start_date, req.body.training_status, req.body.training_end_date, req.body.training_type, req.body.classroom_or_online, req.body.exit_status])
//       .then(() => { res.sendStatus(201); })
//       .catch((err) => {
//         console.log('Error completing POST Search query', err);
//         res.sendStatus(500);
//       })
//   } else { 
//     res.sendStatus(403);
//   }
// });

// GET

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `SELECT * FROM "person"
                      WHERE "gender"=$1
`; // only return first 50, next step is pagination
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

// TO DO 
// Please, leave edit alone until I get the GET search working properly. Thanks.
 
// PUT

// router.put('/:id', (req, res) => {
//   if (req.isAuthenticated()) {
//     const newInfo = req.body; 
//     const queryText = `UPDATE "person"
//                       SET "gender" = $1 
//                       WHERE "id" = $2`;
//     const queryValues = [
//       newInfo.gender,
//       req.params.id,
//       req.user.id,
//     ];
//     pool.query(queryText, queryValues)
//       .then(() => { res.sendStatus(200); })
//       .catch((err) => {
//         console.log('Error completing PUT search query', err);
//         res.sendStatus(500);
//       });
//   } else {
//     res.sendStatus(403);
//   }
// });

module.exports = router;