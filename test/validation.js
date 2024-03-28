
function containsChar(s) {
    for (var i = 0; i < s.length; i++){
        let c = s[i].charCodeAt(0);
        if ((65 <= c && c <= 90) || (97 <= c && c <= 122))
            return true;
    }
    return false;
}

function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
}
function containsSpecialCharsNumbers(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890]/;
    return specialChars.test(str);
}
function containsSpace(s){
    for (var i = 0; i < s.length; i++)
        if (s[i] == ' ') return true;
    return false;
}

async function UserNameExist(callback, user) {
    callback();
        try{
            const response = await fetch(`http://localhost:3000/login/${user}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

        } catch(err){
            
        }
        
}

async function checkValidsUserPwd(callback, username, password, confirm){
    callback();
    try{
        /*const username = document.querySelector("#user").value;
        const password = document.querySelector("#pw").value;
        const confirm = document.querySelector("#confPw").value;*/
        if (username == "" || password == "" || confirm == ""){
        }
        else{
            
                try{
                    const response = await fetch(`http://localhost:3000/register/${username}/${password}/${confirm}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify()
                    });
                
                } catch(err){
                    
                }
        }
    }catch(err){
        
    }
}

module.exports = {containsChar, containsSpecialChars, containsSpecialCharsNumbers, containsSpace, UserNameExist, checkValidsUserPwd}