
async function confirmInput() {
    const user = document.querySelector("#user").value;
    const pw = document.querySelector("#pw").value;
        try{
            const response = await fetch(`http://localhost:3000/login/${user}/${pw}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const checkUser = await response.json();
            console.log(checkUser.rows.length);
            if (checkUser.rows.length == 0){
                alert("Invalid Credentials! Please try again")
                event.preventDefault();
            }
            else{
                window.location.href = "fuelForm.html";
            }
        } catch(err){
            console.log(err.message);
        }
        
}

module.exports = confirmInput