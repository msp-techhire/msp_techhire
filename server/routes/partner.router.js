const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
var format = require('pg-format');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('GET all route', req.user.id);
    if (req.isAuthenticated()) {
        let queryText = `SELECT "user"."id", "user"."partner_id", "partner"."id", "person".*
        FROM "user"
        JOIN "partner" ON "user"."partner_id"="partner"."id"
        JOIN "person" ON "partner"."id"="person"."partner_id"
        WHERE "user"."id" = $1
        ORDER BY "person"."formatted_id" ASC;`
        // let queryText2=  `SELECT "user"."id", "partner"."user_id", "partner"."id", "person"."partner_id"
        // FROM "user"
        // JOIN "partner" ON "user"."id"="partner"."user_id"
        // JOIN "person" ON "partner"."id"="person"."partner_id"
        // ORDER BY "user"."id";`
        pool.query(queryText, [req.user.id])
            .then((result) => {
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


const titleCase = str => {
    return str.toLowerCase().split(' ').map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }
  console.log(titleCase("I'm a little tea pot"));
router.post('/', rejectUnauthenticated, (req, res) => {
    const people = req.body;
    let queryText = 
        `INSERT INTO "person" ("formatted_id", "partner_id", "gender", "year_of_birth", 
"person_of_color", "education_level", "city_of_residence", "scholarship_recipient", 
"previous_job_experience", "pre_training_wage", "training_start_date", "training_status", 
"training_end_date", "training_type", "classroom_or_online", "exit_status", "start_date", 
"company", "title", "starting_wage", "second_start_date", "second_company", "second_title",
"second_starting_wage")
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, 
    $19, $20, $21, $22, $23, $24);`
    // ON CONFLICT ("formatted_id") 
    // DO
    // UPDATE 
    // SET "partner_id" = EXCLUDED."partner_id",
    //     "gender" = EXCLUDED."gender",
    //     "year_of_birth" = EXCLUDED."year_of_birth",
    //     "person_of_color" = EXCLUDED."person_of_color",
    //     "education_level" = EXCLUDED."education_level",
    //     "city_of_residence" = EXCLUDED."city_of_residence",
    //     "scholarship_recipient" = EXCLUDED."scholarship_recipient",
    //     "previous_job_experience" = EXCLUDED."previous_job_experience",
    //     "pre_training_wage" = EXCLUDED."pre_training_wage",
    //     "training_start_date" = EXCLUDED."training_start_date",
    //     "training_status" = EXCLUDED."training_status",
    //     "training_end_date" = EXCLUDED."training_end_date",
    //     "training_type" = EXCLUDED."training_type",
    //     "exit_status" = EXCLUDED."exit_status",
    //     "classroom_or_online" = EXCLUDED."classroom_or_online",
    //     "start_date" = EXCLUDED."start_date",
    //     "title" = EXCLUDED."title",
    //     "company" = EXCLUDED."company",
    //     "starting_wage" = EXCLUDED."starting_wage",
    //     "second_start_date" = EXCLUDED."second_start_date",
    //     "second_title" = EXCLUDED."second_title",
    //     "second_company" = EXCLUDED."second_company",
    //     "second_starting_wage" = EXCLUDED."second_starting_wage";`
    if (req.isAuthenticated()) {
        people.forEach((person) => {
            // console.log(person)
            pool.query(queryText, [person.formatted_id, person.partner_id, titleCase(person.gender), 
                person.year_of_birth, titleCase(person.person_of_color), (person.education_level), 
                person.city_of_residence, titleCase(person.scholarship_recipient), 
                person.previous_job_experience, person.pre_training_wage, 
                person.training_start_date, titleCase(person.training_status), person.training_end_date, 
                person.training_type, person.classroom_or_online, person.exit_status,
                person.start_date, person.company, person.title, person.starting_wage, 
                person.second_start_date, person.second_company, person.second_title, 
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


router.delete('/', (req, res) => {
    console.log('DELETE all rows matching', req.user.id);
    // if (req.isAuthenticated()) {
        let queryText = `DELETE FROM "person"
        WHERE "partner_id" IN
        (
        SELECT "partner"."id"        
                FROM "person"
                JOIN "partner" ON "partner"."id"="person"."partner_id"
                JOIN "user" ON "user"."partner_id"="partner"."id"
                WHERE "user"."id" = $1);`
        pool.query(queryText, [req.user.id])
            .then((result) => {
                res.sendStatus(200)
            })
            .catch((error) => {
                console.log('error on DELETE: ', error)
                res.sendStatus(500);
            })
    // } else {
    //     res.sendStatus(403);
    // }
});


module.exports = router;