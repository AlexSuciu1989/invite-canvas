<?php
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");

include 'db-connect.php';

$data = json_decode(file_get_contents("php://input"), true);
$token = trim($data["token"]);
$newPassword = trim($data["password"]);

if (empty($token) || empty($newPassword)) {
    echo json_encode(["error" => "Invalid request"]);
    exit;
}

// Check if token exists & is valid
$stmt = $conn->prepare("SELECT id, reset_expires FROM cutiuta_users WHERE reset_token = ?");
$stmt->bind_param("s", $token);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo json_encode(["error" => "Invalid reset token"]);
    exit;
}

$stmt->bind_result($userId, $resetExpires);
$stmt->fetch();

if (strtotime($resetExpires) < time()) {
    echo json_encode(["error" => "Reset token expired"]);
    exit;
}

// Hash the new password securely
$hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

// Update password in the database
$stmt = $conn->prepare("UPDATE cutiuta_users SET password=?, reset_token=NULL, reset_expires=NULL WHERE id=?");
$stmt->bind_param("si", $hashedPassword, $userId);
$stmt->execute();

echo json_encode(["message" => "Password reset successful!"]);
?>
