<?php
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");

include 'db-connect.php';

// Decode JSON data from frontend
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid data"]);
    exit();
}

$sql = "INSERT INTO cutiuta_spatiul_meu (user_id, invite_id, field, text, font_size, font_color, font_style, font_family, text_alignment, horizontal_position, vertical_position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

foreach ($data as $item) {
    $stmt->bind_param("iississssii", 
        $item["user_id"], 
        $item["invite_id"], 
        $item["field"], 
        $item["text"], 
        $item["font_size"], 
        $item["font_color"], 
        $item["font_style"], 
        $item["font_family"], 
        $item["text_alignment"], 
        $item["horizontal_position"], 
        $item["vertical_position"]
    );
    $stmt->execute();
}

$stmt->close();
$conn->close();

echo json_encode(["status" => "success", "message" => "Data saved successfully"]);
?>
