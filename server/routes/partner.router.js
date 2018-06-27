const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
var format = require('pg-format');

router.post('/', (req, res) => {
    const people = req.body;
    console.log(req.body.id)
    let queryText = `WITH "taco" AS (
        INSERT INTO "person" ("partner_id", "formatted_id", "gender", "year_of_birth", 
"person_of_color", "education_level", "city_of_residence", "scholarship_recipient", "previous_job_experience", 
"pre_training_wage", "training_start_date", "training_status", "training_end_date", "training_type", 
"classroom_or_online", "exit_status")
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id)
        INSERT INTO "job_placement" ("person_id", "start_date", "title", "company", "starting_wage", "end_date")
        VALUES ((select "id" FROM "taco"), $17, $18, $19, $20, $21);`
    if (req.isAuthenticated()) {
        people.forEach((person) => {
            console.log(person)
            pool.query(queryText, [person.partner_id, person.formatted_id, person.gender, person.year_of_birth, person.person_of_color, person.education_level, person.city_of_residence, person.scholarship_recipient, person.previous_job_experience, person.pre_training_wage, person.training_start_date, person.training_status, person.training_end_date, person.training_type, person.classroom_or_online, person.exit_status, person.start_date, person.title, person.company, person.starting_wage, person.end_date])
        .then((result) => {
            //promise.all
            // res.sendStatus(201);
            console.log(result);
        }).catch((error) => {
            console.log('error on POST', error);
            res.sendStatus(500);
        })
        // pool.query(queryText2, [person.id, person.start_date, person.title, person.company, person.starting_wage, person.end_date])
        // .then((result) => {
        //     //promise.all
        //     // res.sendStatus(201);
        //     console.log(result);
        // }).catch((error) => {
        //     console.log('error on POST', error);
        //     res.sendStatus(500);
        // })
    })
    }
    else {
        res.sendStatus(403);
    }
});

module.exports = router;