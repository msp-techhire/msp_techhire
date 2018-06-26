const router = require('express').Router();
const pool = require('../modules/pool');


router.get('/partners', (req, res) => {
    pool.query('SELECT "org_name", "id" FROM "partner"')
    .then(response => res.send(response.rows))
    .catch(err => res.sendStatus(500));
});

router.get('/partnerInfo/:id', (req, res) => {
    let idToGet = req.params.id;
    const queryText = `SELECT * FROM "partner" WHERE id=$1`;
    pool.query(queryText, [idToGet])
    .then(response => res.send(response.rows))
    .catch(err => res.sendStatus(500));
});

router.post('/newPartner', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

module.exports = router;