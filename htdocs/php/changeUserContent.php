<?php
    $connection = new mysqli("127.0.0.1", "web", "abc123", "FeelWell");

    $user = $_GET['user'];
    $newValue = $_GET['newValue'];
    $contentType = $_GET['contentType'];

    $query = "UPDATE user SET $contentType = '$newValue' WHERE name = '$user'"; //Create mySQL request
    $result = $connection->query($query);

    if ($result === TRUE){
        $answer = <<<EOT
        {"success": true}
EOT;
    } else {
        $answer = <<<EOT
        {"success": false}
EOT;
        throw new Exception("An error occurred");
    }

    echo $answer;

    $connection->close();
?>