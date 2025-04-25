<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Optional: Allow preflight request response for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

include 'db-connect.php'; // This should define $conn

// Validate input
if (!isset($_POST['user_id'], $_POST['invite_id'])) {
  echo json_encode(["error" => "Missing parameters"]);
  http_response_code(400);
  exit();
}

$user_id = intval($_POST['user_id']);
$invite_id = intval($_POST['invite_id']);

$stmt = $conn->prepare("DELETE FROM cutiuta_spatiul_meu WHERE user_id = ? AND invite_id = ?");
$stmt->bind_param("ii", $user_id, $invite_id);

if ($stmt->execute()) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["error" => "Failed to delete"]);
}

$stmt->close();
$conn->close();
?>
