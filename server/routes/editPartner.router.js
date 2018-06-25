const router = require('express').Router();
const pool = require('../modules/pool');

const partners = [{id: 1, partner: 'this'}, {id: 2, partner: 'is'}, {id: 3, partner:'yet'}, {id: 4, partner:'another'}, {id:5, partner:'test'}];

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