<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "vehiculos";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Error de conexión: " . $conn->connect_error]));
}

$longitud = $_POST['longitud'];
$latitud = $_POST['latitud'];
$idPoligono = intval($_POST['idPoligono']);

$sql = "INSERT INTO puntos (Longitud, Latitud, Poligono_idPoligono) VALUES ('$longitud', '$latitud', '$idPoligono')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Punto agregado exitosamente"]);
} else {
    echo json_encode(["success" => false, "error" => "Error: " . $sql . "<br>" . $conn->error]);
}

$conn->close();
?>
