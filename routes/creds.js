const { Pool } = require('pg');

const pool = new Pool({
    "host": "localhost", //Local host for local development and testing
    "user": "db_user",  //Insert your database username here
    "database": "db", //Insert what database you want to access here
    "password": "pw", //Insert your db password
    "port": 5432
});

module.exports = pool;