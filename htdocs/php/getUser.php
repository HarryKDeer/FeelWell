<?php
    $connection = new mysqli("127.0.0.1", "web", "abc123", "FeelWell");

    $user = $_GET['user'];

    $query = "SELECT * FROM user where name='$user';";
    $result = $connection->query($query);
    while($row = $result->fetch_array())
    {
        $name = $row['name'];
        $email =  $row['email'];
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