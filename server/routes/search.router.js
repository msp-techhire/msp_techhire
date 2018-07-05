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
const columnList = [
  'formatted_id',
  'partner_id',
  'gender',
  'year_of_birth',
  'person_of_color',
  'Education_level',
  'city_of_residence',
  'previous_job_experience',
  'pre_training_wage',
  'training_start_date',
  'training_status',
  'training_end_date',
  'training_type',
  'exit_status',
  'classroom_or_online',
  'start_date',
  'title',
  'company',
  'starting_wage',
  'second_start_date',
  'second_title',
  'second_company',
  'second_starting_wage'
];

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
  const field = cleanStr(req.params.name); // Avoid malicious SQL injection
  if (columnList.includes(field)) {
    const search = `${req.query.search}`;

    let queryText = `SELECT * FROM "person" WHERE "${field}"::text ILIKE $1::text;`;

    pool.query(queryText, [search]).then(result => {
      res.send(result.rows);
    }).catch(error => {
      console.error(`ERROR trying to GET /api/admin/:name?search=[query]: ${error}`);
      res.sendStatus(500);
    });
  }
});

router.get('/full/:name', rejectNonAdmins, (req, res) => {
  if (req.isAuthenticated()) {
    const field = cleanStr(req.params.name); // Avoid malicious SQL injection
    const search = `${req.query.search}`;

    let personQueryText = `SELECT * FROM "person" WHERE "${field}"::text ILIKE $1::text;`
  }
});

router.get('/id/:id', rejectNonAdmins, (req, res) => {
  pool.query(`SELECT * FROM "person" WHERE "id" = $1;`, [req.params.id]).then(result => {
    res.send(result.rows);
  }).catch(error => {
    console.error(`ERROR trying to GET /api/admin/id/:id: ${error}`);
    res.sendStatus(500);
  });
});

// router.put('/id/:id', rejectNonAdmins, (req, res) => {
//   let id = req.params.id;
//   let editInfo = req.body;
//   const queryText = `UPDATE "person" SET 
//     "formatted_id" = $1, 
//     "partner_id" = $2,
//     "gender" = $3,
//     "year_of_birth" = $4,
//     "person_of_color" = $5,
//     "education_level" = $6,
//     "city_of_residence = $7,
//     "scholarship_recipient" = $8,
//     "`
// })

router.get(`/partners`, rejectNonAdmins, (req, res) => {
  pool.query(`SELECT "id", "org_name" FROM "partner";`).then(result => {
    res.send(result.rows);
  }).catch(error => {
    console.error(`ERROR trying to GET /api/admin/partners: ${error}`);
    res.sendStatus(500);
  });
});

module.exports = router;