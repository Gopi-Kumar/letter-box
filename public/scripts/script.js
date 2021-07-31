var endpoint = 'http://localhost:3002'
import {showNotification} from './notifiaction'
showNotification();
function showLoginForm(){
    showOverlay();
    document.querySelector(".login_form").style.display = "flex";
}
function showRegistrationForm(){
    showOverlay();
    document.querySelector(".create_account_form").style.display = "flex";
}
function closeLoginForm(){
    hideOverlay();
    document.querySelector(".login_form").style.display = "none";
}
function closeRegistrationForm(){
    hideOverlay();

    document.querySelector(".create_account_form").style.display = "none";
}
function showMessageForm(){
    showOverlay();
    document.querySelector(".message_form").style.display = "flex";
}
function closeMessageForm(){
    hideOverlay();

    document.querySelector(".message_form").style.display = "none";
}

document.getElementById("messageButton").addEventListener("click",() => {
    showMessageForm();
})

function showOverlay(){
    document.querySelector("#overlay").style.display = "flex";
    document.body.style.overflow = "hidden";
}
function hideOverlay(){ 
    document.querySelector("#overlay").style.display = "none";
    document.body.style.overflow = "scroll";
}

function login(){
    let username = document.querySelector(".login_form #username").value,
    password = document.querySelector(".login_form #password").value;
    
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
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if(result.message){
                console.log(result.message);
            }else{
                console.log(result.letters);
                localStorage.setItem("letter-box-inbox", JSON.stringify(result.letters));
                window.location.href = "/inbox"
            }

        })
        .catch(error => {
            console.log("error",error);
        });
    }else{
        console.log("Fill all fields");
    }
}

function createAccount(){
    let username = document.querySelector(".create_account_form #name").value,
    password = document.querySelector(".create_account_form #password").value;
    cpassword = document.querySelector(".create_account_form #cpassword").value;
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
    let name = document.querySelector(".message_form #name").value,
    email = document.querySelector(".message_form #email").value,
    message = document.querySelector(".message_form #message").value;
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
        .then(response => response.json())
        .then(result => {
            closeMessageForm();
        })
        .catch(error => {
            console.log("error",error);
        });
    }else{
        console.log("Fill all field.")
    }
}