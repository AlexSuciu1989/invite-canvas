<?php
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");

include 'db-connect.php';

// Test DB connection
if (!$conn) {
    die(json_encode(["error" => "Database connection failed: " . mysqli_connect_error()]));
}


$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($data["email"]);

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["error" => "Invalid email"]);
        exit;
    }

    // Check if the user exists
    $stmt = $conn->prepare("SELECT id FROM cutiuta_users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 0) {
        echo json_encode(["error" => "Email not found"]);
        exit;
    }

    // Generate a secure token
    $token = bin2hex(random_bytes(32));
    $expires = date("Y-m-d H:i:s", strtotime("+1 hour")); // Token expires in 1 hour

    // Store token in the database
    $stmt = $conn->prepare("UPDATE cutiuta_users SET reset_token=?, reset_expires=? WHERE email=?");
    $stmt->bind_param("sss", $token, $expires, $email);
    $stmt->execute();

    // Send email with reset link (Replace with actual email sending logic)
$resetLink = "http://localhost:3000/reset-password?token=" . $token;
mail($email, "Password Reset", "Click here to reset your password: $resetLink");

    echo json_encode(["message" => "Password reset link sent to email"]);
}
?>
