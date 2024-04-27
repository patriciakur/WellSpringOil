
async function calPricePerGallon(callback){
    callback();
    

    //access table "usercredentials" to get the logged user's information for "location factor" 
    try{
        const response = await fetch(`http://localhost:3000/profile/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
    } catch(err){
       
    } 

    //access table "fuelquote" to get the logged user's information for "rate history factor"
    try{
        const response1 = await fetch(`http://localhost:3000/quote`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
    } catch(err){
        
    }
    
}


async function submitForm(callback){
    callback();
    //const galreq = document.querySelector("#gallonRequest").value;
    //var datereq = document.querySelector("#dateRequest").value;
    try{
        // if (total < 0) {
           
        //     document.getElementById("fuelquote").innerHTML = '<i>Please click `CALCULATE` to get your total due!</i>';
        // }
        
        try{
            const response = await fetch(`http://localhost:3000/quote/${galreq}/${datereq}/${total}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify()
            });
            
        }catch(err){
            
        }
        
    }catch(err){

    }
}


// async function fuelQuoteHist() {
    
//     try{
//         //print fuel quote history
//         const response1 = await fetch(`http://localhost:3000/quote`, {
//             method: "GET",
//             headers: { "Content-Type": "application/json" },
//         });
        
        
//     } catch(err){
        
//     }
// }

module.exports = {submitForm, calPricePerGallon}
