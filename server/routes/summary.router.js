const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const encryptLib = require('../modules/encryption');
const { rejectNonAdmins } = require('../modules/authorization-middleware');

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
    res.send(response.rows);
  })
  .catch(err => res.sendStatus(500));
});

router.post('/newAdmin', (req, res) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  let queryText = `INSERT INTO "user" ("username", "password", "role")
                    VALUES ($1, $2, $3);`;
  pool.query(queryText, [username, password, 'admin'])
  .then(response => res.sendStatus(200))
  .catch(err => res.sendStatus(500));
});

module.exports = router;