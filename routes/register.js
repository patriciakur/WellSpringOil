const express = require('express')
const crypto = require('crypto')
const router = express.Router()
const pool = require('./creds');

// After successfully register a new user, insert user into the database
router.post('/:username/:password/:confirm', async (req, res) => {
    const{username, password, confirm} = req.params;
    console.log(`Registration - User: ${username}`)
    console.log(`Registration - Password: ${password}`)
    console.log(`Registration - Confirm Password: ${confirm}`)
    console.log(`Registration - Passwords Match: ${password == confirm}`)
    // Hash password for security purpose
    hash = crypto.createHash('sha256').update(password).digest('hex')
    
    var newAccount = await pool.query(`INSERT INTO user_credentials (name, password) 
        VALUES ($1, $2) RETURNING *`, [username, hash]);
    console.log(newAccount);
    res.json();
})

module.exports = router