<?php
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");

include 'db-connect.php';

// Decode JSON data from frontend
$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($data["username"]);
    $email = trim($data["email"]);
    $password = trim($data["password"]);
    $confirmPassword = trim($data["confirmPassword"]);

    // Validate input
    if (empty($username) || empty($email) || empty($password) || empty($confirmPassword)) {
        die(json_encode(["error" => "All fields are required"]));
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die(json_encode(["error" => "Invalid email format"]));
    }

    if ($password !== $confirmPassword) {
        die(json_encode(["error" => "Passwords do not match"]));
    }

    // Check if email exists
    $checkStmt = $conn->prepare("SELECT id FROM cutiuta_users WHERE email = ?");
    $checkStmt->bind_param("s", $email);
    $checkStmt->execute();
    $checkStmt->store_result();
    
    if ($checkStmt->num_rows > 0) {
        die(json_encode(["error" => "Email is already registered."]));
    }
    $checkStmt->close();
    
    // Check if user exists
    $checkStmt_user = $conn->prepare("SELECT id FROM cutiuta_users WHERE username = ?");
    $checkStmt_user->bind_param("s", $username);
    $checkStmt_user->execute();
    $checkStmt_user->store_result();
    
    if($checkStmt_user->num_rows > 0) {
        die(json_encode(["error" => "Username is already registered."]));
    }
    $checkStmt_user->close();

    // Hash password securely
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert user into database
    $stmt = $conn->prepare("INSERT INTO cutiuta_users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Registration successful!"]);
    } else {
        echo json_encode(["error" => "Error registering user."]);
    }

    $stmt->close();
    $conn->close();
}
?>
