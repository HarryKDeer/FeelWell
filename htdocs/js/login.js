// grabbing functions from databas.js
const { getUserInfo, createUser } = require('./database');

  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBdxxHqQ7cKHtW0P84Fqvu7TQ650iOdhmw",
    authDomain: "feelwell-ee992.firebaseapp.com",
    projectId: "feelwell-ee992",
    storageBucket: "feelwell-ee992.appspot.com",
    messagingSenderId: "384803581584",
    appId: "1:384803581584:web:eee9787efdac112b71b215",
    measurementId: "G-KP1HE79950"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// initialize authentication var
const auth = firebase.auth()

// Set up register function
function register(){
    // call createUser function to grab the info
    createUser()
    
    // grabs user, email + password for authenication
    user = document.getElementById("user").value;
    email = document.getElementById('email').value
    password = document.getElementById('email').value

    //This uses regular expressions to prevents the user from injecting HTML code into the database
    let userRegex = new RegExp('^[a-zA-Z]+[a-zA-Z0-9_-]*$'); 
    let emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}'); //This ensures that this is a valid email address
 
    if (!userRegex.test(user)){
        document.getElementById("error").innerHTML = "Invalid username"; //error ID provides error feedback
        document.getElementById("response").innerHTML = "Account not created successfully";
        return;
    } else if (!emailRegex.test(email)) {
        document.getElementById("error").innerHTML = "Invalid email";
        document.getElementById("response").innerHTML = "Account not created successfully";
        return;
    } else if (!password || password.length < 3) {
        document.getElementById("error").innerHTML = "Invalid password. Your password must be at least 3 characters long";
        document.getElementById("response").innerHTML = "Account not created successfully";
        return;
    } else {
        document.getElementById("error").innerHTML = "";
        document.getElementById("response").innerHTML = "";
    }

    // authenticate user
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
        var user = auth.currentUser

        // if authenicated, will call createUser and do all the cool db stuff, also checks if email, password is viable
        createUser()

        alert('User Created!!')
    })
    .catch(function(error) {
        // Firebase will use this to alert of its errors
        var error_code = error.code
        var error_message = error.message
  
        alert(error_message)
    })
}

// Set up Login funcitno
function login(){
    // Get input fields
    email = document.getElementById('email').value
    password = document.getElementById('email').value

    // validate email + password
    if (!emailRegex.test(email)) {
        document.getElementById("error").innerHTML = "Invalid email";
        document.getElementById("response").innerHTML = "Account not created successfully";
        return;
    }else if (!password || password.length < 3) {
        document.getElementById("error").innerHTML = "Invalid password. Your password must be at least 3 characters long";
        document.getElementById("response").innerHTML = "Account not created successfully";
        return;
    }

    // authenticate it's really the user
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
        // declare user variable
        var user = auth.currentUser

        // need db update function
    })
}

function toggleForms() {
    const loginForm = document.getElementById('login');
    const registerForm = document.getElementById('register');
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}