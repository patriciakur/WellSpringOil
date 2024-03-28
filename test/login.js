
async function confirmInput(callback) {
    callback();
    //const user = document.querySelector("#user").value;
    //const pw = document.querySelector("#pw").value;
        try{
            const response = await fetch(`http://localhost:3000/login/${user}/${pw}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

        } catch(err){
            
        }
        
}

module.exports = confirmInput