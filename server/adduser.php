<?php
include_once("dbcon.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");


$pdo = new PDO($datasource, $username, $password);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$id = $_POST["id"];
$json =  $_POST["json"];
$authorization =  $_POST["sub2coder"];
if($authorization == "sub2codergautamonyoutube") {
    $query = "Insert into `users` (`id`,`json`) VALUES (:id, :json)";

$statement = $pdo->prepare($query);
  $statement->bindParam(':id', $id);
  $statement->bindParam(':json', $json);
  if($statement->execute()) {
      echo "{\"success\": true}"; 
  } else {
       echo "{\"success\": false}"; 
  }





} else {

header('HTTP/1.0 403 Forbidden');
echo "403";
}

?>