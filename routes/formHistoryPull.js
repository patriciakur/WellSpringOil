const express = require('express');
const pool = require('./creds');
const router = express.Router();

router.get('/', async (req, res) => { //'/:cookie'
    /*const cookie = req.params.cookie;

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
    }*/

    const allUsers = await pool.query(`SELECT * FROM user_credentials;`);
    const lastUser = allUsers.rows[allUsers.rows.length-1];
    const lastUserQuoteHistory = await pool.query(`SELECT * FROM formhistory WHERE username = '${lastUser.name}';`);
    res.json(lastUserQuoteHistory);

    /*// Query to fetch form history based on the UserID key
    const query = `SELECT *
	FROM public."formhistory"
	;` //WHERE "formhistory"."userID" = ${userID}
    

    const checkHistory = await pool.query(query, (error, results) => {//[userId],
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch form history' });
        } else {
            res.json(results);
        }
    });*/
});



module.exports = router