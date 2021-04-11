const path = require("path");
const envPath = path.resolve(process.cwd(), ".env.local");

console.log({ envPath });

require("dotenv").config({ path: envPath });

const mysql = require("serverless-mysql");

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
  },
});

async function query(q) {
  try {
    const results = await db.query(q);
    await db.end();
    return results;
  } catch (e) {
    throw Error(e.message);
  }
}

// Create "entries" table if doesn't exist
async function migrate() {
  await query(`CREATE TABLE IF NOT EXISTS notices (
      id bigint NOT NULL,
      title varchar(1000),
      timestamp bigint,
      openDate bigint,
      closeDate bigint,
      important int,
      attachments varchar(1000),
      user_id varchar(35) NOT NULL,
      PRIMARY KEY (id)
    );`).catch((e) => console.log(e));

  await query(`create table if not exists news (
                id bigint NOT NULL,
                title varchar(1000),
                timestamp bigint,
                openDate bigint,
                closeDate bigint,
                description varchar(1000),
                image varchar(1000),
                author varchar(1000),
                user_id varchar(35) NOT NULL,
                PRIMARY KEY (id)
            )`).catch((e) => console.log(e));
  
  await query(`create table if not exists innovation (
                id bigint NOT NULL,
                title varchar(1000),
                timestamp bigint,
                openDate bigint,
                closeDate bigint,
                description varchar(1000),
                image varchar(1000),
                author varchar(1000),
                user_id varchar(35) NOT NULL,
                PRIMARY KEY (id)
            )`).catch((e) => console.log(e));
  
  await query(`create table if not exists faculty_image (
                user_id int,
                email varchar(50),
                image MEDIUMBLOB,
                PRIMARY KEY(user_id),
                UNIQUE KEY(email)
            )`).catch((e) => console.log(e));
  
  await query(`create table if not exists Project (
      id int NOT NULL AUTO_INCREMENT,
            user_id int NOT NULL,
            email varchar(250) NOT NULL,
            project text NOT NULL,
            PRIMARY KEY(id)
    )AUTO_INCREMENT=80000`).catch((e) => console.log(e));
  
  await query(`create table if not exists Phd_Candidates (
            id int NOT NULL AUTO_INCREMENT,
            user_id int NOT NULL,
            email varchar(250) NOT NULL,
            phd_student_name text NOT NULL,
            thesis_topic text NOT NULL,
            start_year varchar(10) NOT NULL,
            completion_year varchar(10) NOT NULL,
            PRIMARY KEY(id)
        )AUTO_INCREMENT=120000`).catch((e) => console.log(e));
  
  await query(`create table if not exists Professional_Service (
            id int NOT NULL AUTO_INCREMENT,
            user_id int NOT NULL,
            email varchar(250) NOT NULL,
            services text NOT NULL,
            PRIMARY KEY(id)
        )AUTO_INCREMENT=140000;`).catch((e) => console.log(e));
  
  await query(`create table if not exists publications (
                user_id int NOT NULL,
                email varchar(50),
                publication_id int NOT NULL AUTO_INCREMENT,
                publications mediumtext NOT NULL,
                PRIMARY KEY(publication_id),
                UNIQUE KEY(email)
            )AUTO_INCREMENT=160000`).catch((e) => console.log(e));
  
  await query(`create table if not exists subjects_teaching(
                id int NOT NULL AUTO_INCREMENT,
                email varchar(100),
                user_id int NOT NULL,
                subject text NOT NULL,
                PRIMARY KEY(id)
            )AUTO_INCREMENT=20000;`).catch((e) => console.log(e));
  
  await query(`create table if not exists Phd_Candidates (
            id int NOT NULL AUTO_INCREMENT,
            user_id int NOT NULL,
            email varchar(250) NOT NULL,
            phd_student_name text NOT NULL,
            thesis_topic text NOT NULL,
            start_year varchar(10) NOT NULL,
            completion_year varchar(10) NOT NULL,
            PRIMARY KEY(id)
        )AUTO_INCREMENT=120000;`).catch((e) => console.log(e));
  
  await query(`create table if not exists Professional_Service (
            id int NOT NULL AUTO_INCREMENT,
            user_id int NOT NULL,
            email varchar(250) NOT NULL,
            services text NOT NULL,
            PRIMARY KEY(id)
        )AUTO_INCREMENT=140000;`).catch((e) => console.log(e));
  
  await query(`create table if not exists publications (
                user_id int NOT NULL,
                email varchar(50),
                publication_id int NOT NULL AUTO_INCREMENT,
                publications mediumtext NOT NULL,
                PRIMARY KEY(publication_id),
                UNIQUE KEY(email)
            )AUTO_INCREMENT=160000;`).catch((e) => console.log(e));

  await query(`create table if not exists subjects_teaching(
                id int NOT NULL AUTO_INCREMENT,
                email varchar(100),
                user_id int NOT NULL,
                subject text NOT NULL,
                PRIMARY KEY(id)
            )AUTO_INCREMENT=20000;`).catch((e) => console.log(e));
  
  await query(`create table if not exists users (
                id int NOT NULL AUTO_INCREMENT,
                name varchar(50),
                email varchar(100),
                role int(1),
                department varchar(100),
                designation varchar(100),
                ext_no bigint,
                research_interest text,
                PRIMARY KEY (id),
                UNIQUE KEY (email)
            )AUTO_INCREMENT=1000;
`).catch((e) => console.log(e));
  
   await query(`create table if not exists Work_Experience (
            id int NOT NULL AUTO_INCREMENT,
            user_id int NOT NULL,
            email varchar(250) NOT NULL,
            work_experiences text NOT NULL,
            PRIMARY KEY(id)
        )AUTO_INCREMENT=60000`).catch((e) => console.log(e));

  await query(`create table if not exists curr_admin_resonsibility (
                id int NOT NULL AUTO_INCREMENT,
                email varchar(100),
                user_id int NOT NULL,
                curr_responsibility text NOT NULL,
                PRIMARY KEY(id)
            )AUTO_INCREMENT=34000;`).catch((e) => console.log(e));
  
  await query(`CREATE TABLE if not exists past_admin_responsibility (
                id int NOT NULL AUTO_INCREMENT,
                email varchar(100),
                user_id int NOT NULL,
                past_responsibility text NOT NULL,
                PRIMARY KEY(id)
            ) AUTO_INCREMENT = 4500;`).catch((e) => console.log(e));
  
  await query(`CREATE TABLE if not exists education (
                id int NOT NULL AUTO_INCREMENT,
                email varchar(100),
                user_id int NOT NULL,
                certification varchar(10) NOT NULL,
                institution text NOT NULL,
                passing_year varchar(10) DEFAULT NULL,
                PRIMARY KEY(id)
            )AUTO_INCREMENT=7781`).catch((e) => console.log(e));
  
  await query(`create table if not exists events (
                id bigint NOT NULL,
                title varchar(1000),
                timestamp bigint,
                openDate bigint,
                closeDate bigint,
                venue varchar(1000),
                doclink varchar(500),
                attachments varchar(1000),
                user_id varchar(35) NOT NULL,
                PRIMARY KEY (id))`).catch((e) => console.log(e));
  
  await query(`CREATE TABLE if not exists memberships (
                id int NOT NULL AUTO_INCREMENT,
                email varchar(100),
                user_id int NOT NULL,
                membership_id varchar(20) NOT NULL,
                membership_society text NOT NULL,
                PRIMARY KEY(id)
            )AUTO_INCREMENT=90000;`).catch((e) => console.log(e));
  
                
  
  
  console.log("migration ran successfully");
}

migrate().then(() => process.exit());
