const website = '../php/';

async function getUserInfo()
{
    //Set your html element's ID to "user" to use the username as a way to grab information regarding the user

    user = document.getElementById("user").value; //This will grab the input within the html element named "user"
    
    //PHP stuff
    url = website + `getUser.php?user=${user}`;
    console.log("url", url);
    const response = await fetch(url);
    if (!response)
    {
        throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();

    //Naming your html elements these respective names will provide the relevant information regarding them
    document.getElementById('name').innerHTML = json.name; //name is the same as user
    document.getElementById('email').innerHTML = json.email;
    document.getElementById('password').innerHTML = json.password;
    document.getElementById('score').innerHTML = json.score;
    document.getElementById('lastonline').innerHTML = json.lastonline;
}

async function createUser()
{
    //Set your html element's ID to "user" to use the username as a way to grab information regarding the user
    user = document.getElementById("user").value; //This will grab the input within the html element named "user"
    email = document.getElementById("email").value; //This will grab the input within the html element named "email"
    password = document.getElementById("password").value; //This will grab the input within the html element named "password"

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

    //PHP stuff
    url = website + `createUser.php?user=${user}&email=${email}&password=${password}`;
    console.log("url", url);
    const response = await fetch(url);
    if (!response)
    {
        throw new Error(`Response status: ${response.status}`);
    } else {
        try {
            document.getElementById("response").innerHTML = "Account created successfully"; //Response ID provides a completed Response
        } catch (error) {
            document.getElementById("response").innerHTML = "Account not created successfully. Was the username or email used before?";
        }
    }
    
}