const express = require('express'); 
const router = express.Router(); 
const pool = require('./creds'); 

async function updateUser(username, fullname, add1, city, state, zip,) {
    const result = await pool.query('UPDATE clientInfo SET fullname= ?, address1 = ? , city = ? , state = ?, zip = ?, WHERE username = ? ', [fullname, add1, city, state, zip, username])
    return result;
  }
router.get('/profile', async(req, res) =>{
    const username = req.params.user
    console.log(username + " accessed profile management"); 

});  

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
  
