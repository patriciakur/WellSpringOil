const { Pool } = require('pg');

const pool = new Pool({
    "host": "localhost", //Local host for local development and testing
    "user": "postgres",  //Insert your database username here
    "database": "fuelquote", //Insert what database you want to access here
    "password": "Mlkhoa08%", //Insert your db password
    "port": 5432
});

module.exports = pool;