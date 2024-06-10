<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Tus credenciales de conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "vehiculos";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Error de conexión: " . $conn->connect_error]));
}

// Obtener los datos enviados desde el cliente
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['nombre'])) {
    echo json_encode(["success" => false, "error" => "Datos incompletos"]);
    exit();
}

$nombre = $data['nombre'];

// Insertar un nuevo polígono
$sql = "INSERT INTO `poligono` (nombre) values ('$nombre') "; // Asegúrate de rodear $nombre con comillas simples
if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Poligono agregado exitosamente"]);
} else {
    echo json_encode(["success" => false, "error" => "Error: " . $conn->error]);
}

$conn->close();
?>
