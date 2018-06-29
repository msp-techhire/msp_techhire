const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
var format = require('pg-format');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('GET all route', req.user);
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM "person"
        ORDER BY "person"."formatted_id" ASC;`
        // let queryText2=  `SELECT "user"."id", "partner"."user_id", "partner"."id", "person"."partner_id"
        // FROM "user"
        // JOIN "partner" ON "user"."id"="partner"."user_id"
        // JOIN "person" ON "partner"."id"="person"."partner_id"
        // ORDER BY "user"."id";`
        pool.query(queryText)
            .then((result) => {
                console.log(result.rows)
                res.send(result.rows);
            }).catch((error) => {
                console.log('error on GET: ', error);
                res.sendStatus(500);
            })
        // pool.query(queryText2)
        // .then((result) => {
        //     console.log(result.rows)
        //     res.send(result.rows);
        // }).catch((error) => {
        //     console.log('error on GET: ', error);
        //     res.sendStatus(500);
        // })
    } else {
        res.sendStatus(403);
    }
});

router.post('/', rejectUnauthenticated, (req, res) => {
    const people = req.body;
    let queryText = 
        `INSERT INTO "person" ("formatted_id", "partner_id", "gender", "year_of_birth", 
"person_of_color", "education_level", "city_of_residence", "scholarship_recipient", 
"previous_job_experience", "pre_training_wage", "training_start_date", "training_status", 
"training_end_date", "training_type", "exit_status", "classroom_or_online", "start_date", 
"title", "company", "starting_wage", "second_start_date", "second_title", "second_company", 
"second_starting_wage")
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, 
    $19, $20, $21, $22, $23, $24);`
    if (req.isAuthenticated()) {
        people.forEach((person) => {
            // console.log(person)
            pool.query(queryText, [person.formatted_id, person.partner_id, person.gender, 
                person.year_of_birth, person.person_of_color, person.education_level, 
                person.city_of_residence, person.scholarship_recipient, 
                person.previous_job_experience, person.pre_training_wage, 
                person.training_start_date, person.training_status, person.training_end_date, 
                person.training_type, person.exit_status, person.classroom_or_online,
                person.start_date, person.title, person.company, person.starting_wage, 
                person.second_start_date, person.second_title, person.second_company, 
                person.second_starting_wage])
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