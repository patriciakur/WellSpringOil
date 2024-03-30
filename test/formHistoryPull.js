async function pullHistory(callback) {
    callback();
    try{
        const response = await fetch(`http://localhost:3000/formHistory/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

    } catch(err){

    }
}

module.exports = pullHistory