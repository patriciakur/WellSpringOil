const express = require( 'express' );
const crypto = require( 'crypto' );
const pool = require('./creds');
const router = express.Router();

//Check username and zipcode
router.get('/:userName/:zipcode', async (req, res) => {
    const {userName, zipcode} = req.params;
    console.log("Checking user:" + userName);
    console.log("Checking zipcode: " + zipcode);

    const checkZip = await pool.query(`SELECT * FROM clientInfo WHERE username = '${userName}' AND zipcode = '${parseInt(zipcode)}'`);
    if (checkZip.rows.length == 0){
        console.log("User not found");
        res.json(checkZip);
    }
    else {
        console.log("User found!")
        res.json(checkZip);
    }
}); 


//Update new password for current user
router.post("/", async ( req, res ) => {
    const {user, pw} = req.body;
    
    //Hash the password before storing it in the database
    hash = crypto.createHash('sha256').update(pw).digest('hex')

                        
    try{
        await pool.query(`UPDATE usercredentials SET password=$1 WHERE name=$2`, [hash, user]);
        res.status(200).send()
    }catch(err){
        console.error(err);
        res.status(400).json({"message": "Failed to update password."})
    };
});

module.exports = router;