<?php
include_once("dbcon.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$pdo = new PDO($datasource, $username, $password);

    $query = "SELECT COUNT(*) AS count FROM `users` WHERE 1";
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$statement = $pdo->prepare($query);
$statement->execute();

while ($row = $statement->fetch(PDO::FETCH_ASSOC))
{
    $output = $row['count'];
}

echo $output; 
?>