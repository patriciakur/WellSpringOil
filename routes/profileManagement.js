const express = require('express')
const router = express.Router()
const pool = require('./creds');


router.post('/:firstname/:lastname/:street/:city/:state/:zipcode', async (req, res) => {
    const{firstname, lastname, street, city, state, zipcode} = req.params;
    console.log(`Client Profile - First Name: ${firstname}`)
    console.log(`Client Profile - Last Name: ${lastname}`)
    console.log(`Client Profile - Street: ${street}`)
    // console.log(`Client Profile - Address 2: ${address2}`)
    console.log(`Client Profile - City: ${city}`)
    console.log(`Client Profile - State: ${state}`)
    console.log(`Client Profile - Zip Code: ${zipcode}`) 

    const allUsers = await pool.query(`SELECT * FROM user_credentials;`);
    const lastUser = allUsers.rows[allUsers.rows.length-1];
    console.log(lastUser);

    // const dup = await pool.query(`SELECT * FROM user_info WHERE username = '${lastUser.username}';`);
    // if (dup.rows.length == 0){
    //     var newProfile = await pool.query(`INSERT INTO clientinformation (username, fullname, address1, address2, city, state, zipcode) 
    //         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [lastUser.username, fullName, address1, address2, city, state, zipcode]);
    // }
    // else{
    //     var newProfile = await pool.query(`UPDATE clientinformation 
    //     SET fullname = '${fullName}', address1 = '${address1}', address2 = '${address2}', city = '${city}', state = '${state}', zipcode = '${zipcode}'
    //     WHERE username ='${lastUser.username}';`);
    // }

    var newProfile = await pool.query(`INSERT INTO user_profile (userID, firstname, lastname, street, city, state, zip, username) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [123, firstname, lastname, street, city, state, zipcode, lastUser.name]);
    console.log(newProfile);
    res.json();
})

module.exports = router