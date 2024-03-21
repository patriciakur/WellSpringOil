const express = require('express')
const crypto = require('crypto')
const router = express.Router()
const pool = require('./creds');


// Route handler listens for HTTP GET request to Check if username and password exists in database
router.get('/:user/:pw', async (req, res) => {
    console.log('Logging in...');
    const {user, pw} = req.params;
    console.log(`Login - User: ${user}`)
    console.log(`Login - Password: ${pw}`)
    //Hash password
    hash = crypto.createHash('sha256').update(pw).digest('hex')

    const checkUser = await pool.query(`SELECT * FROM usercredentials WHERE name = '${user}' AND password = '${hash}'`);
    // If user exists, delete the user from database, then insert new record with updated hash password
    if (checkUser.rows.length > 0){
        console.log('Valid....');
        const deleteUser = await pool.query(`DELETE FROM usercredentials WHERE name = '${user}'`);
        const insertUser = await pool.query(`INSERT INTO usercredentials (name, password) 
        VALUES ($1, $2) RETURNING *`, [user, hash]);
        res.json(checkUser);
    }
    else {
        console.log('Invalid....');
        res.json(checkUser);
    }
})

// For registration purpose, check if the username is already exists in database
router.get('/:user', async (req, res) => {
    console.log('Checking username exists...');
    const {user} = req.params;
    console.log(`Checking - User: ${user}`)
    const checkUser = await pool.query(`SELECT * FROM usercredentials WHERE name = '${user}'`);
    if (checkUser.rows.length > 0){
        console.log('Username exists! Invalid!....');
        res.json(checkUser);
    }
    else {
        console.log('Username does not exist! Valid!....');
        res.json(checkUser);
    }
})

module.exports = router