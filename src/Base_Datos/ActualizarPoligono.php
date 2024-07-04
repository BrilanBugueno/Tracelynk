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

// Obtener el nombre del polígono
$nombrePoligono = $_POST['nombrePoligono'];

// Consulta SQL para obtener el id del polígono
$sql = "SELECT idPoligono FROM poligono WHERE nombre = '$nombrePoligono'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Si se encontró el polígono, obtener su id
    $idPoligono = $result->fetch_assoc()['idPoligono'];

    // Consulta SQL para actualizar la clave foránea en la tabla 'puntos'
    $sql = "UPDATE puntos SET Poligono_idPoligono = '$idPoligono' WHERE Poligono_idPoligono = (SELECT idPoligono FROM poligono WHERE nombre = '$nombrePoligono')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Clave foránea actualizada correctamente"]);
    } else {
        echo json_encode(["success" => false, "error" => "Error al actualizar la clave foránea: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => "No se encontró el polígono con el nombre proporcionado"]);
}

$conn->close();
?>
