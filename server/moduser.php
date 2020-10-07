<?php
include_once("dbcon.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");


$pdo = new PDO($datasource, $username, $password);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$id = $_POST["id"];
$json = $_POST["json"];
$authorization =  $_POST["sub2coder"];

if($authorization == "sub2codergautamonyoutube") {
    $query = "Select count(*) as data from users where id = ".$id;
    $statement = $pdo->prepare($query);
$statement->execute();
while ($row = $statement->fetch(PDO::FETCH_ASSOC))
{
    $count = $row["data"];
}
if($count == 1) {
    $query = "UPDATE `users` SET json =:json WHERE id=:id ";

$statement = $pdo->prepare($query);
  $statement->bindParam(':id', $id);
  $statement->bindParam(':json', $json);
$statement->execute();


echo "{\"success\": true}"; 
} else {
    echo "{\"success\": false}";
}
} else {

header('HTTP/1.0 403 Forbidden');
echo $id;
}

?>