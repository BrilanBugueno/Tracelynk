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

$conn->close();
?>
