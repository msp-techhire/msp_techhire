const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
 
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      const queryText = `SELECT * FROM "person"
                        WHERE "formatted_id"::text ILIKE $1::text`;
      pool.query(queryText, [req.query.search])
        .then((result) => { res.send(result.rows); })
        .catch((err) => {
          console.log('Error completing GET');
          res.sendStatus(500);
        });
    } else {
      res.sendStatus(403);
    } 
  });
 
module.exports = router;