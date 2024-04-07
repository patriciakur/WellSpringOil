
function containsChar(s) {
    for (var i = 0; i < s.length; i++) {
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
function containsSpace(s) {
    for (var i = 0; i < s.length; i++)
        if (s[i] == ' ') return true;
    return false;
}

async function UserNameExist(user) {
    try {
        const response = await fetch(`http://localhost:3000/login/${user}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const checkUser = await response.json();
        console.log(checkUser.rows.length);
        if (checkUser.rows.length == 0) {
            console.log("User does not exist!");
            return false;
        }
        else {
            // console.log("User exist!");
            return true;
        }
    } catch (err) {
        console.log(err.message);
    }

}


async function validateForm() {
    console.log("Checking valid username and password...");
    const username = document.querySelector("#user").value;
    const password = document.querySelector("#pw").value;
    const confirm = document.querySelector("#confPw").value;
    if (username == "" || password == "" || confirm == "") {
        var btn = document.getElementById("notif");
        btn.innerHTML = "<b> Please fill all the required fields</b>";
    }
    else {
        var ascii = password[0].charCodeAt(0);
        let validUser = (containsSpace(username) == false) && (!containsSpecialChars(username));
        let validPwd = (password.length >= 5) && (65 <= ascii && ascii <= 90) && (containsSpace(password) == false) && (containsSpecialCharsNumbers(password));

        if (validUser == false) {
            alert("Invalid Username!");
            event.preventDefault();
        }
        else if (await UserNameExist(username) == true) {
            alert("Username is taken! Please try a different username!");
            event.preventDefault();
        }
        else if (validPwd == false) {
            if (password.length < 5) {
                alert("Invalid Password! Must have at least 5 characters");
                event.preventDefault();
            }
            else if (password.search(/[A-Z]/) < 0) {
                alert("Invalid Password! Must be capitalized");
                event.preventDefault();
            }
            else if (containsSpace(password) == true) {
                alert("Invalid Password! Must have no space");
                event.preventDefault();
            }
            else if (containsSpecialCharsNumbers(password) == false) {
                alert("Invalid Password! Must have at least 1 special character or number");
                event.preventDefault();
            } console.log('testing line');
        }
        else if (password != confirm) {
            alert("Password does not match!");
            event.preventDefault();
        }
        else { ///valid, call server
            try {
                const response = await fetch(`http://localhost:3000/register/${username}/${password}/${confirm}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify()
                });
                window.location.href = "profile.html";
            } catch (err) {
                console.log(err.message);
            }
        }
    }
}

// async function ZipCodeMatched(zipcode, user){
//     try{
//         const response = await fetch(`http://localhost:3000/resetPwd/${user}/${zipcode}`, {
//             method: 'GET',
//             headers: {'Content-Type': 'application/json'}
//         });
//         const checkZip = await response.json();
//         console.log(checkZip.rows.length);
//         if (checkZip.rows.length == 0){
//             return false;
//         }
//         else{
//             return true;
//         }
//     }
//     catch(err){
//         console.log(err.message);
//     }
// }

async function resetPw() {
    console.log("Checking valid Username and Zip Code...");

    //get username from input field
    let userName = document.getElementById("username").value;
    //get zip code from input field
    let zipCode = document.getElementById("zipcode").value;
    //get new password from input field
    let pw = document.getElementById("newpw").value;

    //check to make sure fields are filled out
    if (!userName || !zipCode || !pw) {
        alert("Please fill in all fields.");
        event.preventDefault();
    }
    // else {
    //     var ascii = pw[0].charCodeAt(0);
    //     let validUser = (containsSpace(userName) == false) && (!containsSpecialChars(userName));
    //     let validPwd = (pw.length >= 5) && (65 <= ascii && ascii <= 90) && (containsSpace(pw) == false) && (containsSpecialCharsNumbers(pw));
    //     let validZip = (containsChar(zipCode) == false) && (containsSpace(zipCode) == false) && (!containsSpecialChars(zipCode))

    //     if (validUser == false) {
    //         alert("Username must  only contain letters, numbers, no spaces.");
    //         event.preventDefault();
    //     }
    //     else if ( await UserNameExist(userName) == false) {
    //         alert("The entered username does not belong to an account.");
    //         event.preventDefault();
    //     }
    //     else if (validZip == false) {
    //         alert("Invalid zip code format.");
    //         event.preventDefault();
    //     }
    //     else if ( await ZipCodeMatched(zipCode, userName) == false) {
    //         alert("The provided zip code is incorrect.");
    //         event.preventDefault();
    //     }
    //     else if (validPwd == false) {
    //         if (pw.length < 5) {
    //             alert("Invalid Password! Must have at least 5 characters");
    //             event.preventDefault();
    //         }
    //         else if (65 > ascii || ascii > 90) {
    //             alert("Invalid Password! Must be capitalized");
    //             event.preventDefault();
    //         }
    //         else if (containsSpace(pw)) {
    //             alert("Invalid Password! Must have no space");
    //             event.preventDefault();
    //         }
    //         else if (containsSpecialCharsNumbers(pw) == false) {
    //             alert("Invalid Password! Must have at least 1 special character or number");
    //             event.preventDefault();
    //         } console.log('testing line');
    //     }
    //     else {
    //         try {
    //             //send request to the server with username and zip code
    //             const response = await fetch('http://localhost:3000/resetPwd', {
    //                 method: 'post',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify({
    //                     'username': userName,
    //                     'zipcode': zipCode,
    //                     'pw': pw
    //                 })
    //             });
    //             //confirm user password is reset
    //             alert("Reset Password Successfully");
    //         }
    //         catch (error) {
    //             console.log('Error: ', error);
    //         }
    //     }
    // }

    //Checking if user enter valid info
    const response = await fetch(`http://localhost:3000/resetPwd/${userName}/${zipCode}`, {
        method: "GET",
        headers: {"Content-Type" : "application/json"},
    });

    const userInfo = await response.json()
    if (userInfo.rows.length == 0){
        console.log("User not found")
        alert( "No user information found! Check Username or Zip Code" );
    }    
    else {
        //Check if password is valid
        console.log("User Info Found!");
        var ascii = pw[0].charCodeAt(0);
        let validPwd = (pw.length >= 5) && (65 <= ascii && ascii <= 90) && (containsSpace(pw) == false) && (containsSpecialCharsNumbers(pw));
        if (validPwd == false) {
            if (pw.length < 5) {
                alert("Invalid Password! Must have at least 5 characters");
                event.preventDefault();
            }
            else if (pw.search(/[A-Z]/) < 0) {
                alert("Invalid Password! Must be capitalized");
                event.preventDefault();
            }
            else if (containsSpace(pw) == true) {
                alert("Invalid Password! Must have no space");
                event.preventDefault();
            }
            else if (containsSpecialCharsNumbers(pw) == false) {
                alert("Invalid Password! Must have at least 1 special character or number");
                event.preventDefault();
            } console.log('testing line');
        }
        //if new password is valid
        const response2 = await fetch(`http://localhost:3000/resetPwd`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'user': userName,
                'pw': pw    
            })
        });
        console.log("Password updated")
        alert("Password updated!") 
    }
}    