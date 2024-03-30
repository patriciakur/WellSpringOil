const express = require('express'); 
const router = express.Router(); 
const pool = require('./creds'); 

async function updateUser(user, fullname, add1, add2, city, state, zip, info_complete) {
    const result = await pool.query('UPDATE users SET fullName= ?, address1 = ? , address2 = ?, city = ? , state = ?, zip = ?, info_complete = ? WHERE username = ? ', [fullName, add1, add2, city, state, zip, info_complete, username])
    return result;
  }
router.get('/profileManagement/:user', async(req, res) =>{
    const username = req.params.user
    console.log(username + " accessed profile management"); 

});  

router.post('/profileManagement/:user', async(req, res) => {
    const fname = req.body.fullname;
    const taddress1 = req.body.address1;
    const taddress2 = req.body.address2;
    const zip = req.body.zipcode;
    const city = req.body.city;
    const state = req.body.state;
    
  
    curr_user.fname = fname;
    curr_user.add = taddress1;
    curr_user.add2 = taddress2;
    curr_user.city = city;
    curr_user.state = state;
    curr_user.zip = zip;
    curr_user.info_completed = true;
    curr_user.user_history = [];  

    if (fname && taddress1 && zip && city && state) { // Check if all required fields are present
        curr_user.info_completed = true;
    
        //console.log(curr_user);
        await updateUser(curr_user.user, curr_user.fname, curr_user.add, curr_user.add2, curr_user.city, curr_user.state, curr_user.zip, curr_user.info_completed, curr_user.username);
        
        logged_in = true;
        res.redirect('/index');
      } else {
        // Inform user that all required fields are not present
        res.send('Please fill in all required fields');
      }

}); 

module.exports = router; 
  
