const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET
 
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      const queryText = `SELECT * FROM "person"
                        WHERE "formatted_id"::text ILIKE $1::text`; // TO DO only return first 50, next step is pagination
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
 
// PUT

// router.put('/:id', (req, res) => {
//   if (req.isAuthenticated()) {
//     const newInfo = req.body; 
//     const queryText = `UPDATE "person"
//                       SET "partner_id"::text ILIKE $1::text
//                       AND "formatted_id"::text ILIKE $1::text
//                       AND "gender"::text ILIKE $1::text
//                       AND "year_of_birth"::text ILIKE $1::text
//                       AND "person_of_color"::text ILIKE $1::text
//                       AND "education_level"::text ILIKE $1::text
//                       AND "city_of_residence"::text ILIKE $1::text
//                       AND "scholarship_recipient"::text ILIKE $1::text
//                       AND "previous_job_experience"::text ILIKE $1::text
//                       AND "pre_training_wage"::text ILIKE $1::text
//                       AND "training_start_date"::text ILIKE $1::text
//                       AND "training_status"::text ILIKE $1::text
//                       AND "training_end_date"::text ILIKE $1::text
//                       AND "training_type"::text ILIKE $1::text
//                       AND "classroom_or_online"::text ILIKE $1::text
//                       AND "exit_status"::text ILIKE $1::text 
//                       WHERE "id" = $2`;
//     const queryValues = [
//       newInfo.partner_id,
//       newInfo.formatted_id,
//       newInfo.gender,
//       newInfo.year_of_birth,
//       newInfo.person_of_color,
//       newInfo.education_level,
//       newInfo.city_of_residence,
//       newInfo.scholarship_recipient,
//       newInfo.previous_job_experience,
//       newInfo.pre_training_wage,
//       newInfo.training_start_date,
//       newInfo.training_status,
//       newInfo.training_end_date,
//       newInfo.training_type,
//       newInfo.classroom_or_online,
//       newInfo.exit_status,
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