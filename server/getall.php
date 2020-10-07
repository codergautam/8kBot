<?php
include_once("dbcon.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$pdo = new PDO($datasource, $username, $password);

    $query = "select * from users";
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$statement = $pdo->prepare($query);
$statement->execute();
$json = "{";
while ($row = $statement->fetch(PDO::FETCH_ASSOC))
{
    $json = $json.'"'.$row['id'].'":'.$row['json'].",";
}
if(strlen($json) != 1) {
    $json = substr($json, 0, -1);
}
$json = $json."}";


echo $json; 
?>