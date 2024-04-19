const express = require('express');
const router = express.Router();
const pool = require('./creds'); //import pool to access database

// GET endpoint to return calculated price per gallon
router.get('/', async (req, res) => {
    const price = 2.50;
    res.json({ price: price });
});

function calculatePrice() {
    // Example implementation, replace with your actual logic
    return 2.50; // Dummy value
}

// POST endpoint for submitting a new quote
// router.post('/quotes', (req, res) => {
router.post('/', async (req, res) => {
    //Please test locally if the query to database is working properly
    // Extract form data from request body
    console.log(req.body);
    const { gallons, deliveryAddress, deliveryDate, pricePerGallon, total } = req.body;
    console.log(gallons + " " + deliveryDate);
    // if (onlyNumbers(gallons) && isValidDateFormat(delivery_date)) //should validate before calling API
    if (gallons >= 0 && deliveryDate != '') {
        // Calculate price per gallon
        // const pricePerGallon = calculatePrice();

        // Retrieve delivery address from clientInfo table (replace with your actual PostgreSQL queries)
        // await pool.query('SELECT address FROM clientInfo WHERE id = 12345678', [req.body.clientId], (error, results) => {
        //     if (error) {
        //         console.error('Error retrieving delivery address:', error);
        //         res.status(500).send('Internal server error');
        //         return;
        //     }

        //     // Extract delivery address from query results
        //     const delivery_address = results.rows[0].address;

        //     // Calculate total amount due
        //     const totalAmountDue = gallons * pricePerGallon;

            // Validate form data (implement validation logic here)

            // Insert data into Quote table (using your PostgreSQL queries)
            // Example:
        var form = await pool.query(`INSERT INTO formHistory (galRequested, deliveryAddress, deliveryDate, pricePerGallon, totalPrice) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [gallons, deliveryAddress, deliveryDate, pricePerGallon, total]);
                // (error, results) => {
                //     if (error) {
                //         console.error('Error inserting quote:', error);
                //         res.status(500).send('Internal server error');
                //     } else {
                //         res.status(201).send('Quote submitted successfully');
                //     }
                // });
        console.log(form)
        res.json();
    }
    else {
        // Validation failed
        res.status(400).send('Validation failed');
    }
});

module.exports = router;