<?php
    $connection = new mysqli("127.0.0.1", "web", "abc123", "FeelWell");

    $query = "SELECT * from user ORDER BY score DESC LIMIT 10"; //Create mySQL request
    $result = $connection->query($query);

    $answerArr = [];

    while($row = $result->fetch_array())
    {
        $smallArr = array($row['name'], $row['score']);
        $answerArr[] = $smallArr;
    }

    $answerJSON = json_encode($answerArr);

    echo $answerJSON;

    $connection->close();
?>