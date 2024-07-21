<?php
    $connection = new mysqli("127.0.0.1", "web", "abc123", "FeelWell");

    $email = $_GET['email'];

    $query = "SELECT * FROM user where email='$email';";
    $result = $connection->query($query);
    while($row = $result->fetch_array())
    {
        $email =  $row['email'];
        $name = $row['name'];
        $password = $row['password'];
        $score =  $row['score'];
        $lastonline =  $row['lastonline'];
        $answer = <<<EOT
        {"name":"$name", "email":"$email", "password":"$password", "score":"$score", "lastonline":
        "$lastonline"}
EOT;
        echo $answer;
    }

    $connection->close();
?>