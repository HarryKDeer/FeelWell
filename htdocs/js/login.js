// grabbing functions from databas.js
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {getAnalytics} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js"
import { getUserInfo, createUser } from "./database.js";

  
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
const auth = getAuth(app);

// Set up register function
function register(){
    // call createUser function to grab the info
    createUser();
    
    // grabs user, email + password for authenication
    const user = document.getElementById("reg_user").value;
    const email = document.getElementById('reg_email').value;
    const password = document.getElementById('reg_password').value;

    const auth = getAuth();


    // authenticate user
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user
        alert('User Created!!')
        window.location.href = "index.html";
    })
    .catch(function(error) {
        // Firebase will use this to alert of its errors
        const errorCode = error.code
        const errorMessage = error.message
  
        alert(errorMessage)
        alert("u shitter")
    })
}

// Set up Login function
function login(){
    // Get input fields
    const email = document.getElementById('log_email').value;
    const password = document.getElementById('log_password').value;
    // validate email + password
    /*
    if (!emailRegex.test(email)) {
        document.getElementById("error").innerHTML = "Invalid email";
        document.getElementById("response").innerHTML = "Account not created successfully";
        return;
    }else if (!password || password.length < 3) {
        document.getElementById("error").innerHTML = "Invalid password. Your password must be at least 3 characters long";
        document.getElementById("response").innerHTML = "Account not created successfully";
        return;
    }
    */
    const auth = getAuth();
    // authenticate it's really the user
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        
        //window.location.href = "index.html"
        console.log("it work");
        alert("it not working")
        window.location.href = "index.html"
        // ...
      })
    .catch(function(error) {
        // Firebase will use this to alert of its errors
        const errorCode = error.code
        const errorMessage = error.message
  
        alert(errorMessage)
        alert("u shitter")
    })


}

function logout() {
    const auth = getAuth();
    signOut(auth)
    .then(() => {
        // Sign-out successful.
        // Optionally, redirect to login page or update UI
        // window.location.href = "login.html";
        checkAuthState()
        console.log("User signed out successfully");
        alert("User signed out successfully")
    })
    .catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
    });
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

function checkAuthState() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    console.log("bruh");
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(user.email)
        
        // ...
    } else {
        // User is signed out
        // ...
        console.log("typeshit");
        window.location.href = "login.html";
    }
});
}

export { register, login, toggleForms, checkAuthState, logout };