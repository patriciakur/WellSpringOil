
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

async function UserNameExist(user) {
    try{
        const response = await fetch(`http://localhost:3000/login/${user}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const checkUser = await response.json();
        console.log(checkUser.rows.length);
        if (checkUser.rows.length == 0){
            return false;
        }
        else{
            return true;
        }
    } catch(err){
        console.log(err.message);
    }
    
}


async function validateForm(){
    console.log("Checking valid username and password...");
    const username = document.querySelector("#user").value;
    const password = document.querySelector("#pw").value;
    const confirm = document.querySelector("#confPw").value;
    if (username == "" || password == "" || confirm == ""){
        var btn = document.getElementById("notif");
        btn.innerHTML = "<b> Please fill all the required fields</b>";
    }
    else{
        var ascii = password[0].charCodeAt(0);
        let validUser = (containsSpace(username) == false) && (!containsSpecialChars(username));
        let validPwd = (password.length >= 5) && (65 <= ascii && ascii <= 90) && (containsSpace(password) == false) && (containsSpecialCharsNumbers(password));

        if (validUser == false){
            alert("Invalid Username!");
            event.preventDefault();
        }
        else if (await UserNameExist(username) == true){
            alert("Username is taken! Please try a different username!");
            event.preventDefault();
        }
        else if (validPwd == false){
            if (password.length < 5){
                alert("Invalid Password! Must have at least 5 characters");
                event.preventDefault();
            }
            else if (65 > ascii || ascii > 90){
                alert("Invalid Password! Must be capitalized");
                event.preventDefault();
            }
            else if (containsSpace(password)){
                alert("Invalid Password! Must have no space");
                event.preventDefault();
            }
            else if (containsSpecialCharsNumbers(password) == false){
                alert("Invalid Password! Must have at least 1 special character or number");
                event.preventDefault();
            }console.log('testing line');
        }
        else if (password != confirm){
            alert("Password does not match!");
            event.preventDefault();
        }
        else{ ///valid, call server
            try{
                const response = await fetch(`http://localhost:3000/register/${username}/${password}/${confirm}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify()
                });
            window.location.href = "profile.html";
            } catch(err){
                console.log(err.message);
            }
        }
    }
    
}