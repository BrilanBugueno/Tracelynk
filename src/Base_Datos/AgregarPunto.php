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

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['longitud']) && isset($data['latitud']) && isset($data['poligonoId'])) {
    $longitud = $conn->real_escape_string($data['longitud']);
    $latitud = $conn->real_escape_string($data['latitud']);
    $poligonoId = $conn->real_escape_string($data['poligonoId']);

    $sql = "INSERT INTO Puntos (Longitud, Latitud, Poligono_idPoligono) VALUES ('$longitud', '$latitud', $poligonoId)";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Punto agregado con éxito"]);
    } else {
        echo json_encode(["success" => false, "error" => "Error al agregar el punto: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => "No se proporcionaron todos los datos necesarios"]);
}

$conn->close();
?>
