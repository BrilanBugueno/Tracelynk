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

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Consulta SQL para obtener todos los registros de la tabla 'poligono'
    $sql = "SELECT * FROM poligono";
    $result = $conn->query($sql);

    // Crear un array para almacenar los datos
    $data = array();

    if ($result->num_rows > 0) {
        // Si hay resultados, los agregamos al array
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    } else {
        echo json_encode(["success" => false, "error" => "No hay resultados"]);
        exit();
    }

    // Retornar los datos en formato JSON
    echo json_encode($data);
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($data['nombre']) || !isset($data['id'])) {
        echo json_encode(["success" => false, "error" => "Datos incompletos"]);
        exit();
    }

    $nombre = $data['nombre'];
    $id = $data['id'];

    // Actualizar un polígono existente
    $sql = "UPDATE `poligono` SET nombre = '$nombre' WHERE id = $id"; // Asegúrate de rodear $nombre con comillas simples
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Poligono actualizado exitosamente"]);
    } else {
        echo json_encode(["success" => false, "error" => "Error: " . $conn->error]);
    }
}

$conn->close();

?>