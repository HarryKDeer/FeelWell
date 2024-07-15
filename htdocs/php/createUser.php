<?php
// Database connection (replace with your credentials)
$servername = "127.0.0.1";
$username = "web";
$password = "abc123";
$dbname = "FeelWell";

$connection = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($connection->connect_error) {
    die(
        json_encode([
            "success" => false,
            "message" => "Connection failed: " . $connection->connect_error,
        ])
    );
}

// Retrieve user input + sanitize it
$user = isset($_GET["user"]) ? $_GET["user"] : null;
$email = isset($_GET["email"]) ? $_GET["email"] : null;
$password = isset($_GET["password"]) ? $_GET["password"] : null;

if (empty($user) || empty($email) || empty($password)) {
    die(json_encode(["success" => false, "message" => "Missing parameters"]));
}

// Validate input for secuirty reasons
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die(json_encode(["success" => false, "message" => "Invalid email"]));
}

// Hash password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Prepare and execute SQL query
$stmt = $connection->prepare(
    "INSERT INTO users (name, email, password, score, lastonline) VALUES (?, ?, ?, 0, UNIX_TIMESTAMP())"
);
$stmt->bind_param("sss", $user, $email, $hashedPassword);

if ($stmt->execute()) {
    $answer = ["success" => true];
} else {
    // Check for duplicate entry errors (username or email already exists)
    if ($connection->errno === 1062) {
        $answer = [
            "success" => false,
            "message" => "Username or email already exists",
        ];
    } else {
        $answer = ["success" => false, "message" => "An error occurred"];
        // Log the actual error for debugging
        error_log("MySQL error: " . $stmt->error);
    }
}

// Send answer in JSON format
header("Content-Type: application/json");
echo json_encode($answer);

// Close database connection
$connection->close();
