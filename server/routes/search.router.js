const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `SELECT * FROM "person"
                      WHERE "gender"::text ILIKE $1::text;`; // TO DO Liz needs to look into only returning first 50, next step is pagination
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
 
// PUT

// router.put('/:id', (req, res) => {
//   if (req.isAuthenticated()) {
//     const newInfo = req.body; 
//     const queryText = `UPDATE "person"
//                       SET "gender" = $1 
//                       WHERE "id" = $2`;
//     const queryValues = [
//       newInfo.gender, ???
//       req.params.id, ???
//       req.user.id, ???
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