const express = require('express');
const pool = require('./creds');
const router = express.Router();

router.get('/:cookie', async (req, res) => {
    const cookie = req.params.cookie;

    //unravel the cookie to get the userID
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
         var userID = c.substring(name.length, c.length);
        }
    }

    // Query to fetch form history based on the UserID key
    const query = `SELECT "quoteID", "galRequested", "deliveryDate", "pricePerGallon", "totalPrice", "userID"
	FROM fuelQuote
	WHERE userID = ${userID};`

    const checkHistory = await pool.query(query, (error, results) => {//[userId],
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch form history' });
        } else {
            res.json(results);
        }
    });
});

module.exports = router