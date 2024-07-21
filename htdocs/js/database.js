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

async function getUserJson(user = document.getElementById("user").value) //You can pass either a variable in, or the function will get it itself
{    
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
    if (json){
        document.getElementById("userScore").innerHTML = json.score;
        return json; //Usually in the form of {name: , email: , password: , score: , lastonline: }
    } else {
        document.getElementById("error").innerHTML = "User does not exist";
    }
    
    /*  IF YOURE GETTING AN OBJECT PROMISE BEING RETURNED, you need to 'wait' for the the promise to resolve. This can be done by:

            const prom = getUserJson("foo");
            (prom && prom.then(values =>document.getElementById("userScore").innerHTML = values.score))

        this creates a variable that holds the promise. The promise gets checked if it is validated then the '.then()' function will
        wait for the promise to resolve and execute the inline function creation (which is donated by the '=>')
    */
}

async function createUser()
{
    //Set your html element's ID to "user" to use the username as a way to grab information regarding the user
    let user = document.getElementById("reg_user").value; //This will grab the input within the html element named "user"
    let email = document.getElementById("reg_email").value; //This will grab the input within the html element named "email"
    let password = document.getElementById("reg_password").value; //This will grab the input within the html element named "password"

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
    }

    //PHP stuff
    url = website + `createUser.php?user=${user}&email=${email}&password=${password}`;
    console.log("url", url);
    const response = await fetch(url);
    if (response && response.ok){
        const json = await response.json();
        if (json) {
            document.getElementById("response").innerHTML = "Account created successfully"; //Response ID provides a completed Response
        } else {
            document.getElementById("response").innerHTML = "Account not created successfully. Was the username or email used before?";
        }
    } else {
        document.getElementById("response").innerHTML = "Account not created successfully. Was the username or email used before?";
        throw new Error(`Response status: ${response.status}`);
    }
}

async function changeUserContent(user, newValue, contentType){
    /*
    This function takes in three values:
        user -> the username of the user you're affecting
        newValue -> the new value you want to change in contentType's column
        contentType -> which column you want to change
    
    There are 5 columns: (name:dataType)
        name: varchar
        email: varchar
        password: varchar
        score: int
        lastonline: int
    
    refrain from changing the name and email as they are the main identifier for the user

    example usage:
        changeUserContent(foo, 150, score);
    */

    //PHP stuff
    url = website + `changeUserContent.php?user=${user}&newValue=${newValue}&contentType=${contentType}`;
    console.log("url", url);
    const response = await fetch(url);

    if (response){
        console.log("Success! Value has been changed");
    } else {
        console.log("An error has occurred. Value Has not been changed.");
    }
}

async function getEmailJson(email = document.getElementById("email").value) //You can pass either a variable in, or the function will get it itself
{    
    //PHP stuff
    url = website + `getEmail.php?email=${email}`;
    console.log("url", url);
    const response = await fetch(url);
    if (!response)
    {
        throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();

    //Naming your html elements these respective names will provide the relevant information regarding them
    if (json){
        document.getElementById("user").innerHTML = json.name;
        return json; //Usually in the form of {email: , name: , password: , score: , lastonline: }
    } else {
        document.getElementById("error").innerHTML = "User does not exist";
    }
    
    /*  IF YOURE GETTING AN OBJECT PROMISE BEING RETURNED, you need to 'wait' for the the promise to resolve. This can be done by:

            const prom = getUserJson("foo");
            (prom && prom.then(values =>document.getElementById("userScore").innerHTML = values.score))

        this creates a variable that holds the promise. The promise gets checked if it is validated then the '.then()' function will
        wait for the promise to resolve and execute the inline function creation (which is donated by the '=>')
    */
}

export {createUser, getUserInfo, getUserJson, changeUserContent, getEmailJson};