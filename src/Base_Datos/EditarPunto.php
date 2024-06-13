<?php
error_reporting(E_ALL);
ini_set('display_errors',1);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD']!=='PUT') {
    echo json_encode(["error"=> "Solicitud no válida. Se requiere método PUT"]);
    exit;
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "vehiculos";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Error de conexión: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents('php://input'), true);
error_log(print_r($data, true ));

$longitud = $data['longitud'] ?? null;
$latitud = $data['latitud'] ?? null;
$idPuntos = $data['idPuntos'] ?? null;

if ($longitud !== null && $latitud !== null && $idPuntos !== null) {
    $stmt = $conn->prepare("UPDATE Puntos SET Longitud = ?, Latitud = ? WHERE idPuntos = ?");
    $stmt->bind_param("ssi", $longitud, $latitud, $idPuntos);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }

    // Cerrar la conexión
    $stmt->close();
}

$conn->close();
?>
