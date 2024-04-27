const express = require('express');
const router = express.Router();
const pool = require('./creds'); //import pool to access database

// GET endpoint to return calculated price per gallon
router.get('/', async (req, res) => {
    const price = 1.50;
    res.json({ price: price });
});


// POST endpoint for submitting a new quote
router.post('/', async (req, res) => {
    // Extract form data from request body
    console.log(req.body);
    const { gallons, deliveryAddress, deliveryDate, pricePerGallon, total } = req.body;

    //get username
    const allUsers = await pool.query(`SELECT * FROM user_credentials;`);
    const lastUser = allUsers.rows[allUsers.rows.length-1];

    console.log(gallons + " " + deliveryDate);
    if (gallons >= 0 && deliveryDate != '') {
        
        var form = await pool.query(`INSERT INTO formHistory (galRequested, deliveryAddress, deliveryDate, pricePerGallon, totalPrice, username) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [gallons, deliveryAddress, deliveryDate, pricePerGallon, total, username= lastUser.name]);
        console.log(form)
        res.json();
    }
    else {
        // Validation failed
        res.status(400).send('Validation failed');
    }
});

module.exports = router;