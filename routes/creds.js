const { Pool } = require('pg');

const pool = new Pool({
    "host": "hansken.db.elephantsql.com", //postgreSQL DB hosted on elephantSQL
    "user": "gugspeoq",  //Insert your database username here
    "database": "gugspeoq", //Insert what database you want to access here
    "password": "pFClKWKVzSKg_EpRS-ikjHJxak68TgMW", //Insert your db password
    "port": 5432
});

module.exports = pool;