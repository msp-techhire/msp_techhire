const router = require('express').Router();
const pool = require('../modules/pool');
const { rejectNonAdmins } = require('../modules/authorization-middleware');


router.get('/partners', rejectNonAdmins, (req, res) => {
    pool.query('SELECT "org_name", "id" FROM "partner"')
    .then(response => res.send(response.rows))
    .catch(err => res.sendStatus(500));
});

router.get('/partnerInfo/:id', rejectNonAdmins, (req, res) => {
    let idToGet = req.params.id;
    const queryText = `SELECT * FROM "partner" WHERE id=$1`;
    pool.query(queryText, [idToGet])
    .then(response => res.send(response.rows))
    .catch(err => res.sendStatus(500));
});

router.get('/partnerstats/:id', rejectNonAdmins, (req, res) => {
    let id = req.params.id;
    let queryText = `SELECT AVG(CAST (NULLIF("person"."pre_training_wage", '') AS DECIMAL(4, 2))) AS PRE, AVG(CAST(NULLIF("person"."starting_wage", '') AS DECIMAL(4, 2))) AS POST, COUNT(*)
        FROM "person"
        WHERE "partner_id"=$1;`;
    pool.query(queryText, [id])
    .then(response => res.send(response.rows))
    .catch(err => res.sendStatus(500));
});

router.put('/updatePartner/:id', rejectNonAdmins, (req, res) => {
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
                partnerToEdit.directorLast, partnerToEdit.businessType, id])
    .then(response => res.sendStatus(200))
    .catch(err => res.sendStatus(500));
});

router.post('/newPartner', rejectNonAdmins, (req, res) => {
    let newPartner = req.body;
    newPartner.updatedAddress = `${newPartner.orgAddress}, ${newPartner.orgCity}, MN ${newPartner.orgZip}`;
    newPartner.orgPhone = `(${newPartner.orgPhoneAreaCode}) ${newPartner.orgPhoneFirstThree}-${newPartner.orgPhoneLastFour}`;
    console.log(newPartner);
    const queryText = `INSERT INTO "partner" ("org_name", "org_abbr", "address", "phone_number",
                        "website", "director_first_name", "director_last_name", "business_type")
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    pool.query(queryText, [newPartner.orgName, newPartner.orgAbbreviation, newPartner.updatedAddress, 
        newPartner.orgPhone, newPartner.orgWebsite, newPartner.directorFirst, newPartner.directorLast,
        newPartner.businessType])
        .then((response) => {
            res.send(response.data);
        })
        .catch(err => res.sendStatus(500));
});

module.exports = router;