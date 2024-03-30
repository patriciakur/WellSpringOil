const express = require('express');
const pool = require('./creds');
const router = express.Router();

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;

    // Query to fetch form history based on the UserID key
    const query = `SELECT * FROM fuelquote WHERE userId = ${userId}`;

    const checkHistory = await pool.query(query, [userId], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch form history' });
        } else {
            res.json(results);
        }
    });
});

module.exports = router