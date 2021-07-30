var endpoint = 'http://localhost:3002'

function showLoginForm(){
    document.querySelector(".login_form").style.display = "flex";
}
function showRegistrationForm(){
    document.querySelector(".create_account_form").style.display = "flex";
}
function closeLoginForm(){
    document.querySelector(".login_form").style.display = "none";
}
function closeRegistrationForm(){
    document.querySelector(".create_account_form").style.display = "none";
}
function showMessageForm(){
    document.querySelector(".message_form").style.display = "flex";
}
function closeMessageForm(){
    document.querySelector(".message_form").style.display = "none";
}

document.getElementById("messageButton").addEventListener("click",() => {
    showMessageForm();
})


function login(){
    let username = document.querySelector(".login_form #username"),
    password = document.querySelector(".login_form #password");

    if(username && password){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username" : username, 
            "password" : password,
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`${endpoint}/login`, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log("error",error);
        });
    }else{
        console.log("Fill all fields");
    }
}

function createAccount(){
    let username = document.querySelector(".create_account_form #name"),
    password = document.querySelector(".create_account_form #password");
    cpassword = document.querySelector(".create_account_form #cpassword");
    if(username && password && cpassword){
        if(password == cpassword){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            var raw = JSON.stringify({
                "username" : username, 
                "password" : password,
            });
    
            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
    
            fetch(`${endpoint}/newuser`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log("error",error);
            });
        }else{
            console.log("Passwords are not same.")
        }
    }else{
        console.log("Fill all fields");
    }
    
}


function sendMessage(){
    let name = document.querySelector(".message_form #name"),
    email = document.querySelector(".message_form #email"),
    message = document.querySelector(".message_form #message");
    if(name && email && message){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name" : name, 
            "email" : email,
            "message" : message,
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`${endpoint}/postletter/letterbox`, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log("error",error);
        });
    }else{
        console.log("Fill all field.")
    }
}