<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "vehiculos";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Error de conexión: " . $conn->connect_error]));
}

$idPuntos = $_GET['id'];

// Leer los datos del cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

$longitud = $data['longitud'];
$latitud = $data['latitud'];

$sql = "UPDATE puntos SET Longitud = '$longitud', Latitud = '$latitud' WHERE idPuntos = $idPuntos";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Punto editado exitosamente"]);
} else {
    echo json_encode(["success" => false, "error" => "Error: " . $sql . "<br>" . $conn->error]);
}

$conn->close();
?>
