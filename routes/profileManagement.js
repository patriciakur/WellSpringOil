const express = require('express')
const router = express.Router()
const pool = require('./creds'); 

/*
async function updateUser(username, fullname, add1, city, state, zip,) {
    const result = await pool.query('UPDATE clientInfo SET fullname= ?, address1 = ? , city = ? , state = ?, zip = ?, WHERE username = ? ', [fullname, add1, city, state, zip, username])
    return result;
  }
*/

router.get('/', async (req, res) => {
    const allUsers = await pool.query(`SELECT * FROM user_credentials;`);
    const lastUser = allUsers.rows[allUsers.rows.length-1];
    console.log(lastUser);
    const lastUserProfile = await pool.query(`SELECT * FROM user_profile WHERE username = '${lastUser.name}';`);
    // console.log("User Profile: ", lastUserProfile)
    res.json(lastUserProfile);
});

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

    const dup = await pool.query(`SELECT * FROM user_profile WHERE username = '${lastUser.username}';`);
    if (dup.rows.length == 0){
        var newProfile = await pool.query(`INSERT INTO user_profile (firstname, lastname, street, city, state, zip, username) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [firstname, lastname, street, city, state, zipcode, lastUser.name]);
        console.log(newProfile);
    }
    else{
        var newProfile = await pool.query(`UPDATE user_profile 
        SET firstname = '${firstname}', lastname = '${lastname}', street = '${street}', city = '${city}', state = '${state}', zip = '${zipcode}'
        WHERE username ='${lastUser.username}';`);
    }

    res.json();
})

module.exports = router 

/* 
router.post('/profile', async(req, res) => {
    const fname = req.body.fullname;
    const taddress1 = req.body.address1;
    const zip = req.body.zipcode;
    const city = req.body.city;
    const state = req.body.state;
    
  
    curr_user.fname = fname;
    curr_user.add = taddress1;
    curr_user.city = city;
    curr_user.state = state;
    curr_user.zip = zip;
    curr_user.user_history = [];  

    if (fname && taddress1 && zip && city && state) { // Check if all required fields are present
        //console.log(curr_user);
        await updateUser(curr_user.username, curr_user.fname, curr_user.add, curr_user.city, curr_user.state, curr_user.zip);
        
        logged_in = true;
        res.redirect('/index');
      } else {
        // Inform user that all required fields are not present
        res.send('Please fill in all required fields');
      }

}); 

module.exports = router; 
*/