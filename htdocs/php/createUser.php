<?php
    $connection = new mysqli("127.0.0.1", "web", "abc123", "FeelWell");

    $user = $_GET['user'];
    $email = $_GET['email'];
    $password = $_GET['password'];
    $score = 0;
    $lastonline = time();

    $query = "INSERT INTO user (name, email, password, score, lastonline) VALUES ('$user','$email','$password','$score','$lastonline')"; //Create mySQL request
    $result = $connection->query($query);

    if ($result === TRUE){
        echo "New entry created successfully";
    } else {
        echo "Error. Could not create new entry. <br>" . $conn->error;
        throw new Exception("An error occurred");
    }


    $connection->close();
?>