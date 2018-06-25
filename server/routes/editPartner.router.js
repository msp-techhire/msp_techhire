const router = require('express').Router();
const pool = require('../modules/pool');


router.get('/partners', (req, res) => {
    pool.query('SELECT "org_name", "id" FROM "partner"')
    .then(response => res.send(response.rows))
    .catch(err => res.sendStatus(500));
});

router.get('/partnerInfo/:id', (req, res) => {
    let idToGet = req.params.id;
    res.send(idToGet);
})

module.exports = router;