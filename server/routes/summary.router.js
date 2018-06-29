const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `SELECT * FROM "person";`;
    pool.query(queryText)
      .then(result => res.send(result.rows))
      .catch(error => res.sendStatus(500));
  } else {
    res.sendStatus(403);
  } 
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;