const website = "../php/";

async function getUserInfo() {
  //Set your html element's ID to "user" to use the username as a way to grab information regarding the user

  user = document.getElementById("user").value; //This will grab the input within the html element named "user"

  //PHP stuff
  url = website + `getUser.php?user=${user}`;
  console.log("url", url);
  const response = await fetch(url);
  if (response.ok) {
    const json = await response.json();

    // Displays user info
    document.getElementById("name").innerHTML = json.name;
    document.getElementById("email").innerHTML = json.email;
    // Don't display password for security
    document.getElementById("score").innerHTML = json.score;
    document.getElementById("lastonline").innerHTML = json.lastonline;

    // Displays tasks
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    json.tasks.forEach((task) => {
      if (task.status === "not finished") {
        const listItem = document.createElement("li");
        listItem.textContent = task.description;

        // Adds checkbox to toggle task status (hopefully)
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.status === "completed";
        checkbox.addEventListener("change", () =>
          toggleTaskStatus(task.id, checkbox.checked),
        );
        listItem.prepend(checkbox);

        taskList.appendChild(listItem);
      }
    });
  } else {
    throw new Error(`Response status: ${response.status}`);
  }
}

async function createUser() {
  //Set your html element's ID to "user" to use the username as a way to grab information regarding the user
  user = document.getElementById("user").value; //This will grab the input within the html element named "user"
  email = document.getElementById("email").value; //This will grab the input within the html element named "email"
  password = document.getElementById("password").value; //This will grab the input within the html element named "password"

  //This uses regular expressions to prevents the user from injecting HTML code into the database
  let userRegex = new RegExp("^[a-zA-Z]+[a-zA-Z0-9_-]*$");
  let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}"); //This ensures that this is a valid email address

  if (!userRegex.test(user)) {
    document.getElementById("error").innerHTML = "Invalid username"; //error ID provides error feedback
    document.getElementById("response").innerHTML =
      "Account not created successfully";
    return;
  } else if (!emailRegex.test(email)) {
    document.getElementById("error").innerHTML = "Invalid email";
    document.getElementById("response").innerHTML =
      "Account not created successfully";
    return;
  } else if (!password || password.length < 3) {
    document.getElementById("error").innerHTML =
      "Invalid password. Your password must be at least 3 characters long";
    document.getElementById("response").innerHTML =
      "Account not created successfully";
    return;
  } else {
    document.getElementById("error").innerHTML = "";
    document.getElementById("response").innerHTML = "";
  }

  // PHP stuff
  const url =
    website + `createUser.php?user=${user}&email=${email}&password=${password}`;
  const response = await fetch(url);

  if (response && response.ok) {
    const json = await response.json();
    if (json.success) {
      document.getElementById("response").innerHTML =
        "Account created successfully";
      // Clear input fields after successful creation
      document.getElementById("user").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
    } else {
      document.getElementById("response").innerHTML =
        "Account not created successfully. Was the username or email used before?";
    }
  } else {
    document.getElementById("response").innerHTML =
      "Account not created successfully. Was the username or email used before?";
    throw new Error(`Response status: ${response.status}`);
  }
}

// Will be used to update the task status
async function toggleTaskStatus(taskId, completed) {
  const url =
    website +
    `updateTaskStatus.php?taskId=${taskId}&completed=${completed ? 1 : 0}`;
  const response = await fetch(url);

  if (!response.ok) {
    console.error("Error updating task status:", response.statusText);
  } else {
    getUserInfo(); // Refresh task list after updating
  }
}
