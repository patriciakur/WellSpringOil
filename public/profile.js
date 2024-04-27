

window.onload = async function printProfile(){
    console.log('Getting last user information...')
    try{
        const response = await fetch(`http://localhost:3000/profile/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
    console.log("Please Print")
    const info = await response.json();
    console.log("Returned Profile: ", info);
    document.getElementById('firstname').value = info.rows[0].firstname;
    document.getElementById('lastname').value = info.rows[0].lastname;
    document.getElementById('street').value = info.rows[0].street;
    document.getElementById('city').value = info.rows[0].city;
    document.getElementById('state').value = info.rows[0].state;
    document.getElementById('zipcode').value = info.rows[0].zip;
    } catch(err){
        console.log(err.message);
    }
    
}
