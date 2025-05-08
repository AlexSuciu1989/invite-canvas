<?php
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");

include 'db-connect.php'; // Ensure proper DB connection

$data = json_decode(file_get_contents("php://input"), true);

// Get user_id from query parameters
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : null;

if (!$user_id) {
    echo json_encode(["error" => "Invalid or missing user_id"]);
    exit;
}

$sql = "SELECT invite_id, MAX(session_id) AS max_session_id
        FROM cutiuta_spatiul_meu 
        WHERE user_id = ? 
        GROUP BY invite_id";

$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $sessions = [];
    while ($row = $result->fetch_assoc()) {
        $sessions[] = $row;
    }

    echo json_encode($sessions);

    $stmt->close();
} else {
    echo json_encode(["error" => "Failed to prepare statement"]);
}

$conn->close();
?>
