<?php
$connection = new mysqli("127.0.0.1", "web", "abc123", "FeelWell"); // Replace with your credentials

$user = $_GET["user"];

// Preps query and gets user info
$query_user = "SELECT * FROM users WHERE name=?";
$stmt_user = $connection->prepare($query_user);
$stmt_user->bind_param("s", $user);
$stmt_user->execute();
$result_user = $stmt_user->get_result();

$row_user = $result_user->fetch_assoc();

if (!$row_user) {
    echo json_encode(["success" => false, "message" => "User not found"]);
    exit();
}

// Prepare and exec. query to get user's unfinished tasks
$query_tasks = "SELECT * FROM tasks WHERE user_id=? AND status='not finished'";
$stmt_tasks = $connection->prepare($query_tasks);
$stmt_tasks->bind_param("i", $row_user["id"]);
$stmt_tasks->execute();
$result_tasks = $stmt_tasks->get_result();

$tasks = [];
while ($row_task = $result_tasks->fetch_assoc()) {
    $tasks[] = $row_task;
}

$answer = [
    "success" => true,
    "name" => $row_user["name"],
    "email" => $row_user["email"],
    //Remove password bc of secuirity reasons
    "score" => $row_user["score"],
    "lastonline" => $row_user["lastonline"],
    "tasks" => $tasks,
];

echo json_encode($answer);

$connection->close();
