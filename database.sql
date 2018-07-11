CREATE TYPE business AS ENUM ('For-profit', 'Non-profit', 'School/College', 'other');

CREATE TABLE "partner" (
	"id" SERIAL PRIMARY KEY,
	"org_name" TEXT UNIQUE,
	"org_abbr" VARCHAR (5) UNIQUE,
	"address" TEXT,
	"phone_number" VARCHAR (20),
	"website" VARCHAR (250),
	"director_first_name" VARCHAR (30),
	"director_last_name" VARCHAR (30),
	"business_type" business
);

CREATE TYPE current_type AS ENUM ('admin', 'partner');

CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"partner_id" INTEGER REFERENCES "partner"("id"),
	"username" VARCHAR (80) UNIQUE,
	"password" VARCHAR(1000),
	"role" current_type DEFAULT 'partner'
);

CREATE TABLE "contact" (
	"id" SERIAL PRIMARY KEY,
	"first_name" VARCHAR (30),
	"last_name" VARCHAR (30),
	"title" VARCHAR (30),
	"phone_number" VARCHAR (20),
	"email" VARCHAR (100)
);

CREATE TYPE contact_level AS ENUM ('Primary', 'Secondary', 'Alternative');

CREATE TABLE "partner_contact" (
	"partner_id" INTEGER REFERENCES "partner"("id"),
	"contact_id" INTEGER REFERENCES "contact"("id"),
	"contact_type" contact_level
);

CREATE TYPE training_type AS ENUM ('UX', 'QA', 'IT Fundamentals');

CREATE TABLE "training" (
	"id" SERIAL PRIMARY KEY,
	"type" training_type,
	"time_commitment" VARCHAR(60),
	"cost" VARCHAR(200),
	"is_online" BOOLEAN,
	"is_in_classroom" BOOLEAN,
	"wioa_certified" BOOLEAN,
	"ohe_certified" BOOLEAN,
	"partner_id" INT REFERENCES "partner"("id")
);


CREATE TABLE "person" (
	"id" SERIAL PRIMARY KEY,
	"formatted_id" VARCHAR (100),
	"partner_id" INTEGER REFERENCES "partner"("id"),
	"gender" VARCHAR (100),
	"year_of_birth" INTEGER,
	"person_of_color" VARCHAR (100) DEFAULT 'Unreported',
	"education_level" VARCHAR (100),
	"city_of_residence" VARCHAR (100),
	"scholarship_recipient" VARCHAR (100),
	"previous_job_experience" VARCHAR (100),
	"pre_training_wage" VARCHAR (100),
	"training_start_date" VARCHAR (100),
	"training_status" VARCHAR (100),
	"training_end_date" VARCHAR (100),
	"training_type" VARCHAR (100),
	"classroom_or_online" VARCHAR (100),
	"exit_status" VARCHAR (100),
	"start_date" VARCHAR (100),
	"company" VARCHAR (100),
	"title" VARCHAR (100),
	"starting_wage" VARCHAR (100),
	"second_start_date" VARCHAR (100),
	"second_company" VARCHAR (100),
	"second_title" VARCHAR (100),
	"second_starting_wage" VARCHAR (100)
);
