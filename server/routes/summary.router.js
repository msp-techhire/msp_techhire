const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectNonAdmins } = require('../modules/authorization-middleware');

/**
 * GET route template
 */
router.get('/', rejectNonAdmins, (req, res) => {
    const queryText = `SELECT * FROM "person";`;
    pool.query(queryText)
      .then(result => res.send(result.rows))
      .catch(error => res.sendStatus(500));
});

router.get('/wages', rejectNonAdmins, (req, res) => {
  let queryText = `SELECT 
  AVG(CAST (NULLIF("person"."pre_training_wage", '') AS DECIMAL(4, 2))) AS PRE, AVG(CAST(NULLIF("person"."starting_wage", '') AS DECIMAL(4, 2))) AS POST
  FROM "person" 
  WHERE "person"."partner_id"=2 OR "person"."partner_id"=3
  UNION
  SELECT 
  AVG(CAST (NULLIF("person"."pre_training_wage", '') AS DECIMAL(4, 2))) AS PRE, AVG(CAST(NULLIF("person"."starting_wage", '') AS DECIMAL(4, 2))) AS POST
  FROM "person"
  WHERE "person"."partner_id"=4 OR "person"."partner_id"=5 OR "person"."partner_id"=6 OR "person"."partner_id"=7
  UNION
  SELECT 
  AVG(CAST (NULLIF("person"."pre_training_wage", '') AS DECIMAL(4, 2))) AS PRE, AVG(CAST(NULLIF("person"."starting_wage", '') AS DECIMAL(4, 2))) AS POST
  FROM "person"
  WHERE "person"."partner_id"=1;`;
  
  pool.query(queryText)
  .then(response => {
    console.log(response);
    res.send(response.rows);
  })
  .catch(err => res.sendStatus(500));
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;