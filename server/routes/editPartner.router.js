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

router.put('/updatePartner/:id', (req, res) => {
    let id = req.params.id;
    let partnerToEdit = req.body;
    const queryText = `UPDATE "partner" 
                    SET "org_name" = $1, 
                      "org_abbr" = $2, 
                      "address" = $3, 
                      "phone_number" = $4, 
                      "website" = $5, 
                      "director_first_name" = $6, 
                      "director_last_name" = $7,
                      "business_type" = $8  
                      WHERE "id" = $9`;
    console.log(id, partnerToEdit);
    pool.query(queryText, [partnerToEdit.orgName, partnerToEdit.orgAbbreviation, partnerToEdit.orgAddress,
                partnerToEdit.orgPhone, partnerToEdit.orgWebsite, partnerToEdit.directorFirst,
                partnerToEdit.directorLast, partnerToEdit.businessType, Number(id)])
    .then(response => res.sendStatus(200))
    .catch(err => res.sendStatus(500));
});

router.post('/newPartner', (req, res) => {
    let newPartner = req.body;
    const queryText = `INSERT INTO "partner" ("org_name", "org_abbr", "address", "phone_number",
                        "website", "director_first_name", "director_last_name", "business_type")
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
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