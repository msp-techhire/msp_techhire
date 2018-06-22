-- Ignore linter error messages... it doesn't know what it's talking about.

CREATE TYPE current_type AS ENUM ('admin', 'partner');

CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR (80) UNIQUE NOT NULL,
	"password" VARCHAR(1000) NOT NULL,
	"user_type" current_type
);

CREATE TYPE business AS ENUM ('For-profit', 'Non-profit', 'School/College', 'other');

CREATE TABLE "partner" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES "user"("id"),
	"org_abbr" VARCHAR (5) UNIQUE NOT NULL,
	"address" TEXT NOT NULL,
	"phone_number" VARCHAR (20) NOT NULL,
	"website" VARCHAR (250),
	"director_first_name" VARCHAR (30),
	"director_last_name" VARCHAR (30),
	"business_type" business NOT NULL
);

CREATE TABLE "contact" (
	"id" SERIAL PRIMARY KEY,
	"first_name" VARCHAR (30) NOT NULL,
	"last_name" VARCHAR (30) NOT NULL,
	"title" VARCHAR (30),
	"phone_number" VARCHAR (20) NOT NULL,
	"email" VARCHAR (100)
);

CREATE TYPE contact_level AS ENUM ('Primary', 'Secondary', 'Alternative');

CREATE TABLE "partner_contact" (
	"partner_id" INTEGER REFERENCES "partner"("id"),
	"contact_id" INTEGER REFERENCES "contact"("id"),
	"contact_type" contact_level NOT NULL
);

CREATE TYPE training_type AS ENUM ('UX', 'QA', 'IT Fundamentals');

CREATE TABLE "training" (
    "id" SERIAL PRIMARY KEY,
    "type" training_type,
    "time_commitment" VARCHAR(60),
    "cost" VARCHAR(40),
    "is_online" BOOLEAN,
    "is_in_classroom" BOOLEAN,
    "wioa_certified" BOOLEAN,
    "ohe_certified" BOOLEAN,
    "partner_id" INT REFERENCES "partner"("id")
);

CREATE TYPE gender_type AS ENUM ('Male', 'Female', 'Other', 'Unreported');
CREATE TYPE education_type AS ENUM ('HS/GED', 'Some College', 'Associates', 'Bachelors', 'Graduate and Beyond');
CREATE TYPE training_status_type AS ENUM ('In training', 'Graduated', 'Removed', 'Withdrew');
CREATE TYPE exit_status_type AS ENUM ('Entered Employment', 'Entered Military', 'Enrolled in Additional Training', 'Health/Medical', 'Institutionalized', 'Incarcerated');

CREATE TABLE "person" (
	"id" VARCHAR (10) PRIMARY KEY,
	"training_id" INTEGER REFERENCES "training"("id"),
	"gender" gender_type NOT NULL,
	"year_of_birth" INTEGER NOT NULL,
	"person_of_color" BOOLEAN NOT NULL,
	"education_level" education_type,
	"city_of_residence" VARCHAR (50),
	"scholarship_recipient" BOOLEAN NOT NULL,
	"previous_job_experience" VARCHAR (50),
	"pre_training_wage" FLOAT,
	"training_start_date" DATE,
	"training_status" training_status_type,
	"training_end_date" DATE,
	"exit_status" exit_status_type
);

CREATE TABLE "job_placement" (
	"id" SERIAL PRIMARY KEY,
	"person_id" VARCHAR (10) REFERENCES "person"("id"),
	"start_date" DATE NOT NULL,
	"title" VARCHAR (50),
	"company" VARCHAR (50) NOT NULL,
	"starting_wage" FLOAT,
	"end_date" DATE
);