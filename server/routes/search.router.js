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

router.get('/columns/:name', rejectNonAdmins, (req, res) => {
  const name = req.params.name;
  const queryText = `SELECT "column_name" FROM "information_schema"."columns" WHERE "table_name" = $1;`;
  pool.query(queryText, [name]).then(results => {
    let columnNames = [];
    results.rows.forEach(row => columnNames.push(row.column_name));
    res.send(columnNames);
  }).catch(error => {
    console.error(`ERROR trying to GET /api/admin/columns/:name: ${error}`);
    res.sendStatus(500);
  });
})

router.get('/', rejectNonAdmins, (req, res) => {
  const firstQuery = `SELECT "column_name" from "information_schema"."columns" WHERE "table_name" = 'person';`;
  let columnNames = [];
  pool.query(firstQuery).then(results => {
    results.rows.forEach(row => columnNames.push(`"${row.column_name}"::text ILIKE $1::text`));
    let columnQuery = columnNames.join(' OR ');
    const queryText = `SELECT * FROM "person" WHERE ${columnQuery};`; // TO DO only return first 50, next step is pagination

    pool.query(queryText, [req.query.search])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('ERROR getting /api/admin/?search=[query]:', err);
        res.sendStatus(500);
      });

  }).catch(error => {
    console.error(`ERROR getting column names before retrieving rows: ${error}`);
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