<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
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

// Obtener los datos del punto a editar
$idPuntos = $_POST['idPuntos'];
$Longitud = $_POST['Longitud'];
$Latitud = $_POST['Latitud'];
$Poligono_idPoligono = $_POST['Poligono_idPoligono'];

// Consulta SQL para actualizar el punto
$sql = "UPDATE puntos SET Longitud = '$Longitud', Latitud = '$Latitud', Poligono_idPoligono = '$Poligono_idPoligono' WHERE idPuntos = $idPuntos";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Punto actualizado correctamente"]);
} else {
    echo json_encode(["success" => false, "error" => "Error al actualizar el punto: " . $conn->error]);
}

$conn->close();
?>
