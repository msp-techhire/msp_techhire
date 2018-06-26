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
    let newPartner = req.body;
    const queryText = `INSERT INTO "partner" ("org_name", "org_abbr", "address", "phone_number",
                        "website", "director_first_name", "director_last_name", "business_type")
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    // const queryValues = [newPartner.orgName, newPartner.orgAddress, newPartner.orgPhone,
    //                      newPartner.orgWebsite, newPartner.directorFirst, newPartner.directorLast,
    //                      newPartner.businessType];
    console.log(newPartner);
    pool.query(queryText, [newPartner.orgName, newPartner.orgAbbreviation, newPartner.orgAddress, 
                            newPartner.orgPhone, newPartner.orgWebsite, newPartner.directorFirst, newPartner.directorLast,
                            newPartner.businessType])
        .then((response) => {
            res.send(response.data);
        })
        .catch(err => res.sendStatus(500));
});

module.exports = router;